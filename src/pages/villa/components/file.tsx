import { Grid } from '@mui/material';

import MainCard from 'components/MainCard';
import { useParams } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DocumentDownload } from 'iconsax-react';

const VillaFile = () => {
  const params = useParams();
  console.log(params);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Dosya Arşivi (YAPIM AŞAMASINDA)">
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Dosya İsmi</TableCell>
                      <TableCell align="center">İLGİLİ</TableCell>
                      <TableCell align="center">Boyut</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell align="left">Fatura.xlsx</TableCell>
                      <TableCell align="center">Veysel Çiftçi</TableCell>
                      <TableCell align="center">1.3MB</TableCell>
                      <TableCell align="right">
                        <DocumentDownload size={20} />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell align="left">Fatura.xlsx</TableCell>
                      <TableCell align="center">Ahmet Erdoğan</TableCell>
                      <TableCell align="center">1.3MB</TableCell>
                      <TableCell align="right">
                        <DocumentDownload size={20} />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell align="left">Sözleşme.xlsx</TableCell>
                      <TableCell align="center">Villa Sahibi</TableCell>
                      <TableCell align="center">1.3MB</TableCell>
                      <TableCell align="right">
                        <DocumentDownload size={20} />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell align="left">Protokol.xlsx</TableCell>
                      <TableCell align="center">Villa Sahibi</TableCell>
                      <TableCell align="center">1.3MB</TableCell>
                      <TableCell align="right">
                        <DocumentDownload size={20} />
                      </TableCell>
                    </TableRow>                   
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

export default VillaFile;
