import {JsonController, Get, Post, HttpCode, BodyParam, Param, BadRequestError, QueryParam} from 'routing-controllers'
import {pageLimitTickets} from '../constants'
import {Ticket} from './entity'
import {Event} from '../events/entity'
// import { MoreThan} from 'typeorm'

@JsonController()
export default class TicketController {

  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket(
    @BodyParam("price") price: number,
    @BodyParam("desc") desc: string,
    @BodyParam("imageUrl") imageUrl: string,
    @Param('eventId') eventId: number
  ) {
    const event = await Event.findOne(eventId)
    if (!event) throw new BadRequestError(`Event does not exist`)
    const ticket = await Ticket.create({
      event,
      price,
      desc,
      imageUrl
    })
    return ticket.save()
  }

  @Get('/events/:eventId/tickets')
  async getTickets(
    @Param('eventId') eventId: number,
    @QueryParam('page') page: number,
    @QueryParam('orderBy') orderBy: string,
    @QueryParam('direction') direction: string
  ) {
    const event = await Event.findOne(eventId)
    if (!event) throw new BadRequestError(`Event does not exist`)
    const count = await Ticket.count({where: {event}})

    if (!page) page = 1
    const take = pageLimitTickets
    const skip = (page -1) * take

    if (!orderBy) orderBy = 'dateCreated'
    if (!direction) direction = 'DESC'

    const tickets = await Ticket.find({where: {event}, order: { [orderBy]: direction }, skip, take})

    const totalPages = count / take
    let next
    let previous

    if (totalPages > page) next = `/events/${eventId}/tickets/?page=${page+1}`
    else next = null
    if (page > 1) previous = `/events/${eventId}/tickets/?page=${page-1}`
    else previous = null

    return {count, next, previous, tickets, event}
  }
}