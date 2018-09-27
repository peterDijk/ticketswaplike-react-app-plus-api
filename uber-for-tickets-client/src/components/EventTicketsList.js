import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListPagination from './ListPagination'
import TicketForm from './TicketForm'
import FraudRiskDisplay from './FraudRiskDisplay'
import {formatDateTime} from '../lib/formatDateTime'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


function EventTicketsList({tickets, authenticated, onAddFn, onChangeFn, onSubmitFn, addMode, values, classes, history, isAdmin, deleteTicketFn, sortHandler, userId}) {
  const {count, next, previous, range, list, event} = tickets
  return (
    <div>
      <Grid container direction="column" justify="center" spacing={24}>
        <Grid item label="event_info">
          <Paper style={{marginTop: 10}}>
            <Grid container direction="row" justify="center" spacing={24}>
              <Grid item label="left">
                <Grid container direction="column" justify="center">
                  <Grid item label="title" style={{width: '40vw'}}>
                    <Typography>Event:</Typography>
                    <Typography variant="display1">{event.name}</Typography>
                  </Grid>
                  <Grid item label="image">
                    <img src={event.imageUrl} style={{width: '40vw'}} alt=""/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item label="right" style={{borderLeftWidth: 1, borderLeftColor: '#dbdbdb', borderLeftStyle: 'solid'}}>
                <Grid container direction="column" justify="center">
                  <Grid item label="info" style={{width: '30vw'}}>
                    <Typography style={{marginBottom: 20}}>Description: {event.desc}</Typography>
                    <Typography>Starts: {formatDateTime(event.startDate)}</Typography>
                    <Typography>Ends: {formatDateTime(event.endDate)}</Typography>
                    <Typography variant="caption">Location: {(event.location)?event.location:'unknown'}</Typography>
                    {authenticated === true && <Button onClick={onAddFn}>Add ticket</Button>}
                  </Grid>
                </Grid>        
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item label="tickets">
          <Grid container direction="column" justify="center" spacing={24}>
            {list.length === 0 &&
            <Grid item>
              <Typography>No tickets offered yet for this event</Typography>
            </Grid>
            }
            <Grid item>
              {(addMode === true && <TicketForm onChangeFn={onChangeFn} onSubmitFn={onSubmitFn} values={values}/>)}
            </Grid>
            {list.length > 0 &&
            <Grid item>
              
              <Typography variant="headline">Tickets offered for this event</Typography>
              <Paper>
              <ListPagination count={count} next={next} previous={previous} range={range}/>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      {/* {isAdmin === true &&
                      <TableCell></TableCell>
                      } */}
                      {/* <TableCell></TableCell> */}
                      <TableCell style={{width: '100px'}}>
                        <Tooltip title="Sort"><TableSortLabel>Seller name</TableSortLabel></Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Sort"><TableSortLabel onClick={() => sortHandler('price')}>Price</TableSortLabel></Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Sort"><TableSortLabel onClick={() => sortHandler('desc')}>Description</TableSortLabel></Tooltip>
                      </TableCell> 
                      <TableCell>
                        <TableSortLabel>Fraud risk</TableSortLabel>
                      </TableCell>                                                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.map(ticket => {
                      return (
                        <TableRow hover key={ticket.id}>
                          <TableCell>
                          {(isAdmin === true || ticket.user.id === userId) && <IconButton aria-label="Delete" onClick={() => deleteTicketFn(ticket.id)} style={{display: 'inline'}}><DeleteIcon/></IconButton>}
                          <Button style={{display: 'inline'}} variant="outlined" onClick={() => history.push(`/tickets/${ticket.id}`)}>Details</Button></TableCell>
                          <TableCell style={{width: '80px'}}>{ticket.user.firstName} {ticket.user.lastName}</TableCell>
                          <TableCell>{ticket.price}</TableCell>
                          <TableCell style={{width: '250px'}}>{ticket.desc}</TableCell>
                          <TableCell><FraudRiskDisplay ticketId={ticket.id}/></TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>}
          </Grid>            
        </Grid>
      </Grid>    
    </div>
   
  )
}


const styles = theme => ({
  root: {
    display: 'flex',
  },
  table: {

  }
})

export default withRouter(withStyles(styles)(EventTicketsList))