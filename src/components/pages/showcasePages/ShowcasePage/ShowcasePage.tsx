import React, { useState } from 'react';
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

const ShowcasePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProductPage = /^\/[^/]+\/[^/]+$/.test(location.pathname); // Проверка пути для страницы продукта

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isProductPage || isHomePage ? classes.background : classes.normalBackground}>
      {(isHomePage || isProductPage) && (
        <div className={classes.headerInfo}>
          <RestaurantName name="Gusto Bistro" />
          <RestaurantRatings rating={4.5} />
        </div>
      )}

      <div className={classes.showcaseContainer}>
        <div className={`${classes.showcase} ${isProductPage || isHomePage ? (isExpanded ? classes.expanded : classes.collapsed) : ''}`}>
          {/* <ShowcaseHeader /> */}
          <ShowcaseMain>
            
            <Outlet />
          </ShowcaseMain>
          {/* <ShowcaseFooter /> */}
        </div>

        {(isProductPage || isHomePage) && (
          <button onClick={toggleExpand} className={`${classes.expandButton} ${isExpanded ? classes.expandedButton : classes.collapsedButton}`}>
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowcasePage;
