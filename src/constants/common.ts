export const GENDER = [
    {
      id: '1',
      name: 'Унисекс',
      url: 'unisex',
    },
    {
      id: '2',
      name: 'Женский',
      url: 'female',
    },
    {
      id: '3',
      name: 'Мужской',
      url: 'male',
    },
  ];

 // src/types/common.ts
export interface Dish {
  id: number;
  restaurant_id: number;
  category_id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  extra: object;
}

