//import { dispatch } from 'store';
import { useState } from 'react';

// material-ui
//import { Button, FormControl, Grid, InputLabel, ListItemText, Select, Stack, TextField } from '@mui/material';
import { Button, Grid, InputLabel, ListItemText, Select, Stack, TextField } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
//import { openSnackbar } from 'store/reducers/snackbar';

// third-party
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import useCreateReservation from 'hooks/reservation/useCreateReservation';
//import useCreateReservationInfo from 'hooks/reservation/useCreateReservationInfo';
import { useParams } from 'react-router';

import useVillas from 'hooks/villa/useVillas';
// import useGetReservationPrices from 'hooks/reservation/useGetReservationPrices';
//import { MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';
import moment from 'moment';
//import useGetReservationPrices from 'hooks/reservation/useGetReservationPrices';
import apiRequest from 'services/request';
// import moment from 'moment';
//import { data } from 'data/org-chart';

const ReservationAdd = () => {
  const params = useParams();

  const { data } = useVillas({
    Page: 1,
    Size: 15
  });

  
  
  // if (date1 && date2) {
  //   alert(moment(date1).format('YYYY-MM-DD'));
  // }

  // function getPrice(checkIn: Date, checkOut: Date) {
  //   //let fakeDate: Date = checkIn;
  //   // const [fakeDate, setFakeDate] = useState(checkIn);
  //   // while (fakeDate < checkOut) {
  //   //   //fakeDate = fakeDate.setDate(fakeDate.getDate() + 1);
  //   //   setFakeDate(fakeDate.setDate(fakeDate.getDate() + 1));
  //   // }
  // }

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  // const { data, refetch } = useGetReservationPrices({
  //   VillaId: params.id,
  //   CheckIn: moment(date1).format('YYYY-MM-DD'),
  //   CheckOut: moment(date2).format('YYYY-MM-DD')
  // });
  // const { data } = useGetReservationPrices(
  //   params.id as string,
  //   moment(date1).format('YYYY-MM-DD').toString(),
  //   moment(date2).format('YYYY-MM-DD').toString()
  // );

  const handlePrice = () => {
    alert('checkIn : ' + moment(date1).format('YYYY-MM-DD'));
    alert('checkOut : ' + moment(date2).format('YYYY-MM-DD'));

    const checkIn = moment(date1).format('YYYY-MM-DD');
    const checkOut = moment(date2).format('YYYY-MM-DD');

    const query = `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${params.id}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${checkIn}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${checkOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${checkIn}&filters[$and][1][$or][1][$and][1][checkOut][$gte]=${checkIn}&filters[$and][1][$or][2][$and][0][checkIn][$lte]=${checkOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price`;
    var data = apiRequest('GET', query);
    console.log(data);

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainCard title="Rezervasyon Ekle">
        <form>
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
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                  // error={formik.touched.name && Boolean(formik.errors.name)}
                  // helperText={formik.touched.name && formik.errors.name}
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
                  // value={formik.values.surname}
                  // onChange={formik.handleChange}
                  // error={formik.touched.surname && Boolean(formik.errors.surname)}
                  // helperText={formik.touched.surname && formik.errors.surname}
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
                  // value={formik.values.phone}
                  // onChange={formik.handleChange}
                  // error={formik.touched.phone && Boolean(formik.errors.phone)}
                  // helperText={formik.touched.phone && formik.errors.phone}
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
                  // value={formik.values.email}
                  // onChange={formik.handleChange}
                  // error={formik.touched.email && Boolean(formik.errors.email)}
                  // helperText={formik.touched.email && formik.errors.email}
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

// #region

// import { dispatch } from 'store';
// import { useState } from 'react';

// // material-ui
// //import { Button, FormControl, Grid, InputLabel, ListItemText, Select, Stack, TextField } from '@mui/material';
// import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

// // project-imports
// import MainCard from 'components/MainCard';
// import AnimateButton from 'components/@extended/AnimateButton';
// import { openSnackbar } from 'store/reducers/snackbar';

// // third-party
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import useCreateReservation from 'hooks/reservation/useCreateReservation';
// //import useCreateReservationInfo from 'hooks/reservation/useCreateReservationInfo';
// import { useParams } from 'react-router';

// //import useVillas from 'hooks/villa/useVillas';
// import useGetReservationPrices from 'hooks/reservation/useGetReservationPrices';
// //import { MenuItem } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import moment from 'moment';
// //import { data } from 'data/org-chart';
// /**
//  * 'Enter your email'
//  * yup.string Expected 0 arguments, but got 1 */
// const validationSchema = yup.object({
//   name: yup.string().required('Name is required'),
//   surname: yup.string().required('Surname is required')
// });

// // ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

// const getInitialValues = () => {
//   const newReservation = {
//     name: '',
//     surname: '',
//     phone: '',
//     email: '',
//     checkIn: '',
//     checkOut: '',
//     amount: 0,
//     extraPrice: 0,
//     total: 0,
//     villaId: '',
//     reservationInfoId: '',
//     villas: []
//   };
//   return newReservation;
// };

// const ReservationAdd = () => {
//   const params = useParams();

//   const { mutate } = useCreateReservation();
//   //const { mutate:createReservationInfo } = useCreateReservation();
//   const formik = useFormik({
//     initialValues: getInitialValues(),
//     validationSchema: validationSchema,
//     onSubmit: (values, { setSubmitting }) => {
//       try {
//         if (params.id) {
//           values.villaId = params.id;
//         } else {
//           //alert('villa Id boş geldi');
//           throw 'villa Id boş geldi';
//         }

//         // ilk önce rezervasyon eklenecek. Ardından Reservation-Info eklenecek. Burada 2 adet post isteği yapılması gerekecek

//         mutate(
//           {
//             data: values
//           },
//           {
//             onError: (error: any) => {
//               dispatch(
//                 openSnackbar({
//                   open: true,
//                   message: error.response?.data.message,
//                   variant: 'alert',
//                   alert: {
//                     color: 'error'
//                   },
//                   close: false
//                 })
//               );
//             },
//             onSuccess: (res) => {
//               // createReservationInfo({data:info}, {
//               //   onError:(){},
//               //   onSuccess: (res) => {}
//               // })

//               //navigate('/villa/show/' + res.data.data.id + '/summary');
//               setSubmitting(false);
//             }
//           }
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   });

