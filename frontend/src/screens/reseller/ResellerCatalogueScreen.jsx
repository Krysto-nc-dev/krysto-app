import React from 'react'
import AnimatedPageTitle from '../../components/shared/AnimatedPageTitle'

const ResellerCatalogueScreen = () => {
  return (
    <div>
      <AnimatedPageTitle title={'Le Catalogue Krysto'} />

      <p className="text-sm">
        Cette page présente le catalogue complet des produits Krysto disponibles
        pour votre magasin. Vous pouvez consulter les détails de chaque produit,
        y compris les descriptions, les prix et les images, afin de gérer
        efficacement votre assortiment de produits.
      </p>
    </div>
  )
}

export default ResellerCatalogueScreen
