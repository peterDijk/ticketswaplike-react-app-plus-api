export const calcFraudRisk = (ticket, numAuthorTickets, ticketsEvent) => { 
  let risk = 5

  if (numAuthorTickets === 1) risk += 10

  ticket.price = parseFloat(ticket.price)

  // const pricesExclCurrent = ticketsEvent.filter(ticketF => ticketF.id !== ticket.id).map(ticket => parseFloat(ticket.price))
  // results in array of prices, except the ticket price that we're calculating the risk for

  const prices = ticketsEvent.map(ticket => parseFloat(ticket.price))

  const avgTicketPriceEvent = prices.reduce((total, price) => total + price) / prices.length

  if (ticket.price < avgTicketPriceEvent) {
    // if ticket is X% cheaper than average, add X% to the risk
    const decrease = avgTicketPriceEvent - ticket.price
    const percCheaper = (decrease / avgTicketPriceEvent) * 100
    risk += percCheaper
  }

  if (ticket.price > avgTicketPriceEvent) {
     // if ticket is X% more expensive than average price, deduct X% from the risk, with a maximum of 10% deduction
     const increase = ticket.price - avgTicketPriceEvent
     let percMoreExpensive = (increase / avgTicketPriceEvent) * 100
     if (percMoreExpensive > 10) percMoreExpensive = 10

     risk -= percMoreExpensive
  }

  const dateAdded = new Date(ticket.dateCreated)
  const addedHour = dateAdded.getHours()
  if (addedHour >= 9 && addedHour <= 17) {
    // console.log('inside buisiness hours, risk before: ', risk)
    risk -= 10
  } else { 
    // console.log('outside buisiness hours, risk before: ', risk)
    risk += 10
  }

  if (ticket.comments.length > 3) risk += 5


  if (risk < 5) risk = 5
  if (risk > 95) risk = 95
  return risk.toFixed(0)
}