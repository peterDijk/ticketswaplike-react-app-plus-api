import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, Timestamp} from 'typeorm'
import User from '../users/entity'
import {Ticket} from '../tickets/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable: false})
  comment: string

  @Column('timestamptz', {nullable: false, default: () => `now()`})
  dateCreated: Timestamp

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @ManyToOne(_ => User, user => user.comments)
  user: User


}