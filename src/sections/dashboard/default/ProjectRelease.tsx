import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';

// =========================|| DATA WIDGET - ADD NEW TASK ||========================= //
import useDailyReservationAction from 'hooks/dashboard/useDailyReservationAction';

//http://18.157.131.119:1337/api/reservations?populate[0]=reservation_infos&populate[1]=villa&filters[$or][0][checkIn][$eq]=2024-01-11&filters[$or][1][checkOut][$eq]=2024-01-11

const ProjectRelease = () => {
  let separator = '-';
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let dateNow = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;

  const navigate = useNavigate();

  const { data, isLoading } = useDailyReservationAction(dateNow);

  return (
    <MainCard title="Bugün Giriş ve Çıkışlar">
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <List>
            {isLoading && <CircularProgress />}
            {data &&
              data?.data.data.map((row: any, index: any) => (
                <ListItemButton key={index} onClick={() => navigate('/reservation/show/' + row.id)}>
                  <ListItemIcon>
                    <Dot color={row.attributes.checkOut == '2024-01-11' ? 'warning' : 'success'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      (row.attributes.checkOut == '2024-01-11' ? 'ÇIKIŞ - ' : 'GİRİŞ - ') + ' ' + row.attributes.villa.data.attributes.name
                    }
                  />
                </ListItemButton>
              ))}
          </List>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProjectRelease;
