import SearchHotels from "@/components/SearchHotels";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import SpecialOffers from "@/components/SpecialOffers";
import Rewards from "@/components/Rewards";
import HeroCard from "@/components/Hero";

function Hero() {
  return (
    <div className="">
      <HeroCard />
      <SearchHotels/>
      <FeaturedDestinations />
      <SpecialOffers />
      <Rewards />
    </div>
  );
}

export default Hero;
