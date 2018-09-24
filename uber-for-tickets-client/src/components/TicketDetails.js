import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ListPagination from './EventsListPagination'

import {Link} from 'react-router-dom'

function TicketDetails({ticket}) {
  console.log(ticket)
  return (
    <Grid container direction="column" justify="center" spacing={24}>
      <Grid item>
        <Paper>
          <Grid container direction="row" justify="center" spacing={24}>
            <Grid item>
              <Typography variant="display3">Ticket for: {ticket.event.name}</Typography>
              <Typography variant="display1">{ticket.event.desc}</Typography>
              <img src={ticket.event.imageUrl || `http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png`} width={400} alt=""/>
              <Typography>starts: {formatDateTime(ticket.event.startDate)}</Typography>
              <Typography>ends: {formatDateTime(ticket.event.endDate)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="headline">Price: {ticket.price}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
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
})

export default withStyles(styles)(TicketDetails)