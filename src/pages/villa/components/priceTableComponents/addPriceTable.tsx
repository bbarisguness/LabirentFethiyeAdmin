import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material';
import { Grid } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
// import MainCard from 'components/MainCard';

import { dispatch } from 'store';

import { openSnackbar } from 'store/reducers/snackbar';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
// import useCreateDistanceRuler from 'hooks/villa/useCreateDistanceRuler';
import { useParams } from 'react-router';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControlLabel } from '@mui/material';
import { Divider } from '@mui/material';
import useCreatePriceTable from 'hooks/villa/useCreatePriceTable';

const validationSchema = yup.object({
  name: yup.string().required('Başlık Yazmak Zorunludur'),
  description: yup.string().required('Açıklama" Yazmak Zorunludur'),
  icon: yup.string().required('Icon Seçmek Zorunludur'),
  price: yup.number().required('Fiyat Seçmek Zorunludur').min(1, 'En az 1 yazınız')
});

const getInitialValues = () => {
  const newPriceTable = {
    name: '',
    description: '',
    icon: '',
    price: 0,
    villa: {}
  };
  return newPriceTable;
};

export interface Props {
  onCancel: () => void;
}
const AddPriceTableModal = ({ onCancel }: Props) => {
  const params = useParams();
  const { mutate } = useCreatePriceTable();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (params.id) {
          values.villa = { connect: [params.id] };
        } else {
          console.log('villa Id boş geldi');
          return;
        }
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
              onCancel();
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <DialogTitle style={{ fontWeight: 'bold' }}>Fiyat EKLE</DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">Başlık *</InputLabel>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="Başlık Yazınız.."
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="icon">Icon *</InputLabel>
                <FormControl>
                  <RadioGroup row aria-label="icon" value={formik.values.icon} onChange={formik.handleChange} name="icon" id="icon">
                    <FormControlLabel value="cloud-drizzle" control={<Radio />} label="Yağmurlu" />
                    <FormControlLabel value="cloud-notif" control={<Radio />} label="Parçalı Bulut" />
                    <FormControlLabel value="sun" control={<Radio />} label="Güneş" />
                  </RadioGroup>
                </FormControl>
                {formik.errors.icon && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {' '}
                    {formik.errors.icon}{' '}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="description">Açıklama *</InputLabel>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  multiline
                  rows={5}
                  placeholder="Açıklama Yazınız.."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="price">Fiyat *</InputLabel>
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
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <AnimateButton>
                  <Button color="error" onClick={onCancel}>
                    İPTAL
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    KAYDET
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
};

export default AddPriceTableModal;

// import {
//   Button,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   Radio,
//   RadioGroup,
//   Stack,
//   TextField,
//   Divider,
//   FormControlLabel,
//   Grid
// } from '@mui/material';
// import AnimateButton from 'components/@extended/AnimateButton';
// import { dispatch } from 'store';
// import { openSnackbar } from 'store/reducers/snackbar';
// import { useFormik, Form, FormikProvider } from 'formik';
// import * as yup from 'yup';
// import { useParams } from 'react-router';
// import useCreatePriceTable from 'hooks/villa/useCreatePriceTable';

// const validationSchema = yup.object({
//   name: yup.string().required('Başlık Yazmak Zorunludur'),
//   value: yup.string().required('Değer" Yazmak Zorunludur'),
//   icon: yup.string().required('Icon Seçmek Zorunludur'),
//   description: yup.string().required('Açıklama Yazmak Zorunludur')
// });

// const getInitialValues = () => {
//   const newPriceTable = {
//     name: '',
//     description: '',
//     price: '',
//     icon: '',
//     villa: {}
//   };
//   return newPriceTable;
// };

// export interface Props {
//   onCancel: () => void;
// }
// const AddPriceTableModal = ({ onCancel }: Props) => {
//   const params = useParams();
//   const { mutate } = useCreatePriceTable();

//   const formik = useFormik({
//     initialValues: getInitialValues(),
//     validationSchema: validationSchema,
//     onSubmit: (values, { setSubmitting }) => {
//       try {
//         console.log('burda');

//         if (params.id) {
//           values.villa = { connect: [params.id] };
//         } else {
//           console.log('villa Id boş geldi');
//         }
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
//               dispatch(
//                 openSnackbar({
//                   open: true,
//                   message: 'Fiyat başarıyla eklendi',
//                   variant: 'alert',
//                   alert: {
//                     color: 'success'
//                   },
//                   close: false
//                 })
//               );
//               setSubmitting(false);
//               onCancel();
//             }
//           }
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   });

//   return (
//     <FormikProvider value={formik}>
//       <Form name="addpriceform" onSubmit={formik.handleSubmit}>
//         <DialogTitle style={{ fontWeight: 'bold' }}>FİYAT EKLE</DialogTitle>
//         <Divider />
//         <DialogContent sx={{ p: 2.5 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="name">Başlık *</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="name"
//                   name="name"
//                   placeholder="Başlık Yazınız.."
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   error={formik.touched.name && Boolean(formik.errors.name)}
//                   helperText={formik.touched.name && formik.errors.name}
//                 />
//               </Stack>
//             </Grid>
//             <Grid item xs={12}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="icon">Icon *</InputLabel>
//                 <FormControl>
//                   <RadioGroup row aria-label="icon" value={formik.values.icon} onChange={formik.handleChange} name="icon" id="icon">
//                     <FormControlLabel value="cloud-drizzle" control={<Radio />} label="Yağmurlu" />
//                     <FormControlLabel value="cloud-notif" control={<Radio />} label="Parçalı Bulut" />
//                     <FormControlLabel value="sun" control={<Radio />} label="Güneş" />
//                   </RadioGroup>
//                 </FormControl>
//                 {formik.errors.icon && (
//                   <FormHelperText error id="standard-weight-helper-text-email-login">
//                     {' '}
//                     {formik.errors.icon}{' '}
//                   </FormHelperText>
//                 )}
//               </Stack>
//             </Grid>
//             <Grid item xs={12}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="description">Açıklama *</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="description"
//                   name="description"
//                   multiline
//                   rows={5}
//                   placeholder="Açıklama Yazınız.."
//                   value={formik.values.description}
//                   onChange={formik.handleChange}
//                   error={formik.touched.description && Boolean(formik.errors.description)}
//                   helperText={formik.touched.description && formik.errors.description}
//                 />
//               </Stack>
//             </Grid>
//             <Grid item xs={12}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="email">Fiyat *</InputLabel>
//                 <TextField
//                   fullWidth
//                   id="price"
//                   name="price"
//                   placeholder="Fiyat Yazınız.."
//                   value={formik.values.price}
//                   onChange={formik.handleChange}
//                   error={formik.touched.price && Boolean(formik.errors.price)}
//                   helperText={formik.touched.price && formik.errors.price}
//                 />
//               </Stack>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <Divider />
//         <DialogActions sx={{ p: 2.5 }}>
//           <Grid container justifyContent="space-between" alignItems="center">
//             <Grid item>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <AnimateButton>
//                   <Button color="error" onClick={onCancel}>
//                     İPTAL
//                   </Button>
//                 </AnimateButton>
//                 <AnimateButton>
//                   <Button variant="contained" type="submit">
//                     KAYDET
//                   </Button>
//                 </AnimateButton>
//               </Stack>
//             </Grid>
//           </Grid>
//         </DialogActions>
//       </Form>
//     </FormikProvider>
//   );
// };

// export default AddPriceTableModal;
