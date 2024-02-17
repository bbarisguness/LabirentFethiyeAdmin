// assets
import { Building3, PresentionChart, Home3, Building4 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Home3,
  villas: Building3,
  aparts: Building4,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const tesis: NavItemType = {
  id: 'group-tesis',
  title: 'Tesis İşlemleri',
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'villas',
      title: 'Villalar',
      type: 'item',
      url: '/villa/list',
      icon: icons.villas
    },
    {
      id: 'aparts',
      title: 'Apartlar',
      type: 'item',
      url: '#',
      icon: icons.aparts
    }
  ]
};

export default tesis;
