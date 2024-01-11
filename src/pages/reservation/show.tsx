// project-imports
import MainCard from 'components/MainCard';

import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';

import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useReservationDetail from 'hooks/reservation/useReservationDetail';

const ReservationShow = () => {
  const params = useParams();

  const { data, isLoading } = useReservationDetail(params.id as string);

  return (
    <MainCard title="Rezervasyon Detayı" border={false}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MainCard title="Rezervasyon Bilgileri" cardHeaderStyle={{ background: 'rgb(206 217 255)' }}>
                <Typography color="secondary">
                  <b>Buraya bir buton eklenecek "Rezervasyon Faturası" url : "/reservation/invoice/2"</b>
                </Typography>
                <br />
                <br />
                <br />
                <Typography color="secondary">
                  <b>Name </b> : {data?.data.data.attributes.villa.data.attributes.name} <br />
                  <b>Bölge </b> : {data?.data.data.attributes.villa.data.attributes.region} <br />
                  <b>Kapasite </b> : {data?.data.data.attributes.villa.data.attributes.person} <br />
                  <b>Oda Sayısı </b> : {data?.data.data.attributes.villa.data.attributes.room} <br />
                  <b>Banyo Sayısı </b> : {data?.data.data.attributes.villa.data.attributes.bath}
                </Typography>

                <Typography color="secondary" mt={2}>
                  <b>Check In </b> : {data?.data.data.attributes.checkIn} <br />
                  <b>Check Out </b> : {data?.data.data.attributes.checkOut}
                </Typography>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Misafirler" content={false} cardHeaderStyle={{ background: 'rgb(206 217 255)' }}>
                <TableContainer>
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: 3 }}>Ad Soyad</TableCell>
                        <TableCell align="right">Tür</TableCell>
                        <TableCell align="right">Telefon</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && <CircularProgress />}
                      {data &&
                        data?.data.data.attributes.reservation_infos.data.map((row: any, key: any) => (
                          <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                            <TableCell sx={{ pl: 3 }} component="th" scope="row">
                              {row.attributes.name} {row.attributes.surname} {row.attributes.owner ? ' - (Rezervasyon Sahibi)' : ''}
                            </TableCell>
                            <TableCell align="right">{row.attributes.peopleType}</TableCell>
                            <TableCell align="right">{row.attributes.phone}</TableCell>
                            <TableCell align="right">{row.attributes.email}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Fiyat Detayları" content={false} cardHeaderStyle={{ background: 'rgb(206 217 255)' }}>
                <TableContainer>
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: 3 }}>Tarih</TableCell>
                        <TableCell align="right">Fiyat</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && <CircularProgress />}
                      {data &&
                        data?.data.data.attributes.reservation_items.data.map((row: any, key: any) => (
                          <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                            <TableCell sx={{ pl: 3 }} component="th" scope="row">
                              {row.attributes.name} {row.attributes.day}
                            </TableCell>
                            <TableCell align="right">{row.attributes.price} TL</TableCell>
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
    </MainCard>
  );
};

export default ReservationShow;
