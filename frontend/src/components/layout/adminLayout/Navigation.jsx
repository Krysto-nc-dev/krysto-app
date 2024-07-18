import { LayoutDashboard, Box, Users, Calendar, CreditCard,  DollarSign,  Warehouse, FilePen,  CookingPot, Factory, Eye, RecycleIcon, Truck, Milk, Palette, Projector,  Star, Receipt, Mail, ScanBarcode, FolderKanbanIcon, WebhookIcon, MonitorCogIcon } from 'lucide-react';

export const DASHBOARD_ADMIN_SIDEBAR_LINKS = [
  {
    key: 'Tableau de bord',
    label: 'Tableau de bord',
    icon: <LayoutDashboard />,
    href: '/admin-dashboard',
  },

  {
    key: 'tiers',
    label: 'Tiers',
    icon: <Users />,
    href: '/admin-tiers',
  },
  {
    key: 'emailing',
    label: 'emailing',
    icon:  <Mail/>,
    href: '/admin-mails-repertoire',
  },

  {
    key: 'Produits',
    label: 'Produits',
    icon: <Box />,
    href: '/admin-dollibarr-products',
  },
  {
    key: 'Entrepots',
    label: 'Entrepots',
    icon: <Warehouse />,
    href: '/admin-entrepots',
  },
  {
    key: 'propal',
    label: 'Devis',
    icon: <FilePen />,
    href: '/admin-propositions-commercial',
  },
  {
    key: 'facturation & paiement',
    label: 'Facturation & Paiement',
    icon: <DollarSign />,
    href: '/admin-facturation',
  },
  {
    key: 'Facture fournisseurs',
    label: 'Facture fournisseurs',
    icon: <Receipt />,
    href: '/admin-facturations-fournisseurs',
  },
  {
    key: 'banques',
    label: 'Comptes bancaires',
    icon: <CreditCard />,
    href: '/admin-comptes-bancaire',
  },
  {
    key: 'Caisse',
    label: 'Caisse',
    icon: <ScanBarcode />,
    href: '/admin-caisses',
  },

  {
    key:'machineAndMoulds',
    label: 'Machines & Moules',
    icon: <Factory />,
    href: '/admin-equipements',
  },
  {
    key:'plastics',
    label: 'plastiques',
    icon: <Milk />,
    href: '/admin-plastiques',
  },
  {
    key:'recyclableProducts',
    label: 'produit recyclable',
    icon: <RecycleIcon />,
    href: '/admin-produits-recyclable',
  },
  {
    key:'collecte',
    label: 'Collectes',
    icon: <Truck/>,
    href: '/admin-campagnes-collecte',
  },
  {
    key:'stockPlastic',
    label: 'Stocks plastique',
    icon: <Star />,
    href: '/admin-paillettes-plastique',
  },

  {
    key:'recipes',
    label: 'Recettes',
    icon: <CookingPot />,
    href: '/admin-recettes-couleur',
  },
  {
    key:'agenda',
    label: 'Agenda',
    icon: <Calendar />,
    href: '/admin-agenda',
  },
  {
    key:'agenda',
    label: 'Administration site',
    icon: <MonitorCogIcon/>,
    href: '/admin-administration-du-site',
  },

  {
    key:'PROJET',
    label: 'Projet',
    icon: <FolderKanbanIcon />,
    href: '/admin-projets',
  },
  {
    key:'Presentations',
    label: 'Presentations',
    icon: <Projector />,
    href: '/admin-presentations',
  },
  {
    key:'veilles',
    label: 'Veilles',
    icon: <Eye/>,
    href: '/admin-veilles',
  },
  
  // Ajoutez d'autres liens ici pour les autres menus du sidebar
];
