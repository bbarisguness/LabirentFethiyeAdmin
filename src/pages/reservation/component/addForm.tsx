import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import {DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    OutlinedInput,
    Typography,
    MenuItem,
    FormHelperText,
    ListItemText,
    List,
    ListItem,
    ListItemButton
  } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useVillas from 'hooks/villa/useVillas';
import moment from 'moment';
import useAddReservation from 'hooks/villa/useAddReservation';
import useGetReservationPrices from 'hooks/reservation/useGetReservationPrices';


export interface Props {
    onCancel: () => void;
    resFetch: () => void;
}
const getInitialValues = () => {
    const newReservation = {
        "CheckIn":"",
        "CheckOut":"",
        "FacilityId":"",
        "name":"",
        "surname":"",
        "ReservationInfo.Owner":true,
        "ReservationInfo.PeopleType":1
    };
    return newReservation;
  };
const AddReservationForm = ({ onCancel,resFetch }: Props) => {
    const CustomerSchema = Yup.object().shape({
        CheckIn: Yup.string().max(255).required('Başlangıç tarihi zorunludur'),
        CheckOut: Yup.string().max(255).required('Bitiş tarihi zorunludur'),
        FacilityId: Yup.string().max(255).required('Villa seçimi zorunludur'),
        name:Yup.string().max(255).required('İsim zorunludur'),
        surname:Yup.string().max(255).required('Soyisim zorunludur'),
    });
  
    //const [openAlert, setOpenAlert] = useState(false);
    /*
    const handleAlertClose = () => {
      setOpenAlert(!openAlert);
      onCancel();
    };
    */
    const {data:villas}= useVillas({
        Page:0,
        Size:10000
    });
    const {mutate} = useAddReservation();

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: CustomerSchema,
        onSubmit: (values, { setSubmitting }) => {
            try {
                
                let formData = new FormData();
                formData.append("CheckIn",values.CheckIn);
                formData.append("CheckOut",values.CheckOut);
                formData.append("FacilityId",values.FacilityId);
                formData.append("ReservationInfo.Name",values.name);
                formData.append("ReservationInfo.Surname",values.surname);
                formData.append("ReservationInfo.Owner","true");
                formData.append("ReservationInfo.PeopleType","1");
                mutate(formData,{
                    onError:(error:any) => {
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
                    onSuccess:(res) => {
                        if(res.data.statusCode == 201){
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: "Rezervasyon başarıyla eklendi!",
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
                        resFetch();
                    }
                })
                
            } catch (error) {
                console.error(error);
            }
        }
    });
  
    const { errors, touched, handleSubmit, getFieldProps,setFieldValue,values } = formik;
    //@ts-ignore
    const { data:prices,refetch } = useGetReservationPrices(values.FacilityId,values.CheckIn,values.CheckOut);
    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{"Yeni Rezervasyon"}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="reservation-name"> Rezevasyon Sahibi İsmi</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="reservation-name"
                                        placeholder="Rezervasyon Sahibi İsmi"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="reservation-surname"> Rezevasyon Sahibi Soyismi</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="reservation-surname"
                                        placeholder="Rezervasyon Sahibi Soyismi"
                                        {...getFieldProps('surname')}
                                        error={Boolean(touched.surname && errors.surname)}
                                        helperText={touched.surname && errors.surname}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="reservation-FacilityId">Villa</InputLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                id="column-hiding"
                                                displayEmpty
                                                {...getFieldProps('FacilityId')}
                                                onChange={(event: SelectChangeEvent<string>) => setFieldValue('FacilityId', event.target.value as string)}
                                                input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                    return <Typography variant="subtitle1">Villa seçiniz</Typography>;
                                                    }

                                                    return <Typography variant="subtitle2">{selected}</Typography>;
                                                }}
                                            >
                                                {
                                                    villas &&
                                                    villas?.data.data.map((column: any) => (
                                                        <MenuItem key={column.id} value={column.id}>
                                                            <ListItemText primary={column.id} />
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        {touched.FacilityId && errors.FacilityId && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                                                {errors.FacilityId}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="reservation-surname">Başlangıç Tarihi</InputLabel>
                                    <FormControl fullWidth>
                                    <DatePicker
                                        onChange={(value:any) => {
                                            setFieldValue("CheckIn",moment(value).format("YYYY-MM-DD"));
                                            
                                        }}
                                        //@ts-ignore
                                        renderInput={(params:any) => <TextField {...params} />}
                                    />
                                    </FormControl>
                                    {touched.CheckIn && errors.CheckIn && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                                            {errors.CheckIn}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="reservation-surname">Bitiş Tarihi</InputLabel>
                                    <FormControl fullWidth>
                                    <DatePicker
                                        onChange={(value:any) => {
                                            setFieldValue("CheckOut",moment(value).format("YYYY-MM-DD"));
                                        }}
                                        //@ts-ignore
                                        renderInput={(params:any) => <TextField {...params} />}
                                    />
                                    </FormControl>
                                    {touched.CheckOut && errors.CheckOut && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                                            {errors.CheckOut}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={() => refetch()}>
                                        {'Fiyat Hesapla'}
                                    </Button>
                                    {prices && 
                                        <List sx={{ p: 0 }}>
                                            <ListItem disablePadding divider>
                                                <ListItemButton>
                                                    <ListItemText primary={"Tutar:" + prices.data.data.amount + " TL"} />
                                                </ListItemButton>
                                                
                                            </ListItem>
                                            <ListItem disablePadding divider>
                                                <ListItemButton>
                                                    <ListItemText primary={"Ekstra:" + prices.data.data.extraPrice + " TL"} />
                                                </ListItemButton>  
                                            </ListItem>
                                            <ListItem disablePadding divider>
                                                <ListItemButton>
                                                    <ListItemText primary={"Toplam:" + prices.data.data.total + " TL"} />
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    }
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
                                        <Button type="submit" variant="contained" >
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
    )
}

export default AddReservationForm;
