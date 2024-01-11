import { Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, Stack, Typography, Divider, Chip } from '@mui/material';
import Moment from 'react-moment';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { CallCalling, Gps, Sms } from 'iconsax-react';
import { useNavigate, useParams } from 'react-router';
// project-imports
import MainCard from 'components/MainCard';
import useVillaSummary from 'hooks/villa/useVillaSummary';

const VillaSummary = () => {
  const params = useParams();

  const { data } = useVillaSummary(params.id as string);

  const villa = data?.data.data;

  //console.log(villa);

  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {villa && (
              <MainCard>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">
                      <Chip label="Aktif" size="small" color="success" />
                    </Stack>
                    <Stack spacing={2.5} alignItems="center">
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.name}</Typography>
                        <Typography color="secondary">{villa.attributes.region}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.room}</Typography>
                        <Typography color="secondary">Oda</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.bath}</Typography>
                        <Typography color="secondary">Banyo</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.person}</Typography>
                        <Typography color="secondary">Kişi</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                      <ListItem>
                        <ListItemIcon>
                          <Sms size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">Ahmet Çelik</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CallCalling size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">0532 000 00 00</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Gps size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">Fethiye</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </MainCard>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Villa Açıklaması">
              <Typography color="secondary">{villa?.attributes.descriptionShort}</Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Son 10 Rezervasyon">
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Check-In</TableCell>
                      <TableCell align="center">Check-Out</TableCell>
                      <TableCell align="right">Toplam Tutar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {villa &&
                      villa.attributes.reservations.data.map((row: any) => {
                        return (
                          <TableRow hover key={row.id} onClick={() => navigate('#')}>
                            <TableCell align="left">
                              <Moment format="DD/MM/YYYY">{row.attributes.checkIn}</Moment>
                            </TableCell>
                            <TableCell align="center">
                              <Moment format="DD/MM/YYYY">{row.attributes.checkOut}</Moment>
                            </TableCell>
                            <TableCell align="right">{row.attributes.total} TL</TableCell>
                          </TableRow>
                        );
                      })}
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

export default VillaSummary;
