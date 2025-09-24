import SearchBar from '../SearchBar';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">Discover Properties</h1>
          <p className="hero__subtitle">
            Find your dream home from our curated listings
          </p>
          <div className="hero__search">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
