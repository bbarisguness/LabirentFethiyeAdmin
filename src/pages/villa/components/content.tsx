import { Grid, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog } from '@mui/material';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
//import useVillas from 'hooks/villa/useVillas';
import useVillaContent from 'hooks/villa/useVillaContent';
import { useParams } from 'react-router';
import { PopupTransition } from 'components/@extended/Transitions';

import { useState } from 'react';
//import PriceTableCreate from 'pages/villa/components/priceTableAdd';
import DistanceRulerCreate from 'pages/villa/components/distanceRulerAdd';
import FeatureCreate from './featureAdd';

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

  const { data, isLoading } = useVillaContent(params.id as string);

  //console.log(data?.data.data);
  const [addDistanceRuler, setAddDistanceRuler] = useState<boolean>(false);
  const [addPriceTable, setAddPriceTable] = useState<boolean>(false);
  const [addFeature, setAddFeature] = useState<boolean>(false);

  const handleAddDistanceRuler = () => {
    setAddDistanceRuler(!addDistanceRuler);
  };

  const handleAddPriceTable = () => {
    setAddPriceTable(!addPriceTable);
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
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Icon</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.distance_rulers.data?.map((row: any, key: any) => (
                        <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            {row.attributes.name}
                          </TableCell>
                          <TableCell align="right">{row.attributes.value}</TableCell>
                          <TableCell align="right">{row.attributes.icon}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                {/* <PriceTableCreate /> */}
              </Dialog>
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Icon</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.price_tables.data?.map((row: any, key: any) => (
                        <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            {row.attributes.name}
                          </TableCell>
                          <TableCell align="right">{row.attributes.description}</TableCell>
                          <TableCell align="right">{row.attributes.price}</TableCell>
                          <TableCell align="right">{row.attributes.icon} </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
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
                        <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            {row.attributes.name}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
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
