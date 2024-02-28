import { DialogContent, DialogTitle, Divider, Typography, Button, Stack, DialogActions, Grid } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import useReservationDetail from 'hooks/reservation/useReservationDetail';
import { useNavigate } from 'react-router';
import apiRequest from 'services/request';

export interface Props {
  onCancel: () => void;
  RId?: string;
}
const DeleteReservationModal = ({ onCancel, RId }: Props) => {
  const navigate = useNavigate();

  const { data } = useReservationDetail(RId as string);
  const handleSubmit = async () => {
    if (data) {
      console.log('DeleteReservationModal', data);

      data.data.data.attributes.reservation_infos.data.map((item: any) => {
        apiRequest('DELETE', `/reservation-infos/${item.id}`);
      });
      data.data.data.attributes.reservation_items.data.map((item: any) => {
        apiRequest('DELETE', `/reservation-items/${item.id}`);
      });
      apiRequest('DELETE', `/reservations/${RId}`).then((res) => {
        console.log(res);
      });
    }
    navigate('/reservation/list');
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
              <Typography>Rezervasyonu Silmek İstediğinize Emin misiniz?</Typography>
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

export default DeleteReservationModal;
