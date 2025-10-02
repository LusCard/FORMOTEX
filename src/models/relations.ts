import { Borrower } from "./borrower.model";
import { BorrowingRecord } from "./borrowing-record.model";
import { Equipment } from "./equipment.model";
import { User } from "./user.model";

User.hasMany(Equipment, {
  foreignKey: "responsible_user_id",
  as: "responsibleEquipment",
});

Equipment.belongsTo(User, {
  foreignKey: "responsible_user_id",
  as: "responsibleUser",
});

Borrower.belongsToMany(Equipment, {
  through: BorrowingRecord,
  foreignKey: "borrower_id",
  otherKey: "equip_id",
  as: "borrowedEquipment",
});

Equipment.belongsToMany(Borrower, {
  through: BorrowingRecord,
  foreignKey: "equip_id",
  otherKey: "borrower_id",
  as: "borrowedBy",
});

Borrower.hasMany(BorrowingRecord, { foreignKey: "borrower_id" });
BorrowingRecord.belongsTo(Borrower, { foreignKey: "borrower_id" });

Equipment.hasMany(BorrowingRecord, { foreignKey: "equip_id" });
BorrowingRecord.belongsTo(Equipment, { foreignKey: "equip_id" });

User.hasMany(BorrowingRecord, {
  foreignKey: "user_id",
  as: "managedRecords",
});
BorrowingRecord.belongsTo(User, {
  foreignKey: "user_id",
  as: "managedBy",
});
