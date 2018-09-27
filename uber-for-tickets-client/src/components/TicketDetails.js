import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FraudRiskDisplay from './FraudRiskDisplay'
import ListPagination from './ListPagination'
import CommentForm from './CommentForm'
import TicketForm from './TicketForm'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {formatDateTime} from '../lib/formatDateTime'

import {Link} from 'react-router-dom'

function TicketDetails({ticket, authenticated, userId, isAdmin, onAddFn, onChangeFn, onSubmitFn, addMode, values, editTicketMode, editTicketValues, onEditTicketFn, onSubmitTicketFn, deleteCommentFn}) {
  const {comments} = ticket
  return (
    <Grid container direction="column" justify="center" spacing={24}>
      <Grid item label="event_info">
        <Paper style={{marginTop: 10}}>
          <Grid container direction="row" justify="center" spacing={24}>
            <Grid item label="left">
              <Grid container direction="column" justify="center">
                <Grid item label="title" style={{width: '20vw'}}>
                  <Typography>Ticket for:</Typography>
                  <Typography variant="display1">{ticket.event.name}</Typography>
                </Grid>
                <Grid item label="image">
                  <img src={ticket.event.imageUrl} style={{width: '20vw'}} alt=""/>
                  
                </Grid>
                <Grid item>
                  <Link to={`/events/${ticket.event.id}/tickets/`}><Button variant="outlined">Back to all tickets</Button></Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item label="right" style={{borderLeftWidth: 1, borderLeftColor: '#dbdbdb', borderLeftStyle: 'solid'}}>
              <Grid container direction="column" justify="center">
                <Grid item label="info">
                  <Typography>Event description: {ticket.event.desc}</Typography>
                  <Typography>Starts: {formatDateTime(ticket.event.startDate)}</Typography>
                  <Typography>Ends: {formatDateTime(ticket.event.endDate)}</Typography>
                  <Typography variant="caption">Location: {(ticket.event.location)?ticket.event.location:'unknown'}</Typography>
                  
                </Grid>
                <Grid item label="ticket_info">
                  <Typography variant="headline">Price: {ticket.price}</Typography>
                  <Typography>Description: {ticket.desc}</Typography>
                  <Typography>Seller: {ticket.user.firstName} {ticket.user.lastName} ({ticket.user.email})</Typography>
                  <Typography style={{display: 'inline'}}>Fraud risk: </Typography><FraudRiskDisplay ticketId={ticket.id}/>
                  {userId && (userId === ticket.user.id || isAdmin === true) && <Button onClick={onEditTicketFn}>Edit ticket details</Button>}
                </Grid>
                <Grid item>
                  <img src={ticket.imageUrl} alt="" width="200"/>
                </Grid>
              </Grid>        
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
        
        {ticket.comments && ticket.comments.list.length > 0 && displayComments(comments.list, comments.count, comments.next, comments.previous, comments.range, isAdmin, deleteCommentFn, ticket.id)}
      </Grid>
    </Grid>

  )
}

function displayComments(commentsList, count, next, previous, range, isAdmin, deleteCommentFn, ticketId) {
  return (
    <div>
      
      <ListPagination count={count} next={next} previous={previous} range={range}/>
      <Typography variant="subheading">Comments:</Typography>
      {commentsList.map(comment => {
        return (
          <div key={comment.id}>
            {isAdmin === true && <IconButton aria-label="Delete" onClick={() => deleteCommentFn(comment.id, ticketId)}><DeleteIcon/></IconButton>}
            <Typography variant="caption" style={{display: 'inline'}}>by {comment.user.firstName} {comment.user.lastName} on {formatDateTime(comment.dateCreated)}</Typography>
            
            <Typography>{comment.comment}</Typography>
            <Divider style={{marginBottom: 16}}/>
          </div>
        )
      })}
    </div>
  )
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
})

export default withStyles(styles)(TicketDetails)