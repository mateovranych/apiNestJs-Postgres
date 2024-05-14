import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { userActiveInterface } from '../common/enum/interfaces/user-interface.active';
import { emit } from 'process';
import { Role } from 'src/common/enum/rol.enum';
import { rootCertificates } from 'tls';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,

  ){}


  async create(createCatDto: CreateCatDto, user: userActiveInterface) {
    
    const breed = await this.validateBreed(createCatDto.breed);

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail:user.email,
    })
  }
  async findOne(id: number, user: userActiveInterface) {

    const cat = await this.catRepository.findOneBy({id});

    if(!cat){
      return new BadRequestException('Gato no encontrado.')
    }

    this.validateOwnership(cat, user)

    return cat;
    
  }

  async findAll(user:userActiveInterface) {
    if(user.role === Role.ADMIN){
      return await this.catRepository.find()
    }

    return await this.catRepository.find({
      where: {userEmail: user.email}
    })
    }
  


  async update(id: number, updateCatDto: UpdateCatDto , user: userActiveInterface) {
     
    await this.findOne(id,user)
    return await this.catRepository.update(id,{
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email,
    })
  }

  async remove(id: number, user:userActiveInterface) {
    await this.findOne(id, user);

    return await this.catRepository.softDelete({id});
  }


  private validateOwnership(cat: Cat, user: userActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;

}
}
