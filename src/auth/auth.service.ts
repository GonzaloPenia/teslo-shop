import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUserDto} from './dto';

@Injectable()

export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  
  ) {}

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true}
      });

      if ( !user )
        throw new BadRequestException('Credentials are not valid (email)');

      if ( !bcrypt.compareSync( password, user.password ) )
        throw new BadRequestException('Credentials are not valid (password)');

      return user;

      //TODO: return JWT Token

    } catch (error) {
      this.handleDBErrors( error );
    }
  }
  async create(createUserDto: CreateUserDto) {
    try {

      const {password, ...userData} = createUserDto;

      const user = this.userRepository.create({...userData, password: bcrypt.hashSync( password, 10 ) });

      await this.userRepository.save(user);
      // TODO: return JWT token
      return user;

    } catch (error) {
      this.handleDBErrors( error );
    }

  }

  private handleDBErrors( error: any ) : never {  
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail );

    console.log(error);

    throw  new InternalServerErrorException('Unexpected error, check server logs');
    
  }
}