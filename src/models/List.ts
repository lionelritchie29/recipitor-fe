export interface List {
  Name: string;
  Items: ListItem[];
}

export interface ListItem {
  Id: number;
  Name: string;
  Image: string;
  Quantity: number;
  Amount: string;
}
