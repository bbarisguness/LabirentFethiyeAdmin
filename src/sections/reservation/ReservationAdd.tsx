import { dispatch } from 'store';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';


/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  phone: yup.string().required('phone is required'),
  email: yup.string().email('Enter a valid email')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const ReservationAdd = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      checkIn : ''
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  });


  return (
    <MainCard title="Rezervasyon Ekle">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
         
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="Adı Soyadı">Rezervasyon Sahibi Adı</InputLabel>
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
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="Soyadı">Rezervasyon Sahibi Soyadı</InputLabel>
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
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="Telefon Numarası">Rezervasyon Sahibi Telefon Numarası</InputLabel>
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
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
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
                  Verify & Submit
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default ReservationAdd;
