import {JsonController, Get, Post, Put, HttpCode, Body, BodyParam, Param, NotFoundError, QueryParam} from 'routing-controllers'
import {pageLimitEvents} from '../constants'
import {Event} from './entity'
import { MoreThan} from 'typeorm'

@JsonController()
export default class EventController {

  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @BodyParam("name") name: string,
    @BodyParam("desc") desc: string,
    @BodyParam("imageUrl") imageUrl: string,
    @BodyParam("startDate") startDate: Date,
    @BodyParam("endDate") endDate: Date
  ) {
    const newEvent = await Event.create({name, desc, imageUrl, startDate, endDate})
    return newEvent.save()
  }

  @Get('/events')
  async allEvents(
    @QueryParam('orderBy') orderBy: string,
    @QueryParam('direction') direction: string,
    @QueryParam('showAll') showAll: boolean,
    @QueryParam('page') page: number
  ) {

    if (!orderBy) orderBy = 'dateCreated'
    if (!direction) direction = 'ASC'
    
    let dateNow = new Date()
    if (showAll === true) dateNow = new Date('1970-01-01T00:00:00')

    const count = await Event.count({where: {endDate : MoreThan(dateNow)}})

    if (!page) page = 1
    const take = pageLimitEvents
    const skip = (page -1) * take
    const totalPages = count / take
    let next
    let previous

    if (totalPages > page) next = `/events/?page=${page+1}`
    else next = null
    if (page > 1) previous = `/events/?page=${page-1}`
    else previous = null
  
    const events = await Event.find({ order: { [orderBy]: direction }, skip, take, where: {endDate : MoreThan(dateNow)} })
    return { count, next, previous ,events }
  }

  @Get('/events/:id')
  async oneEvent(
    @Param('id') id: number
  ) {
    const event = await Event.findOne(id)
    return event
  }

  @Put('/events/:id')
  async updateEvent(
    @Param('id') id: number,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOne(id)
    if (!event) throw new NotFoundError('Cannot find event')
    
    return Event.merge(event, update).save()
  }
}
