import {JsonController, Get, Post, Put, HttpCode, Body, BodyParam, Param, NotFoundError, QueryParam} from 'routing-controllers'
import {Event} from './entity'
import {MoreThan} from 'typeorm'

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
    @QueryParam('skip') skip: number,
    @QueryParam('take') take: number,
    @QueryParam('by') by: string,
    @QueryParam('order') order: string
  ) {
    if (!skip) skip = 0
    if (!take) take = 3
    if (!by) by = 'dateCreated'
    if (!order) order = 'ASC'
    const dateNow = new Date()
    const events = await Event.find({ order: { [by]: order }, skip, take, where: {endDate : MoreThan(dateNow)} })
    return { events }
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
