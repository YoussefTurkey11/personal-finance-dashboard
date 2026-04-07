import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const ErrorPage = () => {
  return (
    <Alert variant="destructive" className="w-full max-w-md my-10">
      <AlertCircleIcon />
      <AlertTitle>Error Occurred</AlertTitle>
      <AlertDescription>
        Oops! Something went wrong. Please try again later.
      </AlertDescription>
    </Alert>
  );
};

export default ErrorPage;
