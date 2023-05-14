import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/models/product.model";

interface CategoryAttr {
    name: string;
}


@Table({ tableName: "category" })
export class Category extends Model<Category, CategoryAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @HasMany(() => Product)
    product: Product
}
