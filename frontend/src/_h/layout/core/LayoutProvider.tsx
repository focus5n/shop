import React, { createContext, useContext, useState, useEffect } from 'react';
import { LayoutConfig } from './LayoutConfig';
import {
  getEmptyCssClasses,
  getEmptyCSSVariables,
  getEmptyHTMLAttributes,
  LayoutSetup,
} from './LayoutSetup';
import {
  HLayout,
  HLayoutCSSVariables,
  HLayoutCSSClasses,
  HLayoutHTMLAttributes,
} from './LayoutModels';

type Props = {
  children: React.ReactNode
}

export interface LayoutContextModel {
  config: HLayout;
  classes: HLayoutCSSClasses;
}

export interface LayoutContextModel {
  config: HLayout;
  classes: HLayoutCSSClasses;
  attributes: HLayoutHTMLAttributes;
  cssVariables: HLayoutCSSVariables;
  setLayout: (config: LayoutSetup) => void;
}

const LayoutContext = createContext<LayoutContextModel>({
  config: LayoutConfig,
  classes: getEmptyCssClasses(),
  attributes: getEmptyHTMLAttributes(),
  cssVariables: getEmptyCSSVariables(),
  setLayout: (config: LayoutSetup) => { },
});

const enableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'flex');
  }
};

const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none');
  }
};

const LayoutProvider: React.FC<Props> = ({ children }) => {

  const [config, setConfig] = useState(LayoutSetup.config);
  const [classes, setClasses] = useState(LayoutSetup.classes);
  const [attributes, setAttributes] = useState(LayoutSetup.attributes);
  const [cssVariables, setCSSVariables] = useState(LayoutSetup.cssVariables);
  const setLayout = (_themeConfig: Partial<HLayout>) => {
    enableSplashScreen();
    const bodyClasses = Array.from(document.body.classList);
    bodyClasses.forEach((cl) => document.body.classList.remove(cl));
    LayoutSetup.updatePartialConfig(_themeConfig);
    setConfig(Object.assign({}, LayoutSetup.config));
    setClasses(LayoutSetup.classes);
    setAttributes(LayoutSetup.attributes);
    setCSSVariables(LayoutSetup.cssVariables);
    setTimeout(() => {
      disableSplashScreen();
    }, 500);
  };
  const value: LayoutContextModel = {
    config,
    classes,
    attributes,
    cssVariables,
    setLayout,
  };

  useEffect(() => {
    disableSplashScreen();
  }, []);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };

export function useLayout() {
  return useContext(LayoutContext);
}
