import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity()
export class Cat {

    @Column({primary:true, generated:true})
    id: number;
    @Column()
    name: string;
    @Column()
    age:number;


    @ManyToOne(()=> Breed ,(breed)=>breed.id, {
        eager:true
    })
    breed: Breed;
    
    @DeleteDateColumn() //Sirve para eliminaciones fiscas, pone la fecha
    deleteAt: Date;

    @ManyToOne(()=> User)
    @JoinColumn({name:'email', referencedColumnName: 'email',})
    user: User;


    @Column()
    userEmail:string;

    @Column()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;



    
}
