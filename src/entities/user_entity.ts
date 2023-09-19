import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Task } from "./task_entity"

export interface IUser extends Document {
    id: number,
    name: string,
    password: string,
    tasks: Task[]
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

}
