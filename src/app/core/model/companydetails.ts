import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { ApplicationUser } from "./applicationuser";


@Entity()

export class CompanyDetails {

    @PrimaryGeneratedColumn()
    CompanyId?:number;

    @Column({ nullable: true })
    CompanyName?:string;

    @Column({ nullable: true })
    CompanyRegistrationNo?:string;

    @Column({ nullable: true })
    CompanyAddress ?:string;

    @Column({ nullable: true })
    PostCode?:string;
    
    @Column({ nullable: true })
    Country?:string;

    
    @Column({ nullable: true })
    ContactNo?:string;

    @Column()
    application_user : number;
    

    @OneToOne(type=> ApplicationUser, _ApplicationUser => ApplicationUser , {
        eager:true,
        onDelete:"CASCADE"
    })  

    @JoinColumn({name:"application_user"})
    ApplicationUser : ApplicationUser
    


}