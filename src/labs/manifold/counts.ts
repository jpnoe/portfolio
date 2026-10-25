/** Observable counts for one instrument mount. Listeners paint DOM; they do not setState. */
export interface Counts {
  noteExhibitCommit(): void;
  noteReadoutCommit(which: "a" | "b" | "sum"): void;
  syncWrites(writeCount: number): void;
  subscribe(listener: () => void): () => void;
  snapshot(): CountSnapshot;
}

export interface CountSnapshot {
  exhibitCommits: number;
  figureA: number;
  figureB: number;
  total: number;
  writes: number;
}

export function createCounts(): Counts {
  let exhibitCommits = 0;
  let figureA = 0;
  let figureB = 0;
  let total = 0;
  let writes = 0;
  const listeners = new Set<() => void>();

  const notify = () => {
    for (const listener of listeners) listener();
  };

  return {
    noteExhibitCommit() {
      exhibitCommits += 1;
      notify();
    },
    noteReadoutCommit(which) {
      if (which === "a") figureA += 1;
      else if (which === "b") figureB += 1;
      else total += 1;
      notify();
    },
    syncWrites(writeCount) {
      writes = writeCount;
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    snapshot() {
      return { exhibitCommits, figureA, figureB, total, writes };
    },
  };
}
