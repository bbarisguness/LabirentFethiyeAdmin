import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText
} from '@mui/material';
//import { v4 as uuid } from 'uuid';
import { ContentState, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MainCard from 'components/MainCard';
import useCategory from 'hooks/category/useCategory';
//import useDistance from 'hooks/distance/useDistance';
import useCreateVilla from 'hooks/villa/useCreateVilla';
//import useFeature from 'hooks/feature/useFeature';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { ThemeDirection, ThemeMode } from 'types/config';
import useConfig from 'hooks/useConfig';
import { useState } from 'react';

const getInitialValues = () => {
  const newReservation = {
    slug: '',
    name: '',
    room: 0,
    bath: 0,
    person: 0,
    googleMap: '',
    region: '',
    descriptionShort: '',
    descriptionLong: '',
    onlineReservation: false,
    categories: [],
    metaTitle: '',
    metaDescription: '',
    video: ''
  };
  return newReservation;
};
const VillaCreate = () => {
  const theme = useTheme();
  const { themeDirection } = useConfig();

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('İsim zorunludur'),
    room: Yup.number().moreThan(0, "Oda sayısı 0'dan büyük olmalıdır").required('Oda Sayısı zorunludur'),
    bath: Yup.number().moreThan(0, "Banyo sayısı 0'dan büyük olmalıdır").required('Banyo Sayısı zorunludur'),
    person: Yup.number().moreThan(0, "Kişi sayısı 0'dan büyük olmalıdır").required('Kişi Sayısı zorunludur'),
    region: Yup.string().max(255).required('Bölge zorunludur'),
    onlineReservation: Yup.boolean().required('Rezervasyon seçeneği zorunludur')
  });
  const { mutate } = useCreateVilla();

  //const [openAlert, setOpenAlert] = useState(false);
  /*
    const handleAlertClose = () => {
      setOpenAlert(!openAlert);
      onCancel();
    };
    */

  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(() => {
    const initialContent="";
    return EditorState.createWithContent(ContentState.createFromText(initialContent));
  });
  const onContentChange = (editorState: EditorState) => {
    setEditorState(editorState);
    //@ts-ignore
    //console.log(stateToHTML(editorState.getCurrentContent()));
    setFieldValue('descriptionLong', stateToHTML(editorState.getCurrentContent()));
  };
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: CustomerSchema,
    //@ts-ignore
    onSubmit: (values, { setSubmitting }) => {
      try {
        //return false;
        // var feids: any = [];
        // var drids: any = [];
        var catids: any = [];
        // values.distance_rulers.map((x) => {
        //   var a = distances?.data.data.find((dr: any) => dr.attributes.name === x);
        //   if (a) {
        //     drids.push(a.id);
        //   }
        // });

        values.categories.map((x) => {
          var a = categories?.data.data.find((dr: any) => dr.attributes.name === x);
          if (a) {
            catids.push(a.id);
          }
        });

        // values.features.map((x) => {
        //   var a = features?.data.data.find((dr: any) => dr.attributes.name === x);
        //   if (a) {
        //     feids.push(a.id);
        //   }
        // });

        // values.features = feids;
        // values.distance_rulers = drids;

        //values.slug = uuid();
        values.slug = values.name
          .toString()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-');

        values.categories = catids;

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
              navigate('/villa/show/' + res.data.data.id + '/summary');
              setSubmitting(false);
            }
          }
        );
        /*    
                let formData = new FormData();
                formData.append("CheckIn",values.CheckIn);
                formData.append("CheckOut",values.CheckOut);
                formData.append("FacilityId",values.FacilityId);
                formData.append("ReservationInfo.Name",values.name);
                formData.append("ReservationInfo.Surname",values.surname);
                formData.append("ReservationInfo.Owner","true");
                formData.append("ReservationInfo.PeopleType","1");
                
            */
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { data: categories } = useCategory();
  //const { data: distances } = useDistance();
  //const { data: features } = useFeature();
  const { errors, touched, handleSubmit, getFieldProps, values, setFieldValue } = formik;
  return (
    <MainCard content={false} title="Villa Ekle">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputLabel htmlFor="villa-name">Villa İsmi</InputLabel>
                <TextField
                  fullWidth
                  id="villa-name"
                  placeholder="Villa İsmi"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel htmlFor="villa-person">Kişi Sayısı</InputLabel>
                <TextField
                  fullWidth
                  id="villa-person"
                  placeholder="Kişi Sayısı"
                  {...getFieldProps('person')}
                  error={Boolean(touched.person && errors.person)}
                  helperText={touched.person && errors.person}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel htmlFor="villa-room">Oda Sayısı</InputLabel>
                <TextField
                  fullWidth
                  id="villa-room"
                  placeholder="Oda Sayısı"
                  {...getFieldProps('room')}
                  error={Boolean(touched.room && errors.room)}
                  helperText={touched.room && errors.room}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel htmlFor="villa-bath">Banyo Sayısı</InputLabel>
                <TextField
                  fullWidth
                  id="villa-bath"
                  placeholder="Banyo Sayısı"
                  {...getFieldProps('bath')}
                  error={Boolean(touched.bath && errors.bath)}
                  helperText={touched.bath && errors.bath}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="villa-region">Bölge</InputLabel>
                <TextField
                  fullWidth
                  id="villa-region"
                  placeholder="Bölge"
                  {...getFieldProps('region')}
                  error={Boolean(touched.region && errors.region)}
                  helperText={touched.region && errors.region}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="villa-categories-label">Kategoriler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-categories-label"
                    id="villa-categories"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('categories')}
                    renderValue={(selected: any) => selected.join(', ')}
                  >
                    {categories &&
                      categories?.data.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.attributes.name}>
                          <Checkbox
                            checked={
                              //@ts-ignore
                              values.categories.indexOf(item?.attributes.name) > -1
                            }
                          />
                          <ListItemText primary={item.attributes.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="villa-descriptionShort">Kısa Açıklama</InputLabel>
                <TextField
                  fullWidth
                  id="villa-descriptionShort"
                  multiline
                  rows={5}
                  placeholder="Kısa Açıklama"
                  {...getFieldProps('descriptionShort')}
                  error={Boolean(touched.descriptionShort && errors.descriptionShort)}
                  helperText={touched.descriptionShort && errors.descriptionShort}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <InputLabel htmlFor="villa-descriptionLong">Uzun Açıklama</InputLabel>
                <TextField
                  fullWidth
                  id="villa-descriptionLong"
                  multiline
                  rows={5}
                  placeholder="Uzun Açıklama"
                  {...getFieldProps('descriptionLong')}
                  error={Boolean(touched.descriptionLong && errors.descriptionLong)}
                  helperText={touched.descriptionLong && errors.descriptionLong}
                />
              </Grid> */}
              <Grid
                item
                xs={12}
                sx={{
                  '& .rdw-editor-wrapper': {
                    bgcolor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    borderRadius: '4px',
                    overflow: 'visible',
                    '& .rdw-editor-main': {
                      px: 2,
                      py: 0.5,
                      border: 'none'
                    },
                    '& .rdw-editor-toolbar': {
                      pt: 1.25,
                      border: 'none',
                      borderBottom: '1px solid',
                      borderColor: theme.palette.divider,
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                      '& .rdw-option-wrapper': {
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                        borderColor: theme.palette.divider
                      },
                      '& .rdw-dropdown-wrapper': {
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                        borderColor: theme.palette.divider,
                        '& .rdw-dropdown-selectedtext': {
                          color: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : 'secondary.darker'
                        },
                        '& .rdw-dropdownoption-default': {
                          color: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : 'secondary.darker'
                        },
                        '& .rdw-dropdown-carettoopen': {
                          position: themeDirection === ThemeDirection.RTL ? 'initial' : 'absolute'
                        }
                      },
                      '& .rdw-emoji-modal': {
                        left: { xs: -140, sm: -195, md: 5 }
                      },
                      '& .rdw-embedded-modal': {
                        left: { xs: -100, sm: -165, md: 5 }
                      },
                      '& .rdw-link-modal': {
                        left: { xs: 0, sm: -100, md: 5 }
                      },
                      '& .rdw-image-modal': {
                        left: { xs: -190, sm: 30, md: 5 },
                        top: '15px'
                      },
                      '& .rdw-colorpicker-modal': {
                        left: { xs: -150, sm: 5 }
                      }
                    },
                    ...(theme.direction === ThemeDirection.RTL && {
                      '.rdw-dropdown-carettoopen': {
                        position: 'absolute !important',
                        right: '10%',
                        left: 'inherit'
                      },
                      '.rdw-dropdown-carettoclose': {
                        right: '10%',
                        left: 'inherit'
                      }
                    })
                  }
                }}
              >
                <Editor editorStyle={{ height: '400px' }} editorState={editorState} onEditorStateChange={onContentChange} />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="villa-metaTitle">Meta Başlık</InputLabel>
                <TextField
                  fullWidth
                  id="villa-metaTitle"
                  placeholder="Meta Başlık"
                  {...getFieldProps('metaTitle')}
                  error={Boolean(touched.metaTitle && errors.metaTitle)}
                  helperText={touched.metaTitle && errors.metaTitle}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="villa-metaDescription">Meta Açıklama</InputLabel>
                <TextField
                  fullWidth
                  id="villa-metaDescription"
                  placeholder="Meta Açıklama"
                  {...getFieldProps('metaDescription')}
                  error={Boolean(touched.metaDescription && errors.metaDescription)}
                  helperText={touched.metaDescription && errors.metaDescription}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <InputLabel id="villa-distance_rulers-label">Mesafeler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-distance_rulers-label"
                    id="villa-distance_rulers"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('distance_rulers')}
                    renderValue={(selected: any) => selected.join(', ')}
                  >
                    {distances &&
                      distances?.data.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.attributes.name}>
                          <Checkbox
                            checked={
                              //@ts-ignore
                              values.distance_rulers.indexOf(item?.attributes.name) > -1
                            }
                          />
                          <ListItemText primary={item.attributes.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid> */}
              {/* <Grid item xs={6}>
                <InputLabel id="villa-features-label">Özellikler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-features-label"
                    id="villa-features"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('features')}
                    renderValue={(selected: any) => selected.join(', ')}
                  >
                    {features &&
                      features?.data.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.attributes.name}>
                          <Checkbox
                            checked={
                              //@ts-ignore
                              values.features.indexOf(item?.attributes.name) > -1
                            }
                          />
                          <ListItemText primary={item.attributes.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={6}>
                <InputLabel htmlFor="villa-video">Video</InputLabel>
                <TextField
                  fullWidth
                  id="villa-video"
                  placeholder="Video"
                  {...getFieldProps('video')}
                  error={Boolean(touched.video && errors.video)}
                  helperText={touched.video && errors.video}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="villa-googleMap">Google Map</InputLabel>
                <TextField
                  fullWidth
                  id="villa-googleMap"
                  placeholder="Google Map"
                  {...getFieldProps('googleMap')}
                  error={Boolean(touched.googleMap && errors.googleMap)}
                  helperText={touched.googleMap && errors.googleMap}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={() => null}>
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
      </FormikProvider>
    </MainCard>
  );
};

export default VillaCreate;
