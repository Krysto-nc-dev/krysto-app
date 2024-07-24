import { Waves } from 'lucide-react';
import AnimatedPageTitle from '../components/shared/AnimatedPageTitle';
import ParallaxText from '../components/shared/ParallaxText';

// Assurez-vous que le chemin est correct

const HomeScreen = () => {
  return (
    <>
      {/* Titre de la page */}
      <AnimatedPageTitle title={"Bienvenue sur Krysto"} />

      {/* Section avec texte parallax */}
      <section className="relative overflow-hidden pt-20 pb-20">
        {/* Texte Parallax */}
        <ParallaxText baseVelocity={-5}>
          CLEAN CREATE RECYCLE REPEAT
        </ParallaxText>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">
            CLEAN CREATE RECYCLE REPEAT
          </h1>
        </div>
      </section>
    </>
  );
}

export default HomeScreen;
