// The latest GitHub release of each project that names its repository in a `github:`
// property, as { "owner/repo": { version, date } }. The layout shows it as the page's
// "last updated" date.
//
// Read once per build. A repository that cannot be reached is simply left out, so a
// GitHub outage or rate limit never fails the build — the page shows its start date alone.
const fs = require("fs");
const path = require("path");

const PROJECTS = path.join(__dirname, "..", "projects");

/** The `github:` property of each project page, read straight from its front matter. */
function projectRepos() {
  return fs
    .readdirSync(PROJECTS)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const text = fs.readFileSync(path.join(PROJECTS, name), "utf8");
      const frontMatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const repo = frontMatter && frontMatter[1].match(/^github:\s*["']?([\w.-]+\/[\w.-]+)["']?\s*$/m);
      return repo ? repo[1] : null;
    })
    .filter(Boolean);
}

async function latestRelease(repo) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "celi-website" };
  // Optional: a token raises GitHub's limit of 60 unauthenticated requests an hour.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers,
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const release = await response.json();
  return { version: release.tag_name, date: release.published_at };
}

module.exports = async function () {
  const releases = {};
  await Promise.all(
    projectRepos().map(async (repo) => {
      try {
        releases[repo] = await latestRelease(repo);
      } catch (error) {
        console.warn(`[latestReleases] ${repo}: ${error.message}; showing the start date only.`);
      }
    })
  );
  return releases;
};
