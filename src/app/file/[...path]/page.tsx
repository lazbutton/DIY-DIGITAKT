import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  displayName,
  getProjectFiles,
  isMarkdownFile,
  readProjectFile,
} from "@/lib/project-tree";

export function generateStaticParams() {
  return getProjectFiles().map((file) => ({
    path: file.relativePath.split("/"),
  }));
}

export default async function FilePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const relativePath = path.join("/");
  const file = readProjectFile(relativePath);

  if (!file) {
    notFound();
  }

  const displayPath = file.relativePath
    .split("/")
    .map((segment, index, segments) =>
      displayName(segment, index === segments.length - 1 ? "file" : "directory"),
    )
    .join(" / ");

  return (
    <article className="animate-in fade-in duration-500">
      <header className="mb-10 space-y-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Index
        </Link>

        <h1 className="font-mono text-sm text-neutral-400">
          {displayPath}
        </h1>
      </header>

      {isMarkdownFile(file.name) ? (
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {file.content}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-neutral-900 bg-[#050505] p-6 font-mono text-[13px] leading-relaxed text-neutral-400">
          {file.content}
        </pre>
      )}
    </article>
  );
}
