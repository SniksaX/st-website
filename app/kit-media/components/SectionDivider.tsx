import { Separator } from "@/components/ui/separator";

export default function SectionDivider({
  size = "lg",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const y = size === "sm" ? "my-6" : size === "md" ? "my-8" : "my-12";
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${y}`}>
      <Separator className={`bg-border ${className}`} />
    </div>
  );
}
