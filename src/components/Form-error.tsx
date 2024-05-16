import { TriangleAlert } from "lucide-react";
interface FormErrorProps {
  message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 flex items-center gap-x-2 text-sm text-destructive p-3 rounded-md">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  );
};
