// assets
import { Building3, PresentionChart,Calendar2, Moneys, DocumentCopy } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  widgets: Moneys,
  rapor: DocumentCopy,
  calendar: Calendar2,
  aparts: Building3,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const muhasebe: NavItemType = {
  id: 'group-muhasebe',
  title: "Muhasebe İşlemleri",
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'muhasebe-list',
      title: "İşlem Listesi",
      type: 'item',
      url: '#',
      icon: icons.widgets
    },
    {
      id: 'muhasebe-rapor',
      title: "Raporlar",
      type: 'item',
      url: '#',
      icon: icons.rapor
    }
  ]
};

export default muhasebe;
