import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Contact } from "src/contacts/models/contact.model";
import { Order } from "src/orders/models/order.model";
import { Product } from "src/products/models/product.model";
// import { v4 as uuidv4, v4 } from 'uuid';

interface SatffAttr {
    full_name: string,
    phone_number: string,
    card: string,
    login: string,
    password: string,
    is_active: boolean,
    role: string,
}


@Table({ tableName: "staff" })
export class Staff extends Model<Staff, SatffAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    full_name: string;

    @Column({
        type: DataType.STRING
    })
    phone_number: string;

    @Column({
        type: DataType.STRING
    })
    card: string;

    @Column({
        type: DataType.STRING
    })
    login: string;

    @Column({
        type: DataType.STRING
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @Column({
        type: DataType.STRING
    })
    role: string;

    @Column({
        type: DataType.STRING
    })
    hashed_token: string

    // @HasMany(() => Product)
    // product: Product

    // @HasMany(() => Contact)
    // contact: Contact

    // @HasMany(() => Order)
    // order: Order
}