//   // function slug(name:string){
//   //   let url = name.toLowerCase().trim().replace('ş','s').replace('ğ','g').replace('?','')
//   //   return url;
//   // }

//   // const { data } = useVillas({
//   //   Page: 1,
//   //   Size: 15
//   // });

//   // if (date1 && date2) {
//   //   alert(moment(date1).format('YYYY-MM-DD'));
//   // }

//   // function getPrice(checkIn: Date, checkOut: Date) {
//   //   //let fakeDate: Date = checkIn;
//   //   // const [fakeDate, setFakeDate] = useState(checkIn);
//   //   // while (fakeDate < checkOut) {
//   //   //   //fakeDate = fakeDate.setDate(fakeDate.getDate() + 1);
//   //   //   setFakeDate(fakeDate.setDate(fakeDate.getDate() + 1));
//   //   // }
//   // }

//   const [date1, setDate1] = useState(null);
//   const [date2, setDate2] = useState(null);

//   const { data, refetch } = useGetReservationPrices({
//     VillaId: params.id,
//     CheckIn: moment(date1).format('YYYY-MM-DD'),
//     CheckOut: moment(date2).format('YYYY-MM-DD')
//   });

//   const handlePrice = () => {
//     // #region

//     // // if (params.id) {
//     // //   const datePrices = useGetReservationPrices(params.id, moment(date1).format('YYYY-MM-DD').toString(), moment(date2).format('YYYY-MM-DD').toString());
//     // //  }
//     // // alert(
//     // //   'checkIn : ' +
//     // //     moment(date1).format('YYYY-MM-DD') +
//     // //     '\ncheckOut : ' +
//     // //     moment(date2).format('YYYY-MM-DD') +
//     // //     ' \nFiyat Sorgusu Sonucu Çalışacak..'
//     // // );

