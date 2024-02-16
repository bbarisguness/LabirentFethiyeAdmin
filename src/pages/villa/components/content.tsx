import { Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, Grid } from '@mui/material';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
//import useVillas from 'hooks/villa/useVillas';
import useVillaContent from 'hooks/villa/useVillaContent';
import { useParams } from 'react-router';
import { PopupTransition } from 'components/@extended/Transitions';
import { useState, useEffect } from 'react';
import DeleteDistanceRulerModal from './distanceRulerComponents/deleteDistanceRuler';
import AddDistanceRulerModal from './distanceRulerComponents/addDistanceRuler';
import UpdateDistanceRulerModal from './distanceRulerComponents/updateDistanceRuler';
import AddPriceTableModal from './priceTableComponents/addPriceTable';
import DeletePriceTableModal from './priceTableComponents/deletePriceTable';
import UpdatePriceTableModal from './priceTableComponents/updatePriceTable';

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

  const { data, isLoading, refetch } = useVillaContent(params.id as string);

  const [distanceRulerId, setDistanceRulerId] = useState();
  const [addDistanceRuler, setAddDistanceRuler] = useState<boolean>(false);
  const handleAddDistanceRuler = () => {
    setAddDistanceRuler(!addDistanceRuler);
  };

  const [updateDistanceRuler, setUpdateDistanceRuler] = useState<boolean>(false);
  const handleUpdateDistanceRuler = () => {
    setUpdateDistanceRuler(!updateDistanceRuler);
  };

  const [deleteDistanceRuler, setDeleteDistanceRuler] = useState<boolean>(false);
  const handleDeleteDistanceRuler = () => {
    setDeleteDistanceRuler(!deleteDistanceRuler);
  };

  const [priceTableId, setPriceTableId] = useState();
  const [addPriceTable, setAddPriceTable] = useState<boolean>(false);
  const handleAddPriceTable = () => {
    setAddPriceTable(!addPriceTable);
  };

  const [updatePriceTable, setUpdatePriceTable] = useState<boolean>(false);
  const handleUpdatePriceTable = () => {
    setUpdatePriceTable(!updatePriceTable);
  };

  const [deletePriceTable, setDeletePriceTable] = useState<boolean>(false);
  const handleDeletePriceTable = () => {
    setDeletePriceTable(!deletePriceTable);
  };

  useEffect(() => {
    refetch();
  }, [addDistanceRuler, deleteDistanceRuler, updateDistanceRuler, addPriceTable, updatePriceTable, deletePriceTable]);

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
                              handleUpdateDistanceRuler();
                              setDistanceRulerId(row.id);
                            }}
                          >
                            {row.attributes.name}
                          </TableCell>
                          <TableCell
                            sx={{ cursor: 'pointer' }}
                            align="left"
                            onClick={() => {
                              handleUpdateDistanceRuler();
                              setDistanceRulerId(row.id);
                            }}
                          >
                            {row.attributes.value}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              color="error"
                              size="small"
                              onClick={() => {
                                handleDeleteDistanceRuler();
                                setDistanceRulerId(row.id);
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
              {addDistanceRuler && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleAddDistanceRuler}
                  open={addDistanceRuler}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <AddDistanceRulerModal onCancel={handleAddDistanceRuler} />
                </Dialog>
              )}
              {updateDistanceRuler && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleUpdateDistanceRuler}
                  open={updateDistanceRuler}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <UpdateDistanceRulerModal onCancel={handleUpdateDistanceRuler} DrId={distanceRulerId} />
                </Dialog>
              )}
              {deleteDistanceRuler && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleDeleteDistanceRuler}
                  open={deleteDistanceRuler}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DeleteDistanceRulerModal onCancel={handleDeleteDistanceRuler} DrId={distanceRulerId} />
                </Dialog>
              )}
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
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.attributes.price_tables.data?.map((row: any, key: any) => (
                        <TableRow hover key={row.id}>
                          <TableCell
                            sx={{ pl: 3, cursor: 'pointer' }}
                            component="th"
                            scope="row"
                            onClick={() => {
                              handleUpdatePriceTable();
                              setPriceTableId(row.id);
                            }}
                          >
                            {row.attributes.name}
                          </TableCell>
                          <TableCell
                            sx={{ pl: 3, cursor: 'pointer' }}
                            component="th"
                            scope="row"
                            onClick={() => {
                              handleUpdatePriceTable();
                              setPriceTableId(row.id);
                            }}
                          >
                            {row.attributes.description}
                          </TableCell>
                          <TableCell
                            sx={{ cursor: 'pointer' }}
                            align="left"
                            onClick={() => {
                              handleUpdatePriceTable();
                              setPriceTableId(row.id);
                            }}
                          >
                            {row.attributes.price}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              color="error"
                              size="small"
                              onClick={() => {
                                handleDeletePriceTable();
                                setPriceTableId(row.id);
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
              {addPriceTable && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleAddPriceTable}
                  open={addPriceTable}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <AddPriceTableModal onCancel={handleAddPriceTable} />
                </Dialog>
              )}
              {updatePriceTable && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleUpdatePriceTable}
                  open={updatePriceTable}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <UpdatePriceTableModal onCancel={handleUpdatePriceTable} PtId={priceTableId} /> 
                </Dialog>
              )}
              {deletePriceTable && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleDeletePriceTable}
                  open={deletePriceTable}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DeletePriceTableModal onCancel={handleDeletePriceTable} PtId={priceTableId} />
                </Dialog>
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VillaContent;
