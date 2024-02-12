import * as Yup from 'yup';
import { useEffect, useState } from 'react';

import { useFormik, Form, FormikProvider } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Button, DialogActions, DialogContent, Divider, Grid, InputLabel, ListItemText, Stack, TextField } from '@mui/material';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MainCard from 'components/MainCard';
import { useNavigate, useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import useVillas from 'hooks/villa/useVillas';
import apiRequest from 'services/request';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import useCreateReservation from 'hooks/reservation/useCreateReservation';

const getInitialValues = () => {
  const newReservation = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    villaId: '',
    total: 0,
    villa: {},
    amount: 0
  };
  return newReservation;
};
const ReservationAdd = () => {
  const CustomerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required')
  });
  const { mutate } = useCreateReservation();

  const navigate = useNavigate();
  const params = useParams();

  const { data } = useVillas({
    Page: 1,
    Size: 15
  });

  const [reservationItem, setReservationItem] = useState([]);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  var villaId: any = 0;
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (params.id) values.villaId = params.id;
        else if (!values.villaId) {
          alert('villa Id boş geldi');
          return;
        }

        values.checkIn = moment(date1).format('YYYY-MM-DD').toString();
        values.checkOut = moment(date2).format('YYYY-MM-DD').toString();

        values.villa = { connect: [values.villaId] };
        values.amount = values.total;

        // isAvalilable Control
        apiRequest(
          'GET',
          `/reservations?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${villaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${values.checkIn}&filters[$and][1][$or][0][$and][1][checkIn][$lt]=${values.checkOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${values.checkIn}&filters[$and][1][$or][1][$and][1][checkOut][$gt]=${values.checkIn}&filters[$and][1][$or][2][$and][0][checkIn][$lt]=${values.checkOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${values.checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=id`
        ).then((res) => {
          if (res.data.data.length > 0) {
            alert('Lütfen Rezervasyon Bilgilerini Kontol Ediniz..');
            setIsAvailable(true);
            return;
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
              alert('Rezervasyon Eklendi..');

              apiRequest('POST', 'reservation-infos', {
                data: {
                  name: values.name,
                  surname: values.surname,
                  phone: values.phone,
                  email: values.email,
                  owner: true,
                  peopleType: 'Adult',
                  reservation: {
                    connect: [res.data.data.id]
                  }
                }
              });

              reservationItem.map((rItem: any) => {
                console.log(rItem.day);
                apiRequest('POST', 'reservation-items', {
                  data: {
                    day: rItem.day,
                    price: rItem.price,
                    reservation: {
                      connect: [res.data.data.id]
                    }
                  }
                });
              });

              navigate('/villa/show/' + values.villaId + '/summary');
              setSubmitting(false);
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handlePrice = () => {
    if (date1 == null || date2 == null) {
      alert('Lütfen Tarih Seçiniz..');
      return;
    } else {
      if (Date.parse(date1) && Date.parse(date2)) {
        if (new Date(date1) >= new Date(date2)) {
          alert('Tarihleri Kontrol Ediniz.');
          return;
        }
      }

      if (params.id) villaId = params.id;
      else villaId = formik.values.villaId;

      if (villaId === 0) {
        alert('Lütfen Villa Seçin Seçiniz..');
        setIsAvailable(true);
        return;
      }
      apiRequest(
        'GET',
        `/reservations?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${villaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${moment(
          date1
        )
          .format('YYYY-MM-DD')
          .toString()}&filters[$and][1][$or][0][$and][1][checkIn][$lt]=${moment(date2)
          .format('YYYY-MM-DD')
          .toString()}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${moment(date1)
          .format('YYYY-MM-DD')
          .toString()}&filters[$and][1][$or][1][$and][1][checkOut][$gt]=${moment(date1)
          .format('YYYY-MM-DD')
          .toString()}&filters[$and][1][$or][2][$and][0][checkIn][$lt]=${moment(date2)
          .format('YYYY-MM-DD')
          .toString()}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${moment(date2)
          .format('YYYY-MM-DD')
          .toString()}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=id`
      ).then((res) => {
        if (res.data.data.length < 1) {
          apiRequest(
            'GET',
            `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${villaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${moment(
              date1
            ).format('YYYY-MM-DD')}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${moment(date2).format(
              'YYYY-MM-DD'
            )}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${moment(date1).format(
              'YYYY-MM-DD'
            )}&filters[$and][1][$or][1][$and][1][checkOut][$gte]=${moment(date1).format(
              'YYYY-MM-DD'
            )}&filters[$and][1][$or][2][$and][0][checkIn][$lte]=${moment(date2).format(
              'YYYY-MM-DD'
            )}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${moment(date2).format(
              'YYYY-MM-DD'
            )}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price`
          ).then((resP) => {
            var fakeDate = new Date(moment(date1).format('YYYY-MM-DD'));
            var days: any = [];

            resP.data.data.map((priceDate: any) => {
              while (fakeDate >= new Date(priceDate.attributes.checkIn) && fakeDate <= new Date(priceDate.attributes.checkOut)) {
                if (fakeDate >= new Date(moment(date2).format('YYYY-MM-DD'))) break;
                days.push({ date: moment(fakeDate).format('YYYY-MM-DD'), price: priceDate.attributes.price });
                fakeDate.setDate(fakeDate.getDate() + 1);
              }
            });
            var toplam = 0;
            var rezItem: any = [];

            for (var i = 0; i < days.length; i++) {
              toplam = toplam + Number(days[i].price);
              rezItem.push({ day: days[i].date, price: days[i].price });
            }
            //console.log(rezItem);

            setReservationItem(rezItem);
            formik.values.total = toplam;
            if (toplam > 0) setIsAvailable(false);
            else setIsAvailable(true);
          });
        } else {
          alert('Seçilen Tarihlerde Tesis Müsait Değil..');
          setIsAvailable(true);
        }
      });
    }
  };

  useEffect(() => {
    setIsAvailable(true);
  }, [date1, date2, villaId]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainCard content={false} title="Rezervasyon Ekle">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                {!params.id && (
                  <Grid item xs={12}>
                    <InputLabel id="villa-categories-label" sx={{ marginBottom: 1 }}>
                      Villa Seçimi *
                    </InputLabel>
                    <FormControl fullWidth>
                      {data && (
                        <Select
                          labelId="villaId-label"
                          id="villaId-id"
                          {...getFieldProps('villaId')}
                          //@ts-ignore
                          renderValue={(selected: any) => data.data.data.find((item) => item.id === selected).attributes.name}
                        >
                          {data?.data.data.map((item: any) => (
                            <MenuItem key={item.id} value={item.id}>
                              <ListItemText primary={item.attributes.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
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
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button variant="contained" type="button" onClick={handlePrice}>
                      Fiyat Sorgula
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="Adı Soyadı">Adı *</InputLabel>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      placeholder="Rezervasyon Sahibi Adı"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="Soyadı">Soyadı *</InputLabel>
                    <TextField
                      fullWidth
                      id="surname"
                      name="surname"
                      placeholder="Rezervasyon Sahibi Soyadı"
                      value={formik.values.surname}
                      onChange={formik.handleChange}
                      error={formik.touched.surname && Boolean(formik.errors.surname)}
                      helperText={formik.touched.surname && formik.errors.surname}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="Telefon Numarası">Telefon Numarası</InputLabel>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      placeholder="Rezervasyon Sahibi Telefon Numarası"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email">Email Adresi</InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {!isAvailable && (
                      <Button color="success" onClick={() => null}>
                        Toplam Fiyat : {formik?.values?.total}
                      </Button>
                    )}
                    <Button type="submit" variant="contained" disabled={isAvailable}>
                      Rezervasyonu Oluştur
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </FormikProvider>
      </MainCard>
    </LocalizationProvider>
  );
};

export default ReservationAdd;
