import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IUser } from "../interfaces/user.interface";
import { IEquipment } from "../interfaces/equipment.interface";
import { IBorrower } from "../interfaces/borrower.interface";
import { IBorrowingRecord } from "../interfaces/borrowing_record.interface";
import { User } from "./user.model";

interface EquipmentCreationAttributes
  extends Optional<IEquipment, "equip_id"> {}
export class Equipment
  extends Model<IEquipment, EquipmentCreationAttributes>
  implements IEquipment
{
  public equip_id!: number;
  public asset_tag!: string;
  public type!: string;
  public make!: string;
  public model!: string;
  public operating_sys!: string;
  public processor!: string;
  public storage_type!: string;
  public ram_gb!: number;
  public storage_gb!: number;
  public warranty_end_date!: Date;
  public status!: string;
  public location!: string;
  public responsible_user_id!: number;
}

Equipment.init(
  {
    equip_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operating_sys: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    processor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storage_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ram_gb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storage_gb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warranty_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsible_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "equipment",
    timestamps: false,
  }
);
