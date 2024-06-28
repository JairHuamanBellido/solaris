import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  disable?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  classNames?: string;
}
export default function SubmitButton({
  children,
  variant = "default",
  classNames,
  disable = false,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn("h-12 w-full", classNames)}
      variant={variant}
      type="submit"
      disabled={pending || disable}
    >
      {pending ? (
        <LoaderCircle className="animate-spin" size={16} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
