import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categorys/models/category.model";
import { Order } from "src/orders/models/order.model";
import { Staff } from "src/staff/models/staff.model";

interface ProductAttr {
    name: string;
    image: string;
    price: string;
    category_id: number;
}


@Table({ tableName: "product" })
export class Product extends Model<Product, ProductAttr>{
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    price: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER
    })
    category_id: number;
    @BelongsTo(() => Category)
    category: Category

    // @ForeignKey(() => Staff)
    // @Column({
    //     type: DataType.INTEGER
    // })
    // staff_id: number;
    // @BelongsTo(() => Staff)
    // staff: Staff


    @HasMany(() => Order)
    order: Order
}
