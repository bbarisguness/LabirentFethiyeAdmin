// project-imports
import MainCard from 'components/MainCard';

import { useNavigate, useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';

import { Dialog, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useReservationDetail from 'hooks/reservation/useReservationDetail';
import { Add, Document, Edit, Scanner } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';
import AddCustomerForm from './component/addCustomer';
import DeleteReservationModal from './component/deleteReservation';
import UpdateCustomerFormModal from './component/updateCustomer';
import DeleteReservationInfoModal from './component/deleteReservationInfo';

function PeopleTypeReturn(peopleType: string) {
  if (peopleType === 'Adult') peopleType = 'Yetişkin';
  else if (peopleType === 'Child') peopleType = 'Çocuk';
  else if (peopleType === 'Baby') peopleType = 'Bebek';
  else peopleType = '-';
  return peopleType;
}

const ReservationShow = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useReservationDetail(params.id as string);
  //console.log(data);

  const [deleteReservation, setDeleteReservation] = useState<boolean>(false);
  const handleDeleteReservation = () => {
    setDeleteReservation(!deleteReservation);
  };

  const [reservationInfoId, setReservationInfoId] = useState();
  const [addReservationInfo, setAddReservationInfo] = useState<boolean>(false);
  const handleAddReservationInfo = () => {
    setAddReservationInfo(!addReservationInfo);
  };
  const [updateReservationInfo, setUpdateReservationInfo] = useState<boolean>(false);
  const handleUpdateReservationInfo = () => {
    setUpdateReservationInfo(!updateReservationInfo);
  };

  const [deleteReservationInfo, setDeleteReservationInfo] = useState<boolean>(false);
  const handleDeleteReservationInfo = () => {
    setDeleteReservationInfo(!deleteReservationInfo);
  };

  useEffect(() => {
    refetch();
  }, [addReservationInfo, updateReservationInfo, deleteReservationInfo]);

  return (
    <MainCard title="Rezervasyon Detayı" border={false}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Dialog
                maxWidth="lg"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleDeleteReservation}
                open={deleteReservation}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                <DeleteReservationModal onCancel={handleDeleteReservation} RId={params.id} />
              </Dialog>
              <MainCard
                title="Rezervasyon Bilgileri"
                cardHeaderStyle={{ background: 'rgb(206 217 255)' }}
                secondary={
                  <>
                    <Button
                      variant="contained"
                      startIcon={<Document />}
                      onClick={() => {
                        navigate('/reservation/invoice/' + params.id);
                      }}
                      size="medium"
                    >
                      Fatura
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => {
                        navigate('/reservation/update/' + params.id);
                      }}
                      size="medium"
                      sx={{ 'margin-left': '5px' }}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Scanner />}
                      onClick={handleDeleteReservation}
                      size="medium"
                      sx={{ 'margin-left': '5px' }}
                    >
                      Sil
                    </Button>
                  </>
                }
              >
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
                  <b>Check Out </b> : {data?.data.data.attributes.checkOut} <br />
                </Typography>
                <Typography color="secondary" mt={2}>
                  <b>Gece </b> : {data?.data.data.attributes.reservation_items.data.length} <br />
                  <b>Toplam Tutar </b> : {data?.data.data.attributes.total} TL
                </Typography>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard
                title="Misafirler"
                content={false}
                cardHeaderStyle={{ background: 'rgb(206 217 255)' }}
                secondary={
                  <>
                    <Button variant="contained" startIcon={<Add />} onClick={handleAddReservationInfo} size="medium">
                      Misafir Ekle
                    </Button>
                  </>
                }
              >
                {addReservationInfo && (
                  <Dialog
                    maxWidth="sm"
                    TransitionComponent={PopupTransition}
                    keepMounted
                    fullWidth
                    onClose={handleAddReservationInfo}
                    open={addReservationInfo}
                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <AddCustomerForm onCancel={handleAddReservationInfo} />
                  </Dialog>
                )}
                {updateReservationInfo && (
                  <Dialog
                    maxWidth="lg"
                    TransitionComponent={PopupTransition}
                    keepMounted
                    fullWidth
                    onClose={handleUpdateReservationInfo}
                    open={updateReservationInfo}
                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <UpdateCustomerFormModal onCancel={handleUpdateReservationInfo} RiId={reservationInfoId} />
                  </Dialog>
                )}
                {deleteReservationInfo && (
                  <Dialog
                    maxWidth="lg"
                    TransitionComponent={PopupTransition}
                    keepMounted
                    fullWidth
                    onClose={handleDeleteReservationInfo}
                    open={deleteReservationInfo}
                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DeleteReservationInfoModal onCancel={handleDeleteReservationInfo} RiId={reservationInfoId} />
                  </Dialog>
                )}
                <TableContainer>
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: 3 }}>Ad Soyad</TableCell>
                        <TableCell align="right">Yaş Grubu</TableCell>
                        <TableCell align="right">Telefon</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && <CircularProgress />}
                      {data &&
                        data?.data.data.attributes.reservation_infos.data.map((row: any, key: any) => (
                          <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                            <TableCell
                              sx={{ pl: 3, cursor: 'pointer' }}
                              component="th"
                              scope="row"
                              onClick={() => {
                                handleUpdateReservationInfo();
                                setReservationInfoId(row.id);
                              }}
                            >
                              {row.attributes.name} {row.attributes.surname} {row.attributes.owner ? ' - (Rezervasyon Sahibi)' : ''}
                            </TableCell>
                            <TableCell
                              sx={{ cursor: 'pointer' }}
                              align="right"
                              onClick={() => {
                                handleUpdateReservationInfo();
                                setReservationInfoId(row.id);
                              }}
                            >
                              {PeopleTypeReturn(row.attributes.peopleType)}
                            </TableCell>
                            <TableCell
                              sx={{ cursor: 'pointer' }}
                              align="right"
                              onClick={() => {
                                handleUpdateReservationInfo();
                                setReservationInfoId(row.id);
                              }}
                            >
                              {row.attributes.phone}
                            </TableCell>
                            <TableCell
                              align="right"
                              onClick={() => {
                                handleUpdateReservationInfo();
                                setReservationInfoId(row.id);
                              }}
                            >
                              {row.attributes.email}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                color="error"
                                size="small"
                                onClick={() => {
                                  handleDeleteReservationInfo();
                                  setReservationInfoId(row.id);
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
