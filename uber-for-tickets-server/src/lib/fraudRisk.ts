export const calcFraudRisk = (ticket, numAuthorTickets, ticketsEvent) => { 
  let risk = 5

  if (numAuthorTickets === 1) risk += 10

  ticket.price = parseFloat(ticket.price)

  const pricesExclCurrent = ticketsEvent.filter(ticketF => ticketF.id !== ticket.id).map(ticket => parseFloat(ticket.price))

  const avgTicketPriceEvent = pricesExclCurrent.reduce((total, price) => total + price) / pricesExclCurrent.length

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


  if (risk > 95) risk = 95
  return risk
}