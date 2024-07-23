import { AlignEndHorizontal, BookOpen, LayoutDashboard, Paperclip, ReceiptText, ShoppingCart, Truck } from 'lucide-react';

export const DASHBOARD_PARTNER_SIDEBAR_LINKS = [
  {
    key: 'Tableau de bord',
    label: 'Tableau de bord',
    icon: <AlignEndHorizontal />,
    href: '/partenaire-dashboard',
  },
  {
    key: 'Catalogue',
    label: 'Catalogue',
    icon: <BookOpen/>,
    href: '/partenaire-catalogue',
  },
  {
    key: 'Collectes',
    label: 'Collectes',
    icon: <Truck/>,
    href: '/partenaire-collectes',
  },
  {
    key: 'Devis',
    label: 'Devis',
    icon: <Paperclip/>,
    href: '/partenaire-devis',
  },
  {
    key: 'Commandes',
    label: 'Commandes',
    icon: <ShoppingCart/>,
    href: '/partenaire-commandes',
  },
  {
    key: 'Factures',
    label: 'Factures',
    icon: <ReceiptText />,
    href: '/partenaire-factures',
  },
  

  
  // Ajoutez d'autres liens ici pour les autres menus du sidebar
];
