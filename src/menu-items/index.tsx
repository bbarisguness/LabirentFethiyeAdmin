// project-imports
import tesis from './tesis';
import reservation from './reservation';

// types
import { NavItemType } from 'types/menu';
import fast from './fast';
import muhasebe from './muhasebe';
import website from './website';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [fast, tesis, reservation, muhasebe, website]
};

export default menuItems;
