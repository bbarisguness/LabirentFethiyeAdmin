// assets
import { Building3, PresentionChart, Calendar1, Calendar2, Settings } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Settings,
  list: Calendar1,
  calendar: Calendar2,
  aparts: Building3,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const fast: NavItemType = {
  id: 'group-fast',
  title: 'Hızlı İşlemler',
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'fast-ozet',
      title: 'Özet',
      type: 'item',
      url: '/',
      icon: icons.widgets
    },
    {
      id: 'fast-daily',
      title: 'Günlük İşlemler',
      type: 'item',
      url: '#',
      icon: icons.widgets
    },
    {
      id: 'fast-reservation',
      title: 'Yeni Rezervasyon',
      type: 'item',
      url: '#',
      icon: icons.calendar
    }
  ]
};

export default fast;
