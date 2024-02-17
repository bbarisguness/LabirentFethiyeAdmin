import { dispatch } from 'store';

// material-ui
//import { Button, FormControl, Grid, InputLabel, ListItemText, Select, Stack, TextField } from '@mui/material';
import { Button, Grid, InputLabel, Stack, TextField, FormControl, ListItemText, Select, MenuItem } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateDatePrice from 'hooks/priceDate/useCreateDatePrice';
//import useCreateReservationInfo from 'hooks/reservation/useCreateReservationInfo';
import { useParams } from 'react-router';

//import useVillas from 'hooks/villa/useVillas';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useVillas from 'hooks/villa/useVillas';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import apiRequest from 'services/request';

//import { data } from 'data/org-chart';
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  price: yup.number().required('Fiyat Yazmak Zorunludur')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const getInitialValues = () => {
  const newReservation = {
    price: '',
    checkIn: '',
    checkOut: '',
    villa: {}
  };
  return newReservation;
};

const DatePricesAdd = () => {
  const params = useParams();

  const { data } = useVillas({
    Page: 1,
    Size: 15
  });

  const { mutate } = useCreateDatePrice();

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // console.log(moment(date1).add(-1,'days').format('YYYY-MM-DD').toString())
        // return;
        // console.log(moment(date1).format('YYYY-MM-DD').toString());
        // console.log(moment(date2).format('YYYY-MM-DD').toString());

        if (params.id) {
          //values.villaId = params.id;
          values.villa = { connect: [params.id] };
        } else {
          console.log('villa Id boş geldi');
        }

        values.checkIn = moment(date1).format('YYYY-MM-DD').toString();
        values.checkOut = moment(date2).format('YYYY-MM-DD').toString();

        apiRequest(
          'GET',
          `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${params.id}&filters[$and][1][$or][0][$and][0][checkIn][$lte]=${values.checkIn}&filters[$and][1][$or][0][$and][1][checkOut][$gte]=${values.checkIn}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${values.checkOut}&filters[$and][1][$or][1][$and][1][checkOut][$gt]=${values.checkOut}&filters[$and][1][$or][2][$and][0][checkIn][$gt]=${values.checkIn}&filters[$and][1][$or][2][$and][1][checkOut][$lt]=${values.checkOut}&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price&populate[villa][fields][0]=id&publicationState=live`
        ).then((res) => {
          //console.log('sorgu', res);
          if (res.data.data.length > 0) {
            const priceData = res.data.data;
            var firstPrice = priceData[0];
            var lastPrice = priceData[priceData.length - 1];
            var endDate = firstPrice.attributes.checkOut;
            //console.log('fonksiyon çalıştı');

            if (firstPrice.attributes.checkIn === values.checkIn && firstPrice.attributes.checkOut === values.checkOut) {
              // Sadece fiyat güncelle
              // apiRequest('PUT', `/price-dates/${firstPrice.id}`, { data: { price: values.price } });
              // dispatch(
              //   openSnackbar({
              //     open: true,
              //     message: 'Fiyat başarıyla eklendi1',
              //     variant: 'alert',
              //     alert: {
              //       color: 'success'
              //     },
              //     close: false
              //   })
              // );
              apiRequest('DELETE', `/price-dates/${firstPrice.id}`);
              //console.log('fonksiyon 1');
            } else if (values.checkIn === firstPrice.attributes.checkIn && values.checkOut < firstPrice.attributes.checkOut) {
              // apiRequest('POST', '/price-dates', {
              //   data: { checkIn: values.checkIn, checkOut: values.checkOut, price: values.price, villa: { connect: [params.id] } }
              // });
              apiRequest('PUT', `price-dates/${firstPrice.id}`, {
                data: { checkIn: moment(values.checkOut).add(1, 'days').format('YYYY-MM-DD').toString() }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi2',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 2');
            } else if (values.checkIn > firstPrice.attributes.checkIn && values.checkOut === firstPrice.attributes.checkOut) {
              // apiRequest('POST', '/price-dates', {
              //   data: { checkIn: values.checkIn, checkOut: values.checkOut, price: values.price, villa: { connect: [params.id] } }
              // });
              apiRequest('PUT', `price-dates/${firstPrice.id}`, {
                data: { checkOut: moment(values.checkIn).add(-1, 'days').format('YYYY-MM-DD').toString() }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi3',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 3');
            } else if (values.checkIn > firstPrice.attributes.checkIn && values.checkOut < firstPrice.attributes.checkOut) {
              // apiRequest('POST', '/price-dates', {
              //   data: { checkIn: values.checkIn, checkOut: values.checkOut, price: values.price, villa: { connect: [params.id] } }
              // });
              apiRequest('PUT', `price-dates/${firstPrice.id}`, {
                data: { checkOut: moment(values.checkIn).add(-1, 'days').format('YYYY-MM-DD').toString() }
              });
              apiRequest('POST', '/price-dates', {
                data: {
                  checkIn: moment(values.checkOut).add(1, 'days').format('YYYY-MM-DD').toString(),
                  checkOut: endDate,
                  price: firstPrice.attributes.price,
                  villa: { connect: [params.id] }
                }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi4',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 4');
            } else if (
              values.checkIn < firstPrice.attributes.checkOut &&
              values.checkIn > firstPrice.attributes.checkIn &&
              values.checkOut < lastPrice.attributes.checkOut &&
              values.checkOut > lastPrice.attributes.checkIn
            ) {
              // apiRequest('POST', '/price-dates', {
              //   data: { checkIn: values.checkIn, checkOut: values.checkOut, price: values.price, villa: { connect: [params.id] } }
              // });
              apiRequest('PUT', `price-dates/${firstPrice.id}`, {
                data: { checkOut: moment(values.checkIn).add(-1, 'days').format('YYYY-MM-DD').toString() }
              });
              apiRequest('PUT', `price-dates/${lastPrice.id}`, {
                data: { checkIn: moment(values.checkOut).add(1, 'days').format('YYYY-MM-DD').toString() }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi5',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 5');
            } else if (values.checkIn < firstPrice.attributes.checkOut && values.checkOut > firstPrice.attributes.checkOut) {
              // apiRequest('POST', '/price-dates', {
              //   data: { checkIn: values.checkIn, checkOut: values.checkOut, price: values.price, villa: { connect: [params.id] } }
              // });
              apiRequest('PUT', `price-dates/${firstPrice.id}`, {
                data: { checkOut: moment(values.checkIn).add(-1, 'days').format('YYYY-MM-DD').toString() }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi6',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 6');
            } else if (
              values.checkIn < firstPrice.attributes.checkIn &&
              values.checkOut >= firstPrice.attributes.checkIn &&
              values.checkOut < firstPrice.attributes.checkOut
            ) {
              apiRequest('PUT', `price-dates/${firstPrice.id}`, {
                data: { checkIn: moment(values.checkOut).add(1, 'days').format('YYYY-MM-DD').toString() }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 7');
            } else if (values.checkIn === firstPrice.attributes.checkOut) {
              apiRequest('PUT', `/price-dates/${firstPrice.id}`, {
                data: { checkOut: moment(firstPrice.attributes.checkOut).add(-1, 'days').format('YYYY-MM-DD').toString() }
              });
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              //console.log('fonksiyon 8');
            }
          }
        });

        mutate(
          {
            data: values
          },
          {
            onError: (error: any) => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: error.response?.data.message,
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: false
                })
              );
            },
            onSuccess: (res) => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fiyat başarıyla eklendi',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              setSubmitting(false);
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainCard title="Fiyat Ekle">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {!params.id && (
              <Grid item xs={12}>
                <InputLabel id="villa-categories-label" sx={{ marginBottom: 1 }}>
                  Villa Seçimi *
                </InputLabel>
                <FormControl fullWidth>
                  <Select labelId="villa-categories-label" id="villa-categories">
                    {data &&
                      data.data.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.attributes.name}>
                          <ListItemText primary={item.attributes.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="checkIn">Giriş Tarihi *</InputLabel>
                <DatePicker value={date1} onChange={(newValue) => setDate1(newValue)} slotProps={{ textField: { fullWidth: true } }} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="checkOut">Çıkış Tarihi *</InputLabel>
                <DatePicker value={date2} onChange={(newValue) => setDate2(newValue)} slotProps={{ textField: { fullWidth: true } }} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Fiyat *</InputLabel>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  placeholder="Fiyat Yazınız.."
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Fiyat Ekle
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </LocalizationProvider>
  );
};

export default DatePricesAdd;
