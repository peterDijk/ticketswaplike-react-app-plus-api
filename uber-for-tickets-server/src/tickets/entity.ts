import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Timestamp, ManyToOne} from 'typeorm'
import {Event} from '../events/entity'

// import User from '../users/entity'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('float', {nullable: true})
  price: number

  @Column('text', {nullable: false})
  desc: string

  @Column('text', {nullable: true})
  imageUrl: string

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @Column('timestamptz', {nullable: false, default: () => `now()`})
  dateCreated: Timestamp

  // @ManyToOne(_ => User, user => user.events)
  // user: User

}