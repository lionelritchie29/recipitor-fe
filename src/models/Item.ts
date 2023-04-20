export interface Item {
  ID: number;
  Name: string;
  Description: string;
  Image: string;
  CreatedAt: Date;
  UpdateAt: Date;
  DeletedAt: Date | null;
}
