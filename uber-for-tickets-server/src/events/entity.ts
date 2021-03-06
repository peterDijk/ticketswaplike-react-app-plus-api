import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Timestamp, OneToMany, ManyToOne} from 'typeorm'
import {Ticket} from '../tickets/entity'
import User from '../users/entity'

// import User from '../users/entity"

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable: false})
  name: string

  @Column('text', {nullable: false})
  desc: string

  @Column('text', {nullable: true})
  location: string

  @Column('text', {nullable: true})
  imageUrl: string

  @Column('timestamptz', {nullable: false})
  startDate: Timestamp

  @Column('timestamptz', {nullable: false})
  endDate: Timestamp

  @Column('timestamptz', {nullable: false, default: () => `now()`})
  dateCreated: Timestamp

  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]

  @ManyToOne(_ => User, user => user.events)
  user: User

  // @ManyToOne(_ => User, user => user.events)
  // user: User

}