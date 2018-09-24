import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Timestamp} from 'typeorm'

// import User from '../users/entity'

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable: false})
  name: string

  @Column('text', {nullable: false})
  desc: string

  @Column('text', {nullable: true})
  imageUrl: string

  @Column('timestamptz', {nullable: true})
  startDate: Timestamp

  @Column('timestamptz', {nullable: true})
  endDate: Timestamp

  @Column('timestamptz', {nullable: false, default: () => `now()`})
  dateCreated: Timestamp

  // @ManyToOne(_ => User, user => user.events)
  // user: User

}