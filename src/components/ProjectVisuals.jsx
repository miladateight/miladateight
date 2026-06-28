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
      <div className="demo-caption">Functional illustration of the diagnostic and repair workflow</div>
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
  { id: "users", label: "Users", meta: "requests", x: 72, y: 126, w: 92, zone: "local", status: "active" },
  { id: "site", label: "Local Site", meta: "LAN services", x: 72, y: 248, w: 112, zone: "local", status: "private" },
  { id: "mikrotik", label: "MikroTik", meta: "firewall/NAT", x: 216, y: 188, w: 116, zone: "local", status: "edge" },
  { id: "wireguard", label: "WireGuard", meta: "encrypted link", x: 352, y: 188, w: 122, zone: "bridge", status: "tunnel" },
  { id: "vps", label: "VPS", meta: "public IP", x: 492, y: 188, w: 92, zone: "public", status: "online" },
  { id: "proxy", label: "HAProxy/Caddy", meta: "TCP + TLS", x: 630, y: 188, w: 132, zone: "public", status: "routing" },
  { id: "web", label: "Web", meta: "HTTPS app", x: 730, y: 102, w: 84, zone: "public", status: "200" },
  { id: "mail", label: "Mail", meta: "SMTP/IMAP", x: 730, y: 274, w: 92, zone: "public", status: "queue ok" },
  { id: "dns", label: "DNS / TLS", meta: "MX SPF DKIM", x: 492, y: 72, w: 112, zone: "public", status: "valid" },
  { id: "backup", label: "Backup", meta: "encrypted", x: 492, y: 318, w: 104, zone: "public", status: "verified" },
];

const infraPathMap = {
  usersToDns: { id: "usersToDns", d: "M118 126 C230 56 360 54 436 72", kind: "dns" },
  dnsToVps: { id: "dnsToVps", d: "M548 72 C570 98 560 142 538 188", kind: "dns" },
  usersToMikrotik: { id: "usersToMikrotik", d: "M118 126 C150 142 178 164 216 188", kind: "web" },
  siteToMikrotik: { id: "siteToMikrotik", d: "M128 248 C154 226 180 204 216 188", kind: "local" },
  mikrotikToWireguard: { id: "mikrotikToWireguard", d: "M274 188 C302 188 324 188 352 188", kind: "tunnel" },
  wireguardToVps: { id: "wireguardToVps", d: "M413 188 C440 188 466 188 492 188", kind: "tunnel" },
  vpsToProxy: { id: "vpsToProxy", d: "M538 188 C570 188 598 188 630 188", kind: "web" },
  proxyToWeb: { id: "proxyToWeb", d: "M696 188 C716 160 724 134 730 102", kind: "web" },
  proxyToMail: { id: "proxyToMail", d: "M696 188 C716 216 724 246 730 274", kind: "mail" },
  mailToDns: { id: "mailToDns", d: "M730 274 C660 210 606 114 548 72", kind: "dns" },
  webToBackup: { id: "webToBackup", d: "M730 102 C680 214 610 292 544 318", kind: "backup" },
  mailToBackup: { id: "mailToBackup", d: "M730 274 C664 304 602 318 544 318", kind: "backup" },
};

