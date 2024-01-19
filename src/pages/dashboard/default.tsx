// material-ui
import { Grid, Stack } from '@mui/material';
import ProjectRelease from 'sections/dashboard/default/ProjectRelease';

// assets
//import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* <Grid item xs={12}>
        <WelcomeBanner />
      </Grid> */}

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={3}>
          <ProjectRelease />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
