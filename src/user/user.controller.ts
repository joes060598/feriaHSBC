import { Controller, Post, Get, Body, Res, HttpStatus, UsePipes, ValidationPipe,Put,Param } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserDto } from './dto/user.dto';
import { Login } from './dto/login.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('/create')
  async saveUser(@Res() res, @Body() userDto: UserDto): Promise<any> {
    try {
      
      let user: any = await this.userService.save(userDto);
      if (!user.error) {
        return res.status(HttpStatus.OK).json({
          message: 'User succesfully created',
          user,
          statusCode: 200
        })
      } else {

        let index = user.error.indexOf("email_unique_index");
        let message: string;
        index != -1 ? 'Este email ya ha sido registrado' : '';
        let index2 = user.error.indexOf("phone_unique_index");
        index != -1 ? message = 'Este email ya ha sido registrado' : null;
        index2 != -1 ? message = 'Este número telefonico ya ha sido registrado' : null;

        return res.status(HttpStatus.OK).json({
          message: message != undefined ? message : user.error,
          statusCode: 400
        })
      }
    } catch (error) {
      console.log('error :>> ', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }
  }


  @Get()
  async getUsers(@Res() res): Promise<any> {
    try {
      let users: Array<any> = await this.userService.getUsers();
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: users,
        statusCode: 200
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }

  }


  /**
 *
 * 
 * 
 */
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() signinDto: Login, @Res() res) {
    try {
      let token: any = await this.userService.login(signinDto);
      if(!token.error){
        return res.status(HttpStatus.OK).json({
          message: 'success',
          data: token,
          statusCode: 200
        })
      }else{
        return res.status(HttpStatus.OK).json({
          message: token.error,
          statusCode: 400
        })
      }

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }
  }

  @Post('/createCsv')
  async saveCsv(@Res() res, ): Promise<any> {
    try {
      
      let user: any = await this.userService.saveCsv();
      if (!user.error) {
        return res.status(HttpStatus.OK).json({
          message: 'User succesfully created',
          user,
          statusCode: 200
        })
      } else {

        let index = user.error.indexOf("email_unique_index");
        let message: string;
        index != -1 ? 'Este email ya ha sido registrado' : '';
       
        index != -1 ? message = 'Este email ya ha sido registrado' : null;
       
        return res.status(HttpStatus.OK).json({
          message: message != undefined ? message : user.error,
          statusCode: 400
        })
      }
    } catch (error) {
      console.log('error :>> ', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }
  }
  @Get("/:email")
  async getOneUser(@Res() res, @Param('email') email): Promise<any> {
    try { 
      let user: any = await this.userService.getOneUser(email);
      if (!user.error) {
        return res.status(HttpStatus.OK).json({
          message: 'User succesfully consulted',
          user,
          statusCode: 200
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: user.error,
          user,
          statusCode: 400
        })
      }
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }
  }

  @Put()
  async updateUser(@Res() res, @Param('email') email,@Body() body:any): Promise<any> {
    try {
      let user: any = await this.userService.updateOneUser(email,body);
      if (!user.error) {
        return res.status(HttpStatus.OK).json({
          message: 'User succesfully updated',
          user,
          statusCode: 200
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: user.error,
          statusCode: 400
        })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }
  }


}
