// assets
import { Building3, PresentionChart, Home3, CalendarSearch, CalendarAdd } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Home3,
  list: CalendarSearch,
  calendar: CalendarAdd,
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
      url: '/reservation/add',
      icon: icons.calendar
    },
    {
      id: 'reservation-list',
      title: 'Rezervasyon Listesi',
      type: 'item',
      url: '/reservation/list',
      icon: icons.list
    },
    {
      id: 'reservation-available',
      title: 'Müsaitlik Listesi',
      type: 'item',
      url: '/reservation/availablelist',
      icon: icons.list
    }
  ]
};

export default reservation;
