import React, { Suspense } from 'react'
import { Outlet } from 'react-router';
import { LayoutSplashScreen } from '../_h/layout/core/HSplashScreen';
import { HInit } from '../_h/layout/HInit';
import { ShopAuthInit } from './shop/pages/auth/core/ShopAuth';


const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
          <ShopAuthInit>
            <Outlet />
            <HInit />
          </ShopAuthInit>
    </Suspense>
  );
};

export { App };
