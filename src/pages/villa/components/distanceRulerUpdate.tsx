import { Grid } from '@mui/material';
import DistanceRulerUpdate from 'sections/villas/DistanceRulerUpdate';

const DistanceRulerEdit = (drId: any) => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={12}>
        <DistanceRulerUpdate drId={drId} />
      </Grid>
    </Grid>
  );
};

export default DistanceRulerEdit;
