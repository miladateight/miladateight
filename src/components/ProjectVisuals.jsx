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
  { label: "Users", meta: "office", x: 68, y: 168, w: 92 },
  { label: "DNS", meta: "SPF DKIM", x: 155, y: 72, w: 90 },
  { label: "MikroTik", meta: "edge", x: 178, y: 248, w: 112 },
  { label: "WireGuard", meta: "tunnel", x: 310, y: 206, w: 118 },
  { label: "VPS", meta: "public IP", x: 424, y: 130, w: 98 },
  { label: "HAProxy", meta: "TCP split", x: 530, y: 128, w: 116 },
  { label: "Web", meta: "Nginx TLS", x: 636, y: 74, w: 90 },
  { label: "Mail", meta: "Exim IMAP", x: 642, y: 174, w: 96 },
  { label: "Backup", meta: "off-site", x: 558, y: 278, w: 104 },
];

const infraPaths = [
  { id: "dns", label: "DNS resolution", d: "M68 168 C92 124 118 88 155 72", kind: "dns" },
  { id: "edge", label: "office edge", d: "M68 168 C116 204 128 238 178 248", kind: "local" },
  { id: "tunnel", label: "secure tunnel", d: "M178 248 C226 246 260 212 310 206 C356 202 382 154 424 130", kind: "secure" },
  { id: "proxy", label: "VPS proxy", d: "M424 130 C460 116 490 122 530 128", kind: "public" },
  { id: "web", label: "HTTPS", d: "M530 128 C570 98 594 80 636 74", kind: "web" },
  { id: "mail", label: "SMTP/IMAP", d: "M530 128 C574 142 606 166 642 174", kind: "mail" },
  { id: "backup", label: "encrypted backup", d: "M642 174 C642 226 608 264 558 278", kind: "backup" },
  { id: "auth", label: "mail auth", d: "M155 72 C304 48 478 58 642 174", kind: "dns" },
];

function InfrastructureVisual() {
  const active = useLoop(infraPaths.length, 1200);
  return (
    <div className="project-visual-scene infrastructure-demo" data-visual="hybrid-infrastructure" aria-label="Hybrid web and mail infrastructure topology illustration">
      <svg viewBox="0 0 720 360" aria-hidden="true">
        <defs>
          <linearGradient id="infra-zone" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>
          <filter id="infra-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="infra-zone zone-local">
          <rect x="26" y="44" width="276" height="270" rx="26" />
          <text x="48" y="72">LOCAL / OFFICE EDGE</text>
        </g>
        <g className="infra-zone zone-cloud">
          <rect x="386" y="36" width="304" height="286" rx="26" />
          <text x="410" y="66">PUBLIC VPS / SERVICES</text>
        </g>
        {infraPaths.map((path, index) => (
          <motion.path
            className={`infra-path infra-${path.kind} ${index === active ? "is-active" : ""}`}
            d={path.d}
            key={path.id}
            initial={false}
            animate={{ pathLength: index <= active ? 1 : 0.55, opacity: index === active ? 0.95 : 0.32 }}
            transition={{ duration: 0.65 }}
          />
        ))}
        {infraPaths.map((path, index) => (
          <motion.circle key={`${path.id}-packet`} r={path.kind === "secure" ? "5" : "4"} className={`packet packet-${path.kind}`}>
            <animateMotion dur={path.kind === "secure" ? "3.7s" : "4.6s"} repeatCount="indefinite" begin={`${index * 0.2}s`} path={path.d} />
          </motion.circle>
        ))}
        {infraNodes.map((node, index) => (
          <g className={`infra-node node-${index}`} key={node.label}>
            <rect x={node.x - node.w / 2} y={node.y - 26} width={node.w} height="52" rx="12" />
            <circle cx={node.x - node.w / 2 + 17} cy={node.y - 7} r="4" />
            <text className="node-label" x={node.x - node.w / 2 + 30} y={node.y - 4}>{node.label}</text>
            <text className="node-meta" x={node.x - node.w / 2 + 17} y={node.y + 15}>{node.meta}</text>
            {index === (active + 1) % infraNodes.length && <circle className="node-halo" cx={node.x} cy={node.y} r="36" />}
          </g>
        ))}
        <g className="infra-status-rail">
          <text x="46" y="334">packet flow:</text>
          {infraPaths.slice(0, 4).map((path, index) => (
            <text key={path.id} x={142 + index * 122} y="334">{path.label}</text>
          ))}
        </g>
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
