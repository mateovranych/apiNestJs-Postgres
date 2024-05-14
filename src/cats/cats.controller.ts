import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enum/rol.enum';
import { ActiveUser } from 'src/common/enum/decorators.active.user/active-user.decoratorts';
import { userActiveInterface } from 'src/common/enum/interfaces/user-interface.active';


@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(
    @Body() createCatDto: CreateCatDto, 
    @ActiveUser() user: userActiveInterface
  ) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(@ActiveUser() user:userActiveInterface) {
    console.log(user)
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number, 
    @ActiveUser()
    user: userActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateCatDto: UpdateCatDto, 
    @ActiveUser() 
    user: userActiveInterface) {
    return this.catsService.update(+id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user:userActiveInterface) {
    return this.catsService.remove(+id, user);
  }
}
