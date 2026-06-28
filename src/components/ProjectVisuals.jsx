import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const keyfixExamples = [
  { wrong: "sghl", right: "سلام", layout: "EN -> FA", keys: ["S", "G", "H", "L"] },
  { wrong: "l,sd", right: "mail", layout: "FA -> EN", keys: ["M", "A", "I", "L"] },
  { wrong: "ىخف", right: "net", layout: "AR -> EN", keys: ["N", "E", "T"] },
];

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function useLoop(max, duration = 2400) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % max), duration);
    return () => window.clearInterval(id);
  }, [duration, max, reduce]);

  return reduce ? 0 : index;
}

function KeyFixVisual() {
  const active = useLoop(keyfixExamples.length, 2600);
  const example = keyfixExamples[active];

  return (
    <div className="project-visual-scene keyfix-demo" aria-label="KeyFix functional illustration of layout correction">
      <div className="demo-caption">Functional illustration based on documented KeyFix behavior</div>
      <div className="keyfix-stage">
        <div className="keyfix-editor">
          <div className="window-bar">
            <span />
            <strong>KeyFix buffer</strong>
            <em>{example.layout}</em>
          </div>
          <div className="typed-line">
            <motion.span
              key={`wrong-${active}`}
              className="wrong-token"
              initial={{ width: "0ch" }}
              animate={{ width: `${example.wrong.length}ch` }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {example.wrong}
            </motion.span>
            <motion.span
              className="cursor"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </div>
          <motion.div
            key={`fix-${active}`}
            className="correction-line"
            initial={{ opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 0.72, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>replace</span>
            <strong>{example.right}</strong>
          </motion.div>
        </div>
        <div className="keyboard-grid" aria-hidden="true">
          {keyboardRows.map((row) => (
            <div className="keyboard-row" key={row.join("")}>
              {row.map((key) => (
                <motion.span
                  className={example.keys.includes(key) ? "is-lit" : ""}
                  key={key}
                  animate={example.keys.includes(key) ? { y: [0, 4, 0] } : undefined}
                  transition={{ duration: 0.42, repeat: Infinity, repeatDelay: 1.4 }}
                >
                  {key}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="visual-status-line">
        <span />
        local buffer, dictionary score, corrective rewrite
      </div>
    </div>
  );
}

const diagnosticSteps = [
  ["adapter", "active"],
  ["ip config", "valid"],
  ["gateway", "reachable"],
  ["dns", "resolved"],
  ["internet", "online"],
  ["latency", "42 ms"],
  ["proxy", "clean"],
  ["health", "stable"],
];

function NetDoctorVisual() {
  const active = useLoop(diagnosticSteps.length, 1050);
  return (
    <div className="project-visual-scene netdoctor-demo" aria-label="NetDoctor diagnostic workflow illustration">
      <div className="diagnostic-console">
        <div className="window-bar">
          <span />
          <strong>NetDoctor scan</strong>
          <em>safe repair mode</em>
        </div>
        <div className="diagnostic-steps">
          {diagnosticSteps.map(([label, value], index) => (
            <motion.div
              className={`diagnostic-step ${index <= active ? "is-done" : ""} ${index === active ? "is-active" : ""}`}
              key={label}
              animate={index === active ? { scale: [1, 1.02, 1] } : undefined}
              transition={{ duration: 0.7 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
              <em>{index <= active ? value : "pending"}</em>
            </motion.div>
          ))}
        </div>
      </div>
      <svg className="latency-map" viewBox="0 0 420 180" aria-hidden="true">
        <path className="latency-line" d="M34 128 C95 72 144 142 196 84 S300 98 382 42" />
        {[34, 116, 196, 292, 382].map((x, index) => (
          <motion.circle
            cx={x}
            cy={[128, 88, 84, 92, 42][index]}
            r="5"
            key={x}
            animate={{ opacity: index <= active % 5 ? 1 : 0.35, scale: index === active % 5 ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 0.7 }}
          />
        ))}
      </svg>
    </div>
  );
}

const infraNodes = [
  ["Users", 50, 150],
  ["DNS", 124, 76],
  ["MikroTik", 156, 202],
  ["WireGuard", 248, 150],
  ["VPS", 340, 150],
  ["HAProxy", 434, 104],
  ["Web", 544, 72],
  ["Mail", 544, 154],
  ["Backup", 520, 234],
];

const infraPaths = [
  "M50 150 C92 118 98 84 124 76",
  "M50 150 C98 182 112 204 156 202",
  "M156 202 C198 178 216 162 248 150",
  "M248 150 C284 136 304 146 340 150",
  "M340 150 C382 118 404 108 434 104",
  "M434 104 C480 82 502 76 544 72",
  "M434 104 C480 126 504 144 544 154",
  "M544 154 C546 190 536 214 520 234",
];

function InfrastructureVisual() {
  const active = useLoop(infraPaths.length, 1200);
  return (
    <div className="project-visual-scene infrastructure-demo" aria-label="Hybrid web and mail infrastructure topology illustration">
      <svg viewBox="0 0 600 300" aria-hidden="true">
        {infraPaths.map((path, index) => (
          <motion.path
            className={`infra-path ${index === active ? "is-active" : ""}`}
            d={path}
            key={path}
            initial={false}
            animate={{ pathLength: index <= active ? 1 : 0.55, opacity: index === active ? 0.95 : 0.32 }}
            transition={{ duration: 0.65 }}
          />
        ))}
        {infraPaths.map((path, index) => (
          <motion.circle key={`${path}-packet`} r="4" className="packet">
            <animateMotion dur="4s" repeatCount="indefinite" begin={`${index * 0.22}s`} path={path} />
          </motion.circle>
        ))}
        {infraNodes.map(([label, x, y], index) => (
          <g className="infra-node" key={label}>
            <rect x={x - 38} y={y - 18} width="76" height="36" rx="8" />
            <circle cx={x - 24} cy={y} r="4" />
            <text x={x - 13} y={y + 5}>{label}</text>
            {index === active + 1 && <circle className="node-halo" cx={x} cy={y} r="28" />}
          </g>
        ))}
      </svg>
      <div className="infra-legend">
        <span>web request</span>
        <span>mail delivery</span>
        <span>secure tunnel</span>
        <span>TLS + backup</span>
      </div>
    </div>
  );
}

const botSteps = [
  ["YouTube link", "sent"],
  ["platform", "detected"],
  ["metadata", "retrieved"],
  ["format", "selected"],
  ["processing", "68%"],
  ["file", "returned"],
];

function BotVisual() {
  const active = useLoop(botSteps.length, 1250);
  const progress = Math.min(100, Math.max(18, active * 19));
  return (
    <div className="project-visual-scene bot-demo" data-visual="downloader" aria-label="Telegram media downloader workflow illustration">
      <div className="bot-phone">
        <div className="phone-top"><span />AT8 Downloader</div>
        <motion.div className="bot-bubble is-user" layout>
          https://youtu.be/demo
        </motion.div>
        {botSteps.map(([label, value], index) => (
          <motion.div
            className={`bot-bubble is-bot ${index <= active ? "is-visible" : ""}`}
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: index <= active ? 1 : 0.18, y: index <= active ? 0 : 10 }}
          >
            <span>{label}</span>
            <em>{value}</em>
          </motion.div>
        ))}
        <div className="download-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="bot-platforms" aria-hidden="true">
        {["YouTube", "Instagram", "SoundCloud"].map((item, index) => (
          <motion.span
            key={item}
            animate={{ y: [0, -6, 0], opacity: active % 3 === index ? 1 : 0.55 }}
            transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.18 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

const sceneMap = {
  keyfix: KeyFixVisual,
  netdoctor: NetDoctorVisual,
  "hybrid-web-mail-infrastructure": InfrastructureVisual,
  "instagram-youtube-soundcloud-downloader": BotVisual,
};

export default function ProjectVisual({ slug }) {
  const Scene = useMemo(() => sceneMap[slug], [slug]);
  if (!Scene) return null;
  return <Scene />;
}
