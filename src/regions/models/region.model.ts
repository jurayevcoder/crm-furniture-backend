import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { City } from "src/cities/models/city.model";

interface RegionAttr {
    name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, RegionAttr>{
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

    @HasMany(() => City)
    city: City
}
