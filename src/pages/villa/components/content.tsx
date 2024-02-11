import { FormControl, FormControlLabel, Grid, InputLabel, RadioGroup, Stack, TextField, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog } from '@mui/material';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
//import useVillas from 'hooks/villa/useVillas';
import useVillaContent from 'hooks/villa/useVillaContent';
import { useNavigate, useParams } from 'react-router';
import { PopupTransition } from 'components/@extended/Transitions';

import { useState } from 'react';
//import PriceTableCreate from 'pages/villa/components/priceTableAdd';
import DistanceRulerCreate from 'pages/villa/components/distanceRulerAdd';
import PriceTableCreate from 'pages/villa/components/priceTableAdd';
import FeatureCreate from './featureAdd';
import apiRequest from 'services/request';
import AnimateButton from 'components/@extended/AnimateButton';
import { Radio } from '@mui/material';

export const header: LabelKeyObject[] = [
  { label: 'Dessert (100g serving)', key: 'name' },
  { label: 'Calories (g)', key: 'calories' },
  { label: 'Fat (g)', key: 'fat' },
  { label: 'Carbs (g)', key: 'carbs' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' }
];

const VillaContent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useVillaContent(params.id as string);

  const [addDistanceRuler, setAddDistanceRuler] = useState<boolean>(false);
  const [updateDistanceRuler, setUpdateDistanceRuler] = useState<boolean>(false);
  const [deleteDistanceRuler, setDeleteDistanceRuler] = useState<boolean>(false);
  const [distanceRulerId, setDistanceRulerId] = useState(0);

  const [addPriceTable, setAddPriceTable] = useState<boolean>(false);
  const [updatePriceTable, setUpdatePriceTable] = useState<boolean>(false);
  const [deletePriceTable, setDeletePriceTable] = useState<boolean>(false);
  const [priceTableId, setPriceTableId] = useState(0);

  const [addFeature, setAddFeature] = useState<boolean>(false);

  const [formDistanceRulerName, setFormDistanceRulerName] = useState('');
  const [formDistanceRulerIcon, setFormDistanceRulerIcon] = useState('');
  const [formDistanceRulerValue, setFormDistanceRulerValue] = useState('');

  const [formPriceTableName, setFormPriceTableName] = useState('');
  const [formPriceTableIcon, setFormPriceTableIcon] = useState('');
  const [formPriceTablePrice, setFormPriceTablePrice] = useState('');
  const [formPriceTableDescription, setFormPriceTableDescription] = useState('');

  const handleAddDistanceRuler = () => {
    setAddDistanceRuler(!addDistanceRuler);
  };
  const handleUpdateDistanceRulerGet = (DistanceRulerId: any) => {
    if (DistanceRulerId > 0) {
      apiRequest('GET', `/distance-rulers/${DistanceRulerId}`).then((res) => {
        setFormDistanceRulerName(res.data.data.attributes.name);
        setFormDistanceRulerIcon(res.data.data.attributes.icon);
        setFormDistanceRulerValue(res.data.data.attributes.value);
        setUpdateDistanceRuler(!updateDistanceRuler);
        setDistanceRulerId(DistanceRulerId);
      });
    } else {
      setUpdateDistanceRuler(!updateDistanceRuler);
    }
    //alert('bu alan tekrar yapılacak!!');
  };
  const handleUpdateDistanceRulerSubmit = () => {
    const data = {
      data: {
        name: formDistanceRulerName,
        icon: formDistanceRulerIcon,
        value: formDistanceRulerValue
      }
    };
    apiRequest('PUT', `/distance-rulers/${distanceRulerId}`, data).then((res) => {
      navigate('/villa/show/' + params.id + '/summary');
    });
  };
  function handleDeleteDistanceRuler(DistanceRulerId: any) {
    setDistanceRulerId(DistanceRulerId);
    setDeleteDistanceRuler(!deleteDistanceRuler);
  }
  const handleDeleteDistanceRulerRequest = () => {
    apiRequest('DELETE', `/distance-rulers/${distanceRulerId}`).then((res) => {
      setDeleteDistanceRuler(!deleteDistanceRuler);
      navigate('/villa/show/' + params.id + '/summary');
      return;
    });
  };

  const handleAddPriceTable = () => {
    setAddPriceTable(!addPriceTable);
  };
  const handleUpdatePriceTableGet = (PriceTableId: any) => {
    if (PriceTableId > 0) {
      apiRequest('GET', `/price-tables/${PriceTableId}`).then((res) => {
        setFormPriceTableName(res.data.data.attributes.name);
        setFormPriceTableIcon(res.data.data.attributes.icon);
        setFormPriceTableDescription(res.data.data.attributes.description);
        setFormPriceTablePrice(res.data.data.attributes.price);
        setUpdatePriceTable(!updatePriceTable);
        setPriceTableId(PriceTableId);
      });
    } else {
      setUpdatePriceTable(!updatePriceTable);
    }
    //alert('bu alan tekrar yapılacak!!');
  };
  const handleUpdatePriceTableSubmit = () => {
    const data = {
      data: {
        name: formPriceTableName,
        icon: formPriceTableIcon,
        description: formPriceTableDescription,
        price: formPriceTablePrice
      }
    };
    apiRequest('PUT', `/price-tables/${priceTableId}`, data).then((res) => {
      navigate('/villa/show/' + params.id + '/summary');
    });
  };
  function handleDeletePriceTable(PriceTableId: any) {
    setPriceTableId(PriceTableId);
    setDeletePriceTable(!deletePriceTable);
  }
  const handleDeletePriceTableRequest = () => {
    apiRequest('DELETE', `/price-tables/${priceTableId}`).then((res) => {
      setDeletePriceTable(!deletePriceTable);
      navigate('/villa/show/' + params.id + '/summary');
      return;
    });
  };

  const handleAddFeature = () => {
    setAddFeature(!addFeature);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Genel İçerikler" cardHeaderStyle={{ background: 'rgb(206 217 255)' }}>
              <Typography color="secondary">
                <b>Bölge </b> : {data?.data.data.attributes.region} <br />
                <b>Kapasite </b> : {data?.data.data.attributes.person} <br />
                <b>Oda Sayısı </b> : {data?.data.data.attributes.room} <br />
                <b>Banyo Sayısı </b> : {data?.data.data.attributes.bath}
              </Typography>

              <Typography color="secondary" mt={2}>
                <b>Online Rezervasayon </b> : {data?.data.data.attributes.onlineReservation == 'true' ? 'Aktif' : 'Pasif'}
              </Typography>

              <Typography color="secondary" mt={2}>
                <b>Meta Title </b> : {data?.data.data.attributes.metaTitle} <br />
                <b>Meta Description </b> : {data?.data.data.attributes.metaDescription}
              </Typography>

              <Typography color="secondary" mt={2}>
                <b>Kısa Açıklama </b> : {data?.data.data.attributes.descriptionShort}
              </Typography>
              <Typography color="secondary" mt={2}>
                <b>Uzun Açıklama </b> : <div dangerouslySetInnerHTML={{ __html: data?.data.data.attributes.descriptionLong }} />
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard
              title="Mesafe Cetveli"
              content={false}
              cardHeaderStyle={{ background: 'rgb(206 217 255)' }}
              secondary={
                <>
                  <Button variant="contained" onClick={handleAddDistanceRuler} size="medium">
                    Mesafe Ekle
                  </Button>
                </>
              }
            >
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleAddDistanceRuler}
                open={addDistanceRuler}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <DistanceRulerCreate />
              </Dialog>
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleUpdateDistanceRulerGet}
                open={updateDistanceRuler}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={12}>
                    <MainCard title="Mesafe Düzenle">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name"> Başlık *</InputLabel>
                            <TextField
                              fullWidth
                              id="name"
                              name="name"
                              placeholder="Başlık Yazınız.."
                              value={formDistanceRulerName}
                              onChange={(e) => setFormDistanceRulerName(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="icon">Icon *</InputLabel>
                            <FormControl>
                              <RadioGroup row aria-label="icon" name="icon" id="icon">
                                <FormControlLabel
                                  value="shopping-cart"
                                  control={
                                    <Radio
                                      checked={formDistanceRulerIcon === 'shopping-cart' ? true : false}
                                      onChange={(e) => setFormDistanceRulerIcon('shopping-cart')}
                                    />
                                  }
                                  label="Market"
                                />
                                <FormControlLabel
                                  value="lamp"
                                  control={
                                    <Radio
                                      checked={formDistanceRulerIcon === 'lamp' ? true : false}
                                      onChange={(e) => setFormDistanceRulerIcon('lamp')}
                                    />
                                  }
                                  label="Restoran"
                                />
                                <FormControlLabel
                                  value="airplane"
                                  control={
                                    <Radio
                                      checked={formDistanceRulerIcon === 'airplane' ? true : false}
                                      onChange={(e) => setFormDistanceRulerIcon('airplane')}
                                    />
                                  }
                                  label="Havaalanı"
                                />
                                <FormControlLabel
                                  value="sun-fog"
                                  control={
                                    <Radio
                                      checked={formDistanceRulerIcon === 'sun-fog' ? true : false}
                                      onChange={(e) => setFormDistanceRulerIcon('sun-fog')}
                                    />
                                  }
                                  label="Deniz"
                                />
                                <FormControlLabel
                                  value="buildings-2"
                                  control={
                                    <Radio
                                      checked={formDistanceRulerIcon === 'buildings-2' ? true : false}
                                      onChange={(e) => setFormDistanceRulerIcon('buildings-2')}
                                    />
                                  }
                                  label="Merkez"
                                />
                                <FormControlLabel
                                  value="bus"
                                  control={
                                    <Radio
                                      checked={formDistanceRulerIcon === 'bus' ? true : false}
                                      onChange={(e) => setFormDistanceRulerIcon('bus')}
                                    />
                                  }
                                  label="Toplu Taşıma"
                                />
                              </RadioGroup>
                            </FormControl>
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
                              value={formDistanceRulerValue}
                              onChange={(e) => setFormDistanceRulerValue(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                              <Button variant="contained" type="button" onClick={handleUpdateDistanceRulerSubmit}>
                                ONAYLA
                              </Button>
                            </AnimateButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Dialog>
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                      <TableCell align="left">Value</TableCell>
                      {/* <TableCell align="right">Icon</TableCell> */}
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.distance_rulers.data?.map((row: any, key: any) => (
                        <TableRow hover key={row.id}>
                          <TableCell
                            sx={{ pl: 3, cursor: 'pointer' }}
                            component="th"
                            scope="row"
                            onClick={() => {
                              handleUpdateDistanceRulerGet(row.id);
                            }}
                          >
                            {row.attributes.name}
                          </TableCell>
                          <TableCell
                            sx={{ cursor: 'pointer' }}
                            align="left"
                            onClick={() => {
                              handleUpdateDistanceRulerGet(row.id);
                            }}
                          >
                            {row.attributes.value}
                          </TableCell>
                          {/* <TableCell align="right">{row.attributes.icon}</TableCell> */}
                          <TableCell align="right">
                            <Button
                              color="error"
                              size="small"
                              onClick={() => {
                                handleDeleteDistanceRuler(row.id);
                              }}
                            >
                              Sil
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleDeleteDistanceRuler}
                open={deleteDistanceRuler}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={12}>
                    <MainCard title="ÖNEMLİ SORU !!">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack spacing={1}>Mesafeyi Silmek İstediğinize Emin misiniz?</Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" justifyContent="flex-start">
                            <div style={{ marginRight: 5 }}>
                              <AnimateButton>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    setDeleteDistanceRuler(!deleteDistanceRuler);
                                  }}
                                >
                                  İPTAL
                                </Button>
                              </AnimateButton>
                            </div>
                            <div style={{ marginLeft: 5 }}>
                              <AnimateButton>
                                <Button color="primary" variant="contained" onClick={handleDeleteDistanceRulerRequest}>
                                  ONAYLA
                                </Button>
                              </AnimateButton>
                            </div>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Dialog>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard
              title="Fiyat Tablosu"
              content={false}
              cardHeaderStyle={{ background: 'rgb(206 217 255)' }}
              secondary={
                <>
                  <Button variant="contained" onClick={handleAddPriceTable} size="medium">
                    Fiyat Ekle
                  </Button>
                </>
              }
            >
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleAddPriceTable}
                open={addPriceTable}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <PriceTableCreate />
              </Dialog>
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleUpdatePriceTableGet}
                open={updatePriceTable}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={12}>
                    <MainCard title="Fiyat Düzenle">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name"> Başlık *</InputLabel>
                            <TextField
                              fullWidth
                              id="name"
                              name="name"
                              placeholder="Başlık Yazınız.."
                              value={formPriceTableName}
                              onChange={(e) => setFormPriceTableName(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="icon">Icon *</InputLabel>
                            <FormControl>
                              <RadioGroup row aria-label="icon" name="icon" id="icon">
                                <FormControlLabel
                                  value="cloud-drizzle"
                                  control={
                                    <Radio
                                      checked={formPriceTableIcon === 'cloud-drizzle' ? true : false}
                                      onChange={(e) => setFormPriceTableIcon('cloud-drizzle')}
                                    />
                                  }
                                  label="Yağmurlu"
                                />
                                <FormControlLabel
                                  value="cloud-notif"
                                  control={
                                    <Radio
                                      checked={formPriceTableIcon === 'cloud-notif' ? true : false}
                                      onChange={(e) => setFormPriceTableIcon('cloud-notif')}
                                    />
                                  }
                                  label="Parçalı Bulutlu"
                                />
                                <FormControlLabel
                                  value="sun"
                                  control={
                                    <Radio
                                      checked={formPriceTableIcon === 'sun' ? true : false}
                                      onChange={(e) => setFormPriceTableIcon('sun')}
                                    />
                                  }
                                  label="Güneşli"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="description">Açıklama *</InputLabel>
                            <TextField
                              fullWidth
                              id="description"
                              name="description"
                              placeholder="Değer Yazınız.."
                              value={formPriceTableDescription}
                              onChange={(e) => setFormPriceTableDescription(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="price"> Fiyat *</InputLabel>
                            <TextField
                              fullWidth
                              id="price"
                              name="price"
                              placeholder="Fiyat Yazınız.."
                              value={formPriceTablePrice}
                              onChange={(e) => setFormPriceTablePrice(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                              <Button variant="contained" type="button" onClick={handleUpdatePriceTableSubmit}>
                                ONAYLA
                              </Button>
                            </AnimateButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Dialog>
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Price</TableCell>
                      {/* <TableCell align="right">Icon</TableCell> */}
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.price_tables.data?.map((row: any, key: any) => (
                        <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                          <TableCell
                            sx={{ pl: 3, cursor: 'pointer' }}
                            component="th"
                            scope="row"
                            onClick={() => {
                              handleUpdatePriceTableGet(row.id);
                            }}
                          >
                            {row.attributes.name}
                          </TableCell>
                          <TableCell
                            sx={{ cursor: 'pointer' }}
                            align="right"
                            onClick={() => {
                              handleUpdatePriceTableGet(row.id);
                            }}
                          >
                            {row.attributes.description}
                          </TableCell>
                          <TableCell
                            sx={{ cursor: 'pointer' }}
                            align="right"
                            onClick={() => {
                              handleUpdatePriceTableGet(row.id);
                            }}
                          >
                            {row.attributes.price}
                          </TableCell>
                          {/* <TableCell align="right">{row.attributes.icon} </TableCell> */}
                          <TableCell align="right">
                            <Button
                              color="error"
                              size="small"
                              onClick={() => {
                                handleDeletePriceTable(row.id);
                              }}
                            >
                              Sil
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleDeletePriceTable}
                open={deletePriceTable}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={12}>
                    <MainCard title="ÖNEMLİ SORU !!">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack spacing={1}>Fiyatı Silmek İstediğinize Emin misiniz?</Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" justifyContent="flex-start">
                            <div style={{ marginRight: 5 }}>
                              <AnimateButton>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    setDeletePriceTable(!deletePriceTable);
                                  }}
                                >
                                  İPTAL
                                </Button>
                              </AnimateButton>
                            </div>
                            <div style={{ marginLeft: 5 }}>
                              <AnimateButton>
                                <Button color="primary" variant="contained" onClick={handleDeletePriceTableRequest}>
                                  ONAYLA
                                </Button>
                              </AnimateButton>
                            </div>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Dialog>
            </MainCard>
          </Grid>
          {/* <Grid item xs={12}>
            <MainCard title="Kategoriler" content={false} cardHeaderStyle={{ background: 'rgb(206 217 255)' }}>
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.categories.data?.map((row: any, key: any) => (
                        <TableRow hover key={row.id}>
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            {row.attributes.name}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid> */}
          <Grid item xs={12}>
            <MainCard
              title="Özellikler"
              content={false}
              cardHeaderStyle={{ background: 'rgb(206 217 255)' }}
              secondary={
                <>
                  <Button variant="contained" onClick={handleAddFeature} size="medium">
                    Özellik Ekle
                  </Button>
                </>
              }
            >
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleAddFeature}
                open={addFeature}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <FeatureCreate />
              </Dialog>
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                      {/* <TableCell align="right">Value</TableCell> */}
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.feature?.map((row: any, key: any) => (
                        <TableRow hover key={row.name} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            {row.name} {'['} {row.values.map((row1: any) => row1 + ', ')} {']'}
                          </TableCell>

                          <TableCell align="right">
                            <Button color="error" size="small">
                              Sil
                            </Button>
                          </TableCell>
                          {/* <TableCell align="right"> </TableCell> */}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VillaContent;
