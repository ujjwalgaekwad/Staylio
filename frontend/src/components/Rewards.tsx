import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

function Rewards() {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-12 shadow-lg">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Become a Rewards Member Today
            </h2>
            <p className="text-muted text-base md:text-lg mb-6">
              Join our exclusive loyalty program and earn points every time you book. 
              Enjoy free nights, room upgrades, and special benefits just for members.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Earn 10 reward points for every $1 spent",
                "Complimentary room upgrades when available",
                "Priority early check-in & late check-out",
                "Access to members-only discounts and offers",
              ].map((text, i) => (
                <li key={i} className="flex items-center text-sm md:text-base">
                  <ArrowRight className="mr-3 h-4 w-4 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="text-base px-6 py-2">
              Join Now – It’s Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rewards;
