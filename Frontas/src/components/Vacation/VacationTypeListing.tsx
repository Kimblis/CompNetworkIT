import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const VacationTypeListing = () => {
  const router = useRouter();
  return (
    <>
      <Typography variant="h3" component="h1" align="center" mt={5}>
        Pasirinkite kelionės tipą
      </Typography>
      <Grid container spacing={2} mt={5} justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardActionArea onClick={() => router.replace('/sightseeing')}>
              <CardMedia component="img" sx={{ height: '50vh' }} image="sightseeing.jpg" alt="Pažintinės kelionės" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pažintinės kelionės
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardActionArea onClick={() => router.replace('/holiday')}>
              <CardMedia component="img" sx={{ height: '50vh' }} image="holiday.jpg" alt="Poilsinės kelionės" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Poilsinės kelionės
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardActionArea onClick={() => router.replace('/universal')}>
              <CardMedia
                component="img"
                sx={{ height: '50vh' }}
                image="mixed.jpg"
                alt=" Pažintinės+poilsinės kelionės"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pažintinės+poilsinės kelionės
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default VacationTypeListing;
