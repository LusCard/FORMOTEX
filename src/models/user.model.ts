import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IUser } from "../interfaces/user.interface";
import { IEquipment } from "../interfaces/equipment.interface";
import { IBorrower } from "../interfaces/borrower.interface";
import { IBorrowingRecord } from "../interfaces/borrowing_record.interface";

interface UserCreationAttributes extends Optional<IUser, "user_id"> {}
export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user";
  public is_active!: boolean;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);
