import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user_entity";

export enum TaskState { 
  TODO = 'por hacer',
  INPROCESS = 'en proceso',
  COMPLETED = 'completado'
}

export interface ITask extends Document {
  id: number,
  title: string,
  dscription: string,
  state: TaskState,
  user: User
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.TODO
  })
  state: TaskState

  @ManyToOne(() => User, (user) => user.tasks)
  user: User

}