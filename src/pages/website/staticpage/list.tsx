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
// project-imports
import MainCard from 'components/MainCard';
import useStaticPageList from 'hooks/website/useStaticPageList';

const RECORD_SIZE = 15;

const StaticPageList = () => {
  //const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 0;

  const { data, isLoading, refetch } = useStaticPageList({
    Page: currentPage,
    Size: RECORD_SIZE
  });

  console.log(data);

  const handlePageChange = (event: any, newPage: any) => {
    // update query parameters with new page number
    queryParams.set('page', newPage.toString());
    navigate({ search: queryParams.toString() });
    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <MainCard content={false} title="Static Sayfalar">
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Sayfa Adı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <CircularProgress />}
            {data &&
              data?.data.data.map((row: any, key: any) => (
                <TableRow hover key={row.id} onClick={() => navigate('/reservation/show/' + row.id)}>
                  <TableCell sx={{ pl: 3 }} component="th" scope="row">
                    {row.attributes.name}
                  </TableCell>
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

export default StaticPageList;
