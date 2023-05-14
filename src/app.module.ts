import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { ContactsModule } from './contacts/contacts.module';
import { RegionsModule } from './regions/regions.module';
import { OrdersModule } from './orders/orders.module';
import { CategorysModule } from './categorys/categorys.module';
import { StaffModule } from './staff/staff.module';
import { CitiesModule } from './cities/cities.module';
import { Staff } from './staff/models/staff.model';
import { Category } from './categorys/models/category.model';
import { Region } from './regions/models/region.model';
import { City } from './cities/models/city.model';
import { Contact } from './contacts/models/contact.model';
import { Product } from './products/models/product.model';
import { Order } from './orders/models/order.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Staff, Category, Region, City, Contact, Product, Order],
      autoLoadModels: true,
      logging: false,
    }),
    ProductsModule,
    ContactsModule,
    RegionsModule,
    OrdersModule,
    CategorysModule,
    StaffModule,
    CitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
