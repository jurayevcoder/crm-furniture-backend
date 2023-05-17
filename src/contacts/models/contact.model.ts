import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/orders/models/order.model";
import { Staff } from "src/staff/models/staff.model";

interface ContactAttr {
    phone_number: string;
    staff_id: number;
    status: boolean;
}

@Table({ tableName: "contact" })
export class Contact extends Model<Contact, ContactAttr>{
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
    phone_number: string;

    @ForeignKey(() => Staff)
    @Column({
        type: DataType.INTEGER
    })
    staff_id: number;
    @BelongsTo(() => Staff)
    staff: Staff

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    status: boolean;

    @HasMany(() => Order)
    order: Order
}
