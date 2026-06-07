import Link from "next/link";
import {
  displayName,
  getProjectTree,
  type ProjectNode,
} from "@/lib/project-tree";

function fileHref(relativePath: string) {
  return `/file/${relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function Tree({ nodes, depth = 0 }: { nodes: ProjectNode[]; depth?: number }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => (
        <li key={node.relativePath}>
          <div
            className="group flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl px-3 py-2.5 font-mono text-[14px] transition-colors hover:bg-white/[0.035] sm:gap-3 sm:text-[15px]"
            style={{ paddingLeft: `${depth * 1.05 + 0.75}rem` }}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neutral-900 bg-neutral-950 text-[10px] text-neutral-600 transition-colors group-hover:border-neutral-800 group-hover:text-neutral-400">
              {node.type === "directory" ? "↳" : "md"}
            </span>
            {node.type === "directory" ? (
              <span className="min-w-0 truncate text-neutral-200">
                {displayName(node.name, node.type)}
              </span>
            ) : (
              <Link
                href={fileHref(node.relativePath)}
                className="min-w-0 truncate text-neutral-400 transition-colors group-hover:text-neutral-100"
              >
                {displayName(node.name, node.type)}
              </Link>
            )}
          </div>

          {node.type === "directory" && node.children?.length ? (
            <Tree nodes={node.children} depth={depth + 1} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const tree = getProjectTree();

  return (
    <section className="animate-in fade-in duration-500">
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <header className="relative overflow-hidden rounded-3xl border border-neutral-900 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] p-6 sm:rounded-[2rem] sm:p-10">
          <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-neutral-700 sm:right-6 sm:top-6" />

          <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.26em] text-neutral-500 sm:mb-8 sm:text-[11px]">
            Laz Présente
          </p>

          <h1 className="max-w-2xl text-balance text-[2.15rem] font-bold leading-[1] tracking-[-0.055em] text-neutral-50 sm:text-4xl">
            DIGITAKT DIY 
            DOCUMENTATION.
          </h1>
        </header>

        <aside className="overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-950/25 sm:rounded-[2rem]">
          <div className="flex items-center justify-between border-b border-neutral-900 px-4 py-4 sm:px-5">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500 sm:text-[11px]">
              Index
            </h2>
            <span className="font-mono text-[10px] text-neutral-700 sm:text-[11px]">
              .md / .mdx
            </span>
          </div>

          <div className="max-h-none overflow-y-auto p-2 sm:p-3 lg:max-h-[33rem]">
            {tree.length ? (
              <Tree nodes={tree} />
            ) : (
              <p className="px-3 py-2 font-mono text-[15px] text-neutral-600">
                Aucun fichier
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
