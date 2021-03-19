import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { CompanyDetails } from "./companydetails";
import { SystemDetails } from "./systemdetails";


@Entity()

export class ApplicationUser {

    @PrimaryGeneratedColumn()
     UserId : number;
    
     @Column({ nullable: true })
     UserName?:string;
       
     @Column({ nullable: true })
     FullName?:string;
    
     @Column({ nullable: true })
     JobRole?:string;

     @Column({ nullable: true })
     ContactNo?:string;

     @Column({ nullable: true })
     Email?:string;

     @Column({ nullable: true })
     UserRole?:string;

     @Column({ nullable: true })
     Password?:string;

     @Column({ nullable: true })
     ConfirmPassword?:string;
     
    

     
     @OneToOne(type=>CompanyDetails , company => company.ApplicationUser)
     CompanyDetails : CompanyDetails

     @OneToOne(type=>SystemDetails , system => system.ApplicationUser)
     SystemDetails : SystemDetails

}