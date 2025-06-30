import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";

const HeroCard: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => navigate("/search");

  return (
    <section className="bg-blue-800 text-white px-4 md:px-6 py-16 md:py-32 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10">
          Discover amazing hotels and accommodations in Ahmedabad at the best prices.
          Your journey begins with the perfect place to stay.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="text-base"
            onClick={handleExploreClick}
            aria-label="Explore hotel destinations"
          >
            Explore Destinations
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            aria-label="Learn more about Staylio"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroCard;
