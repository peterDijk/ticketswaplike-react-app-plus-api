import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Timestamp, ManyToOne, OneToMany} from 'typeorm'
import {Event} from '../events/entity'
import User from '../users/entity'
import Comment from '../comments/entity'

// import User from '../users/entity'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('decimal', {nullable: false})
  price: number

  @Column('text', {nullable: false})
  desc: string

  @Column('text', {nullable: true})
  imageUrl: string

  @Column('timestamptz', {nullable: false, default: () => `now()`})
  dateCreated: Timestamp

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @ManyToOne(_ => User, user => user.tickets)
  user: User

  @OneToMany(_ => Comment, comment => comment.ticket)
  comments: Comment[]



  // @ManyToOne(_ => User, user => user.events)
  // user: User

}
