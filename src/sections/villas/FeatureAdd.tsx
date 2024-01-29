import { dispatch } from 'store';

// material-ui
//import { Button, FormControl, Grid, InputLabel, ListItemText, Select, Stack, TextField } from '@mui/material';
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateDatePrice from 'hooks/priceDate/useCreateDatePrice';
//import useCreateReservationInfo from 'hooks/reservation/useCreateReservationInfo';
import { useNavigate, useParams } from 'react-router';

//import useVillas from 'hooks/villa/useVillas';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { data } from 'data/org-chart';
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  price: yup.number().required('Fiyat Yazmak Zorunludur')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const getInitialValues = () => {
  const newReservation = {
    name: '',
    description: '',
    price: '',
    //icon: '',
    villa: {}
  };
  return newReservation;
};

const FeatureAdd = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate } = useCreateDatePrice();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (params.id) {
          //values.villaId = params.id;
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
              // createReservationInfo({data:info}, {
              //   onError:(){},
              //   onSuccess: (res) => {}
              // })

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
      <MainCard title="Özellik Ekle">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="pricetable-name">Başlık *</InputLabel>
                <TextField
                  fullWidth
                  id="pricetable-name"
                  name="pricetable-name"
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
                <InputLabel htmlFor="pricetable-description">Açıklama *</InputLabel>
                <TextField
                  fullWidth
                  id="pricetable-description"
                  name="pricetable-description"
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

export default FeatureAdd;
