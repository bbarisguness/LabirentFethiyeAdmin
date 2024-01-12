import { Grid,Typography } from '@mui/material';

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
  TablePagination
} from '@mui/material';

import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
import { CSVExport } from 'components/third-party/ReactTable';
//import useVillas from 'hooks/villa/useVillas';
import useVillaAvailableDate from 'hooks/villa/useVillaAvailableDate';

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
const VillaAvailableDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 0;

  const params = useParams();

  const { data, isLoading, refetch } = useVillaAvailableDate(params.id as string);

  // Burada müsait tarihler listesi oluşturulacak

  //let length = data?.data.data.length;
  //console.log(length);

  // let dates;

  // data?.data.data.map(
  //   (row: any, index: any) =>
  //     (dates[index] = {
  //       checkIn: row.checkIn
  //     })
  // );

  // console.log('sonuç : ' + dates);

  const handlePageChange = (event: any, newPage: any) => {
    // update query parameters with new page number
    queryParams.set('page', newPage.toString());
    navigate({ search: queryParams.toString() });
    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false} secondary={<CSVExport data={[]} headers={header} filename="basic-table-data.csv" />}>
              <Typography color="secondary" m={5}>
                <b>* Burada sadece müsait tarihler listelenecek. Şuanda Liste yanlış. Düzenleme yapılacak. </b>
              </Typography>

              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">CheckIn</TableCell>
                      <TableCell align="left">CheckOut</TableCell>
                      <TableCell align="left">Days</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading && <CircularProgress />}
                    {data &&
                      data?.data.data.map((row: any, key: any) => (
                        <TableRow hover key={row.id} /*onClick={() => navigate('/villa/show/' + row.id + '/summary')}*/>
                          <TableCell align="left">{row.attributes.checkIn}</TableCell>
                          <TableCell align="left">{row.attributes.checkOut}</TableCell>
                          <TableCell align="left">{row.attributes.total} TL</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default VillaAvailableDate;
