import { Grid } from '@mui/material';
import FeatureAdd from 'sections/villas/FeatureAdd';

const FeatureCreate = () => (
  <Grid container spacing={2.5}>
    <Grid item xs={12} md={12}>
      <FeatureAdd />
    </Grid>
  </Grid>
);

export default FeatureCreate;
