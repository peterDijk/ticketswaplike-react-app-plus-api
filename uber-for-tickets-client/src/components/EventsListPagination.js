import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

function EventsListPagination({count, next, previous}) {
  return (
    <div>
      Total events: {count} {previous && <Link to={previous}>previous</Link>} {next && <Link to={next}>next</Link>}
    </div>
  )
}

const styles = theme => ({

})

export default withStyles(styles)(EventsListPagination)