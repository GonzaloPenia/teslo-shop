import { IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
      @PrimaryColumn('uuid')
      id: string;

      @Column('text', { unique: true })
      @IsString()
      email: string;

      @Column('text', {select: false})
      password: string;

      @Column('text')
      fullName: string;
      
      @Column('bool', { default: true })
      isActive: boolean;
      
      @Column('text', { 
            array: true, 
            default: ['user', 'admin', 'super-user']
      })
      roles: string[];

}
