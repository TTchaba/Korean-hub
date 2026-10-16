import { ErrorState } from "@/components/ui";

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      description="The page you're looking for doesn't exist or may have moved."
    />
  );
}
