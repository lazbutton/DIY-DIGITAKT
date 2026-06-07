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
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-[15px] transition-colors hover:bg-white/[0.035]"
            style={{ paddingLeft: `${depth * 1.4 + 0.75}rem` }}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neutral-900 bg-neutral-950 text-[10px] text-neutral-600 transition-colors group-hover:border-neutral-800 group-hover:text-neutral-400">
              {node.type === "directory" ? "↳" : "md"}
            </span>
            {node.type === "directory" ? (
              <span className="text-neutral-200">
                {displayName(node.name, node.type)}
              </span>
            ) : (
              <Link
                href={fileHref(node.relativePath)}
                className="text-neutral-400 transition-colors group-hover:text-neutral-100"
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
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <header className="relative overflow-hidden rounded-[2rem] border border-neutral-900 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] p-8 sm:p-10">
          <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-neutral-700" />

          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            Markdown archive
          </p>

          <h1 className="max-w-2xl text-balance text-4xl font-medium leading-[0.96] tracking-[-0.06em] text-neutral-50 sm:text-6xl">
            Documentation DIGITAKT
          </h1>

          <p className="mt-8 max-w-md text-sm leading-6 text-neutral-500">
            Fichiers publics issus de `website/content`.
          </p>
        </header>

        <aside className="overflow-hidden rounded-[2rem] border border-neutral-900 bg-neutral-950/25">
          <div className="flex items-center justify-between border-b border-neutral-900 px-5 py-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              Index
            </h2>
            <span className="font-mono text-[11px] text-neutral-700">
              .md / .mdx
            </span>
          </div>

          <div className="max-h-[33rem] overflow-y-auto p-3">
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
