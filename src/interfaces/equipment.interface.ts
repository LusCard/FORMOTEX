export interface IEquipment {
  equip_id: number;
  asset_tag: string;
  type: string;
  make: string;
  model: string;
  operating_sys: string;
  processor: string;
  storage_type: string;
  ram_gb: number;
  storage_gb: number;
  warranty_end_date: Date;
  status: string;
  location: string;
  responsible_user_id: number;
}
