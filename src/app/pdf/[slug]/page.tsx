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

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`;
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
    <div className="min-h-screen bg-[#eeeadf]">
      <NavbarShell />
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <Link
          href="/pdf"
          className="text-sm text-[#666] hover:text-[#333] transition-colors duration-200"
        >
          {'<- Back to PDF Library'}
        </Link>

        <section className="mb-8">
          <div className="rounded-[2rem] border border-[#d4d0c5] bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#666]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#667eea]"></span>
              Document Asset
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-[#333]">{post.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[#666]">
              Experience this document in our clean viewer. Download available for offline access.
            </p>
            <div className="mt-6">
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#667eea] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#5568d3] transition-all duration-300 hover:scale-105"
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto overflow-hidden bg-white max-w-4xl" style={{ margin: '0 auto' }}>
          <iframe
            src={viewerUrl}
            title={post.title}
            className="h-screen w-full"
            style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
          />
        </div>

        {related.length ? (
          <section className="pt-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#333]">More like this</h2>
              <Link
                href="/pdf"
                className="text-sm text-[#666] hover:text-[#333] transition-colors duration-200"
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
            <nav className="mt-8 rounded-[2rem] border border-[#d4d0c5] bg-white p-6">
              <p className="text-lg font-semibold text-[#333]">Related links</p>
              <ul className="mt-4 space-y-3 text-sm">
                {related.map((item) => (
                  <li key={`related-${item.id}`}>
                    <Link
                      href={buildPostUrl("pdf", item.slug)}
                      className="text-[#667eea] underline-offset-4 hover:underline hover:text-[#5568d3] transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/pdf" className="text-[#667eea] underline-offset-4 hover:underline hover:text-[#5568d3] transition-colors duration-200">
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
