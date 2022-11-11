export interface HLoader {
  display?: boolean;
  type: 'default' | 'spinner-message' | 'spinner-logo';
}

export interface HScrollTop {
  display: boolean;
}

export interface HHeader {
  display: boolean;
  width: 'fixed' | 'fluid';
  left: 'menu' | 'page-title';
  fixed: {
    desktop: boolean;
    tabletAndMobile: boolean;
  };
  menuIcon: 'svg' | 'font';
}

export interface HMegaMenu {
  display: boolean;
}

export interface HAside {
  display: boolean;
  theme: 'dark' | 'light';
  menu: 'main' | 'documantion';
  fixed: boolean;
  minimized: boolean;
  minimize: boolean;
  hoverable: boolean;
  menuIcon: 'svg' | 'font';
}

export interface HContent {
  width: 'fixed' | 'fluid';
  layout: 'default' | 'docs';
}

export interface HFooter {
  width: 'fixed' | 'fluid';
}

export interface HSidebar {
  display: boolean;
  toggle: boolean;
  shown: boolean;
  content: 'general' | 'user' | 'shop';
  bgColor: 'bg-white' | 'bg-info';
  displayFooter: boolean;
  displayFooterButton: boolean;
}

export interface HToolbar {
  display: boolean;
  width: 'fixed' | 'fluid';
  fixed: {
    desktop: boolean;
    tabletAndMobileMode: boolean;
  };
  layout: 'toolbar1' | 'toolbar2' | 'toolbar3' | 'toolbar4' | 'toolbar5';
  layouts: {
    toolbar1: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar2: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar3: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar4: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar5: {
      height: string;
      heightAndTabletMobileMode: string;
    };
  };
}

export interface HPageTitle {
  display: boolean;
  breadCrumbs: boolean;
  description: boolean;
  layout: 'default' | 'select';
  direction: 'row' | 'column';
  responsive: boolean;
  responsiveBreakpoint: 'lg' | 'md' | 'lg' | '300px';
  responsiveTarget: string;
}

export interface HMain {
  body?: {
    backgroundImage?: string;
    class: string;
  };
  primaryColor: string;
  darkSkinEnabled: boolean;
  type: 'blank' | 'default' | 'none';
}

export interface HLayout {
  loader: HLoader;
  scrolltop: HScrollTop;
  header: HHeader;
  megaMenu: HMegaMenu;
  aside: HAside;
  content: HContent;
  toolbar: HToolbar;
  footer: HFooter;
  sidebar?: HSidebar;
  main?: HMain;
  pageTitle?: HPageTitle;
}

export interface HLayoutCSSClasses {
  header: Array<string>;
  headerContainer: Array<string>;
  headerMobile: Array<string>;
  headerMenu: Array<string>;
  aside: Array<string>;
  asideMenu: Array<string>;
  asideToggle: Array<string>;
  sidebar: Array<string>;
  toolbar: Array<string>;
  toolbarContainer: Array<string>;
  content: Array<string>;
  contentContainer: Array<string>;
  footerContainer: Array<string>;
  pageTitle: Array<string>;
}

export interface HLayoutHTMLAttributes {
  asideMenu: Map<string, string | number | boolean>;
  headerMobile: Map<string, string | number | boolean>;
  headerMenu: Map<string, string | number | boolean>;
  headerContainer: Map<string, string | number | boolean>;
  pageTitle: Map<string, string | number | boolean>;
}

export interface HLayoutCSSVariables {
  body: Map<string, string | number | boolean>;
}
