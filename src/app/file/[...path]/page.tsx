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
      <header className="mb-8 space-y-4 sm:mb-10">
        <Link
          href="/"
          className="group inline-flex min-h-10 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Index
        </Link>

        <h1 className="break-words font-mono text-xs leading-6 text-neutral-500 sm:text-sm">
          {displayPath}
        </h1>
      </header>

      {isMarkdownFile(file.name) ? (
        <div className="markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="markdown-table">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {file.content}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-neutral-900 bg-[#050505] p-4 font-mono text-[12px] leading-relaxed text-neutral-400 sm:p-6 sm:text-[13px]">
          {file.content}
        </pre>
      )}
    </article>
  );
}
