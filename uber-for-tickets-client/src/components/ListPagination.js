import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'

import {Link} from 'react-router-dom'

function ListPagination({count, next, previous, range, history}) {
  
  return (
    <div style={{marginBottom: 15, marginLeft: 20}}>
      <Typography style={{display: 'inline'}}>{`${range.first}-${range.last} of ${count}`}</Typography> 
      <IconButton disabled={(previous?false:true)} onClick={() => history.push(previous)}><NavigateBefore/></IconButton> 
      <IconButton disabled={(next?false:true)} onClick={() => history.push(next)}><NavigateNext/></IconButton>
    </div>
  )
}

const styles = theme => ({

})

export default withRouter(withStyles(styles)(ListPagination))