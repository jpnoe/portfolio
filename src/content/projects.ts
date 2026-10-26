export interface Project {
  id: string;
  number: string;
  name: string;
  path: string;
  kind: string;
  status: string;
  summary: string;
  stack: string[];
  question: string;
  contribution: string;
  implementation: string[];
  flow: string[];
  outcome: string;
  next?: string;
  repo?: string;
}

export const projects: readonly Project[] = [
  {
    id: "hero", number: "01", name: "Hero Services", path: "/work/hero",
    kind: "Production platform", status: "In production · multiple client organizations",
    summary: "Web and mobile software for water and wastewater operations: offline field data collection, real-time coordination, configurable forms, and reporting.",
    stack: ["Python / Flask", "React", "React Native / Expo", "Socket.IO", "PostgreSQL", "Redis", "AWS"],
    question: "How do field teams collect operational data and coordinate work when connectivity is unreliable?",
    contribution: "I joined as a full-stack developer in 2022, became lead developer in 2025, and am now the sole developer. I own the web and mobile applications, backend services, data synchronization, deployment, and production support.",
    implementation: [
      "Offline-first React Native / Expo field app with durable local storage, a network-aware request queue, and synchronization.",
      "Real-time coordination between React and Flask over Socket.IO, with Redis managing rooms and resource locks across active clients.",
      "Dynamic forms generated from checksheet specifications, plus reporting and custom D3 visualizations.",
      "Scheduled and event-driven notifications for due work, completed checksheets, and out-of-range readings.",
      "CI/CD on AWS CodeBuild, Lambda, and ECS, and production authentication and security upgrades."
    ],
    flow: ["Field and web clients", "Flask + Socket.IO", "PostgreSQL + Redis", "Reports + notifications"],
    outcome: "In daily use by multiple client organizations. Employer source code is private, so this page covers architecture and my responsibilities."
  },
  {
    id: "memory", number: "02", name: "Associative memory harness", path: "/work/memory-harness",
    kind: "Cognitive-inspired memory", status: "Working Python prototype",
    summary: "A memory-retrieval system for conversational AI, loosely modeled on associative memory: semantic similarity, reinforcement of memories recalled together, recursive expansion through a weighted memory graph, and an emotional association channel.",
    stack: ["Python", "NumPy", "sentence-transformers", "Weighted graphs", "LLM integration"],
    question: "Can an AI system recall not only what is similar to the present, but what has been recalled together before, the way associations strengthen in human memory?",
    contribution: "I designed and built the harness: embedding-based retrieval, a weighted memory graph whose links strengthen when memories are retrieved together, bounded recursive expansion, and a separate emoji-association graph used as an emotional signal. An optional command-line adapter supplies retrieved context to a chat model.",
    implementation: [
      "Cosine-similarity ranking over sentence-transformer embeddings, with an injectable encoder for deterministic testing.",
      "A weighted memory graph in which links between co-retrieved memories are reinforced using a mechanism inspired by Hebbian association, and persisted between sessions.",
      "Recursive traversal outward from semantic matches, bounded by depth, visited memories, and a content budget.",
      "A separate emoji-association graph that adds an experimental emoji-association channel alongside recent context.",
      "An offline demonstration and regression tests using fixed embeddings and a simulated model API."
    ],
    flow: ["Query", "Semantic matches", "Graph expansion", "Emotional + recent context", "Reinforce co-retrieved links"],
    outcome: "The architecture is implemented and tested. Retrieval quality has not yet been evaluated against a baseline.",
    next: "Build a held-out evaluation set and compare semantic-only retrieval with the graph and emotional channels enabled.",
    repo: "https://github.com/jpnoe/memory-harness"
  },
  {
    id: "orbit", number: "03", name: "ORBIT", path: "/work/orbit",
    kind: "Behavioral modeling", status: "Working Android app · experimental state-space analysis",
    summary: "An Android app for longitudinal logging of mood, sleep, activity, diet, and medication that encodes observations as state vectors and groups similar states to explore behavioral patterns.",
    stack: ["Kotlin", "Jetpack Compose", "Room + SQLCipher", "Coroutines / WorkManager", "Health Connect"],
    question: "How can structured self-observations be represented as a state space so that patterns in mood and behavior become visible over time?",
    contribution: "I built the application end to end: logging, encrypted local storage, reminders, trend views, and an experimental pipeline that encodes observations into a state space and groups similar states.",
    implementation: [
      "Logging for mood, journal entries, activities, meals with barcode lookup, exercise, sleep, and medication.",
      "An encrypted local database (Room with SQLCipher, keys protected by Android Keystore) and optional Health Connect biometric inputs.",
      "A ten-axis state encoder that normalizes observations and tracks which inputs are present, so missing data is not treated as neutral.",
      "A custom approximate nearest-neighbor index (HNSW-style) over a rolling 90-day window, with density-based grouping and weekly recompaction.",
      "Synthetic data generation and unit tests for the grouping and suggestion logic."
    ],
    flow: ["Daily logs + Health Connect", "State encoder", "Neighbor index", "Density-based groups", "Pattern exploration"],
    outcome: "Logging and the analysis pipeline work. Suggestions are covered by tests but are not yet a user-facing feature, and groupings show association, not causation.",
    next: "Evaluate the temporal encoding on synthetic and real data before building user-facing suggestions.",
    repo: "https://github.com/jpnoe/orbit"
  },
  {
    id: "whorl", number: "04", name: "WHORL", path: "/work/whorl",
    kind: "Physical computing", status: "Working hardware and software prototype",
    summary: "A magnet-equipped fidget spinner turned into a musical controller: Hall-sensor pulses become real-time synthesizer modulation.",
    stack: ["Arduino GIGA R1", "C++", "Python", "Serial", "MIDI"],
    question: "How can a small physical gesture become a responsive, expressive musical control?",
    contribution: "I integrated an Arduino GIGA R1, a Hall sensor, and a magnet-equipped spinner with a Python serial-to-MIDI bridge that drives a synthesizer in Logic.",
    implementation: [
      "C++ firmware counts debounced sensor pulses, estimates RPM over a full revolution, smooths the signal, and detects stopping.",
      "A documented serial protocol carries values to a Python bridge that sends MIDI control changes.",
      "Python tests for the bridge, plus host-side C++ tests that run the actual firmware against simulated input."
    ],
    flow: ["Spinner + magnets", "Hall sensor", "C++ signal processing", "Python → MIDI", "Synth modulation"],
    outcome: "Works end to end with Logic / Alchemy. Latency and accuracy have not been formally measured.",
    next: "Record a demonstration video and characterize response across spin speeds.",
    repo: "https://github.com/jpnoe/whorl"
  }
];
