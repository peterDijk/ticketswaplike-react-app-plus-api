import React from 'react'
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ListPagination from './EventsListPagination'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import {Link} from 'react-router-dom'

function EventsList({events, classes }) {
  const {list, count, next, previous} = events
  return (
    <div>
      <ListPagination count={count} next={next} previous={previous}/>

      <Grid container direction="row" justify="center" spacing={24}>
        {list.map(event => (
          <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <Link to={`/events/${event.id}/tickets`}>
                <CardActionArea style={{width: '100%'}}>
                  <CardMedia
                    className={classes.media}
                    image={event.imageUrl}
                    title={event.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {event.name}
                    </Typography>
                    <Typography component="p">
                      {event.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Button size="small" color="primary">
                  View tickets
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}  
      </Grid>
   </div>
  )
}



const styles = theme => ({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
})

export default withStyles(styles)(EventsList)