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
  evidence: string;
  boundaries: string;
  next: string;
}

export const projects: readonly Project[] = [
  {
    id: "hero", number: "01", name: "Hero Services", path: "/work/hero",
    kind: "Production engineering", status: "Production web and mobile platform",
    summary: "Software for water and wastewater operations: offline field work, live coordination, configurable forms, and deployment pipelines.",
    stack: ["Python / Flask", "React", "React Native", "PostgreSQL", "Redis", "AWS"],
    question: "How do field teams collect operational data and coordinate work when connectivity is unreliable?",
    contribution: "I joined as a full-stack developer in 2022 and became lead developer in 2025, later assuming sole development responsibility. My work spans web and mobile applications, backend services, synchronization, deployment, and production support.",
    implementation: [
      "Offline-first React Native / Expo workflows with durable local storage, network-aware request queues, and synchronization.",
      "Socket.IO communication between React and Flask, with Redis storing rooms and resource locks to coordinate active clients.",
      "Dynamic forms generated from checksheet specifications, reporting systems, and custom D3 visualizations.",
      "Scheduled emails and event-driven notifications for due states, completed checksheets, and configurable out-of-range readings.",
      "Branch-triggered CodeBuild pipelines with component-specific builds. Lambda releases deploy automatically; frontend and API releases require manual ECS restarts.",
      "Production authentication updates and a password-hashing migration."
    ],
    flow: ["Field and web clients", "Flask + Socket.IO", "PostgreSQL + Redis", "Reports + notifications"],
    evidence: "Professional ownership of a deployed platform serving multiple client organizations. This case study describes the architecture and engineering responsibilities; employer source code and operational records are not included.",
    boundaries: "The release pipeline includes a manual ECS step. Offline synchronization and resource locking address separate coordination problems.",
    next: "Apply this experience in dependable application infrastructure to an interdisciplinary research team."
  },
  {
    id: "orbit", number: "02", name: "ORBIT", path: "/work/orbit",
    kind: "Behavioral data", status: "Working mobile app · exploratory clustering",
    summary: "Longitudinal logging of mood, activities, diet, exercise, and medication, with exploratory clustering over current and recent observations.",
    stack: ["Mobile application", "Longitudinal data", "State vectors", "Clustering"],
    question: "How can structured personal observations make patterns in mood and daily activity easier to explore?",
    contribution: "I built a functioning mobile application for collecting observations over time and began integrating a clustering algorithm to explore relationships between logged states and activities.",
    implementation: [
      "Logging for mood, activities, food, exercise, and medication over time.",
      "State vectors representing current observations and the recent past.",
      "Clustering over those vectors as an exploratory step toward identifying patterns in the recorded data."
    ],
    flow: ["Daily observations", "Current + recent state", "Clustering", "Pattern exploration"],
    evidence: "The mobile logging application works, and clustering is implemented. The recommendation stage remains unfinished.",
    boundaries: "Clusters do not establish that a food, activity, or medication caused a change in mood. Predictive usefulness and recommendations require separate evaluation.",
    next: "Document the feature representation and clustering method, inspect synthetic examples, and evaluate temporal behavior before developing recommendations."
  },
  {
    id: "memory", number: "03", name: "AI memory harness", path: "/work/memory-harness",
    kind: "Associative retrieval", status: "Implemented experimental harness",
    summary: "Semantic matches, reinforced co-retrieval links, recursive graph exploration, and emoji-based emotional associations in one memory-retrieval system.",
    stack: ["Semantic retrieval", "Weighted graphs", "Recursive retrieval", "Emotional associations"],
    question: "How can retrieval use both similarity and the history of which memories have been retrieved together?",
    contribution: "I built a harness that retrieves semantically relevant memories, explores related memories recursively, and strengthens links between items retrieved together. A separate emoji-based graph contributes an emotional association signal.",
    implementation: [
      "Semantic matching to identify candidate memories.",
      "Strengthened links between memories retrieved together, with recursive exploration of potentially relevant items.",
      "A separate graph of emoji-based associations, balancing emotional and semantic similarity with recency and retrieval-derived groups."
    ],
    flow: ["Retrieval query", "Semantic candidates", "Linked memory exploration", "Combined retrieval signals"],
    evidence: "An implemented retrieval architecture. Its mechanisms can be demonstrated independently of claims about retrieval quality or biological memory.",
    boundaries: "Co-retrieval reinforcement can amplify existing associations. Improved relevance, robustness, and emotional interpretation are evaluation questions, not established outcomes.",
    next: "Create a synthetic evaluation set and compare semantic-only retrieval with graph and emotional-association channels enabled."
  },
  {
    id: "whorl", number: "04", name: "WHORL", path: "/work/whorl",
    kind: "Physical interface", status: "Working hardware and software prototype",
    summary: "A magnet-equipped fidget spinner becomes a musical controller, turning Hall-sensor pulses into continuous synthesizer modulation.",
    stack: ["Arduino GIGA R1", "C++", "Python", "Serial", "MIDI"],
    question: "How can a small physical gesture become a responsive, expressive musical control?",
    contribution: "I integrated an Arduino GIGA R1, Hall sensor, and magnet-equipped spinner with a serial-to-MIDI bridge and Logic / Alchemy.",
    implementation: [
      "C++ firmware tracks pulses, estimates RPM, smooths values, and detects stopping.",
      "A serial protocol carries controller values and RPM to a Python bridge.",
      "The bridge sends MIDI through CoreMIDI / IAC to control synthesizer modulation.",
      "A documented protocol and automated parser tests support the software integration."
    ],
    flow: ["Spinner + magnets", "Hall sensor", "C++ pulse processing", "Python → MIDI", "Synth modulation"],
    evidence: "The physical controller works with Logic / Alchemy, connecting sensor acquisition, signal conditioning, protocol design, and musical interaction.",
    boundaries: "Developed collaboratively with AI tools. Sensor behavior and musical response are prototype observations; formal latency and accuracy characterization remain future work.",
    next: "Document calibration, stopping behavior, and an end-to-end demonstration alongside the firmware and bridge source."
  }
];
