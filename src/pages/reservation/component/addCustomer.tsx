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
import useCreateReservationInfo from 'hooks/reservation/useCreateReservationInfo';
import { useParams } from 'react-router';
import AnimateButton from 'components/@extended/AnimateButton';

export interface Props {
  onCancel: () => void;
}
const getInitialValues = () => {
  const newReservation = {
    name: '',
    surname: '',
    phone: '',
    peopleType: '',
    reservation: {}
  };
  return newReservation;
};
const AddCustomerForm = ({ onCancel }: Props) => {
  const params = useParams();

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('İsim tarihi zorunludur'),
    surname: Yup.string().max(255).required('Soyisim zorunludur'),
    phone: Yup.string().max(255),
    peopleType: Yup.string().max(255).required('Bu alan zorunludur')
  });

  const { mutate } = useCreateReservationInfo();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (!params.id) {
          alert('Rezervasyon Id hatali..');
          return;
        }

        values.reservation = { connect: [params.id] };
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
              alert('Misafir Eklendi..');
              //navigate('/villa/show/' + params.id + '/content');
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

export default AddCustomerForm;
