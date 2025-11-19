import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
  ) {}
  
  async runSeed() {
    if(await this.insertNewProducts() === true) return 'Seed executed successfully';
    else return 'Seed failed';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<any>[] = [];
    products.forEach( product => {
      insertPromises.push( this.productsService.create(product) );
    });
    const result = await Promise.all(insertPromises);
    return true;
  }
  
}
