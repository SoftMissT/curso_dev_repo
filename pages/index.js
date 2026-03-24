import React, { useState, useEffect, useCallback } from "react";

// ═══ TAGS DISPONÍVEIS ═══
const TAGS = [
  { id: "studying", label: "📚 Estudando", color: "#A855F7" },
  { id: "designing", label: "🔧 Projetando", color: "#00D9FF" },
  { id: "ideas", label: "💡 Ideias", color: "#FFD700" },
];

// ═══ NOTES PANEL ═══
function NotesPanel() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeTag, setActiveTag] = useState(TAGS[0].id);
  const [filterTag, setFilterTag] = useState("all");

  // Carregar notas do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("study-notes");
      if (saved) setNotes(JSON.parse(saved));
    } catch (e) {
      console.warn("Erro ao carregar notas:", e);
    }
  }, []);

  // Salvar notas no localStorage
  useEffect(() => {
    localStorage.setItem("study-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback(() => {
    if (!title.trim() && !content.trim()) return;
    const newNote = {
      id: Date.now(),
      title: title.trim() || "Sem título",
      content: content.trim(),
      tag: activeTag,
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
    setContent("");
  }, [title, content, activeTag]);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const filteredNotes =
    filterTag === "all" ? notes : notes.filter((n) => n.tag === filterTag);

  const getTagInfo = (tagId) => TAGS.find((t) => t.id === tagId) || TAGS[0];

  return (
    <div style={styles.notesCard}>
      <div style={styles.notesHeader}>
        <h2 style={styles.notesTitle}>
          <span style={styles.notesTitleIcon}>📝</span>
          Minhas Notas
        </h2>
        <span style={styles.noteCount}>{notes.length}</span>
      </div>

      {/* Input Area */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Título da nota..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          style={styles.inputTitle}
        />
        <textarea
          placeholder="O que está estudando ou projetando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={styles.inputContent}
        />
        <div style={styles.inputFooter}>
          <div style={styles.tagSelector}>
            {TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                style={{
                  ...styles.tagButton,
                  backgroundColor:
                    activeTag === tag.id
                      ? `${tag.color}22`
                      : "rgba(255,255,255,0.03)",
                  borderColor:
                    activeTag === tag.id ? tag.color : "rgba(255,255,255,0.08)",
                  color: activeTag === tag.id ? tag.color : "#666",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
          <button onClick={addNote} style={styles.addButton}>
            + Adicionar
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterRow}>
        <button
          onClick={() => setFilterTag("all")}
          style={{
            ...styles.filterButton,
            color: filterTag === "all" ? "#A855F7" : "#555",
            borderBottom:
              filterTag === "all"
                ? "2px solid #A855F7"
                : "2px solid transparent",
          }}
        >
          Todas
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setFilterTag(tag.id)}
            style={{
              ...styles.filterButton,
              color: filterTag === tag.id ? tag.color : "#555",
              borderBottom:
                filterTag === tag.id
                  ? `2px solid ${tag.color}`
                  : "2px solid transparent",
            }}
          >
            {tag.label.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div style={styles.notesList}>
        {filteredNotes.length === 0 && (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🌙</span>
            <p style={styles.emptyText}>Nenhuma nota ainda...</p>
            <p style={styles.emptySubtext}>
              Comece documentando seu progresso
            </p>
          </div>
        )}
        {filteredNotes.map((note) => {
          const tag = getTagInfo(note.tag);
          return (
            <div key={note.id} className="note-enter" style={styles.noteItem}>
              <div style={styles.noteTop}>
                <span
                  style={{
                    ...styles.noteTag,
                    backgroundColor: `${tag.color}18`,
                    color: tag.color,
                    borderColor: `${tag.color}30`,
                  }}
                >
                  {tag.label}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={styles.deleteButton}
                  title="Deletar nota"
                >
                  ✕
                </button>
              </div>
              <h3 style={styles.noteItemTitle}>{note.title}</h3>
              {note.content && (
                <p style={styles.noteItemContent}>{note.content}</p>
              )}
              <span style={styles.noteDate}>{note.createdAt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══ CALENDAR CARD ═══
function CalendarCard() {
  const diaFinal = 8;
  const totalDias = 50;

  const [displayDay, setDisplayDay] = useState(0);
  const [isTearing, setIsTearing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setDisplayDay(0);
        setIsResetting(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (displayDay < diaFinal) {
      const timer = setTimeout(() => {
        setIsTearing(true);
        setTimeout(() => {
          setDisplayDay((prev) => prev + 1);
          setIsTearing(false);
        }, 400);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsResetting(true);
    }
  }, [displayDay, diaFinal, isResetting]);

  const progress = (displayDay / totalDias) * 100;

  return (
    <div style={styles.calendarCard}>
      <div style={styles.header}>
        <div style={styles.statusBadge}>
          <div style={styles.pulseDot} />
          ESTUDOS EM FLUXO
        </div>
      </div>

      <h1 style={styles.title}>Jornada de Aprendizado</h1>

      {/* CALENDÁRIO */}
      <div style={styles.calendarWrapper}>
        <div style={styles.spiral}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={styles.ring} />
          ))}
        </div>

        <div style={styles.calendarBase}>
          <div style={styles.sheetStatic}>
            <div style={styles.sheetHeader}>DIA</div>
            <span style={styles.sheetNumber}>
              {displayDay + (isTearing ? 1 : 0)}
            </span>
          </div>

          {isTearing && (
            <div style={styles.sheetFalling} className="leaf-tear">
              <div style={styles.sheetHeader}>DIA</div>
              <span style={styles.sheetNumber}>{displayDay}</span>
            </div>
          )}
        </div>
      </div>

      <div style={styles.statsContainer}>
        <h2 style={styles.counterText}>
          Dia <span style={styles.highlight}>{displayDay}</span>
          <small style={styles.totalText}> / {totalDias}</small>
        </h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}>
            <div style={styles.progressGlow} />
          </div>
        </div>
        <span style={styles.percentText}>
          {Math.round(progress)}% Concluído
        </span>
      </div>

      <p style={styles.footer}>
        {isResetting
          ? "Ciclo completo! Reiniciando..."
          : "Rancando páginas do tédio..."}
      </p>
    </div>
  );
}

// ═══ HOME ═══
function Home() {
  return (
    <div style={styles.page}>
      {/* Background gradient orb */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <div className="dashboard-grid" style={styles.dashboardGrid}>
        <CalendarCard />
        <NotesPanel />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ═══ STYLES ═══
// ═══════════════════════════════════════════

const styles = {
  // ── Page ──
  page: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  bgOrb1: {
    position: "fixed",
    top: "-20%",
    left: "-10%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgOrb2: {
    position: "fixed",
    bottom: "-20%",
    right: "-10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "380px 420px",
    gap: "28px",
    padding: "32px",
    zIndex: 1,
    maxWidth: "860px",
    width: "100%",
    alignItems: "start",
  },

  // ── Calendar Card ──
  calendarCard: {
    backgroundColor: "rgba(17, 17, 25, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "36px 32px",
    borderRadius: "24px",
    textAlign: "center",
    border: "1px solid rgba(168, 85, 247, 0.12)",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
    position: "sticky",
    top: "32px",
  },
  header: {
    marginBottom: "4px",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(168, 85, 247, 0.08)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "700",
    color: "#A855F7",
    letterSpacing: "1.5px",
    marginBottom: "20px",
    border: "1px solid rgba(168, 85, 247, 0.2)",
  },
  pulseDot: {
    width: "6px",
    height: "6px",
    backgroundColor: "#A855F7",
    borderRadius: "50%",
    boxShadow: "0 0 8px #A855F7",
    animation: "pulse 2s infinite",
  },
  title: {
    color: "var(--text-primary)",
    fontSize: "1.15rem",
    fontWeight: "400",
    marginBottom: "28px",
    letterSpacing: "0.3px",
  },
  calendarWrapper: {
    position: "relative",
    width: "140px",
    height: "160px",
    margin: "0 auto 36px",
  },
  spiral: {
    position: "absolute",
    top: "-12px",
    left: "10%",
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    zIndex: 10,
  },
  ring: {
    width: "10px",
    height: "24px",
    background: "linear-gradient(#444, #777, #444)",
    borderRadius: "5px",
  },
  calendarBase: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0dfe6",
    borderRadius: "12px",
    position: "relative",
    boxShadow: "0 10px 0 #8a8a9a, 0 15px 30px rgba(0,0,0,0.3)",
    overflow: "hidden",
  },
  sheetStatic: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetFalling: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    borderTop: "2px solid #eee",
  },
  sheetHeader: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#A855F7",
    marginBottom: "5px",
    letterSpacing: "2px",
  },
  sheetNumber: {
    fontSize: "4rem",
    fontWeight: "900",
    color: "#0a0a0f",
    lineHeight: "1",
  },
  statsContainer: {
    marginTop: "16px",
  },
  counterText: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "300",
    margin: "0 0 15px 0",
  },
  highlight: {
    color: "#A855F7",
    fontWeight: "700",
  },
  totalText: {
    fontSize: "1rem",
    color: "var(--text-muted)",
    fontWeight: "300",
  },
  progressContainer: {
    height: "6px",
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #A855F7, #00D9FF)",
    transition: "width 0.3s ease",
    position: "relative",
    borderRadius: "3px",
  },
  progressGlow: {
    position: "absolute",
    right: 0,
    top: "-4px",
    height: "14px",
    width: "20px",
    boxShadow: "0 0 18px #A855F7",
    borderRadius: "50%",
  },
  percentText: {
    fontSize: "11px",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "500",
  },
  footer: {
    marginTop: "28px",
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    fontStyle: "italic",
  },

  // ── Notes Panel ──
  notesCard: {
    backgroundColor: "rgba(17, 17, 25, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "24px",
    border: "1px solid rgba(0, 217, 255, 0.1)",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "85vh",
    overflow: "hidden",
  },
  notesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 28px 0",
  },
  notesTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  notesTitleIcon: {
    fontSize: "1.3rem",
  },
  noteCount: {
    backgroundColor: "rgba(168, 85, 247, 0.12)",
    color: "#A855F7",
    fontSize: "12px",
    fontWeight: "700",
    padding: "3px 10px",
    borderRadius: "12px",
    border: "1px solid rgba(168, 85, 247, 0.2)",
  },

  // ── Input Area ──
  inputArea: {
    padding: "20px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  inputTitle: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#f0f0f5",
    outline: "none",
    marginBottom: "8px",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  inputContent: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#ccc",
    outline: "none",
    resize: "vertical",
    minHeight: "60px",
    lineHeight: "1.5",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  inputFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
    gap: "10px",
    flexWrap: "wrap",
  },
  tagSelector: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  tagButton: {
    padding: "5px 10px",
    borderRadius: "8px",
    border: "1px solid",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  addButton: {
    padding: "8px 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #A855F7, #7C3AED)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)",
    whiteSpace: "nowrap",
  },

  // ── Filter ──
  filterRow: {
    display: "flex",
    gap: "4px",
    padding: "0 28px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  filterButton: {
    background: "none",
    border: "none",
    padding: "10px 12px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },

  // ── Notes List ──
  notesList: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 28px 28px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
  },
  emptyIcon: {
    fontSize: "2.5rem",
    display: "block",
    marginBottom: "12px",
    opacity: 0.6,
  },
  emptyText: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: "500",
  },
  emptySubtext: {
    color: "var(--text-muted)",
    fontSize: "12px",
    marginTop: "4px",
  },
  noteItem: {
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "10px",
    transition: "all 0.2s",
    cursor: "default",
  },
  noteTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  noteTag: {
    fontSize: "10px",
    fontWeight: "700",
    padding: "3px 9px",
    borderRadius: "6px",
    border: "1px solid",
    letterSpacing: "0.3px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#444",
    fontSize: "13px",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "6px",
    transition: "all 0.2s",
    fontFamily: "inherit",
    lineHeight: 1,
  },
  noteItemTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px",
  },
  noteItemContent: {
    fontSize: "12.5px",
    color: "var(--text-secondary)",
    lineHeight: "1.55",
    marginBottom: "8px",
    whiteSpace: "pre-wrap",
  },
  noteDate: {
    fontSize: "10px",
    color: "var(--text-muted)",
    fontWeight: "500",
  },
};

export default Home;
