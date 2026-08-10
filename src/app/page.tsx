import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageContent } from "@/components/PageContent";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <ThemeToggle />
      <LanguageSwitcher />
      <PageContent />
    </div>
  );
}
