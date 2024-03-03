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
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import useCreateDistanceRuler from 'hooks/villa/useCreateDistanceRuler';
import { useParams } from 'react-router';
import { FormControlLabel } from '@mui/material';
import { Divider } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Başlık Yazmak Zorunludur'),
  value: yup.string().required('Değer" Yazmak Zorunludur'),
  icon: yup.string().required('Icon Seçmek Zorunludur')
});

const getInitialValues = () => {
  const newDistanceRuler = {
    name: '',
    value: '',
    icon: '',
    villa: {}
  };
  return newDistanceRuler;
};

export interface Props {
  onCancel: () => void;
}
const AddDistanceRulerModal = ({ onCancel }: Props) => {
  const params = useParams();
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
                  message: 'Mesafe başarıyla eklendi',
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
      <Form name="adddistancerulerform" onSubmit={formik.handleSubmit}>
        <DialogTitle style={{ fontWeight: 'bold' }}>MESAFE EKLE</DialogTitle>
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

export default AddDistanceRulerModal;
