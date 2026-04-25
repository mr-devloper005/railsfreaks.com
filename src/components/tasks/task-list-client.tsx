"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);
  const pdfFallbackPosts: SitePost[] = task === 'pdf'
    ? [
        {
          id: 'sample-pdf-1',
          title: 'Q2 Growth Experiment Playbook',
          slug: 'sample-q2-growth-experiment-playbook',
          summary: 'Conversion tests, KPI baselines, and rollout notes from a 12-week growth sprint.',
          content: {
            category: 'Marketing',
            description: 'Practical PDF sample with campaign structure, audience cohorts, and post-launch analysis.',
            location: 'Remote Team',
          },
          media: [{ url: '/placeholder.jpg' }],
          authorName: 'Riya Malhotra',
          publishedAt: '2026-03-14',
        },
        {
          id: 'sample-pdf-2',
          title: 'Customer Onboarding SOP Kit',
          slug: 'sample-customer-onboarding-sop-kit',
          summary: 'Step-by-step onboarding sequence for B2B customer success teams.',
          content: {
            category: 'Operations',
            description: 'Includes handoff checklist, kickoff template, and first-30-day accountability plan.',
            location: 'Bangalore',
          },
          media: [{ url: '/placeholder.jpg' }],
          authorName: 'Aman Bhatia',
          publishedAt: '2026-02-28',
        },
        {
          id: 'sample-pdf-3',
          title: 'Founders Financial Snapshot 2026',
          slug: 'sample-founders-financial-snapshot-2026',
          summary: 'Monthly runway model, burn tracking sheet, and revenue confidence scenarios.',
          content: {
            category: 'Finance',
            description: 'A realistic PDF sample designed for weekly founder reviews and investor updates.',
            location: 'Mumbai',
          },
          media: [{ url: '/placeholder.jpg' }],
          authorName: 'Neeraj Sethi',
          publishedAt: '2026-01-19',
        },
      ]
    : [];
  const profileFallbackPosts: SitePost[] = task === 'profile'
    ? [
        {
          id: 'sample-profile-1',
          title: 'Riya Malhotra',
          slug: 'sample-riya-malhotra',
          summary: 'Product marketing lead sharing launch briefs, campaign PDFs, and narrative-led GTM assets.',
          content: {
            category: 'Creator',
            description: 'Specializes in onboarding packs, release one-pagers, and demand-generation playbooks.',
            location: 'Bengaluru',
          },
          media: [{ url: '/placeholder-user.jpg' }],
          authorName: 'Riya Malhotra',
          publishedAt: '2026-03-22',
        },
        {
          id: 'sample-profile-2',
          title: 'Aarav Khanna',
          slug: 'sample-aarav-khanna',
          summary: 'Growth operations manager publishing KPI dashboards, funnel audits, and weekly performance PDFs.',
          content: {
            category: 'Professional',
            description: 'Focuses on conversion analysis, lifecycle funnels, and experiment review documents.',
            location: 'Delhi',
          },
          media: [{ url: '/placeholder-user.jpg' }],
          authorName: 'Aarav Khanna',
          publishedAt: '2026-02-17',
        },
        {
          id: 'sample-profile-3',
          title: 'Neha Sood',
          slug: 'sample-neha-sood',
          summary: 'Research editor curating evidence-backed reports and executive summary PDFs for leadership teams.',
          content: {
            category: 'Research',
            description: 'Known for concise insight briefs, trend synthesis docs, and stakeholder-ready summaries.',
            location: 'Pune',
          },
          media: [{ url: '/placeholder-user.jpg' }],
          authorName: 'Neha Sood',
          publishedAt: '2026-01-30',
        },
      ]
    : [];

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length && task === 'pdf') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pdfFallbackPosts.map((post) => (
          <TaskPostCard key={post.id} post={post} href="/pdf" taskKey="pdf" />
        ))}
      </div>
    );
  }

  if (!merged.length && task === 'profile') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {profileFallbackPosts.map((post) => (
          <TaskPostCard key={post.id} post={post} href="/profile" taskKey="profile" />
        ))}
      </div>
    );
  }

  if (!merged.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      task === 'social'
        ? 'md:grid-cols-2'
        : task === 'article'
          ? 'sm:grid-cols-2 lg:grid-cols-3'
          : task === 'pdf'
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-4'
    }`}>
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
