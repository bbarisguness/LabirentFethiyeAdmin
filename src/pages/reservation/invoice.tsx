import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  IconButton,
  Chip,
  FormControl,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Button
} from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project-imports
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import LogoSection from 'components/logo';

// assets
import { BackSquare, Printer } from 'iconsax-react';

import useReservationInvoice from 'hooks/reservation/useReservationInvoice';

const ReservationInvoice = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading } = useReservationInvoice(id as string);

  //console.log(data);

  //   const today = new Date(`${list?.date}`).toLocaleDateString('en-GB', {
  //     month: 'numeric',
  //     day: 'numeric',
  //     year: 'numeric'
  //   });

  //   const due_dates = new Date(`${list?.due_date}`).toLocaleDateString('en-GB', {
  //     month: 'numeric',
  //     day: 'numeric',
  //     year: 'numeric'
  //   });

  const subtotal = data?.data.data.attributes.total;

  const discountRate = 2000;
  const taxRate = ((data?.data.data.attributes.total - discountRate) * 20) / 100;
  const total = subtotal + taxRate;
  const componentRef = useRef(null);

  if (isLoading) return <Loader />;

  return (
    <MainCard content={false}>
      <Stack spacing={2.5}>
        <Box sx={{ p: 2.5, pb: 0 }}>
          <MainCard content={false} border={false} sx={{ p: 1.25, bgcolor: 'secondary.lighter' }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              {/* <IconButton onClick={() => navigation(`/apps/invoice/edit/${id}`)}>
                <Edit color={theme.palette.text.secondary} />
              </IconButton> */}
              {/* <IconButton onClick={() => navigate(-1)}>
                <BackSquare color={theme.palette.text.secondary} />
              </IconButton> */}
              <Button
                      variant="contained"                      
                      startIcon={<BackSquare />}
                      onClick={() => {
                        navigate(-1)
                      }}
                      size="extraSmall"
                    >
                      Geri Dön
                    </Button>
              {/* <PDFDownloadLink document={ <ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`} >
                <IconButton>
                  <DocumentDownload color={theme.palette.text.secondary} />
                </IconButton>
              </PDFDownloadLink> */}
              <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <Printer color={theme.palette.text.secondary} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              />
              {/* <IconButton>
                <Share color={theme.palette.text.secondary} />
              </IconButton> */}
            </Stack>
          </MainCard>
        </Box>
        <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={2}>
                    <LogoSection />
                    <Chip label="Ödendi" variant="light" color="success" size="small" />
                  </Stack>
                  {/* <Typography color="secondary">#{data?.data.data.id}</Typography> */}
                </Stack>
                <Box>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography variant="subtitle1">Check In</Typography>
                    <Typography color="secondary">{data?.data.data.attributes.checkIn}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                      Check Out
                    </Typography>
                    <Typography color="secondary">{data?.data.data.attributes.checkOut}</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">Tesis Bilgileri:</Typography>
                  {
                    <FormControl sx={{ width: '100%' }}>
                      <Typography color="secondary">Adı: {data?.data.data.attributes.villa.data.attributes.name}</Typography>
                      <Typography color="secondary">Bölge: {data?.data.data.attributes.villa.data.attributes.region}</Typography>
                      <Typography color="secondary">
                        Oda / Banyo: {data?.data.data.attributes.villa.data.attributes.room} /{' '}
                        {data?.data.data.attributes.villa.data.attributes.bath}
                      </Typography>
                      <Typography color="secondary">Kapasite: {data?.data.data.attributes.villa.data.attributes.person}</Typography>
                    </FormControl>
                  }
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">Misafir Bilgileri:</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">
                      {data?.data.data.attributes.reservation_infos.data[0].attributes.name}{' '}
                      {data?.data.data.attributes.reservation_infos.data[0].attributes.surname}
                    </Typography>
                    <Typography color="secondary">{data?.data.data.attributes.reservation_infos.data[0].attributes.phone}</Typography>
                    <Typography color="secondary">{data?.data.data.attributes.reservation_infos.data[0].attributes.email}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Day</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data.data.attributes.reservation_items.data?.map((row: any, index: any) => (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.attributes.day}</TableCell>
                        <TableCell align="right">{row.attributes.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderWidth: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}></Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.secondary.main}>Sub Total:</Typography>
                  <Typography>{subtotal?.toFixed(2)} TL</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.secondary.main}>Discount:</Typography>
                  <Typography variant="h6" color={theme.palette.success.main}>
                    {discountRate?.toFixed(2)} TL
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color={theme.palette.secondary.main}>Tax:</Typography>
                  <Typography>{taxRate?.toFixed(2)} TL</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1">Grand Total:</Typography>
                  <Typography variant="subtitle1">{total % 1 === 0 ? total : total?.toFixed(2)} TL</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Typography color="secondary">Notes: </Typography>
                <Typography>
                  It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank
                  You!
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {/*<Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: 2.5, a: { textDecoration: 'none', color: 'inherit' } }}>
          <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
            <Button variant="contained" color="primary">
              Download
            </Button>
          </PDFDownloadLink>
        </Stack> */}
      </Stack>
    </MainCard>
  );
};

export default ReservationInvoice;
