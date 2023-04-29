export interface CreateListDto {
  name: string;
  items: CreateListItemDto[];
}

export interface CreateListItemDto {
  id: number;
  amount: string;
  quantity: number;
}
