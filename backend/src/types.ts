export interface Order {
  id: number;
  title: string;
  date: string;
  description: string | null;
}

export interface OrderInput {
  title: string;
  date: string;
  description?: string;
}

export type ProductWithOrderTitle = {
  id: number;
  serial_number: number;
  is_new: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee_start: string;
  guarantee_end: string;
  price_usd: number;
  price_uah: number;
  is_default_currency: string;
  order_id: number;
  date: string;
  order_title: string;
};

export type ProductInput = {
  serial_number: number;
  is_new: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee_start: string;
  guarantee_end: string;
  price_usd: number;
  price_uah: number;
  is_default_currency: string;
  order_id: number;
  date: string;
};
