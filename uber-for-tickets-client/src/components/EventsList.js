import React from 'react'
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ListPagination from './ListPagination'
import EventForm from './EventForm'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'


import {Link} from 'react-router-dom'

function EventsList({authenticated, isAdmin, formValues, events, classes, addMode, onAddFn, onChangeFn, onSubmitFn, onEditFn, editMode, onSubmitEditFn, deleteEventFn }) {
  const {list, count, next, previous, range} = events
  return (
    <div>
      <Typography variant="display1">Available events</Typography>
      {authenticated === true && <Button onClick={onAddFn}>Add event</Button>}
      {addMode === true && <EventForm values={formValues} onAddFn={onAddFn} onChangeFn={onChangeFn} onSubmitFn={onSubmitFn} />}
      {editMode === true && <EventForm values={formValues} onChangeFn={onChangeFn} onSubmitFn={onSubmitEditFn}/>}
      <ListPagination count={count} next={next} previous={previous} range={range}/>

      <Grid container direction="row" justify="center" alignContent="center" spacing={24}>
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
                <Link to={`/events/${event.id}/tickets`}><Button size="small" color="primary">
                  View tickets
                </Button></Link>
                {isAdmin === true &&
                  <div>
                    <IconButton aria-label="Edit" onClick={() => onEditFn(event.id)}><EditIcon/></IconButton>
                    <IconButton aria-label="Delete" onClick={() => deleteEventFn(event.id)}><DeleteIcon/></IconButton>
                  </div>
                }
              </CardActions>
            </Card>
          </Grid>
        ))}  
      </Grid>
      <ListPagination count={count} next={next} previous={previous} range={range}/>
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