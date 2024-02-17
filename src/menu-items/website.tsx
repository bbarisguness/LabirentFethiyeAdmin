// assets
import { DocumentText, MenuBoard, Monitor, Setting2 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Monitor,
  menu: MenuBoard,
  staticpage: DocumentText,
  setting: Setting2
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const website: NavItemType = {
  id: 'group-website',
  title: 'Web Site İşlemleri',
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'website-staticpage',
      title: 'Sabit Sayfalar',
      type: 'item',
      url: '/website/static-page/list',
      icon: icons.staticpage
    },
    {
      id: 'website-genel',
      title: 'Genel Ayarlar',
      type: 'item',
      url: '#',
      icon: icons.setting
    },
    {
      id: 'website-menu',
      title: 'Menü Ayarları',
      type: 'item',
      url: '#',
      icon: icons.menu
    }
  ]
};

export default website;
