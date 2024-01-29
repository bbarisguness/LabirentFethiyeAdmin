import { Grid } from '@mui/material';
import PriceTableAdd from 'sections/villas/PriceTableAdd';

const PriceTableCreate = () => (
  <Grid container spacing={2.5}>
    <Grid item xs={12} md={12}>
      <PriceTableAdd />
    </Grid>
  </Grid>
);

export default PriceTableCreate;
