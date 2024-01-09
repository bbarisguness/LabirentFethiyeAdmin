// material-ui
import { Dialog,Button,CircularProgress,Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow,TablePagination } from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';

// third-party
import { useNavigate, useLocation } from "react-router-dom";
import { MouseEvent, useState } from 'react';
// project-imports
import MainCard from 'components/MainCard';
import useReservations from 'hooks/reservation/useReservations';
import IconButton from 'components/@extended/IconButton';
import {  Add, Edit, Eye } from 'iconsax-react';
import Moment from 'react-moment';
import AddReservationForm from './component/addForm';

const RECORD_SIZE = 15;
  

const ReservationList = () => {
    //const theme = useTheme();
    
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = Number(queryParams.get("page")) || 0;

    const { data,isLoading,refetch } = useReservations({
        Page:currentPage,
        Size:RECORD_SIZE
    });
    
    const handlePageChange = (event:any,newPage:any)  => {
        // update query parameters with new page number
        queryParams.set("page", (newPage).toString());
        navigate({ search: queryParams.toString() });
        setTimeout(() => {
            refetch();
        },100)
    }

    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
      setAdd(!add);
    };
    return (
        <MainCard content={false} title="Rezervasyon Listesi" secondary={
            <>
                <Button variant="contained" startIcon={<Add />} onClick={handleAdd} size="small">
                    Rezervasyon Ekle
                </Button>
            </>
        }>
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
                   <AddReservationForm onCancel={handleAdd} resFetch={refetch}/> 
                </Dialog>
                <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>Reservasyon No</TableCell>
                            <TableCell align="center">Check-In</TableCell>
                            <TableCell align="center">Check-Out</TableCell>
                            <TableCell align="center">Toplam Tutar</TableCell>
                            <TableCell align="center">Rezervasyon Türü</TableCell>
                            <TableCell align="center">Rezervasyon Kanalı</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && <CircularProgress />}
                        {
                        data &&
                        data?.data.data.map((row:any,key:any) => (
                        <TableRow hover key={row.id} onClick={() => navigate("/villa/show/" + row.id)}>
                            <TableCell sx={{ pl: 3 }} component="th" scope="row">
                                {row.reservationNumber}
                            </TableCell>
                            <TableCell align="center">
                                <Moment format="DD/MM/YYYY">{row.checkIn}</Moment>
                            </TableCell>
                            <TableCell align="center">
                                <Moment format="DD/MM/YYYY">{row.checkOut}</Moment>
                            </TableCell>
                            <TableCell align="center">{row.total + " TL"}</TableCell>
                            <TableCell align="center">{row.reservationStatusType == 1 ? "Rezervasyon":"Opsiyon"}</TableCell>
                            <TableCell align="center">{row.reservationStatusType == 1 ? "Acente":"Web Sitesi"}</TableCell>

                            <TableCell align="right">
                                <IconButton
                                    color="secondary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {

                                    }}
                                >
                                    <Eye />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                   
                                    }}
                                >
                                    <Edit />
                                </IconButton>
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
                count={data?.data.totalCount}
                rowsPerPage={RECORD_SIZE}
                page={currentPage}
                onPageChange={handlePageChange}
            />
        </MainCard>
    );
};

export default ReservationList;
