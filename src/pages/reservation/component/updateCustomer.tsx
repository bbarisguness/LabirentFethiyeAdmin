import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AnimateButton from 'components/@extended/AnimateButton';
import { useEffect, useState } from 'react';
import apiRequest from 'services/request';
import useUpdateReservationInfo from 'hooks/reservation/useUpdateReservationInfo';

export interface Props {
  onCancel: () => void;
  RiId?: string;
}
// const getInitialValues = () => {
//   const newReservation = {
//     name: '',
//     surname: '',
//     phone: '',
//     peopleType: ''
//   };
//   return newReservation;
// };
const UpdateCustomerFormModal = ({ onCancel, RiId }: Props) => {
  const [reservationInfo, setReservationInfo] = useState();

  useEffect(() => {
    if (RiId !== undefined) {
      apiRequest('GET', '/reservation-infos/' + RiId).then((res) => {
        if (res.status === 200) {
          setReservationInfo(res.data.data);
        }
      });
    }
  }, [RiId]);

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('İsim tarihi zorunludur'),
    surname: Yup.string().max(255).required('Soyisim zorunludur'),
    phone: Yup.string().max(255),
    peopleType: Yup.string().max(255).required('Bu alan zorunludur')
  });

  const { mutate } = useUpdateReservationInfo(RiId as string);

  const formik = useFormik({
    initialValues: getInitialValues(reservationInfo),
    validationSchema: CustomerSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      try {
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
                  message: 'Müşteri başarıyla güncellendi!',
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <DialogTitle>Misafir Ekle</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
              <Grid item xs={2}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">İsim *</InputLabel>
                </Stack>
              </Grid>
              <Grid item xs={10}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="İsim Yazınız.."
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="surname">Soyisim *</InputLabel>
                </Stack>
              </Grid>
              <Grid item xs={10}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    id="surname"
                    name="surname"
                    placeholder="Soyisim Yazınız.."
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                  />
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone">Telefon </InputLabel>
                </Stack>
              </Grid>
              <Grid item xs={10}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    placeholder="İsteğe bağlı Telefon Numarsı.."
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={1}>
                  {' '}
                  <InputLabel htmlFor="peopleType">Yaş Grubu * </InputLabel>{' '}
                </Stack>
              </Grid>
              <Grid item xs={10}>
                <Stack spacing={1}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-label="peopleType"
                      value={formik.values.peopleType}
                      onChange={formik.handleChange}
                      name="peopleType"
                      id="peopleType"
                    >
                      <FormControlLabel value="Adult" control={<Radio />} label="Yetişkin" />
                      <FormControlLabel value="Child" control={<Radio />} label="Çocuk" />
                      <FormControlLabel value="Baby" control={<Radio />} label="Bebek" />
                    </RadioGroup>
                  </FormControl>
                  {formik.errors.peopleType && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {formik.errors.peopleType}
                    </FormHelperText>
                  )}
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
    </LocalizationProvider>
  );
};

const getInitialValues = (data: any) => {
  const newDistanceRuler = {
    name: (data?.attributes.name ?? '') as string,
    surname: (data?.attributes.surname ?? '') as string,
    phone: (data?.attributes.phone ?? '') as string,
    peopleType: (data?.attributes.peopleType ?? '') as string
  };
  return newDistanceRuler;
};
export default UpdateCustomerFormModal;
