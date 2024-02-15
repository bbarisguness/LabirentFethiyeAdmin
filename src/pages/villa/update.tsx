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
import { v4 as uuid } from 'uuid';

import MainCard from 'components/MainCard';
import useCategory from 'hooks/category/useCategory';
import useDistance from 'hooks/distance/useDistance';
import useFeature from 'hooks/feature/useFeature';
import { useParams } from 'react-router';
import useVilla from 'hooks/villa/useVilla';
import useUpdateVilla from 'hooks/villa/useUpdateVilla';
import { ContentState, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import { useTheme } from '@mui/material/styles';
import { ThemeDirection, ThemeMode } from 'types/config';
import useConfig from 'hooks/useConfig';
import { useEffect, useState } from 'react';

const VillaUpdate = () => {
  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('İsim zorunludur'),
    room: Yup.number().moreThan(0, "Oda sayısı 0'dan büyük olmalıdır").required('Oda Sayısı zorunludur'),
    bath: Yup.number().moreThan(0, "Banyo sayısı 0'dan büyük olmalıdır").required('Banyo Sayısı zorunludur'),
    person: Yup.number().moreThan(0, "Kişi sayısı 0'dan büyük olmalıdır").required('Kişi Sayısı zorunludur'),
    region: Yup.string().max(255).required('Bölge zorunludur'),
    onlineReservation: Yup.boolean().required('Rezervasyon seçeneği zorunludur')
  });
  const params = useParams();
  //const [openAlert, setOpenAlert] = useState(false);
  /*
    const handleAlertClose = () => {
      setOpenAlert(!openAlert);
      onCancel();
    };
    */
  const theme = useTheme();
  const { themeDirection } = useConfig();

  const { data: categories } = useCategory();
  const { data: distances } = useDistance();
  const { data: features } = useFeature();
  const { data: villa, refetch } = useVilla(
    params.id as string,
    '/villas/' +
      params.id +
      '/?populate[distance_rulers][fields][0]=id&populate[distance_rulers][fields][1]=name&populate[features][fields][0]=id&populate[features][fields][1]=name&populate[categories][fields][0]=id&populate[categories][fields][1]=name'
  );

  const [editorState, setEditorState] = useState(() => {
    //@ts-ignore
    console.log()
    const initialContent = villa?.data.data.attributes.descriptionLong || "";
    return EditorState.createWithContent(ContentState.createFromText(initialContent));
  });
  const onContentChange = (editorState: EditorState) => {
    setEditorState(editorState);
    //@ts-ignore
    //console.log(stateToHTML(editorState.getCurrentContent()));
    setFieldValue('descriptionLong', stateToHTML(editorState.getCurrentContent()));
  };
  useEffect(() => {
    if(typeof villa?.data !== "undefined"){
        setEditorState(EditorState.createWithContent(ContentState.createFromText(villa?.data.data.attributes.descriptionLong)))

    }
  },[villa])
  //setEditorState(villa?.data.data.attributes.descriptionLong)

  const { mutate } = useUpdateVilla(params.id as string);
  const formik = useFormik({
    validationSchema: CustomerSchema,
    initialValues: getInitialValues(villa?.data.data),
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      try {
        var feids: any = [];
        var drids: any = [];
        var catids: any = [];
        values.distance_rulers.map((x: any) => {
          var a = distances?.data.data.find((dr: any) => dr.attributes.name === x);
          if (a) {
            drids.push(a.id);
          }
        });

        values.categories.map((x: any) => {
          var a = categories?.data.data.find((dr: any) => dr.attributes.name === x);
          if (a) {
            catids.push(a.id);
          }
        });

        values.features.map((x: any) => {
          var a = features?.data.data.find((dr: any) => dr.attributes.name === x);
          if (a) {
            feids.push(a.id);
          }
        });
        values.slug = uuid();
        values.features = feids;
        values.distance_rulers = drids;
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
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Villa başarıyla güncellendi!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              refetch();
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

  const { errors, touched, handleSubmit, getFieldProps, values, setFieldValue } = formik;

  return villa ? (
    <MainCard content={false} title={'Villa Güncelle'}>
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
                    //@ts-ignore
                    renderValue={(selected: any) =>
                      selected.map((x: any) => {
                        return x + ', ';
                      })
                    }
                  >
                    {categories &&
                      categories?.data.data.map(
                        (item: any) =>
                          //@ts-ignore
                          values.categories && (
                            <MenuItem key={item.id} value={item.attributes.name}>
                              <Checkbox
                                checked={
                                  //@ts-ignore
                                  values.categories.indexOf(item.attributes.name) > -1
                                }
                              />
                              <ListItemText primary={item.attributes.name} />
                            </MenuItem>
                          )
                      )}
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
              <Grid item xs={6}>
                <InputLabel id="villa-distance_rulers-label">Mesafeler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-distance_rulers-label"
                    id="villa-distance_rulers"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('distance_rulers')}
                    //@ts-ignore
                    renderValue={(selected: any) =>
                      selected.map((x:any) => {
                        return x + ', ';
                      })
                    }
                  >
                    {distances &&
                      distances?.data.data.map(
                        (item: any) =>
                          //@ts-ignore
                          values.distance_rulers && (
                            <MenuItem key={item.id} value={item.attributes.name}>
                              <Checkbox
                                checked={
                                  //@ts-ignore
                                  values.distance_rulers.indexOf(item.attributes.name) > -1
                                }
                              />
                              <ListItemText primary={item.attributes.name} />
                            </MenuItem>
                          )
                      )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="villa-features-label">Özellikler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-features-label"
                    id="villa-features"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('features')}
                    //@ts-ignore
                    renderValue={(selected: any) =>
                      selected.map((x:any) => {
                        return x + ', ';
                      })
                    }
                  >
                    {features &&
                      features?.data.data.map(
                        (item: any) =>
                          //@ts-ignore
                          values.features && (
                            <MenuItem key={item.id} value={item.attributes.name}>
                              <Checkbox
                                checked={
                                  //@ts-ignore
                                  values.features.indexOf(item.attributes.name) > -1
                                }
                              />
                              <ListItemText primary={item.attributes.name} />
                            </MenuItem>
                          )
                      )}
                  </Select>
                </FormControl>
              </Grid>
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
                    {'Güncelle'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </FormikProvider>
    </MainCard>
  ) : (
    <></>
  );
};
const getInitialValues = (villa: any) => {
  const newReservation = {
    slug: '',
    name: (villa?.attributes.name ?? '') as string,
    room: (villa?.attributes.room ?? '') as string,
    bath: (villa?.attributes.bath ?? '') as string,
    person: (villa?.attributes.person ?? '') as string,
    googleMap: (villa?.attributes.googleMap ?? '') as string,
    region: (villa?.attributes.region ?? '') as string,
    descriptionShort: (villa?.attributes.descriptionShort ?? '') as string,
    descriptionLong: (villa?.attributes.descriptionLong ?? '') as string,
    onlineReservation: (villa?.attributes.onlineReservation ?? false) as string,
    categories:
      villa?.attributes.categories.data.map((x: any) => {
        return x.attributes.name;
      }) ?? [],
    metaTitle: (villa?.attributes.metaTitle ?? '') as string,
    metaDescription: (villa?.attributes.metaDescription ?? '') as string,
    distance_rulers:
      villa?.attributes.distance_rulers.data.map((x: any) => {
        return x.attributes.name;
      }) ?? [],
    video: (villa?.attributes.video ?? '') as string,
    features:
      villa?.attributes.features.data.map((x: any) => {
        return x.attributes.name;
      }) ?? []
  };
  return newReservation;
};
export default VillaUpdate;