//     // //var async = require('async');
//     // // var dates = ['2023-10-10', '2023-10-10', '2023-10-10'];

//     // // async.each(
//     // //   dates,
//     // //   function (item, callback) {
//     // //     console.log(item);
//     // //     //
//     // //     callback();
//     // //   },
//     // //   function () {
//     // //     console.log('bitti');
//     // //   }
//     // // );

//     // if (date1 && date2) {
//     //   var dates = [];
//     //   var datePrices: any = [];
//     //   //var fakeDate = new Date(moment(date1).format('YYYY-MM-DD')).setDate((new Date(moment(date1).format('YYYY-MM-DD')).getDate() - 1));
//     //   //var fakeDate = new Date(date1)
//     //   //var barisd = new Date(moment(date1).format('YYYY-MM-DD'));
//     //   //var barisd =  new Date(moment(date1).toDate().setDate(moment(date1).toDate().getDate() -1));
//     //   // alert('fake date : ' + moment(fakeDate).format('YYYY-MM-DD'))
//     //   // alert('date : ' + barisd)

//     //   //var checkInDate = new Date(moment(date1).toDate().setDate(moment(date1).toDate().getDate() -1));
//     //   //var checkOutDate = new Date(moment(date2).toDate().setDate(moment(date2).toDate().getDate() -1));
//     //   var checkInDate = moment(date1).toDate();
//     //   var checkOutDate = moment(date2).toDate();

//     //   var fakeDate = checkInDate;

//     //   while (fakeDate < checkOutDate) {
//     //     dates.push(moment(fakeDate).format('YYYY-MM-DD'));
//     //     //console.log(moment(fakeDate).format('YYYY-MM-DD'));

//     //     fakeDate = new Date(fakeDate.setDate(fakeDate.getDate() + 1));

//     //     //barisd = new Date(barisd.setDate(barisd.getDate() + 1));

//     //     //          dates.push(fakeDate);
//     //     // //         //fakeDate = new Date(fakeDate.setDate(fakeDate.getDate() + 1));
//     //     // //         fakeDate = new Date(moment(fakeDate).format('YYYY-MM-DD')).setDate(new Date(moment(fakeDate).format('YYYY-MM-DD')).getDate() + 1);
//     //   }

//     //   //console.log(dates);

//     //   // const { data } = useGetReservationPrices({ VillaId: 1, CheckIn: '2024-01-10', CheckOut: '2024-01-20' });

//     //   //console.log(data);

//     //   var async = require('async');

//     //   refetch();
//     //   if (data) console.log(data);
//     //   else refetch();

//     //   async.each(
//     //     dates,
//     //     function (item: any, callback: any) {
//     //       // tüm işlemler

//     //       datePrices.push({ day: item, price: 2500 });
//     //       callback();
//     //     },
//     //     function () {
//     //       //console.log('bitti');
//     //     }
//     //   );

//     //   //console.log(datePrices);
//     //   // while (date1 < date2) {
//     //   //   dates.push(moment(date1).format('YYYY-MM-DD'));
//     //   //   //setDate1((new Date(date1)).setDate(new Date(date1).getDate() + 1)));
//     //   //   //setDate1( new Date(date1).setDate(new Date(date1).getDate()) )
//     //   // }
//     //   //moment(date1).format('YYYY-MM-DD');

//     //   // const datePrices = [];
//     //   // var fakeDate = new Date(date1);

