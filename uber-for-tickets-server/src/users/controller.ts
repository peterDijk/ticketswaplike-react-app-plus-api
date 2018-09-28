import { JsonController, Post, Param, Get, Body, Authorized, BadRequestError, BodyParam } from 'routing-controllers'
import User from './entity';
// import { io } from '../index'

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @BodyParam('firstName') firstName: string,
    @BodyParam('lastName') lastName: string,
    @BodyParam('email') email: string,

    @Body() data: User
  ) {

    const emailExists = await User.count({where: {email:data.email}})
    if (emailExists > 0) {
      throw new BadRequestError('User with that emailaddress already exists')
    }

    const {password} = data
    const entity = User.create({firstName, lastName, email})
    await entity.setPassword(password)

    const user = await entity.save()

    // io.emit('action', {
    //   type: 'ADD_USER',
    //   payload: entity
    // })

    return user
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOne(id)
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }
}
