import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IUser } from "../interfaces/user.interface";
import { IEquipment } from "../interfaces/equipment.interface";
import { IBorrower } from "../interfaces/borrower.interface";
import { IBorrowingRecord } from "../interfaces/borrowing_record.interface";

interface BorrowerCreationAttributes
  extends Optional<IBorrower, "borrower_id"> {}
export class Borrower
  extends Model<IBorrower, BorrowerCreationAttributes>
  implements IBorrower
{
  public borrower_id!: number;
  public employee_id!: string;
  public name!: string;
  public department!: string;
  public contact_email!: string;
  public status!: string;
}

Borrower.init(
  {
    borrower_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "borrowers",
    timestamps: false,
  }
);