//     //   // while (fakeDate < new Date(date2)) {
//     //   //   datePrices.push({ day: fakeDate, price: 2000 });
//     //   //   fakeDate = new Date(fakeDate.setDate(fakeDate.getDate() + 1));
//     //   // }
//     //   // datePrices.map((row) => alert('day : ' + moment(row.day).format('YYYY-MM-DD') + '\nprice : ' + row.price));
//     //}
//     // #endregion
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <MainCard title="Rezervasyon Ekle">
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={3}>
//             {/* {!params.id && (
//               <Grid item xs={12}>
//                 <InputLabel id="villa-categories-label" sx={{ marginBottom: 1 }}>
//                   Villa Seçimi *
//                 </InputLabel>
//                 <FormControl fullWidth>
//                   <Select labelId="villa-categories-label" id="villa-categories">
//                     {data &&
//                       data.data.data.map((item: any) => (
//                         <MenuItem key={item.id} value={item.attributes.name}>
//                           <ListItemText primary={item.attributes.name} />
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             )} */}
//             <Grid item xs={6}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="checkIn">Giriş Tarihi *</InputLabel>
//                 <DatePicker value={date1} onChange={(newValue) => setDate1(newValue)} slotProps={{ textField: { fullWidth: true } }} />
//               </Stack>
//             </Grid>
//             <Grid item xs={6}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="checkOut">Çıkış Tarihi *</InputLabel>
//                 {/* <TextField
//                   fullWidth
//                   id="checkOut"
//                   name="checkOut"
//                   placeholder="Çıkış Tarihi Seçiniz"
//                   value={formik.values.checkOut}
//                   onChange={formik.handleChange}
//                   error={formik.touched.checkOut && Boolean(formik.errors.checkOut)}
//                   helperText={formik.touched.checkOut && formik.errors.checkOut}
//                 /> */}
//                 <DatePicker value={date2} onChange={(newValue) => setDate2(newValue)} slotProps={{ textField: { fullWidth: true } }} />
//               </Stack>
//             </Grid>
//             <Grid item xs={12}>
//               <Stack spacing={1}>
//                 <Button variant="contained" type="button" size="medium" sx={{ marginTop: 4 }} onClick={handlePrice}>
//                   Fiyat Sorgula
//                 </Button>
//               </Stack>
//             </Grid>
//             <Grid item xs={6}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="Adı Soyadı">Adı *</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="name"
//                   name="name"
//                   placeholder="Rezervasyon Sahibi Adı"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   error={formik.touched.name && Boolean(formik.errors.name)}
//                   helperText={formik.touched.name && formik.errors.name}
//                 />
//               </Stack>
//             </Grid>
//             <Grid item xs={6}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="Soyadı">Soyadı *</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="surname"
//                   name="surname"
//                   placeholder="Rezervasyon Sahibi Soyadı"
//                   value={formik.values.surname}
//                   onChange={formik.handleChange}
//                   error={formik.touched.surname && Boolean(formik.errors.surname)}
//                   helperText={formik.touched.surname && formik.errors.surname}
//                 />
//               </Stack>
//             </Grid>
//             <Grid item xs={6}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="Telefon Numarası">Telefon Numarası</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="phone"
//                   name="phone"
//                   placeholder="Rezervasyon Sahibi Telefon Numarası"
//                   value={formik.values.phone}
//                   onChange={formik.handleChange}
//                   error={formik.touched.phone && Boolean(formik.errors.phone)}
//                   helperText={formik.touched.phone && formik.errors.phone}
//                 />
//               </Stack>
//             </Grid>
//             <Grid item xs={6}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="email">Email Adresi</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="email"
//                   name="email"
//                   placeholder="Enter email address"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   error={formik.touched.email && Boolean(formik.errors.email)}
//                   helperText={formik.touched.email && formik.errors.email}
//                 />
//               </Stack>
//             </Grid>

//             <Grid item xs={12}>
//               <Stack direction="row" justifyContent="flex-end">
//                 <AnimateButton>
//                   <Button variant="contained" type="submit">
//                     Rezervasyonu Oluştur
//                   </Button>
//                 </AnimateButton>
//               </Stack>
//             </Grid>
//           </Grid>
//         </form>
//       </MainCard>
//     </LocalizationProvider>
//   );
// };

// export default ReservationAdd;

// #endregion
