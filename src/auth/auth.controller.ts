import { Controller, Get, Post, Body, UseGuards, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto, LoginUserDto} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders, request } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from 'src/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto) {
      return this.authService.create(createUserDto);
    }
  
    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
      return this.authService.login(loginUserDto);
    }

    @Get('private')
    @UseGuards( AuthGuard() )
    testingPrivateRoute( 
      @GetUser() user: User,
      @GetUser('email') userEmail: string,

      @RawHeaders() rawHeaders: string[],
      @Headers() headers : IncomingHttpHeaders,
    ) {
      
      console.log( request );

      return {
        ok: true,
        message: 'Hola mundo private',
        user,
        userEmail,
        rawHeaders
      }
    }

    @Get('private2')
    @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
    @UseGuards( AuthGuard(), UserRoleGuard )
    privateRoute2(
      @GetUser() user: User,
    ) {
      return {
        ok: true,
        user
      }
    }

}
