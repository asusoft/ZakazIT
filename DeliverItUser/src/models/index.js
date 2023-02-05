// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SizeName = {
  "SMALL": "SMALL",
  "MEDIUM": "MEDIUM",
  "BIG": "BIG"
};

const OrderStatus = {
  "ACCEPTED": "ACCEPTED",
  "PREPARING": "PREPARING",
  "ARRIVING": "ARRIVING",
  "READY_FOR_PICK_UP": "READY_FOR_PICK_UP",
  "COMPLETED": "COMPLETED"
};

const { Dish, Sizes, Categories, OrderItem, Order, Restaurant, Cart, CartItem, User, CategoriesDish } = initSchema(schema);

export {
  Dish,
  Sizes,
  Categories,
  OrderItem,
  Order,
  Restaurant,
  Cart,
  CartItem,
  User,
  CategoriesDish,
  SizeName,
  OrderStatus
};