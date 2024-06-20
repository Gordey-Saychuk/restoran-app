// src/components/pages/showcasePages/DiscountProductsPage/DiscountProductsPage.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store/store';
import { fetchDishes, Dish } from '../../../../store/discountedProductsSlice';
import { fetchCategories } from '../../../../store/categoriesSlice';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import classes from './DiscountProductsPage.module.css';
import Filter from '../../../showcase/Filter/Filter';

interface IDiscountProductsPageProps {
  restaurantId: number;
}

const DiscountProductsPage: React.FC<IDiscountProductsPageProps> = ({ restaurantId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dishes, isLoading: dishesLoading, error: dishesError } = useSelector((state: RootState) => state.discountedProducts);
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchDishes(restaurantId));
    dispatch(fetchCategories(restaurantId));
  }, [dispatch, restaurantId]);

  const handleCategoryCheck = (categoryId: number) => {
    setSelectedCategories((prev) => 
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const filteredDishes = selectedCategories.length > 0 
    ? dishes.filter(dish => selectedCategories.includes(dish.category_id)) 
    : dishes;

  return (
    <Section>
      <div className={classes.headerInfo}>
        <div className={classes.filter}>
          {categoriesLoading && <Placeholder text="Загружаем категории..." size="38px" />}
          {categoriesError && <Placeholder text={categoriesError} size="38px" />}
          {!categoriesLoading && !categoriesError && (
            <Filter 
              checkboxItems={categories} 
              onCheck={handleCategoryCheck} 
            />
          )}
        </div>

        {dishesLoading && <Placeholder text="Загружаем продукты..." size="38px" />}
        {dishesError && <Placeholder text={dishesError} size="38px" />}
        {!dishesLoading && !dishesError && filteredDishes.length === 0 && (
          <Placeholder text="No dishes available" size="38px" />
        )}
        {!dishesLoading && !dishesError && filteredDishes.length > 0 && (
          <ProductCardList dishes={filteredDishes} />
        )}
      </div>
    </Section>
  );
};

export default DiscountProductsPage;
