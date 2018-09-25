import {JsonController, Get, Post, HttpCode, BodyParam, Param, BadRequestError, Authorized, CurrentUser, QueryParam} from 'routing-controllers'
import {pageLimitComments} from '../constants'
import {Ticket} from '../tickets/entity'
import Comment from '../comments/entity'
import User from '../users/entity'



@JsonController()
export default class CommentController {

  @Authorized()
  @Post('/tickets/:ticketId/comments')
  @HttpCode(201)
  async createComment(
    @BodyParam("comment") commentTxt: string,
    @Param('ticketId') ticketId: number,
    @CurrentUser() user: User
  ) {
    const ticket = await Ticket.findOne(ticketId)
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    const comment = await Comment.create({
      comment: commentTxt,
      ticket,
      user
    })
    return comment.save()
  }

  @Get('/tickets/:ticketId/comments')
  async getComments(
    @Param('ticketId') ticketId: number,
    @QueryParam('page') page: number,
    @QueryParam('orderBy') orderBy: string,
    @QueryParam('direction') direction: string
  ) {
    const ticket = await Ticket.findOne(ticketId)
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    const count = await Comment.count({where: {ticket}})

    if (!page) page = 1
    const take = pageLimitComments
    const skip = (page -1) * take

    if (!orderBy) orderBy = 'dateCreated'
    if (!direction) direction = 'DESC'

    const comments = await Comment.find({where: {ticket}, order: { [orderBy]: direction }, skip, take, relations: ['user']})

    const totalPages = count / take
    let next
    let previous

    if (totalPages > page) next = `/tickets/${ticketId}/?page=${page+1}`
    else next = null
    if (page > 1) previous = `/tickets/${ticketId}/?page=${page-1}`
    else previous = null

    return {count, next, previous, comments, ticket}
  }
}
