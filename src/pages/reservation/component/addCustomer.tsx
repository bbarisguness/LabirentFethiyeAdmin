import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useAddReservation from 'hooks/villa/useAddReservation';

export interface Props {
  onCancel: () => void;  
}
const getInitialValues = () => {
  const newReservation = {
    CheckIn: '',
    CheckOut: '',
    FacilityId: '',
    name: '',
    surname: '',
    'ReservationInfo.Owner': true,
    'ReservationInfo.PeopleType': 1
  };
  return newReservation;
};
const AddCustomerForm = ({ onCancel }: Props) => {
  const CustomerSchema = Yup.object().shape({
    CheckIn: Yup.string().max(255).required('Başlangıç tarihi zorunludur'),
    CheckOut: Yup.string().max(255).required('Bitiş tarihi zorunludur'),
    FacilityId: Yup.string().max(255).required('Villa seçimi zorunludur'),
    name: Yup.string().max(255).required('İsim zorunludur'),
    surname: Yup.string().max(255).required('Soyisim zorunludur')
  });

  //const [openAlert, setOpenAlert] = useState(false);
  /*
    const handleAlertClose = () => {
      setOpenAlert(!openAlert);
      onCancel();
    };
    */

  const { mutate } = useAddReservation();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        let formData = new FormData();
        formData.append('CheckIn', values.CheckIn);
        formData.append('CheckOut', values.CheckOut);
        formData.append('FacilityId', values.FacilityId);
        formData.append('ReservationInfo.Name', values.name);
        formData.append('ReservationInfo.Surname', values.surname);
        formData.append('ReservationInfo.Owner', 'true');
        formData.append('ReservationInfo.PeopleType', '1');
        mutate(formData, {
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
            if (res.data.statusCode == 201) {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Rezervasyon başarıyla eklendi!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
            }
            setSubmitting(false);
            onCancel();
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  //@ts-ignore
  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{'Misafir Ekle'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="reservation-name"> Test</InputLabel>
                  <TextField
                    fullWidth
                    id="reservation-name"
                    placeholder="Test"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      İptal
                    </Button>
                    <Button type="submit" variant="contained">
                      {'Ekle'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
};

export default AddCustomerForm;
