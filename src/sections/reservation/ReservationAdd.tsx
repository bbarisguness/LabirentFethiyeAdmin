import { dispatch } from 'store';
import { useState } from 'react';

// material-ui
import { Button, FormControl, Grid, InputLabel, ListItemText, Select, Stack, TextField } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateReservation from 'hooks/reservation/useCreateReservation';
import { useParams } from 'react-router';

import useVillas from 'hooks/villa/useVillas';
import { MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import moment from 'moment';
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const getInitialValues = () => {
  const newReservation = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    amount: 0,
    extraPrice: 0,
    total: 0,
    villaId: '',
    reservationInfoId: '',
    villas: []
  };
  return newReservation;
};

const ReservationAdd = () => {
  const params = useParams();

  const { mutate } = useCreateReservation();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (params.id) {
          values.villaId = params.id;
        } else {
          //alert('villa Id boş geldi');
          throw 'villa Id boş geldi';
        }

        // ilk önce rezervasyon eklenecek. Ardından Reservation-Info eklenecek. Burada 2 adet post isteği yapılması gerekecek

        mutate(
          {
            //data: values
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
              //navigate('/villa/show/' + res.data.data.id + '/summary');
              setSubmitting(false);
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { data } = useVillas({
    Page: 1,
    Size: 15
  });

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  // const [checkIns, setCheckIns] = useState('');
  // const [checkOuts, setCheckOuts] = useState('');
  //let checkIns, checkOuts;
  if (date1 && date2) {
    alert(moment(date1).format('YYYY-MM-DD'));
    //checkIns = moment(date1).format('YYYY-MM-DD');
    //checkOuts = moment(date2).format('YYYY-MM-DD');
    // setCheckIns(moment(date1).format('YYYY-MM-DD').toString());
    // setCheckOuts(moment(date2).format('YYYY-MM-DD').toString());
  }
  //alert('checkIn : ' + checkIns + ' || checkOut : ' + checkOuts);
  //console.log('checkIn : ' + checkIns + ' || checkOut : ' + checkOuts);

  const handlePrice = () => {
    //alert('checkIn : ' + checkIns + ' || checkOut : ' + checkOuts + ' \nFiyat Sorgusu Sonucu Çalışacak..');
    alert('sad');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainCard title="Rezervasyon Ekle">
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
            <Grid item xs={5}>
              <Stack spacing={1}>
                <InputLabel htmlFor="checkIn">Giriş Tarihi *</InputLabel>
                {/* <TextField
                fullWidth
                id="checkIn"
                name="checkIn"
                placeholder="Giriş Tarihi Seçiniz"
                value={formik.values.checkIn}
                onChange={formik.handleChange}
                error={formik.touched.checkIn && Boolean(formik.errors.checkIn)}
                helperText={formik.touched.checkIn && formik.errors.checkIn}
              /> */}
                <DatePicker value={date1} onChange={(newValue) => setDate1(newValue)} slotProps={{ textField: { fullWidth: true } }} />
              </Stack>
            </Grid>
            <Grid item xs={5}>
              <Stack spacing={1}>
                <InputLabel htmlFor="checkOut">Çıkış Tarihi *</InputLabel>
                {/* <TextField
                  fullWidth
                  id="checkOut"
                  name="checkOut"
                  placeholder="Çıkış Tarihi Seçiniz"
                  value={formik.values.checkOut}
                  onChange={formik.handleChange}
                  error={formik.touched.checkOut && Boolean(formik.errors.checkOut)}
                  helperText={formik.touched.checkOut && formik.errors.checkOut}
                /> */}
                <DatePicker value={date2} onChange={(newValue) => setDate2(newValue)} slotProps={{ textField: { fullWidth: true } }} />
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack spacing={1}>
                <Button variant="contained" type="button" size="medium" sx={{ marginTop: 4 }} onClick={handlePrice}>
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
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
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

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Rezervasyonu Oluştur
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

export default ReservationAdd;
