import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowBigLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDolibarrNewThidpartyScreen = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Ajoutez la logique pour soumettre le formulaire ici
  };

  return (
    <div className="p-6 max-w-9xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Ajouter un Nouveau Tier</h1>
        <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded">
          <ArrowBigLeft className="mr-2" />
          <Link to="/admin-tiers">Retour</Link>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Identification */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Identification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {['id', 'entity', 'ref', 'status', 'country_id', 'country_code', 'state_id', 'region_id', 'barcode_type', 'barcode_type_coder', 'mode_reglement_id', 'cond_reglement_id', 'demand_reason_id', 'transport_mode_id', 'shipping_method_id', 'model_pdf', 'fk_bank', 'fk_account'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  id={field}
                  type="text"
                  {...register(field)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {['name', 'lastname', 'firstname', 'civility_id', 'date_creation', 'date_validation', 'date_modification', 'date_cloture', 'user_author', 'user_creation', 'user_creation_id', 'user_valid', 'user_validation', 'user_validation_id', 'user_closing_id', 'user_modification', 'user_modification_id'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  id={field}
                  type="text"
                  {...register(field)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Address */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {['address', 'zip', 'town', 'phone', 'fax', 'email'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  {...register(field)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Financial */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Financier</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {['tva_assuj', 'tva_intra', 'localtax1_assuj', 'localtax1_value', 'localtax2_assuj', 'localtax2_value', 'capital', 'typent_id', 'typent_code', 'effectif', 'effectif_id', 'forme_juridique_code', 'forme_juridique', 'remise_percent', 'remise_supplier_percent', 'deposit_percent', 'mode_reglement_supplier_id', 'cond_reglement_supplier_id', 'transport_mode_supplier_id', 'code_client', 'code_fournisseur', 'code_compta_client', 'code_compta', 'accountancy_code_customer', 'code_compta_fournisseur', 'accountancy_code_supplier', 'code_compta_product', 'stcomm_id', 'stcomm_picto', 'price_level', 'outstanding_limit', 'order_min_amount', 'supplier_order_min_amount'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  id={field}
                  type={field.includes('percent') || field.includes('value') ? 'number' : 'text'}
                  step={field.includes('percent') || field.includes('value') ? '0.01' : undefined}
                  {...register(field)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Miscellaneous */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">Divers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {['import_key', 'array_options', 'array_languages', 'contacts_ids', 'linked_objects', 'linkedObjectsIds', 'linkedObjectsFullLoaded', 'canvas', 'fk_project', 'fk_projet', 'contact_id', 'user', 'origin', 'origin_id', 'ref_ext', 'statut', 'barcode', 'idprof1', 'siren', 'idprof2', 'siret', 'idprof3', 'ape', 'idprof4', 'idprof5', 'idprof6', 'managers', 'webservices_url', 'webservices_key', 'logo_small', 'logo_mini', 'logo_squarred', 'logo_squarred_small', 'logo_squarred_mini', 'accountancy_code_sell', 'accountancy_code_buy', 'fk_multicurrency', 'fk_warehouse', 'label_incoterms', 'location_incoterms'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  id={field}
                  type="text"
                  {...register(field)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded"
          >
            Ajouter le Tier
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDolibarrNewThidpartyScreen;
