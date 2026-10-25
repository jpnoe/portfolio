/**
 * Shell commit counter. Incremented from a layout effect in the shell,
 * which is a commit, not a render-function call. The shell does not
 * import the lab. The exhibit reads this to show that a keystroke
 * left the chrome alone.
 */
let commits = 0;
const listeners = new Set<() => void>();

export function noteShellCommit(): void {
  commits += 1;
  for (const listener of listeners) listener();
}

export function getShellCommits(): number {
  return commits;
}

export function subscribeShellCommits(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
