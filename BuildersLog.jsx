import { useState } from "react";

const OCEAN_BLUE = "#0077B6";
const CORAL = "#FF6B6B";
const SKY = "#48CAE4";
const SAND = "#FFF3E0";
const DARK = "#2D3436";

function Tag({ color, children }) {
  const map = {
    blue: { bg: "#e3f4fd", color: OCEAN_BLUE },
    coral: { bg: "#ffe8e8", color: CORAL },
    green: { bg: "#e3f9e5", color: "#2d7a3a" },
    gold: { bg: "#fff3cd", color: "#856404" },
    sky: { bg: "#e0f7fa", color: "#00838f" },
  };
  const s = map[color] || map.blue;
  return (
    <span style={{ display:"inline-block", padding:"2px 8px", borderRadius:20, fontSize:"0.7rem", fontWeight:700, marginRight:4, background:s.bg, color:s.color }}>
      {children}
    </span>
  );
}

function Card({ children, accent }) {
  const borders = { blue:OCEAN_BLUE, coral:CORAL, gold:"#F4A261", sky:SKY, green:"#2d7a3a" };
  return (
    <div style={{ background:"white", borderRadius:8, padding:"14px 16px", marginBottom:12, borderLeft:`4px solid ${borders[accent]||SKY}`, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <div style={{ fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px", color:"#888", marginBottom:10 }}>{children}</div>;
}

function AlertBox({ children }) {
  return (
    <div style={{ background:"#e3f4fd", borderLeft:`4px solid ${OCEAN_BLUE}`, padding:"10px 14px", marginBottom:16, fontSize:"0.85rem", color:OCEAN_BLUE, borderRadius:"0 6px 6px 0" }}>
      {children}
    </div>
  );
}

const INITIAL_LOGS = [
  {
    id: 1,
    date: "14 Jun 2026",
    focus: "Jarvis V3 deployment — Bali",
    built: "Full 7-tab Jarvis V3 live on Vercel. Tabs: Org Chart, Today, Ideas, Weekly, Monthly, Modules, Website. All working.",
    problems: "GitHub src folder structure causing build failures. Vercel not auto-detecting commits. File naming duplicates (v2, v3). Tab click events not firing in widget preview. Resolved by: root-level file structure, direct upload method, clean repo.",
    next: "Builder's Log standalone tool, Control Centre standalone tool, Ideas database upgrade.",
    commit: "jarvis-v3 — sizzler-jarvis-v3.vercel.app",
    pillar: "build",
  },
];

export default function App() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({
    focus: "", built: "", problems: "", next: "", commit: "", pillar: "build",
  });

  const now = () => new Date().toLocaleDateString("en-NZ", { day:"numeric", month:"short", year:"numeric" });

  const addLog = () => {
    if (!form.focus.trim()) return;
    setLogs([{ id: Date.now(), date: now(), ...form }, ...logs]);
    setForm({ focus:"", built:"", problems:"", next:"", commit:"", pillar:"build" });
    setShowForm(false);
  };

  const deleteLog = (id) => setLogs(logs.filter(l => l.id !== id));

  const pillarTag = (p) => {
    const m = { build:["blue","Build"], ocean:["sky","Ocean"], road:["gold","Road"], human:["coral","Human"] };
    const [c, l] = m[p] || ["blue", p];
    return <Tag color={c}>{l}</Tag>;
  };

  const inp = {
    width:"100%", padding:"8px 10px", border:"1.5px solid #ddd", borderRadius:6,
    fontSize:"0.85rem", marginBottom:8, outline:"none", boxSizing:"border-box",
    background:"#fafafa", fontFamily:"inherit",
  };
  const ta = { ...inp, resize:"vertical", minHeight:64 };

  return (
    <div style={{ fontFamily:"sans-serif", color:DARK, maxWidth:860, margin:"0 auto" }}>

      {/* Header */}
      <div style={{ background:OCEAN_BLUE, padding:"16px 20px 12px", borderRadius:"10px 10px 0 0" }}>
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div>
            <h1 style={{ fontSize:"1.4rem", fontWeight:700, color:"white", margin:0 }}>Sizzler Builder's Log</h1>
            <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.75)", fontStyle:"italic", margin:"4px 0 0" }}>Wave, Road & Everything Between</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"1.4rem", fontWeight:700, color:"white" }}>{logs.length}</div>
            <div style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:"0.3px" }}>Sessions logged</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background:SAND, padding:20, borderRadius:"0 0 10px 10px", border:"1px solid #ddd", borderTop:"none", minHeight:500 }}>

        <AlertBox>
          <strong>IP Protection active.</strong> Every entry is timestamped and tied to a Git commit — creating a permanent, verifiable record of your build history.
        </AlertBox>

        {/* New entry button */}
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ padding:"9px 20px", borderRadius:6, background:showForm?"#eee":OCEAN_BLUE, color:showForm?DARK:"white", border:"none", cursor:"pointer", fontSize:"0.82rem", fontWeight:700, marginBottom:16, display:"block" }}
        >
          {showForm ? "Cancel" : "+ Log This Session"}
        </button>

        {/* Form */}
        {showForm && (
          <Card accent="blue">
            <CardTitle>New session log — {now()}</CardTitle>

            <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", display:"block", marginBottom:3 }}>Session focus *</label>
            <input value={form.focus} onChange={e => setForm({...form, focus:e.target.value})} placeholder="What was today's single lane?" style={{ ...inp, minHeight:"auto" }} />

            <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", display:"block", marginBottom:3 }}>Content pillar</label>
            <select value={form.pillar} onChange={e => setForm({...form, pillar:e.target.value})} style={{ ...inp, minHeight:"auto" }}>
              <option value="build">Build</option>
              <option value="ocean">Ocean</option>
              <option value="road">Road</option>
              <option value="human">Human</option>
            </select>

            <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", display:"block", marginBottom:3 }}>What was built / completed</label>
            <textarea value={form.built} onChange={e => setForm({...form, built:e.target.value})} placeholder="Describe what you built or completed this session..." style={ta} />

            <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", display:"block", marginBottom:3 }}>Problems solved</label>
            <textarea value={form.problems} onChange={e => setForm({...form, problems:e.target.value})} placeholder="What problems did you encounter or solve?" style={ta} />

            <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", display:"block", marginBottom:3 }}>Next steps</label>
            <textarea value={form.next} onChange={e => setForm({...form, next:e.target.value})} placeholder="What's queued for next session?" style={ta} />

            <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", display:"block", marginBottom:3 }}>Git commit reference (IP timestamp)</label>
            <input value={form.commit} onChange={e => setForm({...form, commit:e.target.value})} placeholder="Paste commit hash or repo/description..." style={{ ...inp, minHeight:"auto" }} />

            <button
              onClick={addLog}
              style={{ padding:"9px 20px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.82rem", fontWeight:700, marginTop:4 }}
            >
              Save Log Entry
            </button>
          </Card>
        )}

        {/* Log entries */}
        {logs.length === 0 && (
          <p style={{ fontSize:"0.85rem", opacity:0.5, textAlign:"center", marginTop:40 }}>No sessions logged yet. Hit the button above to start.</p>
        )}

        {logs.map(log => (
          <Card key={log.id} accent={log.pillar === "ocean" ? "sky" : log.pillar === "human" ? "coral" : log.pillar === "road" ? "gold" : "blue"}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"0.95rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:4 }}>{log.focus}</div>
                <div>{pillarTag(log.pillar)} <Tag color="blue">{log.date}</Tag></div>
              </div>
              <button
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                style={{ padding:"4px 10px", borderRadius:6, border:"1.5px solid #ddd", background:"transparent", cursor:"pointer", fontSize:"0.72rem", fontWeight:700, flexShrink:0 }}
              >
                {expandedId === log.id ? "Collapse" : "Expand"}
              </button>
            </div>

            {expandedId === log.id && (
              <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid #f0f0f0" }}>
                {log.built && (
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:3 }}>Built / completed</div>
                    <p style={{ fontSize:"0.85rem", lineHeight:1.6, margin:0 }}>{log.built}</p>
                  </div>
                )}
                {log.problems && (
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:3 }}>Problems solved</div>
                    <p style={{ fontSize:"0.85rem", lineHeight:1.6, margin:0 }}>{log.problems}</p>
                  </div>
                )}
                {log.next && (
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:3 }}>Next steps</div>
                    <p style={{ fontSize:"0.85rem", lineHeight:1.6, margin:0 }}>{log.next}</p>
                  </div>
                )}
                {log.commit && (
                  <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid #f0f0f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div><Tag color="gold">Git: {log.commit}</Tag></div>
                    <button onClick={() => deleteLog(log.id)} style={{ padding:"3px 8px", borderRadius:6, border:"1.5px solid #ddd", background:"transparent", cursor:"pointer", fontSize:"0.7rem", color:"#aaa" }}>Delete</button>
                  </div>
                )}
                {!log.commit && (
                  <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid #f0f0f0", textAlign:"right" }}>
                    <button onClick={() => deleteLog(log.id)} style={{ padding:"3px 8px", borderRadius:6, border:"1.5px solid #ddd", background:"transparent", cursor:"pointer", fontSize:"0.7rem", color:"#aaa" }}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
