import {JsonController, Get, Post, Put, HttpCode, BodyParam, Param, BadRequestError, QueryParam, Authorized, CurrentUser, Delete} from 'routing-controllers'
import {pageLimitTickets} from '../constants'
import {Ticket} from './entity'
import {Event} from '../events/entity'
import User from '../users/entity'
import {calcFraudRisk} from '../lib/fraudRisk'
// import {Not, Equal} from 'typeorm'


@JsonController()
export default class TicketController {

  @Authorized()
  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket(
    @BodyParam("price") price: number,
    @BodyParam("desc") desc: string,
    @BodyParam("imageUrl") imageUrl: string,
    @Param('eventId') eventId: number,
    @CurrentUser() user: User
  ) {
    const event = await Event.findOne(eventId)
    if (!event) throw new BadRequestError(`Event does not exist`)
    const ticket = await Ticket.create({
      event,
      price,
      desc,
      imageUrl, 
      user
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
    let range = {first: skip+1, last: (skip+take > count)?count:skip+take}

    // const allowedColumnOrder = ['id', 'desc', 'imageUrl', 'dateCreated', 'eventId', 'price']
    // const allowedDirection = ['ASC', 'DESC']

    if (!orderBy) orderBy = 'dateCreated'
    if (!direction) direction = 'DESC'

    const tickets = await Ticket.find({where: {event}, order: { [orderBy]: direction }, skip, take, relations: ['user']})

    const totalPages = count / take
    let next
    let previous

    if (totalPages > page) next = `/events/${eventId}/tickets/?page=${page+1}`
    else next = null
    if (page > 1) previous = `/events/${eventId}/tickets/?page=${page-1}`
    else previous = null

    return {count, next, previous, tickets, event, range}
  }

  @Get('/tickets/:ticketId')
  async getOneTicket(
    @Param('ticketId') ticketId: number
  ) {
    const ticket = await Ticket.findOne(ticketId, {relations: ['event', 'user']})
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    return ticket
  }

  @Authorized()
  @Put('/tickets/:ticketId')
  @HttpCode(200)
  async updateTicket(
    @BodyParam("price") price: number,
    @BodyParam("desc") desc: string,
    @BodyParam("imageUrl") imageUrl: string,
    @Param('ticketId') ticketId: number,
    @CurrentUser() currentUser: User
  ) {
    const ticket = await Ticket.findOne(ticketId, {relations: ['user']})
    if (!ticket) throw new BadRequestError(`Event does not exist`)

    if (currentUser.isAdmin === true) {
      return Ticket.merge(ticket, {price, desc, imageUrl}).save()
    }
    if (ticket.user.id !== currentUser.id) {
      throw new BadRequestError(`Only author can edit ticket`)
    }

    return Ticket.merge(ticket, {price, desc, imageUrl}).save()
    
  }

  @Get('/tickets/:ticketId/fraudrisks')
  async getFraudRisk(
    @Param('ticketId') ticketId: number
  ) {
    const ticket = await Ticket.findOne(ticketId, {relations: ['event', 'user', 'comments']})
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    const numAuthorTickets = await Ticket.count({user: ticket.user})

    const ticketsEvent = await Ticket.find({event: ticket.event})
    // comments
    return calcFraudRisk(ticket, numAuthorTickets, ticketsEvent)
  }

  @Authorized()
  @Delete('/tickets/:ticketId')
  @HttpCode(202)
  async deleteTicket(
    @Param('ticketId') ticketId: number,
    @CurrentUser() user: User
  ) {
    const userResult = await User.findOne(user)
    if (!userResult) throw new BadRequestError(`User does not exist`)

    const ticket = await Ticket.findOne(ticketId, {relations: ['user']})
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    // ticket.remove()

    if (userResult.isAdmin === true) {
      ticket.remove()
      return ticket
    }

    if (ticket.user.id !== userResult.id) {
      throw new BadRequestError(`Only author can delete ticket`)
    }

    ticket.remove()
    return ticket

    // if (userResult.isAdmin === false) {
    //   throw new BadRequestError(`Only admins are allowed to delete tickets`)
    // }



    // return ticket
  }
}