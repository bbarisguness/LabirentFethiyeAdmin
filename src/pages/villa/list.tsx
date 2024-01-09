// material-ui
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
// third-party
import { useNavigate, useLocation } from 'react-router-dom';

import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/ReactTable';
import useVillas from 'hooks/villa/useVillas';

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

const VillaList = () => {
  //const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 0;

  const { data, isLoading, refetch } = useVillas({
    Page: currentPage,
    Size: RECORD_SIZE
  });

  const handlePageChange = (event: any, newPage: any) => {
    // update query parameters with new page number
    queryParams.set('page', newPage.toString());
    navigate({ search: queryParams.toString() });
    setTimeout(() => {
      refetch();
    }, 100);
  };

  //console.log(data?.data);

  return (
    <MainCard content={false} title="Villa Listesi" secondary={<CSVExport data={[]} headers={header} filename="basic-table-data.csv" />}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Villa Adı</TableCell>
              <TableCell align="right">Bölge</TableCell>
              <TableCell align="right">Oda Sayısı</TableCell>
              <TableCell align="right">Kişi Sayısı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <CircularProgress />}
            {data &&
              data?.data.data.map((row: any, key: any) => (
                <TableRow hover key={row.id} onClick={() => navigate('/villa/show/' + row.id + '/summary')}>
                  <TableCell sx={{ pl: 3 }} component="th" scope="row">
                    {row.attributes.name}
                  </TableCell>
                  <TableCell align="right">{row.attributes.region}</TableCell>
                  <TableCell align="right">{row.attributes.room}</TableCell>
                  <TableCell align="right">{row.attributes.person}</TableCell>
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
  );
};

export default VillaList;
