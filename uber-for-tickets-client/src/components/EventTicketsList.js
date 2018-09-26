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

import {Link} from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


function EventTicketsList({tickets, authenticated, onAddFn, onChangeFn, onSubmitFn, addMode, values, classes, history, isAdmin, deleteTicketFn}) {
  const {count, next, previous, list, event} = tickets
  return (
    <div>
      {/* <Link to="/create"><Button variant="contained">Place add</Button></Link> */}
      <Grid container direction="column" justify="center" spacing={24}>
        <Grid item>
          <Paper>
            <Typography variant="display3">{event.name}</Typography>
            <Typography variant="display1">{event.desc}</Typography>
            <img src={event.imageUrl || `http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png`} width={400} alt=""/>
            <Typography>starts: {formatDateTime(event.startDate)}</Typography>
            <Typography>ends: {formatDateTime(event.endDate)}</Typography>
            {authenticated === true && <Button onClick={onAddFn}>Add ticket</Button>}
          </Paper>
        </Grid>
        <Grid item>
          <ListPagination count={count} next={next} previous={previous}/>

          
          {(addMode === true && <TicketForm onChangeFn={onChangeFn} onSubmitFn={onSubmitFn} values={values}/>)}

          <Paper>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {isAdmin === true &&
                  <TableCell></TableCell>
                  }
                  <TableCell></TableCell>
                  <TableCell style={{width: '100px'}}>
                    <Tooltip title="Sort"><TableSortLabel onClick="sorthandler">Seller name</TableSortLabel></Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Sort"><TableSortLabel onClick={() => history.push('?orderBy=price&direction=DESC')}>Price</TableSortLabel></Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Sort"><TableSortLabel onClick="sorthandler">Description</TableSortLabel></Tooltip>
                  </TableCell> 
                  <TableCell>
                    <TableSortLabel onClick="sorthandler">Fraud risk</TableSortLabel>
                  </TableCell>                                                      
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(ticket => {
                  return (
                    <TableRow hover key={ticket.id}>
                      {isAdmin === true && <TableCell><IconButton aria-label="Delete" onClick={() => deleteTicketFn(ticket.id)}><DeleteIcon/></IconButton></TableCell>}
                      <TableCell><Button onClick={() => history.push(`/tickets/${ticket.id}`)}>Details</Button></TableCell>
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
        </Grid>
      </Grid>
      
    </div>
   
  )
}


function formatDateTime(date) {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
  let hours = d.getHours()
  // let minutes = d.getMinutes()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return `${year}-${month}-${day} ${hours}h`
}


const styles = theme => ({
  root: {
    display: 'flex',
  },
  table: {

  }
})

export default withRouter(withStyles(styles)(EventTicketsList))