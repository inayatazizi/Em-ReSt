import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { ApplicationUser } from "./applicationuser";


@Entity()

export class SystemDetails {


    @PrimaryGeneratedColumn()
    SystemId?:number;

    @Column({ nullable: true })
    Licence_No?:string;

    @Column({ nullable: true })
    Licence_started?:Date;

    @Column({ nullable: true })
    Licence_Expiry?:Date;

    @Column({ nullable: true })
    NoSystem?:number;

    @Column({ nullable: true })
    DataStorage?:number;
    

    @Column({ nullable: true })
    UserName?:string;

    @Column()
    application_user : number;
    

    @OneToOne(type=> ApplicationUser, _ApplicationUser => ApplicationUser , {
        eager:true,
        onDelete:"CASCADE"
    })  

    @JoinColumn({name:"application_user"})
    ApplicationUser : ApplicationUser

}