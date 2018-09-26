import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function EventForm(props) {
  const { classes } = props
  return (
    <Grid container spacing={16} direction="row" justify="center" alignItems="center">
      <Grid item>
        <form onSubmit={props.onSubmitFn}>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            <Grid item>
                <TextField
                  name="name"
                  label="Name"
                  className={classes.textField}
                  value={props.values.name}
                  onChange={props.onChangeFn}
                  margin="normal"
                  required={true}
                />
              </Grid>          
              <Grid item>
                  <TextField
                    name="desc"
                    label="Description"
                    className={classes.textField}
                    value={props.values.desc}
                    onChange={props.onChangeFn}
                    margin="normal"
                    multiline={true}
                    rows="2"
                    required={true}
                  />
              </Grid>
              <Grid item>
                <TextField
                  name="imageUrl"
                  label="Image URL"
                  className={classes.textField}
                  value={props.values.imageUrl}
                  onChange={props.onChangeFn}
                  margin="normal"
                  required={true}
                />
              </Grid>              
              <Grid item>
                <TextField
                  name="startDate"
                  label="Start date"
                  type="datetime-local"
                  className={classes.textField}
                  value={props.values.startDate}
                  onChange={props.onChangeFn}
                  margin="normal"
                  required={true}
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="endDate"
                  label="End date"
                  type="datetime-local"
                  className={classes.textField}
                  value={props.values.endDate}
                  onChange={props.onChangeFn}
                  margin="normal"
                  required={true}
                  InputLabelProps={{shrink: true}}
                />
              </Grid>            
              <Grid item>
                <Button type="submit">{(props.editTicketMode === true) ? 'Edit event' : 'Add event'}</Button>
              </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 0,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  expansionPanel: {
    width: '80vw'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  }
})

export default withStyles(styles)(EventForm)