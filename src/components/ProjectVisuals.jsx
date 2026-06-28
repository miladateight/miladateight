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
  { id: "office", label: "Local site", meta: "LAN users", x: 86, y: 170, w: 104, zone: "local" },
  { id: "mikrotik", label: "MikroTik", meta: "NAT firewall", x: 190, y: 252, w: 118, zone: "local" },
  { id: "wireguard", label: "WireGuard", meta: "sealed tunnel", x: 324, y: 216, w: 122, zone: "bridge" },
  { id: "dns", label: "DNS", meta: "SPF DKIM TLSA", x: 176, y: 78, w: 110, zone: "local" },
  { id: "vps", label: "VPS", meta: "public IP", x: 438, y: 118, w: 94, zone: "public" },
  { id: "proxy", label: "HAProxy/Caddy", meta: "TCP + TLS", x: 542, y: 142, w: 128, zone: "public" },
  { id: "web", label: "Web", meta: "HTTPS app", x: 646, y: 78, w: 86, zone: "public" },
  { id: "mail", label: "Mail", meta: "SMTP IMAP", x: 648, y: 202, w: 92, zone: "public" },
  { id: "backup", label: "Backup", meta: "encrypted", x: 548, y: 294, w: 104, zone: "public" },
];

const infraPathMap = {
  officeToDns: { id: "officeToDns", label: "resolver query", d: "M86 170 C106 120 132 86 176 78", kind: "dns" },
  dnsToVps: { id: "dnsToVps", label: "public answer", d: "M176 78 C272 42 354 64 438 118", kind: "dns" },
  officeToEdge: { id: "officeToEdge", label: "local edge", d: "M86 170 C122 210 150 238 190 252", kind: "local" },
  edgeToTunnel: { id: "edgeToTunnel", label: "WireGuard", d: "M190 252 C236 262 276 218 324 216", kind: "secure" },
  tunnelToVps: { id: "tunnelToVps", label: "encrypted tunnel", d: "M324 216 C368 206 390 144 438 118", kind: "secure" },
  vpsToProxy: { id: "vpsToProxy", label: "public split", d: "M438 118 C474 118 502 136 542 142", kind: "public" },
  proxyToWeb: { id: "proxyToWeb", label: "web", d: "M542 142 C580 108 604 84 646 78", kind: "web" },
  proxyToMail: { id: "proxyToMail", label: "mail", d: "M542 142 C586 150 612 190 648 202", kind: "mail" },
  mailToDns: { id: "mailToDns", label: "SPF DKIM", d: "M648 202 C514 42 320 40 176 78", kind: "dns" },
  mailToBackup: { id: "mailToBackup", label: "backup", d: "M648 202 C634 256 596 286 548 294", kind: "backup" },
  webToBackup: { id: "webToBackup", label: "snapshot", d: "M646 78 C666 190 620 278 548 294", kind: "backup" },
};

const infraFlows = [
  { id: "web", label: "Web", detail: "DNS to VPS, proxy split, HTTPS app", paths: ["officeToDns", "dnsToVps", "vpsToProxy", "proxyToWeb"], nodes: ["office", "dns", "vps", "proxy", "web"] },
  { id: "mail", label: "Mail", detail: "MX, TLS, SMTP/IMAP, auth records", paths: ["officeToDns", "dnsToVps", "vpsToProxy", "proxyToMail", "mailToDns"], nodes: ["office", "dns", "vps", "proxy", "mail"] },
  { id: "tunnel", label: "Tunnel", detail: "MikroTik through WireGuard to VPS", paths: ["officeToEdge", "edgeToTunnel", "tunnelToVps"], nodes: ["office", "mikrotik", "wireguard", "vps"] },
  { id: "backup", label: "Backup", detail: "Encrypted service snapshots off site", paths: ["proxyToWeb", "webToBackup", "proxyToMail", "mailToBackup"], nodes: ["web", "mail", "backup", "proxy"] },
];

function InfrastructureVisual() {
  const auto = useLoop(infraFlows.length, 2600);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const activeFlow = infraFlows.find((flow) => flow.id === selectedFlow) || infraFlows[auto];
  const activePaths = new Set(activeFlow.paths);
  const activeNodes = new Set(activeFlow.nodes);
  const visiblePaths = Object.values(infraPathMap);

  return (
    <div className="project-visual-scene infrastructure-demo" data-visual="hybrid-infrastructure" aria-label="Hybrid web and mail infrastructure topology illustration">
      <div className="infra-flow-controls" role="group" aria-label="Infrastructure flow selector">
        {infraFlows.map((flow) => (
          <button
            type="button"
            key={flow.id}
            className={activeFlow.id === flow.id ? "is-active" : ""}
            onClick={() => setSelectedFlow(flow.id)}
          >
            <strong>{flow.label}</strong>
            <span>{flow.detail}</span>
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 380" aria-hidden="true">
        <defs>
          <linearGradient id="infra-zone-local" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="infra-zone-public" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.03" />
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
          <rect x="28" y="42" width="284" height="282" rx="30" />
          <text x="50" y="72">LOCAL SITE</text>
          <text x="50" y="302">router, LAN, tunnel origin</text>
        </g>
        <g className="infra-zone zone-cloud">
          <rect x="386" y="34" width="308" height="304" rx="30" />
          <text x="410" y="64">PUBLIC INFRASTRUCTURE</text>
          <text x="410" y="316">VPS, proxy, web, mail, backup</text>
        </g>
        <path className="infra-tunnel-body" d={infraPathMap.edgeToTunnel.d + " " + infraPathMap.tunnelToVps.d.replace("M324 216", "")} />
        {visiblePaths.map((path) => (
          <motion.path
            className={`infra-path infra-${path.kind} ${activePaths.has(path.id) ? "is-active" : ""}`}
            d={path.d}
            key={path.id}
            initial={false}
            animate={{ pathLength: activePaths.has(path.id) ? 1 : 0.62, opacity: activePaths.has(path.id) ? 0.98 : 0.16 }}
            transition={{ duration: 0.55 }}
          />
        ))}
        {activeFlow.paths.map((pathId, index) => {
          const path = infraPathMap[pathId];
          return (
            <motion.circle key={`${activeFlow.id}-${pathId}`} r={path.kind === "secure" ? "5.5" : "4.5"} className={`packet packet-${path.kind}`}>
              <animateMotion dur={path.kind === "secure" ? "2.8s" : "3.5s"} repeatCount="indefinite" begin={`${index * 0.22}s`} path={path.d} />
            </motion.circle>
          );
        })}
        {infraNodes.map((node) => (
          <g className={`infra-node node-${node.zone} ${activeNodes.has(node.id) ? "is-active" : ""}`} key={node.id}>
            <rect x={node.x - node.w / 2} y={node.y - 27} width={node.w} height="54" rx="12" />
            <circle cx={node.x - node.w / 2 + 17} cy={node.y - 8} r="4" />
            <text className="node-label" x={node.x - node.w / 2 + 30} y={node.y - 5}>{node.label}</text>
            <text className="node-meta" x={node.x - node.w / 2 + 17} y={node.y + 16}>{node.meta}</text>
            {activeNodes.has(node.id) && <circle className="node-halo" cx={node.x} cy={node.y} r="37" />}
          </g>
        ))}
        <g className="infra-status-rail">
          <text x="48" y="360">active flow:</text>
          <text x="138" y="360">{activeFlow.label}</text>
          <text x="214" y="360">{activeFlow.detail}</text>
        </g>
      </svg>
      <div className="infra-legend">
        <span>web request</span>
        <span>mail delivery</span>
        <span>WireGuard tunnel</span>
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
