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
import TopBar from '../../../UI/TopBar/TopBar';

const ShowcasePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isHomePage ? classes.background : classes.normalBackground}>
      {isHomePage && (
        <div className={classes.headerInfo}>
          <TopBar fill='#fff' />
          <RestaurantName name="Gusto Bistro" />
          <RestaurantRatings rating={4.5} />
        </div>
      )}



      <div className={classes.showcaseContainer}>
        <div className={`${isCartPage ? classes.showcaseCart : classes.showcase} ${isHomePage ? (isExpanded ? classes.expanded : classes.collapsed) : ''}`}>
          {/* <ShowcaseHeader /> */}
          <ShowcaseMain>
            <Outlet />
          </ShowcaseMain>
          {/* <ShowcaseFooter /> */}
        </div>

        {isHomePage && (
          <button onClick={toggleExpand} className={`${classes.expandButton} ${isExpanded ? classes.expandedButton : classes.collapsedButton}`}>
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowcasePage;
