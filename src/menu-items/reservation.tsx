// assets
import { Building3, PresentionChart, Home3, Calendar1, Calendar2 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Home3,
  list: Calendar1,
  calendar: Calendar2,
  aparts: Building3,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const reservation: NavItemType = {
  id: 'group-tesis',
  title: 'Rezervasyon İşlemleri',
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'fast-reservation',
      title: 'Yeni Rezervasyon',
      type: 'item',
      url: '#',
      icon: icons.calendar
    },
    {
      id: 'reservation-list',
      title: 'Rezervasyon Listesi',
      type: 'item',
      url: '/reservation/list',
      icon: icons.list
    }
  ]
};

export default reservation;
