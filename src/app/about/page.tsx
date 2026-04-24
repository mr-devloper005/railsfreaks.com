import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "PDFs published", value: "24k+" },
  { label: "Profile pages", value: "7.2k" },
  { label: "Monthly readers", value: "190k" },
];

const values = [
  { title: "Trust-first publishing", description: "Every PDF is connected to an author identity so visitors can verify source credibility quickly." },
  { title: "Clean document experience", description: "Pages are designed for fast scanning, clear previews, and low-friction downloads." },
  { title: "Profile-powered discovery", description: "Profiles, documents, and updates work together in one consistent workspace." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a premium PDF publishing and profile workspace built for trust, discoverability, and conversion.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/pdf">Open PDF Library</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              Built to make every PDF feel credible, searchable, and easy to trust.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} helps creators and teams publish polished PDFs with profile context, so readers can understand who created the document and why it matters.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
