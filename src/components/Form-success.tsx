import { CircleCheck } from "lucide-react";
interface FormSucessProps {
  message?: string;
}
export const FormSuccess = ({ message }: FormSucessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 flex items-center gap-x-2 text-sm p-3 rounded-md">
      <CircleCheck />
      <p>{message}</p>
    </div>
  );
};
