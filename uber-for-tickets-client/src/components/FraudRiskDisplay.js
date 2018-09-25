import * as React from 'react'
import {getFraudRisk} from '../actions/selectTicket'
import Typography from '@material-ui/core/Typography'

export default class FraudRiskDisplay extends React.PureComponent {
  state = {

  }

  setRisk = async (ticketId) => {
    const risk =  await getFraudRisk(ticketId)
    this.setState({
      fraudRisk: risk
    })
  }

  componentDidMount() {
    this.setRisk(this.props.ticketId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ticketId !== this.props.ticketId) {
      this.setRisk(this.props.ticketId)
    }
  }


  render() {
    const {fraudRisk} = this.state
    if (!fraudRisk) return 'calculating fraud risk...'
    let color = '' 
    if (fraudRisk <= 33) color = '#73e000'//green
    if (fraudRisk >= 33 && fraudRisk <= 66) color = '#dddd00'//yellow
    if (fraudRisk > 66) color = '#ff0000'//red
    return (
      <div style={{width: 50, height: 15, backgroundColor: color, padding: 4, textAlign: 'center'}}>
        <Typography style={{marginBottom: 4}}>{fraudRisk}% </Typography>
      </div>
      
      )
  }
}