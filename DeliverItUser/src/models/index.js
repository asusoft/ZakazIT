// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SizeName = {
  "SMALL": "SMALL",
  "MEDIUM": "MEDIUM",
  "BIG": "BIG"
};

const { Dish, Sizes, Categories, Restaurant, CategoriesDish } = initSchema(schema);

export {
  Dish,
  Sizes,
  Categories,
  Restaurant,
  CategoriesDish,
  SizeName
};