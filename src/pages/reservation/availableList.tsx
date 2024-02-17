// material-ui
import {
  Dialog,
  Button,
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
import { PopupTransition } from 'components/@extended/Transitions';

// third-party
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
// project-imports
import MainCard from 'components/MainCard';
import useReservations from 'hooks/reservation/useReservations';
import { Add } from 'iconsax-react';
//import AddReservationForm from './component/addForm';
import { Typography } from '@mui/material';
import ReservationCreate from './add';

const RECORD_SIZE = 15;

const ReservationAvailableList = () => {
  //const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 0;

  const { data, isLoading, refetch } = useReservations({
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

  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
  };
  return (
    <MainCard
      content={false}
      title="Müsaitlik Listesi"
      secondary={
        <>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd} size="small">
            Rezervasyon Ekle
          </Button>
        </>
      }
    >
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
        {/* <AddReservationForm onCancel={handleAdd} resFetch={refetch} /> */}
        <ReservationCreate />
      </Dialog>
      <Typography color="secondary" m={5}>
        <b>* Burada sadece müsait tarihler listelenecek. Şuanda Liste yanlış. Düzenleme yapılacak. </b>
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="left">Tesis</TableCell>
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
                  <TableCell align="left">{row.attributes.villa.data.attributes.name}</TableCell>
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
  );
};

export default ReservationAvailableList;
