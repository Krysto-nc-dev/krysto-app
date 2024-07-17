import { LayoutDashboard, Box, Users, Calendar, CreditCard,  DollarSign,  Warehouse, FilePen,  CookingPot, Factory, Eye, RecycleIcon, Truck, Milk, Palette, Projector,  Star, Receipt, Mail, ScanBarcode, FolderKanbanIcon } from 'lucide-react';

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'Tableau de bord',
    label: 'Tableau de bord',
    icon: <LayoutDashboard />,
    href: '/dashboard',
  },

  {
    key: 'tiers',
    label: 'Tiers',
    icon: <Users />,
    href: '/user-thirdparties',
  },
  {
    key: 'emailing',
    label: 'emailing',
    icon:  <Mail/>,
    href: '/mail-bank',
  },

  {
    key: 'Produits',
    label: 'Produits',
    icon: <Box />,
    href: '/user-products',
  },
  {
    key: 'Entrepots',
    label: 'Entrepots',
    icon: <Warehouse />,
    href: '/entrepots',
  },
  {
    key: 'propal',
    label: 'Devis',
    icon: <FilePen />,
    href: '/propal',
  },
  {
    key: 'facturation & paiement',
    label: 'Facturation & Paiement',
    icon: <DollarSign />,
    href: '/billing',
  },
  {
    key: 'Facture fournisseurs',
    label: 'Facture fournisseurs',
    icon: <Receipt />,
    href: '/supplier-invoices',
  },
  {
    key: 'banques',
    label: 'Comptes bancaires',
    icon: <CreditCard />,
    href: '/banks',
  },
  {
    key: 'Caisse',
    label: 'Caisse',
    icon: <ScanBarcode />,
    href: '/cashier',
  },

  {
    key:'machineAndMoulds',
    label: 'Machines & Moules',
    icon: <Factory />,
    href: '/machines-and-moulds',
  },
  {
    key:'plastics',
    label: 'plastiques',
    icon: <Milk />,
    href: '/plastics',
  },
  {
    key:'recyclableProducts',
    label: 'produit recyclable',
    icon: <RecycleIcon />,
    href: '/recyclable-products',
  },
  {
    key:'collecte',
    label: 'Collectes',
    icon: <Truck/>,
    href: '/campagnes-collecte',
  },
  {
    key:'stockPlastic',
    label: 'Stocks plastique',
    icon: <Star />,
    href: '/plastic-stocks',
  },

  {
    key:'recipes',
    label: 'Recettes',
    icon: <CookingPot />,
    href: '/recipes',
  },
  {
    key:'agenda',
    label: 'Agenda',
    icon: <Calendar />,
    href: '/calendar',
  },
  {
    key:'PROJET',
    label: 'Projet',
    icon: <FolderKanbanIcon />,
    href: '/projet',
  },
  {
    key:'Presentations',
    label: 'Presentations',
    icon: <Projector />,
    href: '/presentations',
  },
  {
    key:'veilles',
    label: 'Veilles',
    icon: <Eye/>,
    href: '/veilles',
  },
  
  // Ajoutez d'autres liens ici pour les autres menus du sidebar
];
