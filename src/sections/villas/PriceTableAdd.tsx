import { dispatch } from 'store';
import { Button, FormControlLabel, Grid, InputLabel, RadioGroup, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreatePriceTable from 'hooks/villa/useCreatePriceTable';
import { useNavigate, useParams } from 'react-router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Radio } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Başlık Yazmak Zorunludur'),
  price: yup.number().required('Fiyat Yazmak Zorunludur'),
  icon: yup.string().required('Icon Seçmek Zorunludur')
});

const getInitialValues = () => {
  const newReservation = {
    name: '',
    description: '',
    price: '',
    icon: '',
    villa: {}
  };
  return newReservation;
};

const PriceTableAdd = () => {
  const params = useParams();
  const navigate = useNavigate();

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
      <MainCard title="Fiyat Ekle">
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
                    <FormControlLabel value="cloud-drizzle" control={<Radio />} label="Yağmurlu" />
                    <FormControlLabel value="cloud-notif" control={<Radio />} label="Parçalı Bulut" />
                    <FormControlLabel value="sun" control={<Radio />} label="Güneş" />
                  </RadioGroup>
                </FormControl>
                {formik.errors.icon && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {formik.errors.icon}
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

export default PriceTableAdd;
