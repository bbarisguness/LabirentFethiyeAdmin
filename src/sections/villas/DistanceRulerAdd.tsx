import { dispatch } from 'store';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateDistanceRuler from 'hooks/villa/useCreateDistanceRuler';
import { useNavigate, useParams } from 'react-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const validationSchema = yup.object({
  name: yup.string().required('Başlık Yazmak Zorunludur'),
  value: yup.string().required('Değer" Yazmak Zorunludur'),
  icon: yup.string().required('Icon Seçmek Zorunludur')
});

const getInitialValues = () => {
  const newReservation = {
    name: '',
    value: '',
    icon: '',
    villa: {}
  };
  return newReservation;
};

const DistanceRulerAdd = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate } = useCreateDistanceRuler();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (params.id) {
          values.villa = { connect: [params.id] };
        } else {
          console.log('villa Id boş geldi');
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
              alert('basarili');
              navigate('/villa/show/' + params.id + '/content');
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
      <MainCard title="Mesafe Ekle">
        <form onSubmit={formik.handleSubmit}>
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
                    <FormControlLabel value="shopping-cart" control={<Radio />} label="Market" />
                    <FormControlLabel value="lamp" control={<Radio />} label="Restoran" />
                    <FormControlLabel value="airplane" control={<Radio />} label="Havaalanı" />
                    <FormControlLabel value="sun-fog" control={<Radio />} label="Deniz" />
                    <FormControlLabel value="buildings-2" control={<Radio />} label="Merkez" />
                    <FormControlLabel value="bus" control={<Radio />} label="Toplu Taşıma" />
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
                <InputLabel htmlFor="value">Mesafe *</InputLabel>
                <TextField
                  fullWidth
                  id="value"
                  name="value"
                  placeholder="Değer Yazınız.."
                  value={formik.values.value}
                  onChange={formik.handleChange}
                  error={formik.touched.value && Boolean(formik.errors.value)}
                  helperText={formik.touched.value && formik.errors.value}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Mesafe Ekle
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

export default DistanceRulerAdd;
