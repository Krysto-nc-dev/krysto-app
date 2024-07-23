import React, { useState, useEffect } from 'react';
import { ArrowBigLeft, Send } from 'lucide-react';
import Button from '../../components/shared/Button';
import { useCreateThirdPartyMutation, useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { toast } from 'react-toastify';

// Options pour les sélecteurs
const countryOptions = [
  { id: '5', code: 'DE', name: 'Allemagne' },
  { id: '2', code: 'BE', name: 'Belgique' },
  { id: '14', code: 'CA', name: 'Canada' },
  { id: '9', code: 'CN', name: 'Chine' },
  { id: '129', code: 'KR', name: 'Corée du Sud' },
  { id: '11', code: 'US', name: 'États-Unis' },
  { id: '1', code: 'FR', name: 'France' },
  { id: '3', code: 'IT', name: 'Italie' },
  { id: '123', code: 'JP', name: 'Japon' },
  { id: '165', code: 'NC', name: 'Nouvelle-Calédonie' },
  { id: '166', code: 'NZ', name: 'Nouvelle-Zélande' },
  { id: '96', code: 'PF', name: 'Polynésie française' },
  { id: '25', code: 'PT', name: 'Portugal' },
  { id: '7', code: 'GB', name: 'Royaume-Uni' },
  { id: '6', code: 'CH', name: 'Suisse' },
  { id: '231', code: 'VU', name: 'Vanuatu' },
  { id: '236', code: 'WF', name: 'Wallis-et-Futuna' },
  { id: '28', code: 'AU', name: 'Australie' },
  { id: '4', code: 'ES', name: 'Espagne' }
];

const fournisseurOptions = [
  { code: '1', name: 'Oui' },
  { code: '0', name: 'Non' }
];

const clientOptions = [
  { code: '1', name: 'Oui' },
  { code: '0', name: 'Non' }
];
const statusOptions = [
  { code: '1', name: 'Ouvert' },
  { code: '0', name: 'Clos' }
];

const prospectOptions = [
  { code: '2', name: 'Non' },
  { code: '1', name: 'Oui' }
];

const formatCode = (prefix, number) => `${prefix}-${String(number).padStart(6, '0')}`;

const AdminDolibarrNewThidpartyScreen = () => {
  const { data: thirdparties, error: thirdpartiesError, isLoading: loadingThirdparties } = useGetThirdPartiesQuery();
  const [formData, setFormData] = useState({
    country_id: '',
    country_code: '',
    idprof1: "",
    tva_intra: "",
    idprof2: "",
    idprof3: "",
    idprof4: "",
    idprof5: "",
    idprof6: "",
    url: "",
    siret: "",
    ape: "",
    address: "",
    status: "",
    zip: "",
    town: "",
    name: '',
    name_alias: '',
    prospect: '0',
    client: '0',
    fournisseur: '0',
    code_client: '',
    code_fournisseur: ''
  });

  const [createThirdparty, { isLoading: loadingCreate }] = useCreateThirdPartyMutation();

  useEffect(() => {
    if (thirdparties && !loadingThirdparties) {
      const latestClientCode = Math.max(
        ...thirdparties
          .filter(tp => tp.code_client)
          .map(tp => parseInt(tp.code_client.split('-')[1], 10)),
        0
      );
      const latestFournisseurCode = Math.max(
        ...thirdparties
          .filter(tp => tp.code_fournisseur)
          .map(tp => parseInt(tp.code_fournisseur.split('-')[1], 10)),
        0
      );

      setFormData(prev => ({
        ...prev,
        code_client: prev.client === '1' ? formatCode('C', latestClientCode + 1) : '',
        code_fournisseur: prev.fournisseur === '1' ? formatCode('F', latestFournisseurCode + 1) : ''
      }));
    }
  }, [thirdparties, loadingThirdparties, formData.client, formData.fournisseur]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country_code') {
      const countryInfo = countryOptions.find(c => c.code === value) || {};
      setFormData(prev => ({
        ...prev,
        [name]: value,
        country_id: countryInfo.id || '',
        country_code: countryInfo.code || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createThirdparty(formData);
      toast.success('Tiers ajouté avec succès!');
      setFormData({
        country_id: '',
        country_code: '',
        idprof1: "",
        idprof2: "",
        idprof3: "",
        idprof4: "",
        idprof5: "",
        idprof6: "",
        address: "",
        url: "",
        tva_intra: "",
        siret: "",
        ape: "",
        status:"",
        name: '',
        name_alias: '',
        prospect: '0',
        client: '0',
        fournisseur: '0',
        code_client: '',
        code_fournisseur: ''
      });
    } catch (error) {
      console.error('Error adding third party:', error);
      toast.error("Erreur lors de l'ajout du tiers.");
    }
  };

  return (
    <div className="p-6 max-w-9xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Ajouter un Nouveau Tiers</h1>
        <Button version={'primary'} icon={ArrowBigLeft} url={'/admin-tiers'}>
          Retour
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
       
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            />
          </div>
          {/* Name Alias */}
          <div>
            <label htmlFor="name_alias" className="block text-sm font-medium text-gray-700">Nom Alias</label>
            <input
              type="text"
              id="name_alias"
              name="name_alias"
              value={formData.name_alias}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            >
              <option value="">Sélectionner</option>
              {statusOptions.map(status => (
                <option key={status.code} value={status.code}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          
   
        <h3>Type de tier</h3>
        <div className="flex items-center justify-between">
          {/* Prospect */}
          <div>
            <label htmlFor="prospect" className="block text-sm font-medium text-gray-700">Prospect</label>
            <select
              id="prospect"
              name="prospect"
              value={formData.prospect}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            >
              <option value="">Sélectionner</option>
              {prospectOptions.map(prospect => (
                <option key={prospect.code} value={prospect.code}>
                  {prospect.name}
                </option>
              ))}
            </select>
          </div>
          {/* Client */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
            <select
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            >
              <option value="">Sélectionner</option>
              {clientOptions.map(client => (
                <option key={client.code} value={client.code}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          {/* Fournisseur */}
          <div>
            <label htmlFor="fournisseur" className="block text-sm font-medium text-gray-700">Fournisseur</label>
            <select
              id="fournisseur"
              name="fournisseur"
              value={formData.fournisseur}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            >
              <option value="">Sélectionner</option>
              {fournisseurOptions.map(fournisseur => (
                <option key={fournisseur.code} value={fournisseur.code}>
                  {fournisseur.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {formData.client === '1' && (
          <div className="flex items-center justify-between">
            {/* Client Code */}
            <div>
              <label htmlFor="code_client" className="block text-sm font-medium text-gray-700">Code Client</label>
              <input
                type="text"
                id="code_client"
                name="code_client"
                value={formData.code_client}
                readOnly
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
            </div>
          </div>
        )}
        {formData.fournisseur === '1' && (
          <div className="flex items-center justify-between">
            {/* Fournisseur Code */}
            <div>
              <label htmlFor="code_fournisseur" className="block text-sm font-medium text-gray-700">Code Fournisseur</label>
              <input
                type="text"
                id="code_fournisseur"
                name="code_fournisseur"
                value={formData.code_fournisseur}
                readOnly
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          {/* Country */}
          <div>
            <label htmlFor="country_code" className="block text-sm font-medium text-gray-700">Pays</label>
            <select
              id="country_code"
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            >
              <option value="">Sélectionner</option>
              {countryOptions.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
            <input
              type="text"
              
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Code postal</label>
            <input
              type="text"
              
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">Site internet</label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
            />
          </div>
          
         
         
        </div>
        <div className="flex items-center justify-between">

        <div>
            <label htmlFor="idprof1" className="block text-sm font-medium text-gray-700">N° Ridet</label>
            <input
              type="text"
              
              id="idprof1"
              name="idprof1"
              value={formData.idprof1}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="tva_intra" className="block text-sm font-medium text-gray-700">N° TGC</label>
            <input
              type="text"
              
              id="tva_intra"
              name="tva_intra"
              value={formData.tva_intra}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="idprof2" className="block text-sm font-medium text-gray-700"> N° RCS</label>
            <input
              type="text"
              
              id="idprof2"
              name="idprof2"
              value={formData.idprof2}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="idprof3" className="block text-sm font-medium text-gray-700"> Identifiant Prof 3</label>
            <input
              type="text"
              
              id="idprof3"
              name="idprof3"
              value={formData.idprof3}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="idprof4" className="block text-sm font-medium text-gray-700"> Identifiant Prof 4</label>
            <input
              type="text"
              
              id="idprof4"
              name="idprof4"
              value={formData.idprof4}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
              </div>
        <div className="flex items-center justify-between">

        <div>
            <label htmlFor="idprof4" className="block text-sm font-medium text-gray-700">Identifiant prof. 5</label>
            <input
              type="text"
              
              id="idprof5"
              name="idprof5"
              value={formData.idprof5}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="idprof6" className="block text-sm font-medium text-gray-700"> Identifiant prof. 6</label>
            <input
              type="text"
              
              id="idprof6"
              name="idprof6"
              value={formData.idprof6}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="siret" className="block text-sm font-medium text-gray-700"> n° Siret</label>
            <input
              type="text"
              
              id="siret"
              name="siret"
              value={formData.siret}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
        <div>
            <label htmlFor="ape" className="block text-sm font-medium text-gray-700">N° APE</label>
            <input
              type="text"
              
              id="ape"
              name="ape"
              value={formData.ape}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
              />
          </div>
              </div>
          
        <div className="flex items-center justify-between">
          
          <Button
            version="primary"
            type="submit"
            loading={loadingCreate}
            icon={Send}
          >
            Ajouter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminDolibarrNewThidpartyScreen;
