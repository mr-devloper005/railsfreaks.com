import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("pdf", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
    return post ? await buildPostMetadata("pdf", post) : await buildTaskMetadata("pdf");
  } catch (error) {
    console.warn("PDF metadata lookup failed", error);
    return await buildTaskMetadata("pdf");
  }
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;
  try {
    post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
  } catch (error) {
    console.warn("PDF detail lookup failed", error);
  }
  if (!post) {
    notFound();
  }

  const content = post.content && typeof post.content === "object" ? post.content : {};
  const contentAny = content as Record<string, unknown>;
  const fileUrl =
    (typeof contentAny.fileUrl === "string" && contentAny.fileUrl) ||
    (typeof contentAny.pdfUrl === "string" && contentAny.pdfUrl) ||
    "";

  if (!fileUrl || !/^https?:\/\//i.test(fileUrl)) {
    notFound();
  }

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const category =
    typeof contentAny.category === "string" ? contentAny.category : "";
  const related = (await fetchTaskPosts("pdf", 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!category) return true;
      const itemContent = item.content && typeof item.content === "object" ? item.content : {};
      const itemCategory =
        typeof (itemContent as Record<string, unknown>).category === "string"
          ? (itemContent as Record<string, unknown>).category
          : "";
      return itemCategory === category;
    })
    .slice(0, 3);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Library",
        item: `${baseUrl}/pdf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f1de_0%,#fcf8ee_45%,#f7f1de_100%)]">
      <NavbarShell />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <Link
          href="/pdf"
          className="text-sm text-[#6e5847] hover:text-[#2b221a]"
        >
          {'<- Back to PDF Library'}
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[1.8rem] border border-[#c4a484]/60 bg-white/82 p-6 shadow-[0_18px_48px_rgba(99,76,56,0.1)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6548]">Document Asset</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#2b221a]">{post.title}</h1>
            <p className="mt-3 text-sm leading-7 text-[#6e5847]">
              Preview the document inline, then download the original file with one click.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-[#b87c4c] px-4 py-2 text-sm font-semibold text-[#fff7eb] hover:bg-[#9f673b]"
              >
                Download PDF
              </a>
              <Link
                href="/profile"
                className="rounded-lg border border-[#c4a484] bg-[#fdf6e7] px-4 py-2 text-sm font-semibold text-[#4a3527] hover:bg-[#f4e9d1]"
              >
                View author profiles
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Preview-first flow", "Open and assess before downloading."],
              ["Profile context", "Cross-check source through profile pages."],
              ["Fast sharing", "Document links stay stable and easy to distribute."],
              ["Mobile optimized", "Reader works smoothly on smaller screens."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[1.4rem] border border-[#c4a484]/45 bg-[#fffaf1] p-4">
                <p className="text-sm font-semibold text-[#2b221a]">{title}</p>
                <p className="mt-2 text-xs leading-6 text-[#6e5847]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="overflow-hidden rounded-2xl border border-[#c4a484]/55 bg-white shadow-[0_18px_48px_rgba(99,76,56,0.1)]">
          <iframe
            src={viewerUrl}
            title={post.title}
            className="h-[85vh] w-full"
          />
        </div>

        {related.length ? (
          <section className="pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2b221a]">More like this</h2>
              <Link
                href="/pdf"
                className="text-sm text-[#6e5847] hover:text-[#2b221a]"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl("pdf", item.slug)}
                  taskKey="pdf"
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-[#c4a484]/50 bg-white/75 p-4">
              <p className="text-sm font-semibold text-[#2b221a]">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {related.map((item) => (
                  <li key={`related-${item.id}`}>
                    <Link
                      href={buildPostUrl("pdf", item.slug)}
                      className="text-[#7d5538] underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/pdf" className="text-[#7d5538] underline-offset-4 hover:underline">
                    Browse all PDFs
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
