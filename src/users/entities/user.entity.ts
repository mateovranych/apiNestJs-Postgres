import { Role } from "src/common/enum/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username: string;
    @Column({unique:true , nullable :false })
    email: string;
    @Column({nullable:false, select:false})
    password: string;
    @Column({type:'enum', enum: Role, default: Role.USER })
    role: string;
    @DeleteDateColumn()
    deleteAt: Date;

}
