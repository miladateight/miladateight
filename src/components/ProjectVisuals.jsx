const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function KeyFixVisual() {
  return (
    <div className="project-visual-scene keyfix-visual" aria-label="KeyFix keyboard correction visualization">
      <div className="visual-terminal">
        <span>layout.watch</span>
        <strong>asdf</strong>
        <em>converted to Hello</em>
      </div>
      <div className="keyboard-grid" aria-hidden="true">
        {keyboardRows.map((row, rowIndex) => (
          <div className="keyboard-row" key={row.join("")}>
            {row.map((key, index) => (
              <span
                className={(rowIndex === 1 && index < 4) || key === "H" ? "is-lit" : ""}
                key={key}
                style={{ "--delay": `${(rowIndex * 8 + index) * 0.045}s` }}
              >
                {key}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="visual-status-line" aria-hidden="true">
        <span />
        private correction loop
      </div>
    </div>
  );
}

function NetDoctorVisual() {
  return (
    <div className="project-visual-scene netdoctor-visual" aria-label="NetDoctor diagnostic radar visualization">
      <svg viewBox="0 0 420 280" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="netGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="58%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle className="radar-glow" cx="210" cy="140" r="122" fill="url(#netGlow)" />
        {[36, 68, 100].map((radius) => (
          <circle className="radar-ring" cx="210" cy="140" fill="none" key={radius} r={radius} />
        ))}
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <line
            className="radar-spoke"
            key={angle}
            x1="210"
            x2={210 + Math.cos((angle * Math.PI) / 180) * 112}
            y1="140"
            y2={140 + Math.sin((angle * Math.PI) / 180) * 112}
          />
        ))}
        <path className="radar-sweep" d="M210 140 L210 38 A102 102 0 0 1 298 90 Z" />
        {[
          [150, 96],
          [282, 112],
          [252, 202],
          [172, 190],
        ].map(([x, y], index) => (
          <circle className="radar-node" cx={x} cy={y} key={`${x}-${y}`} r={index === 1 ? 7 : 5} />
        ))}
      </svg>
      <div className="diagnostic-stack">
        {["dns: ok", "latency: watch", "proxy: clean"].map((item, index) => (
          <span key={item} style={{ "--delay": `${index * 0.12}s` }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function InfrastructureVisual() {
  const nodes = [
    ["web", 80, 78],
    ["mail", 310, 82],
    ["dns", 202, 188],
    ["edge", 202, 40],
  ];
  return (
    <div className="project-visual-scene infrastructure-visual" aria-label="Hybrid web and mail infrastructure topology visualization">
      <svg viewBox="0 0 420 280" role="img" aria-hidden="true">
        <path className="topology-line" d="M202 40 C158 56 118 62 80 78" />
        <path className="topology-line" d="M202 40 C246 54 278 66 310 82" />
        <path className="topology-line" d="M80 78 C118 150 150 178 202 188" />
        <path className="topology-line" d="M310 82 C280 150 246 178 202 188" />
        <path className="topology-line is-secure" d="M80 78 C154 108 238 110 310 82" />
        {nodes.map(([label, x, y], index) => (
          <g className="topology-node" key={label} style={{ "--delay": `${index * 0.11}s` }}>
            <rect height="42" rx="9" width="72" x={x - 36} y={y - 21} />
            <circle cx={x - 22} cy={y} r="4" />
            <text x={x - 8} y={y + 5}>{label}</text>
          </g>
        ))}
      </svg>
      <div className="infra-legend">
        <span>HAProxy</span>
        <span>WireGuard</span>
        <span>DNS</span>
        <span>Backups</span>
      </div>
    </div>
  );
}

function BotVisual() {
  return (
    <div className="project-visual-scene bot-visual" aria-label="Telegram media downloader automation visualization">
      <div className="bot-phone">
        <div className="bot-bubble is-user">/yt link</div>
        <div className="bot-bubble is-bot">
          <span>fetching media</span>
          <em />
        </div>
        <div className="media-packet">
          <span />
          <strong>mp4</strong>
          <small>ready</small>
        </div>
      </div>
      <div className="bot-route" aria-hidden="true">
        {["YouTube", "Instagram", "SoundCloud"].map((item, index) => (
          <span key={item} style={{ "--delay": `${index * 0.14}s` }}>{item}</span>
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
  const Scene = sceneMap[slug];
  if (!Scene) return null;
  return <Scene />;
}
