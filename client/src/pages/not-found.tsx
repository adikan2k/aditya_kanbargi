import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <main className="flex min-h-screen items-center bg-background px-5 text-foreground md:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <p className="figure-nums font-sans text-[15px] font-semibold text-cite">404</p>
        <h1 className="display mt-3 max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)]" style={{ lineHeight: 0.92 }}>
          Nothing lives at this address.
        </h1>
        <p className="mt-6 max-w-[46ch] font-sans text-[18px] leading-snug text-muted-foreground md:text-[20px]">
          The address may have a typo, or the page has moved. Everything on the site starts from the front page.
        </p>
        <a
          href="/"
          className="press mt-8 inline-flex items-center rounded-full bg-foreground px-5 py-3 font-sans text-[15px] font-semibold text-background"
        >
          Go to the front page
        </a>
      </div>
    </main>
  );
}
