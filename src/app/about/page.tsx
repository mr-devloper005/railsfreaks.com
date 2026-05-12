import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  { title: "Trust-first publishing", description: "Every PDF is connected to an author identity so visitors can verify source credibility quickly." },
  { title: "Clean document experience", description: "Pages are designed for fast scanning, clear previews, and low-friction downloads." },
  { title: "Profile-powered discovery", description: "Profiles, documents, and updates work together in one consistent workspace." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf7ec] text-[#2b221a]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a6548]">About {SITE_CONFIG.name}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-[#2b221a]">
            A premium PDF publishing and profile workspace built for trust, discoverability, and conversion.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pdf" className="inline-flex items-center gap-2 rounded-full border border-[#c4a484] bg-[#f7f1de] px-5 py-3 text-sm font-semibold text-[#4a3527] hover:bg-[#efe3c9]">
              Open PDF Library
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#b87c4c] px-5 py-3 text-sm font-semibold text-[#fff7eb] hover:bg-[#9f673b]">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#c4a484]/55 bg-white/85 p-6 shadow-[0_20px_55px_rgba(101,78,57,0.1)]">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-[#f3e8db] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6548]">Our Story</span>
              <h2 className="text-2xl font-semibold text-[#2b221a]">
                Built to make every PDF feel credible, searchable, and easy to trust.
              </h2>
              <p className="text-sm leading-7 text-[#6e5847]">
                {SITE_CONFIG.name} helps creators and teams publish polished PDFs with profile context, so readers can understand who created the document and why it matters.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-[1.6rem] border border-[#c4a484]/45 bg-[#fdfaf1] p-6">
                <h3 className="text-lg font-semibold text-[#2b221a]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6e5847]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
