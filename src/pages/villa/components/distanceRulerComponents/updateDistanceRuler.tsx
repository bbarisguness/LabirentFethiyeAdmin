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
  TextField,
  Grid,
  FormControlLabel,
  Divider
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import apiRequest from 'services/request';
import { useEffect, useState } from 'react';
import useUpdateDistanceRuler from 'hooks/villa/useUpdateDistanceRuler';

const validationSchema = yup.object({
  name: yup.string().required('Başlık Yazmak Zorunludur'),
  value: yup.string().required('Değer" Yazmak Zorunludur'),
  icon: yup.string().required('Icon Seçmek Zorunludur')
});

export interface Props {
  onCancel: () => void;
  DrId?: string;
}

const UpdateDistanceRulerModal = ({ onCancel, DrId }: Props) => {
  const [distanceRuler, setDistanceRuler] = useState();

  useEffect(() => {
    if (DrId !== undefined) {
      apiRequest('GET', '/distance-rulers/' + DrId).then((res) => {
        if (res.status === 200) {
          setDistanceRuler(res.data.data);
        }
      });
    }
  }, [DrId]);

  const { mutate } = useUpdateDistanceRuler(DrId as string);
  const formik = useFormik({
    initialValues: getInitialValues(distanceRuler),
    validationSchema: validationSchema,
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
                  message: 'Mesafe başarıyla güncellendi!',
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
      <Form name="updatedistancerulerform" onSubmit={formik.handleSubmit}>
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
const getInitialValues = (data: any) => {
  const newDistanceRuler = {
    name: (data?.attributes.name ?? '') as string,
    value: (data?.attributes.value ?? '') as string,
    icon: (data?.attributes.icon ?? '') as string
  };
  return newDistanceRuler;
};
export default UpdateDistanceRulerModal;
