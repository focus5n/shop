import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLayout } from './core/LayoutProvider';
import {MenuComponent} from "../utils/components/MenuComponents";
import {AccordionComponents} from "../utils/components/AccordionComponents";
import {HambugerComponents} from "../utils/components/HambugerComponents";
import {ImageInputComponent} from "../utils/components/ImageInputComponent";
import {QuantityComponents} from "../utils/components/QuantityComponents";
import {StepperComponents} from "../utils/components/StepperComponents";
import {ScrollComponent} from "../utils/components/ScrollComponent";
import {Rain} from "../utils/components/Rain";

export function HInit() {
  const { config } = useLayout();
  const location = useLocation()
  const isFirstRun = useRef(true);
  const ComponentInitialization = () => {
    MenuComponent.bootstarp()
    isFirstRun.current = false
    setTimeout(() => {
    }, 100)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      ComponentInitialization();
    }
  }, [config])

  useEffect(() => {
    setTimeout(() => {   
      MenuComponent.reinitialization()
      AccordionComponents.bootstrap()
      HambugerComponents.bootstrap()
      ImageInputComponent.bootstrap()
      QuantityComponents.bootstrap()
      StepperComponents.bootstrap()
      ScrollComponent.bootstrap()
      Rain.bootstrap()
    }, 10)
  }, [location.key])



  return <></>
}
