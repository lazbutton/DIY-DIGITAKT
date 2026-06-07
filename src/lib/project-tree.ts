import fs from "fs";
import path from "path";

export type ProjectNode = {
  name: string;
  relativePath: string;
  type: "directory" | "file";
  children?: ProjectNode[];
};

const contentRoot = path.join(process.cwd(), "content");

const ignoredNames = new Set([".DS_Store"]);

const readableExtensions = new Set([".md", ".mdx"]);

function isIgnored(name: string) {
  return ignoredNames.has(name);
}

function isReadableFile(name: string) {
  return readableExtensions.has(path.extname(name).toLowerCase());
}

export function isMarkdownFile(name: string) {
  const extension = path.extname(name).toLowerCase();

  return extension === ".md" || extension === ".mdx";
}

function hasIgnoredSegment(relativePath: string) {
  return relativePath.split(path.sep).some((segment) => isIgnored(segment));
}

function sortNodes(nodes: ProjectNode[]) {
  return nodes.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "directory" ? -1 : 1;
    }

    return a.name.localeCompare(b.name, "fr");
  });
}

export function displayName(name: string, type: ProjectNode["type"] = "file") {
  const baseName =
    type === "file" ? name.replace(/\.[^/.]+$/, "") : name;
  const normalizedName = baseName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedName) {
    return name;
  }

  return normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1);
}

function readDirectory(directory: string, relativePath = ""): ProjectNode[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const nodes: ProjectNode[] = [];

  for (const entry of entries) {
    if (isIgnored(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);
    const entryRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      const children = readDirectory(absolutePath, entryRelativePath);

      nodes.push({
        name: entry.name,
        relativePath: entryRelativePath,
        type: "directory",
        children,
      });

      continue;
    }

    if (entry.isFile() && isReadableFile(entry.name)) {
      nodes.push({
        name: entry.name,
        relativePath: entryRelativePath,
        type: "file",
      });
    }
  }

  return sortNodes(nodes);
}

function ensureContentRoot() {
  if (!fs.existsSync(contentRoot)) {
    fs.mkdirSync(contentRoot, { recursive: true });
  }
}

export function getProjectTree() {
  ensureContentRoot();
  return readDirectory(contentRoot);
}

export function getProjectFiles(nodes = getProjectTree()): ProjectNode[] {
  return nodes.flatMap((node) => {
    if (node.type === "file") {
      return [node];
    }

    return getProjectFiles(node.children ?? []);
  });
}

export function readProjectFile(relativePath: string) {
  const normalizedPath = path.normalize(relativePath);
  ensureContentRoot();
  const absolutePath = path.resolve(contentRoot, normalizedPath);

  if (
    normalizedPath.startsWith("..") ||
    path.isAbsolute(normalizedPath) ||
    hasIgnoredSegment(normalizedPath) ||
    !absolutePath.startsWith(`${contentRoot}${path.sep}`)
  ) {
    return null;
  }

  const name = path.basename(absolutePath);

  if (!fs.existsSync(absolutePath) || isIgnored(name) || !isReadableFile(name)) {
    return null;
  }

  const stat = fs.statSync(absolutePath);

  if (!stat.isFile()) {
    return null;
  }

  return {
    name,
    relativePath: normalizedPath,
    content: fs.readFileSync(absolutePath, "utf8"),
  };
}
