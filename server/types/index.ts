export type Opening = {
    date: string;
    orders: Order[];
}

export type Order = {
    order_name: string;
    order_time: string;
    order_items?: OrderItem[]
}

export type OrderItem = {
    order_item_reference: Pizza
    order_item_comment: string
}

export type Pizza = {
    name: string;
    price: number;
    ingredients: string;
    pizza_section:  'pizza' | 'season' | 'flamm';
    is_available: boolean;
}