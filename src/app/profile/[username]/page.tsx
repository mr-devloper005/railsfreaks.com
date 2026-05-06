import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Bell } from "lucide-react";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
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
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#eeeadf]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        
        <section className="mb-12">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar - Member Info */}
            <div className="rounded-[2rem] border border-[#d4d0c5] bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <h3 className="text-xl font-bold text-[#333] mb-6">Member Info</h3>
              
              {/* Logo/Avatar */}
              <div className="mb-6 flex justify-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-[#667eea] bg-[#f0f0f0]">
                  {logoUrl ? (
                    <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="96px" intrinsicWidth={96} intrinsicHeight={96} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#667eea]">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-[#333]">{brandName}</h4>
              </div>

              {/* Follow Button */}
              <Button asChild className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#667eea] px-4 py-3 text-white hover:bg-[#5568d3] transition-colors">
                <Link href="/login">
                  <Bell className="h-4 w-4" />
                  Follow
                </Link>
              </Button>
            </div>

            {/* Main Content - Tabbed Interface */}
            <div className="rounded-[2rem] border border-[#d4d0c5] bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              {/* Tab Content - Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#333] mb-4">Personal Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#666] uppercase tracking-wider">Name</label>
                      <p className="mt-1 text-sm font-medium text-[#333]">{brandName}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#666] uppercase tracking-wider">About</label>
                    <article
                      className="article-content prose prose-slate mt-1 max-w-none text-sm leading-relaxed prose-p:my-2 prose-a:text-[#667eea] prose-a:underline"
                      dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                  </div>
                  {website ? (
                    <div>
                      <label className="text-xs font-medium text-[#666] uppercase tracking-wider">Website</label>
                      <p className="mt-1 text-sm font-medium text-[#667eea]">
                        <Link href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {domain || website}
                        </Link>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#333]">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-[#667eea] hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-8 rounded-[2rem] border border-[#d4d0c5] bg-white p-6">
              <p className="text-lg font-semibold text-[#333]">Related links</p>
              <ul className="mt-4 space-y-3 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-[#667eea] underline-offset-4 hover:underline hover:text-[#5568d3] transition-colors"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-[#667eea] underline-offset-4 hover:underline hover:text-[#5568d3] transition-colors">
                    Browse all profiles
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
