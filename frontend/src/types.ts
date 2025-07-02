export interface Product {
  id: number;
  serial_number: number;
  is_new: boolean;
  photo: string | null;
  title: string;
  type: string | null;
  specification: string | null;
  guarantee_start: string;
  guarantee_end: string;
  price_usd: number | null;
  price_uah: number | null;
  is_default_currency: string | null;
  order_id: number;
  date: string;
  status: string | null;
  condition: string | null;
  username: string | null;
  arrival_name: string | null;
  group_name: string | null;
}

export interface OrderWithProducts {
  id: number;
  title: string;
  date: string;
  description: string | null;
  productCount: number;
  totalUSD: number;
  totalUAH: number;
  products: Product[];
}

export interface Option {
  value: string | null;
  label: string | null;
}
