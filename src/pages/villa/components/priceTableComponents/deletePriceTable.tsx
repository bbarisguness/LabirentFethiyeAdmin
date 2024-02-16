import { DialogContent, DialogTitle, Divider, Typography, Button, Stack, DialogActions, Grid } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import apiRequest from 'services/request';

export interface Props {
  onCancel: () => void;
  PtId?: number;
}
const DeletePriceTableModal = ({ onCancel, PtId }: Props) => {
  const handleSubmit = async () => {
    apiRequest('DELETE', `/price-tables/${PtId}`).then((res) => {
      console.log(res);
    });
    onCancel();
  };

  return (
    <>
      <DialogTitle style={{ color: 'red', fontWeight: 'bold' }}>- UYARI !!</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography>Fiyatı Silmek İstediğinize Emin misiniz?</Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <AnimateButton>
                <Button color="error" onClick={onCancel}>
                  İPTAL
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button variant="contained" onClick={handleSubmit}>
                  KAYDET
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default DeletePriceTableModal;
