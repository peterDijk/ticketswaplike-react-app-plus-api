import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListPagination from './ListPagination'
import EventForm from './EventForm'
import {formatDateTime} from '../lib/formatDateTime'

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
import AddIcon from '@material-ui/icons/Add'


import {Link} from 'react-router-dom'

function EventsList({authenticated, isAdmin, formValues, events, classes, addMode, onAddFn, onChangeFn, onSubmitFn, onEditFn, editMode, onSubmitEditFn, deleteEventFn }) {
  const {list, count, next, previous, range} = events
  return (
    <div>
      <Typography variant="display1" style={{display: 'inline'}}>Available events</Typography>
      {authenticated === true && <Button onClick={onAddFn} variant="fab" color="secondary" aria-label="Add Event" style={{position: 'absolute', right: 40}}><AddIcon/></Button>}
      {addMode === true && <EventForm values={formValues} onAddFn={onAddFn} onChangeFn={onChangeFn} onSubmitFn={onSubmitFn} />}
      {editMode === true && <EventForm values={formValues} onChangeFn={onChangeFn} onSubmitFn={onSubmitEditFn} editMode={editMode}/>}
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
                      {`${event.desc.substring(0,200)} ${event.desc.length > 199 && `(...)`}`}
                    </Typography>
                    <Typography variant="caption" style={{marginTop: 6}}>Starts: {formatDateTime(event.startDate)}</Typography>
                    <Typography variant="caption">Ends: {formatDateTime(event.endDate)}</Typography>
                    <Typography variant="caption">Location: {(event.location)?event.location:'unknown'}</Typography>
                    <Typography variant="caption" style={{marginTop: 8}}>Number of tickets offered: {event.ticketsCount}</Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Link to={`/events/${event.id}/tickets`}><Button size="small" color="primary">
                  View tickets
                </Button></Link>
                {isAdmin === true &&
                  <div>
                    <IconButton color="primary" aria-label="Edit" onClick={() => onEditFn(event.id)}><EditIcon/></IconButton>
                    <IconButton color="secondary" aria-label="Delete" onClick={() => deleteEventFn(event.id)}><DeleteIcon/></IconButton>
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