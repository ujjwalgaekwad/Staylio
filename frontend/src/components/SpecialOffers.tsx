import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

function SpecialOffers() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Special Offers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exclusive deals and discounts for your next adventure
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 h-[200px] md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80"
                  alt="Summer Escape"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <Badge className="mb-3 bg-yellow-500 text-white hover:bg-yellow-600">Limited Time</Badge>
                  <h3 className="text-xl font-bold mb-3">
                    Summer Escape Package
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Enjoy 30% off on beach resorts worldwide. Includes free
                    breakfast and spa access.
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">$599</span>
                    <span className="text-muted-foreground line-through ml-2">
                      $899
                    </span>
                    <span className="ml-2 text-green-600 font-medium text-sm">Save $300</span>
                  </div>
                  <Button className="w-full md:w-auto">Book Now</Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 h-[200px] md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80"
                  alt="City Break"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <Badge className="mb-3 bg-blue-500 text-white hover:bg-blue-600">Weekend Special</Badge>
                  <h3 className="text-xl font-bold mb-3">City Break Deal</h3>
                  <p className="text-muted-foreground mb-4">
                    Book 2 nights in any city hotel and get the 3rd night free.
                    Includes city tour.
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">$349</span>
                    <span className="text-muted-foreground line-through ml-2">
                      $499
                    </span>
                    <span className="ml-2 text-green-600 font-medium text-sm">Save $150</span>
                  </div>
                  <Button className="w-full md:w-auto">Book Now</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;