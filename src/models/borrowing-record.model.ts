import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IUser } from "../interfaces/user.interface";
import { IEquipment } from "../interfaces/equipment.interface";
import { IBorrower } from "../interfaces/borrower.interface";
import { IBorrowingRecord } from "../interfaces/borrowing_record.interface";
import { Equipment } from "./equipment.model";
import { Borrower } from "./borrower.model";
import { User } from "./user.model";

interface BorrowingRecordCreationAttributes
  extends Optional<IBorrowingRecord, "record_id" | "return_date"> {}
export class BorrowingRecord
  extends Model<IBorrowingRecord, BorrowingRecordCreationAttributes>
  implements IBorrowingRecord
{
  public record_id!: number;
  public equip_id!: number;
  public borrower_id!: number;
  public user_id!: number;
  public borrow_date!: Date;
  public return_due_date!: Date;
  public return_date!: Date | null;
  public condition_on_return!: string | null;
}

BorrowingRecord.init(
  {
    record_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    return_due_date: { type: DataTypes.DATE, allowNull: false },
    return_date: { type: DataTypes.DATE, allowNull: true },
    condition_on_return: { type: DataTypes.STRING, allowNull: true },

    equip_id: {
      type: DataTypes.INTEGER,
      references: { model: Equipment, key: "equip_id" },
      allowNull: false,
    },
    borrower_id: {
      type: DataTypes.INTEGER,
      references: { model: Borrower, key: "borrower_id" },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "user_id" },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "borrowing_records",
    timestamps: false,
  }
);
