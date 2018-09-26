import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {Link} from 'react-router-dom'

function ListPagination({count, next, previous}) {
  
  return (
    <div style={{marginBottom: 15}}>
      <Typography style={{display: 'inline'}}>Total: {count} </Typography> {previous && <Button><Link to={previous}>previous</Link></Button>} {next && <Button><Link to={next}>next</Link></Button>}
    </div>
  )
}

const styles = theme => ({

})

export default withStyles(styles)(ListPagination)