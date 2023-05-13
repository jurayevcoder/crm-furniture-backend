import { Column, DataType, Model, Table } from "sequelize-typescript";

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
}
