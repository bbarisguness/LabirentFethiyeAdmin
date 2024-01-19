// assets
import { Building3, PresentionChart, Calendar2, DocumentCopy, Monitor } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Monitor,
  rapor: DocumentCopy,
  calendar: Calendar2,
  aparts: Building3,
  chart: PresentionChart
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
      title: 'Static Sayfalar',
      type: 'item',
      url: '/website/static-page/list',
      icon: icons.widgets
    },
    {
      id: 'website-genel',
      title: 'Genel Ayarlar',
      type: 'item',
      url: '#',
      icon: icons.widgets
    },
    {
      id: 'website-menu',
      title: 'Menü Ayarları',
      type: 'item',
      url: '#',
      icon: icons.widgets
    }
  ]
};

export default website;
