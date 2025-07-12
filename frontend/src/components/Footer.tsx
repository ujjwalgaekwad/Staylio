import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer
      className="w-full text-gray-800 border-t-2"
    >
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-gray-900 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Contact Us",
                "Cancellation Options",
                "Safety Resource Center",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-gray-900 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                "Terms & Conditions",
                "Privacy Policy",
                "Cookie Policy",
                "Partner Dispute",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-gray-900 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-500 mb-4">
              Get special offers and deals in your inbox
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Staylio. All rights reserved.
          </p>

          <div className="flex gap-4">
            {[
              "facebook",
              "twitter",
              "instagram",
              "youtube"
            ].map((platform) => (
              <Button key={platform} variant="ghost" size="icon">
                <img
                  src={`/icons/${platform}.svg`}
                  alt={platform}
                  className="w-5 h-5"
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
