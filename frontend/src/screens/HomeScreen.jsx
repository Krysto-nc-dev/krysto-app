import Card from '../components/shared/Card'

const HomeScreen = () => {
  return (
    <>
      <h1 className="text-primaryColor text-2xl">Welcome Krysto</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">

      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Perles</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Bagues</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Jenga</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Porte savon</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Sous verres</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Cache pot</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Peignes</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/jsdlfjls`}>
        <h2>Peignes afro</h2>
        <p className=" min-h-44"></p>
      </Card>
      <Card image="/images/pot.jpg" url={`/produit/régles`}>
        <h2>Régles</h2>
        <p className=" min-h-44"></p>
      </Card>
</section>
    </>
  )
}

export default HomeScreen
