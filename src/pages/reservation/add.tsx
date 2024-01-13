// material-ui
import { Grid } from '@mui/material';

// project-imports
import ReservationAdd from 'sections/reservation/ReservationAdd';

// ==============================|| FORMS VALIDATION - FORMIK ||============================== //

const ReservationCreate = () => (
  <Grid container spacing={2.5}>
    <Grid item xs={12} md={12}>
      <ReservationAdd />
    </Grid>
  </Grid>
);

export default ReservationCreate;
