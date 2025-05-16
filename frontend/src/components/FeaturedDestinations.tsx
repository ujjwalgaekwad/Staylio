import { Link } from "react-router-dom";
import { destinations } from "@/config/destinations";

function FeaturedDestinations() {
  return (
    <section className="container px-4 md:px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore our most visited at destinations
          </p>
        </div>
        <Link
          to="/destinations"
          className="text-primary font-medium hover:underline hidden md:block"
        >
          View all destinations
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {destinations.map((destination) => (
          <Link to="#" className="group" key={destination.id}>
            <div className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:shadow-xl group-hover:scale-105">
              <img
                src={destination.image}
                alt={destination.name}
                width={200}
                height={200}
                className="object-cover w-full aspect-square transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold">{destination.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center md:hidden">
        <Link
          to="/destinations"
          className="text-primary font-medium hover:underline"
        >
          View all destinations
        </Link>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
