import { Link } from "react-router-dom";

function Feedback() {
  return (
    <div>
      <section className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to="#" className="group">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="./favicon.png"
                alt=""
                width={200}
                height={200}
                className="object-cover w-full aspect-square group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 text-white">
                <h3 className="font-bold">destination.name</h3>
                <p className="text-xs text-white/80">destination.hotels</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
