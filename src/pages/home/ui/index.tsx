import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';

export const Home = () => {
  return (
    <div className='container mx-auto px-6 md:px-16'>
      <HeroSection />

      <FeaturesSection />
    </div>
  );
};
