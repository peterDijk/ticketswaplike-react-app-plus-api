import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FraudRiskDisplay from './FraudRiskDisplay'
import ListPagination from './ListPagination'
import CommentForm from './CommentForm'
import TicketForm from './TicketForm'

import {Link} from 'react-router-dom'

function TicketDetails({ticket, authenticated, userId, onAddFn, onChangeFn, onSubmitFn, addMode, values, editTicketMode, editTicketValues, onEditTicketFn, onSubmitTicketFn}) {
  const {comments} = ticket
  return (
    <Grid container direction="column" justify="center" spacing={24}>
      <Grid item>
        <Paper>
          <Grid container direction="row" justify="center" spacing={24}>
            <Grid item>
              <Typography variant="display3">Ticket for: {ticket.event.name}</Typography>
              {/* <Typography variant="display1">{ticket.event.desc}</Typography> */}
              <img src={ticket.event.imageUrl || `http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png`} width={400} alt=""/>
              <Typography>starts: {formatDateTime(ticket.event.startDate)}</Typography>
              <Typography>ends: {formatDateTime(ticket.event.endDate)}</Typography>
              <Link to={`/events/${ticket.event.id}/tickets/`}><Button>Back to all tickets</Button></Link>
            </Grid>
            <Grid item>
              <Typography variant="headline">Price: {ticket.price}</Typography>
              <Typography>Description: {ticket.desc}</Typography>
              <Typography>Seller: {ticket.user.firstName} {ticket.user.lastName} ({ticket.user.email})</Typography>
              <FraudRiskDisplay ticketId={ticket.id}/>
              {userId && userId === ticket.user.id && <Button onClick={onEditTicketFn}>Edit ticket details</Button>}
            </Grid>
            <Grid item>
              <img src={ticket.imageUrl} alt="" width="200"/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {(editTicketMode === true &&
          <Grid item>
            <TicketForm values={editTicketValues} onChangeFn={onChangeFn} onSubmitFn={onSubmitTicketFn} editTicketMode={editTicketMode}/>
          </Grid>
        )}
      <Grid item>
        {authenticated === true && <Button onClick={onAddFn}>Add comment</Button>}
        {(addMode === true && <CommentForm onChangeFn={onChangeFn} onSubmitFn={onSubmitFn} values={values}/>)}
      </Grid>
      <Grid item>
        {ticket.comments && ticket.comments.list.length === 0 && <Typography>no comments yet...</Typography>}
        
        {ticket.comments && ticket.comments.list.length > 0 && displayComments(comments.list, comments.count, comments.next, comments.previous)}
      </Grid>
    </Grid>
  )
}

function displayComments(commentsList, count, next, previous) {
  return (
    <div>
      <ListPagination count={count} next={next} previous={previous}/>
      <Typography variant="subheading">Comments:</Typography>
      {commentsList.map(comment => {
        return (
          <div key={comment.id}>
            <Typography variant="caption">by {comment.user.firstName} {comment.user.lastName} on {formatDateTime(comment.dateCreated)}</Typography>
            <Typography>{comment.comment}</Typography>
            <Divider style={{marginBottom: 16}}/>
          </div>
        )
      })}
    </div>
  )
}

function formatDateTime(date) {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
  let hours = d.getHours()
  let minutes = '' + d.getMinutes()

  if (minutes.length < 2) minutes = '0' + minutes

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
})

export default withStyles(styles)(TicketDetails)