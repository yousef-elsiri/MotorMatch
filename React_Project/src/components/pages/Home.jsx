import Navbar from "../Navbar";
import Hero from "../Hero";
import BrandsCarousel from "../BrandsCarousel";
import FeaturedCars from "../FeaturedCars";
import PopularBrands from "../PopularBrands";
import LatestListings from "../LatestListings";
import StatsSection from "../StatsSection";
import MotorMatchFooter from "../MotorMatchFooter";
function Home({ theme, setTheme }) {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <BrandsCarousel />
      <FeaturedCars />
      <PopularBrands />
      <LatestListings />
      <StatsSection />
      <MotorMatchFooter />
    </>
  );
}

export default Home;