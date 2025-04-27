import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-96 ">
      <h1 className="text-9xl font-extrabold text-gray-600">404</h1>
      <p className="text-2xl mt-4 text-gray-800">Oops! Page not found.</p>
      <p className="text-gray-500">
        The page you were looking for doesn't exist.
      </p>
      <div className="mt-6 flex space-x-4">
        <Button
          onClick={() => navigate("/")}
          variant={"default"}
        >
          Go Home
        </Button>
        <Button
        variant={"outline"}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
