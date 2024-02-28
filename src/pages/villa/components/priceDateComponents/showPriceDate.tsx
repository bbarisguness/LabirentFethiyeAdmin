import { Grid } from '@mui/material';

import MainCard from 'components/MainCard';
import {
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Box,
  Dialog
} from '@mui/material';

import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
import { CSVExport } from 'components/third-party/ReactTable';
//import useVillas from 'hooks/villa/useVillas';
import { useEffect, useState } from 'react';

import { PopupTransition } from 'components/@extended/Transitions';

import useVillaPrice from 'hooks/villa/useVillaPrice';
import AddPriceDateModal from './addPriceDate';
import moment from 'moment';
import DeletePriceDateModal from './deletePriceDate';

export const header: LabelKeyObject[] = [
  { label: 'Dessert (100g serving)', key: 'name' },
  { label: 'Calories (g)', key: 'calories' },
  { label: 'Fat (g)', key: 'fat' },
  { label: 'Carbs (g)', key: 'carbs' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' }
];

const RECORD_SIZE = 15;
const ShowPriceDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 0;

  const params = useParams();
  moment().locale('tr');

  const { data, isLoading, refetch } = useVillaPrice(params.id as string);

  //console.log(data);

  const handlePageChange = (event: any, newPage: any) => {
    // update query parameters with new page number
    queryParams.set('page', newPage.toString());
    navigate({ search: queryParams.toString() });
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const [priceDateId, setPriceDateId] = useState();
  const [add, setAdd] = useState<boolean>(false);
  const handleAdd = () => {
    setAdd(!add);
  };
  const [deletePriceDate, setDeletePriceDate] = useState<boolean>(false);
  const handleDeletePriceDate = () => {
    setDeletePriceDate(!deletePriceDate);
  };

  useEffect(() => {
    refetch();
  }, [add, deletePriceDate]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false} secondary={<CSVExport data={[]} headers={header} filename="basic-table-data.csv" />}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', margin: 2 }}>
                <Button variant="contained" onClick={handleAdd} size="medium">
                  Yeni Fiyat Ekle
                </Button>
              </Box>

              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">CheckIn</TableCell>
                      <TableCell align="left">CheckOut</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.map((row: any, key: any) => (
                        <TableRow sx={{ cursor: 'pointer' }} hover key={row.id}>
                          <TableCell align="left">{moment(row.attributes.checkIn).locale('tr').format('MMMM DD YYYY')}</TableCell>
                          <TableCell align="left">{moment(row.attributes.checkOut).locale('tr').format('MMMM DD YYYY')}</TableCell>
                          <TableCell align="left">{row.attributes.price} TL</TableCell>
                          <TableCell align="right">
                            <Button
                              color="error"
                              size="small"
                              onClick={() => {
                                handleDeletePriceDate();
                                setPriceDateId(row.id);
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
              {add && (
                <Dialog
                  maxWidth="sm"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleAdd}
                  open={add}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <AddPriceDateModal onCancel={handleAdd} />
                </Dialog>
              )}
              {deletePriceDate && (
                <Dialog
                  maxWidth="lg"
                  TransitionComponent={PopupTransition}
                  keepMounted
                  fullWidth
                  onClose={handleDeletePriceDate}
                  open={deletePriceDate}
                  sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DeletePriceDateModal onCancel={handleDeletePriceDate} PdId={priceDateId} />
                </Dialog>
              )}
              <Divider />
              {/* table data */}
              <TablePagination
                component="div"
                count={data?.data.meta.pagination.total}
                rowsPerPage={RECORD_SIZE}
                page={currentPage}
                onPageChange={handlePageChange}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShowPriceDate;
