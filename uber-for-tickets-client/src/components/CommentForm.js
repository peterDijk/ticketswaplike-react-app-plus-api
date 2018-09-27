import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function CommentForm(props) {
  const { classes } = props
  return (
    <Grid container spacing={16} direction="row" justify="center" alignItems="center">
      <Grid item>
        <form onSubmit={props.onSubmitFn}>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            <Grid item>
                <TextField
                  name="comment"
                  label="Comment"
                  className={classes.textField}
                  value={props.values.comment}
                  onChange={props.onChangeFn}
                  margin="normal"
                  multiline={true}
                  rows="2"
                  required={true}
                />
            </Grid>          
            <Grid item>
              <Button type="submit">Add comment</Button>
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
    width: '90vw',
  }
})

export default withStyles(styles)(CommentForm)