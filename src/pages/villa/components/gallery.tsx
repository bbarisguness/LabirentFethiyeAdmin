import { CardMedia } from '@mui/material';
import {
    Grid
} from '@mui/material';

import MainCard from 'components/MainCard';
import { useParams } from 'react-router';


const VillaGallery = () => {
    const params= useParams();
    console.log(params);
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MainCard>
                            <CardMedia component="img" image={"https://villasepeti.com/pics/villa-emir-2/villa-emir-2-01.jpg"} alt="green iguana" />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>    
    )
}


export default VillaGallery;