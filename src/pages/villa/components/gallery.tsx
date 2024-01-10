import { CardMedia } from '@mui/material';
import { Grid, CircularProgress } from '@mui/material';

import MainCard from 'components/MainCard';
import { useParams } from 'react-router';
import useVillaGallery from 'hooks/villa/useVillaGallery';

const VillaGallery = () => {
  const params = useParams();

  const { data, isLoading } = useVillaGallery(params.id as string);

  console.log(data);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {isLoading && <CircularProgress />}
          {data &&
            data?.data.data.map((row: any, key: any) => (
              <Grid item xs={4}>
                <MainCard>
                  <CardMedia component="img" image={row.attributes.photo.data.attributes.url} alt="green iguana" />
                </MainCard>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VillaGallery;
