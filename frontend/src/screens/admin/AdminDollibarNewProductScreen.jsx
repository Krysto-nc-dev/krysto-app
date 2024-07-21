import React from 'react'
import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AdminDollibarNewProductScreen = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Ici, vous pourriez envoyer les données au serveur via une API
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ajouter un produit Dolibarr</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin-dollibarr-products">Retour</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Référence */}
          <div>
            <label htmlFor="ref" className="block text-sm font-medium text-gray-700">
              Référence
            </label>
            <input
              id="ref"
              type="text"
              {...register('ref', { required: 'La référence est requise.' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.ref && <p className="text-red-500 text-xs">{errors.ref.message}</p>}
          </div>

          {/* Label */}
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-700">
              Label
            </label>
            <input
              id="label"
              type="text"
              {...register('label', { required: 'Le label est requis.' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.label && <p className="text-red-500 text-xs">{errors.label.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              {...register('description')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Prix */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Prix
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register('price', { required: 'Le prix est requis.' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>

          {/* Code TVA */}
          <div>
            <label htmlFor="default_vat_code" className="block text-sm font-medium text-gray-700">
              Code TVA
            </label>
            <input
              id="default_vat_code"
              type="text"
              {...register('default_vat_code')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code comptable de vente */}
          <div>
            <label htmlFor="accountancy_code_sell" className="block text-sm font-medium text-gray-700">
              Code comptable de vente
            </label>
            <input
              id="accountancy_code_sell"
              type="text"
              {...register('accountancy_code_sell')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code barre */}
          <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
              Code barre
            </label>
            <input
              id="barcode"
              type="text"
              {...register('barcode')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Date de création */}
          <div>
            <label htmlFor="date_creation" className="block text-sm font-medium text-gray-700">
              Date de création
            </label>
            <input
              id="date_creation"
              type="datetime-local"
              {...register('date_creation')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Date de modification */}
          <div>
            <label htmlFor="date_modification" className="block text-sm font-medium text-gray-700">
              Date de modification
            </label>
            <input
              id="date_modification"
              type="datetime-local"
              {...register('date_modification')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Poids */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Poids
            </label>
            <input
              id="weight"
              type="number"
              step="0.01"
              {...register('weight')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Longueur */}
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">
              Longueur
            </label>
            <input
              id="length"
              type="number"
              step="0.01"
              {...register('length')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Largeur */}
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">
              Largeur
            </label>
            <input
              id="width"
              type="number"
              step="0.01"
              {...register('width')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Hauteur */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Hauteur
            </label>
            <input
              id="height"
              type="number"
              step="0.01"
              {...register('height')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              id="url"
              type="url"
              {...register('url')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Note publique */}
          <div>
            <label htmlFor="note_public" className="block text-sm font-medium text-gray-700">
              Note publique
            </label>
            <textarea
              id="note_public"
              rows="2"
              {...register('note_public')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Note privée */}
          <div>
            <label htmlFor="note_private" className="block text-sm font-medium text-gray-700">
              Note privée
            </label>
            <textarea
              id="note_private"
              rows="2"
              {...register('note_private')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              id="type"
              type="text"
              {...register('type')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de comptabilité d'achat */}
          <div>
            <label htmlFor="accountancy_code_buy" className="block text-sm font-medium text-gray-700">
              Code de comptabilité d'achat
            </label>
            <input
              id="accountancy_code_buy"
              type="text"
              {...register('accountancy_code_buy')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de comptabilité d'achat intra */}
          <div>
            <label htmlFor="accountancy_code_buy_intra" className="block text-sm font-medium text-gray-700">
              Code de comptabilité d'achat intra
            </label>
            <input
              id="accountancy_code_buy_intra"
              type="text"
              {...register('accountancy_code_buy_intra')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de comptabilité d'achat export */}
          <div>
            <label htmlFor="accountancy_code_buy_export" className="block text-sm font-medium text-gray-700">
              Code de comptabilité d'achat export
            </label>
            <input
              id="accountancy_code_buy_export"
              type="text"
              {...register('accountancy_code_buy_export')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de comptabilité de vente intra */}
          <div>
            <label htmlFor="accountancy_code_sell_intra" className="block text-sm font-medium text-gray-700">
              Code de comptabilité de vente intra
            </label>
            <input
              id="accountancy_code_sell_intra"
              type="text"
              {...register('accountancy_code_sell_intra')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de comptabilité de vente export */}
          <div>
            <label htmlFor="accountancy_code_sell_export" className="block text-sm font-medium text-gray-700">
              Code de comptabilité de vente export
            </label>
            <input
              id="accountancy_code_sell_export"
              type="text"
              {...register('accountancy_code_sell_export')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de TVA */}
          <div>
            <label htmlFor="default_vat_code" className="block text-sm font-medium text-gray-700">
              Code TVA
            </label>
            <input
              id="default_vat_code"
              type="text"
              {...register('default_vat_code')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de TVA */}
          <div>
            <label htmlFor="tva_tx" className="block text-sm font-medium text-gray-700">
              TVA TX
            </label>
            <input
              id="tva_tx"
              type="text"
              {...register('tva_tx')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Taxe locale 1 */}
          <div>
            <label htmlFor="localtax1_tx" className="block text-sm font-medium text-gray-700">
              Taxe locale 1
            </label>
            <input
              id="localtax1_tx"
              type="text"
              {...register('localtax1_tx')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Taxe locale 2 */}
          <div>
            <label htmlFor="localtax2_tx" className="block text-sm font-medium text-gray-700">
              Taxe locale 2
            </label>
            <input
              id="localtax2_tx"
              type="text"
              {...register('localtax2_tx')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Type de taxe locale 1 */}
          <div>
            <label htmlFor="localtax1_type" className="block text-sm font-medium text-gray-700">
              Type de taxe locale 1
            </label>
            <input
              id="localtax1_type"
              type="text"
              {...register('localtax1_type')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Type de taxe locale 2 */}
          <div>
            <label htmlFor="localtax2_type" className="block text-sm font-medium text-gray-700">
              Type de taxe locale 2
            </label>
            <input
              id="localtax2_type"
              type="text"
              {...register('localtax2_type')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Quantité de stock alert */}
          <div>
            <label htmlFor="seuil_stock_alerte" className="block text-sm font-medium text-gray-700">
              Seuil de stock d'alerte
            </label>
            <input
              id="seuil_stock_alerte"
              type="number"
              {...register('seuil_stock_alerte')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Stock théorique */}
          <div>
            <label htmlFor="stock_theorique" className="block text-sm font-medium text-gray-700">
              Stock théorique
            </label>
            <input
              id="stock_theorique"
              type="number"
              {...register('stock_theorique')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Stock réel */}
          <div>
            <label htmlFor="stock_reel" className="block text-sm font-medium text-gray-700">
              Stock réel
            </label>
            <input
              id="stock_reel"
              type="number"
              {...register('stock_reel')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              id="url"
              type="url"
              {...register('url')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Poids */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Poids
            </label>
            <input
              id="weight"
              type="number"
              step="0.01"
              {...register('weight')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Longueur */}
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">
              Longueur
            </label>
            <input
              id="length"
              type="number"
              step="0.01"
              {...register('length')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Largeur */}
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">
              Largeur
            </label>
            <input
              id="width"
              type="number"
              step="0.01"
              {...register('width')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Hauteur */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Hauteur
            </label>
            <input
              id="height"
              type="number"
              step="0.01"
              {...register('height')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Surface */}
          <div>
            <label htmlFor="surface" className="block text-sm font-medium text-gray-700">
              Surface
            </label>
            <input
              id="surface"
              type="number"
              step="0.01"
              {...register('surface')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Volume */}
          <div>
            <label htmlFor="volume" className="block text-sm font-medium text-gray-700">
              Volume
            </label>
            <input
              id="volume"
              type="number"
              step="0.01"
              {...register('volume')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Mesure nette */}
          <div>
            <label htmlFor="net_measure" className="block text-sm font-medium text-gray-700">
              Mesure nette
            </label>
            <input
              id="net_measure"
              type="number"
              step="0.01"
              {...register('net_measure')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Unités de mesure */}
          <div>
            <label htmlFor="net_measure_units" className="block text-sm font-medium text-gray-700">
              Unités de mesure
            </label>
            <input
              id="net_measure_units"
              type="text"
              {...register('net_measure_units')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Durée */}
          <div>
            <label htmlFor="duration_value" className="block text-sm font-medium text-gray-700">
              Durée
            </label>
            <input
              id="duration_value"
              type="number"
              {...register('duration_value')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Unité de durée */}
          <div>
            <label htmlFor="duration_unit" className="block text-sm font-medium text-gray-700">
              Unité de durée
            </label>
            <input
              id="duration_unit"
              type="text"
              {...register('duration_unit')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Code de barre */}
          <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
              Code barre
            </label>
            <input
              id="barcode"
              type="text"
              {...register('barcode')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
            Ajouter le produit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminDollibarNewProductScreen
