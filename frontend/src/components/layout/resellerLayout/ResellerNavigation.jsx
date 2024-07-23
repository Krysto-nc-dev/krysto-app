import { AlignEndHorizontal, BookOpen, Box, Clipboard, CreditCard, FileText, Receipt, RefreshCcw, Truck, Package, ListPlus, Tags, Target, TargetIcon, Settings } from 'lucide-react';

export const DASHBOARD_RESELLER_SIDEBAR_LINKS = [
  {
    key: 'Tableau de bord',
    label: 'Tableau de bord',
    icon: <AlignEndHorizontal />,
    href: '/revendeur-dashboard',
  },
  {
    key: 'Catalogue',
    label: 'Catalogue',
    icon: <BookOpen />,
    href: '/revendeur-catalogue',
  },

  {
    key: 'Stock réel',
    label: 'Stock réel',
    icon: <Box />,
    href: '/revendeur-stock-reel',
  },
  {
    key: 'Réassorts',
    label: 'Réassorts',
    icon: <RefreshCcw />,
    href: '/revendeur-demande-reassorts',
  },
  {
    key: 'Ventes',
    label: 'Ventes',
    icon: <FileText />,
    href: '/revendeur-ventes',
  },
  {
    key: 'Collectes',
    label: 'Collectes',
    icon: <Truck />,
    href: '/revendeur-collectes',
  },
  {
    key: 'Devis',
    label: 'Devis',
    icon: <Clipboard />,
    href: '/revendeur-devis',
  },
  {
    key: 'Factures',
    label: 'Factures',
    icon: <CreditCard />,
    href: '/revendeur-factures',
  },
  {
    key: 'Paramétres',
    label: 'Paramètres',
    icon: <Settings />,
    href: '/revendeur-paramétres',
  },

];
