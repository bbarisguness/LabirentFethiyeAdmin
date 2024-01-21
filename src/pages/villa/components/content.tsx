import { Grid, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
//import useVillas from 'hooks/villa/useVillas';
import useVillaContent from 'hooks/villa/useVillaContent';
import { useParams } from 'react-router';
import * as React from 'react';
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

  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography variant="h6">Genel İçerikler</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography variant="h6">Mesafe Cetveli</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography variant="h6">Fiyat Tablosu</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                <Typography variant="h6">Kategoriler</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                <Typography variant="h6">Özellikler</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MainCard title="Özellikler" content={false} cardHeaderStyle={{ background: 'rgb(206 217 255)' }}>
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
              </AccordionDetails>
            </Accordion>
          </Grid>
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
                  <Button variant="contained" onClick={() => alert('modal')} size="medium">
                    Mesafe Ekle
                  </Button>
                </>
              }
            >
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
                  <Button variant="contained" onClick={() => alert('modal')} size="medium">
                    Fiyat Ekle
                  </Button>
                </>
              }
            >
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
                  <Button variant="contained" onClick={() => alert('modal')} size="medium">
                    Özellik Ekle
                  </Button>
                </>
              }
            >
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
