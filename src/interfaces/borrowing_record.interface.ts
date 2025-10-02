export interface IBorrowingRecord {
  record_id: number;
  equip_id: number;
  borrower_id: number;
  user_id: number;
  borrow_date: Date;
  return_due_date: Date;
  return_date: Date | null;
  condition_on_return: string | null;
}
