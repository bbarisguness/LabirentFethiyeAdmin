import { Grid } from '@mui/material';
import DistanceRulerAdd from 'sections/villas/DistanceRulerAdd';

const DistanceRulerCreate = () => (
  <Grid container spacing={2.5}>
    <Grid item xs={12} md={12}>
      <DistanceRulerAdd />
    </Grid>
  </Grid>
);

export default DistanceRulerCreate;