const infraFlows = [
  { id: "web", label: "Web", detail: "Users resolve DNS, hit the VPS, and reach the web service through HAProxy/Caddy.", paths: ["usersToDns", "dnsToVps", "vpsToProxy", "proxyToWeb"], nodes: ["users", "dns", "vps", "proxy", "web"] },
  { id: "mail", label: "Mail", detail: "Mail uses public DNS records, TLS, and the proxy path to SMTP/IMAP services.", paths: ["usersToDns", "dnsToVps", "vpsToProxy", "proxyToMail", "mailToDns"], nodes: ["users", "dns", "vps", "proxy", "mail"] },
  { id: "tunnel", label: "Tunnel", detail: "Local services leave through MikroTik, cross WireGuard, and terminate at the VPS.", paths: ["siteToMikrotik", "mikrotikToWireguard", "wireguardToVps"], nodes: ["site", "mikrotik", "wireguard", "vps"] },
  { id: "backup", label: "Backup", detail: "Web and mail snapshots move to an encrypted backup target after the public split.", paths: ["proxyToWeb", "webToBackup", "proxyToMail", "mailToBackup"], nodes: ["proxy", "web", "mail", "backup"] },
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
      <div className="demo-caption">Functional illustration of the hybrid web and mail topology</div>
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
      <svg viewBox="0 0 800 400" aria-hidden="true">
        <defs>
          <linearGradient id="infra-zone-local" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.025" />
          </linearGradient>
          <linearGradient id="infra-zone-public" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
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
          <rect x="28" y="36" width="392" height="320" rx="22" />
          <text x="50" y="64">LOCAL ENVIRONMENT</text>
          <text x="50" y="338">users, LAN, router, tunnel origin</text>
        </g>
        <g className="infra-zone zone-cloud">
          <rect x="436" y="36" width="336" height="320" rx="22" />
          <text x="458" y="64">PUBLIC ENVIRONMENT</text>
          <text x="458" y="338">DNS, VPS, proxy, web, mail, backup</text>
        </g>
        <path className="infra-tunnel-body" d="M274 188 C302 188 324 188 352 188 C386 188 436 188 492 188" />
        {visiblePaths.map((path) => (
          <motion.path
            className={`infra-path infra-${path.kind} ${activePaths.has(path.id) ? "is-active" : ""}`}
            d={path.d}
            key={path.id}
            initial={false}
            animate={{ pathLength: activePaths.has(path.id) ? 1 : 0.72, opacity: activePaths.has(path.id) ? 0.98 : 0.1 }}
            transition={{ duration: 0.55 }}
          />
        ))}
        {activeFlow.paths.map((pathId, index) => {
          const path = infraPathMap[pathId];
          return (
            <motion.circle key={`${activeFlow.id}-${pathId}`} r={path.kind === "tunnel" ? "5.5" : "4.6"} className={`packet packet-${path.kind}`}>
              <animateMotion dur={path.kind === "tunnel" ? "2.9s" : "3.7s"} repeatCount="indefinite" begin={`${index * 0.22}s`} path={path.d} />
            </motion.circle>
          );
        })}
        {infraNodes.map((node) => (
          <g className={`infra-node node-${node.zone} ${activeNodes.has(node.id) ? "is-active" : ""}`} key={node.id}>
            <rect x={node.x - node.w / 2} y={node.y - 28} width={node.w} height="56" rx="10" />
            <circle cx={node.x - node.w / 2 + 15} cy={node.y - 9} r="3.8" />
            <text className="node-label" x={node.x - node.w / 2 + 28} y={node.y - 6}>{node.label}</text>
            <text className="node-meta" x={node.x - node.w / 2 + 15} y={node.y + 14}>{node.meta}</text>
            <text className="node-status" x={node.x + node.w / 2 - 12} y={node.y + 14} textAnchor="end">{node.status}</text>
          </g>
        ))}
        <g className="infra-status-rail">
          <text x="48" y="382">active flow:</text>
          <text x="138" y="382">{activeFlow.label}</text>
          <text x="204" y="382">{activeFlow.detail}</text>
        </g>
      </svg>
      <div className="infra-mobile-flow" aria-hidden="true">
        {activeFlow.nodes.map((nodeId, index) => {
          const node = infraNodes.find((item) => item.id === nodeId);
          return (
            <motion.div className="infra-mobile-node" key={`${activeFlow.id}-${nodeId}`} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <strong>{node?.label}</strong>
              <span>{node?.status}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="infra-legend" aria-hidden="true">
        <span>Only the selected flow is bright.</span>
        <span>{activeFlow.detail}</span>
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
      <div className="demo-caption">Functional illustration of the Telegram download workflow</div>
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
