// material-ui
import { Grid } from '@mui/material';
import DatePricesAdd from 'sections/prices/DatePriceAdd';

// project-imports

// ==============================|| FORMS VALIDATION - FORMIK ||============================== //

const DatePricesCreate = () => (
  <Grid container spacing={2.5}>
    <Grid item xs={12} md={12}>
      <DatePricesAdd />
    </Grid>
  </Grid>
);

export default DatePricesCreate;
