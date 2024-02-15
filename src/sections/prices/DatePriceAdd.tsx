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
import {  useParams } from 'react-router';

//import useVillas from 'hooks/villa/useVillas';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useVillas from 'hooks/villa/useVillas';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

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
    villa:{}
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
        if (params.id) {
          //values.villaId = params.id;
          values.villa = { connect: [params.id] };
        } else {
          console.log('villa Id boş geldi');
        }

        values.checkIn = moment(date1).format('YYYY-MM-DD').toString();
        values.checkOut = moment(date2).format('YYYY-MM-DD').toString();

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
              // createReservationInfo({data:info}, {
              //   onError:(){},
              //   onSuccess: (res) => {}
              // })

              //navigate('/villa/show/' + params.id + '/price');
              
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
