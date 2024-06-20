import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ShowcaseFooter from '../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter';
import ShowcaseHeader from '../../../layouts/showcaseLayouts/ShowcaseHeader/ShowcaseHeader';
import ShowcaseMain from '../../../layouts/showcaseLayouts/ShowcaseMain/ShowcaseMain';
import RestaurantName from '../../../UI/RestaurantName/RestaurantName';
import RestaurantRatings from '../../../UI/RestaurantRatings/RestaurantRatings';
import classes from './ShowcasePage.module.css';

// SVG иконки для кнопки
import { ReactComponent as ExpandIcon } from '../../../UI/icons/ShapeTop/Shape.svg';
import { ReactComponent as CollapseIcon } from '../../../UI/icons/Shape/Shape.svg';
import TopBar from '../../../UI/TopBar/TopBar';


import defaultCafeImage from '../../../UI/icons/img/16-08-21-001.jpg';



const ShowcasePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [restaurant, setRestaurant] = useState({ name: '', rating: 0, photo: 'default_cafe_01.png' });
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';
  const isLanguagePage = location.pathname === '/language';
  const isProductPage = /^\/[^/]+\/[^/]+$/.test(location.pathname); 

  useEffect(() => {
    
    const fetchRestaurant = async () => {
      try {
        const response = await fetch('http://94.124.78.52:8017/restaurant/?restaurant_id=1');
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных о ресторане:', error);
      }
    };

    fetchRestaurant();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const backgroundImage = restaurant.photo === 'default_cafe_01.png'
    ? `url(${defaultCafeImage})`
    : `url(http://94.124.78.52:8017/${restaurant.photo})`;

  const backgroundStyle = {
    background: `linear-gradient(
      rgba(0, 0, 0, 0.559), 
      rgba(255, 255, 255, 0)
    ), ${backgroundImage} no-repeat center center fixed`,
    backgroundSize: 'cover',
  };

  return (
    <div>
    
    <div
      className={isLanguagePage ? classes.languageBackground : (isProductPage || isHomePage ? classes.background : classes.normalBackground)}
      style={isHomePage || isProductPage ? backgroundStyle : {}}
    >
      {(isHomePage || isProductPage) && (
        <div className={classes.headerInfo}>
          <TopBar fill='#fff' />
          <RestaurantName name={restaurant.name} />
          <RestaurantRatings rating={restaurant.rating} />
        </div>
      )}
      
      <div className={classes.showcaseContainer}>
        {(isProductPage || isHomePage) && (
          <button onClick={toggleExpand} className={`${classes.expandButton} ${isExpanded ? classes.expandedButton : classes.collapsedButton}`}>
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        )}
       
      </div>
      <div className={`${classes.showcase} ${isProductPage || isHomePage ? (isExpanded ? classes.expanded : classes.collapsed) : ''}`}>
          <ShowcaseMain>
            <Outlet />
          </ShowcaseMain>
        </div>
    </div>
    </div>
  );
};

export default ShowcasePage;
