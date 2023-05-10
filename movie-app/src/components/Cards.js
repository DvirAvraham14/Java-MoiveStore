import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const cards = [1, 2, 3];


export default function Cards({data}) {
    const MAX_WORDS = 20; // Define the maximum number of words to display

    const truncateOverview = (overview) => {
        const words = overview.split(' ');
        const truncated = words.slice(0, MAX_WORDS).join(' ');

        return words.length > MAX_WORDS ? `${truncated}...` : overview;
    };

    return (

        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        pt: '10.25%',
                        height: '15em'
                    }}
                    image={ 'https://image.tmdb.org/t/p/w500/'+data.poster_path}
                    alt="random"
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.original_title}
                    </Typography>
                    <Typography>
                        {truncateOverview(data.overview)}
                    </Typography>
                    <Typography >
                        Price: 3.99$
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                    <Button size="small">View</Button>
                    <Button size="small"><AddShoppingCartIcon/></Button>
                </CardActions>


            </Card>
        </Grid>

    );
}