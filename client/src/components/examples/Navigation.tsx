import { useState } from "react";
import Navigation from "../Navigation";

export default function NavigationExample() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="h-screen">
      <Navigation
        onThemeToggle={() => setIsDark(!isDark)}
        isDark={isDark}
      />
      <div className="pt-32 px-6">
        <p className="text-muted-foreground">
          Scroll to see the navigation bar change appearance
        </p>
      </div>
    </div>
  );
}
