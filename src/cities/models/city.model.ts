import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/orders/models/order.model";
import { Region } from "src/regions/models/region.model";

interface CityAttr {
    name: string,
    region_id: number;
}

@Table({tableName: "city"})
export class City extends Model<City, CityAttr>{
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

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER
    })
    region_id: number;
    @BelongsTo(() => Region)
    region: Region

    // @HasMany(() => Order)
    // order: Order
}
