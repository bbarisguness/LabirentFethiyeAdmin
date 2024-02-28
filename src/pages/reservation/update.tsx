import * as Yup from 'yup';
import { useEffect, useState } from 'react';

import { useFormik, Form, FormikProvider } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Button, DialogActions, DialogContent, Divider, Grid, InputLabel, Stack } from '@mui/material';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MainCard from 'components/MainCard';
import { useNavigate, useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import apiRequest from 'services/request';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useReservationDetail from 'hooks/reservation/useReservationDetail';
import useReservationUpdate from 'hooks/reservation/useReservationUpdate';

const ReservationUpdate = () => {
  const CustomerSchema = Yup.object().shape({});

   const navigate = useNavigate();
  const params = useParams();

  const { mutate } = useReservationUpdate(params.id as string);

  const { data } = useReservationDetail(params.id as string);
  //console.log(data);
  const reservation = data?.data.data;
  //console.log(reservation);

  const [reservationItem, setReservationItem] = useState([]);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const formik = useFormik({
    initialValues: getInitialValues(reservation),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        values.checkIn = moment(date1).format('YYYY-MM-DD').toString();
        values.checkOut = moment(date2).format('YYYY-MM-DD').toString();
        values.amount = values.total;

        // isAvalilable Control
        apiRequest(
          'GET',
          `/reservations?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${reservation.attributes.villa.id}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${values.checkIn}&filters[$and][1][$or][0][$and][1][checkIn][$lt]=${values.checkOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${values.checkIn}&filters[$and][1][$or][1][$and][1][checkOut][$gt]=${values.checkIn}&filters[$and][1][$or][2][$and][0][checkIn][$lt]=${values.checkOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${values.checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=id`
        ).then((res) => {
          if (res.data.data.length > 0) {
            //alert('Lütfen Rezervasyon Bilgilerini Kontol Ediniz..');
            dispatch(
              openSnackbar({
                open: true,
                message: 'Lütfen Rezervasyon Bilgilerini Kontol Ediniz..',
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: false
              })
            );
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
            onSuccess: (res: any) => {
              //alert('Rezervasyon güncellendi..');
              //alert(res);
              //   apiRequest('POST', 'reservation-infos', {
              //     data: {
              //       name: values.name,
              //       surname: values.surname,
              //       phone: values.phone,
              //       email: values.email,
              //       owner: true,
              //       peopleType: 'Adult',
              //       reservation: {
              //         connect: [res.data.data.id]
              //       }
              //     }
              //   });

              var rItems = reservation.attributes.reservation_items.data;
              rItems.map((item: any) => {
                apiRequest('DELETE', `reservation-items/${item.id}`);
              });

              reservationItem.map((rItem: any) => {
                //console.log(rItem.day);
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
              

              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Rezervasyon Güncellendi..',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              navigate('/reservation/show/' + params.id);
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
      if (date1 && date2) {
        if (new Date(date1) >= new Date(date2)) {
          //alert('Tarihleri Kontrol Ediniz.');
          dispatch(
            openSnackbar({
              open: true,
              message: 'Tarihleri Kontrol Ediniz.',
              variant: 'alert',
              alert: {
                color: 'error'
              },
              close: false
            })
          );
          return;
        }
      }

      apiRequest(
        'GET',
        `/reservations?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${
          reservation.attributes.villa.data.id
        }&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${moment(date1)
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
        //console.log('res', res);

        if (res.data.data.length < 1) {
          apiRequest(
            'GET',
            `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${
              reservation.attributes.villa.data.id
            }&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${moment(date1).format(
              'YYYY-MM-DD'
            )}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${moment(date2).format(
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
            //console.log('resP', resP);
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
          //alert('Seçilen Tarihlerde Tesis Müsait Değil..');
          dispatch(
            openSnackbar({
              open: true,
              message: 'Seçilen Tarihlerde Tesis Müsait Değil..',
              variant: 'alert',
              alert: {
                color: 'error'
              },
              close: false
            })
          );
          setIsAvailable(true);
        }
      });
    }
  };

  useEffect(() => {}, [reservation]);

  useEffect(() => {
    setIsAvailable(true);
  }, [date1, date2]);

  const { handleSubmit } = formik;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainCard content={false} title="Rezervasyon Güncelle">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="checkIn1">Giriş Tarihi *</InputLabel>
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
                      KAYDET
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
const getInitialValues = (rez: any) => {
  const newReservation = {
    checkIn: rez?.attributes.checkIn as string,
    checkOut: (rez?.attributes.checkOut ?? '') as string,
    total: 0,
    amount: 0
  };
  return newReservation;
};
export default ReservationUpdate;
