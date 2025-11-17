import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  
  async create(createProductDto: CreateProductDto) {
    
    try {

      const product = this.productRepository.create(createProductDto) //Creamos el producto en memoria
      await this.productRepository.save(product) //Lo guardamos en la base de datos
      return product;
    
    } catch (error) {
        this.handleDBException(error);
    }
  }

  findAll( paginationDto: PaginationDto) {
    
    const { limit = 10, offset = 0 } = paginationDto;

    return this.productRepository.find({
      take: limit,
      skip: offset
    });

  }

  async findOne(id: string) {
  
    const product = await this.productRepository.findOneBy({id});
    if (!product)
      throw new BadRequestException(`Product with id ${id} not found`);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBException(error: any) {
    if(error.code==='23505') 
      throw new BadRequestException(error.detail);
      
    this.logger.error(error)
    throw new InternalServerErrorException('Ayuda!!!')
  }


  }