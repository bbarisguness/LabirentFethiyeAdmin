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
import useUpdatePriceTable from 'hooks/villa/useUpdatePriceTable';

const validationSchema = yup.object({
  name: yup.string().required('Başlık Yazmak Zorunludur'),
  description: yup.string().required('Açıklama" Yazmak Zorunludur'),
  icon: yup.string().required('Icon Seçmek Zorunludur'),
  price: yup.number().required('Fiyat Seçmek Zorunludur').min(1, 'En az 1 yazınız')
});

export interface Props {
  onCancel: () => void;
  PtId?: string;
}

const UpdatePriceTableModal = ({ onCancel, PtId }: Props) => {
  const [priceTable, setPriceTable] = useState();

  useEffect(() => {
    if (PtId !== undefined) {
      apiRequest('GET', '/price-tables/' + PtId).then((res) => {
        if (res.status === 200) {
          setPriceTable(res.data.data);
        }
      });
    }
  }, [PtId]);

  const { mutate } = useUpdatePriceTable(PtId as string);
  const formik = useFormik({
    initialValues: getInitialValues(priceTable),
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
                  message: 'Fiyat başarıyla güncellendi!',
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
const getInitialValues = (data: any) => {
  const newPriceTable = {
    name: (data?.attributes.name ?? '') as string,
    price: (data?.attributes.price ?? '') as string,
    description: (data?.attributes.description ?? '') as string,
    icon: (data?.attributes.icon ?? '') as string
  };
  return newPriceTable;
};
export default UpdatePriceTableModal;
