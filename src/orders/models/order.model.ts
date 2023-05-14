import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { City } from "src/cities/models/city.model";
import { Contact } from "src/contacts/models/contact.model";
import { Product } from "src/products/models/product.model";
import { Staff } from "src/staff/models/staff.model";

interface OrderAttr {
    product_id: number;
    full_name: string;
    address: string;
    target: string;
    status: number;
    contact_id: number;
    city_id: number;
    staff_id: number
    description: string;
}


@Table({ tableName: "order" })
export class Order extends Model<Order, OrderAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER
    })
    product_id: number;
    @BelongsTo(() => Product)
    product: Product

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    target: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    status: number;

    @ForeignKey(() => Contact)
    @Column({
        type: DataType.INTEGER
    })
    contact_id: number;
    @BelongsTo(() => Contact)
    contact: Contact


    @ForeignKey(() => City)
    @Column({
        type: DataType.INTEGER
    })
    city_id: number;
    @BelongsTo(() => City)
    city: City


    @ForeignKey(() => Staff)
    @Column({
        type: DataType.INTEGER
    })
    staff_id: number;
    @BelongsTo(() => Staff)
    staff: Staff

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    // @HasMany(() => Order)
    // order: Orderu
}
