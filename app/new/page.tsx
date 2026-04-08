"use client";

import { useState } from "react";
import Link from "next/link";
import { useMealPlanner } from "../context";

const TABS = ["Note", "Time Block"] as const;
type Tab = (typeof TABS)[number];

export default function NewPage() {
  const { addNote, addTimeBlock } = useMealPlanner();
  const [activeTab, setActiveTab] = useState<Tab>("Note");
  const [success, setSuccess] = useState<string | null>(null);

  const [noteDate, setNoteDate] = useState("2026-04-08");
  const [noteText, setNoteText] = useState("");

  const [blockDate, setBlockDate] = useState("2026-04-08");
  const [blockTime, setBlockTime] = useState("");
  const [blockLabel, setBlockLabel] = useState("");

  function handleNoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(noteDate, noteText.trim());
    setSuccess(`Note added to ${noteDate}`);
    setNoteText("");
    setTimeout(() => setSuccess(null), 3000);
  }

  function handleBlockSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!blockTime || !blockLabel.trim()) return;
    const [h, m] = blockTime.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    const timeStr = `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;

    addTimeBlock(blockDate, { time: timeStr, label: blockLabel.trim() });
    setSuccess(`Time block added to ${blockDate}`);
    setBlockLabel("");
    setBlockTime("");
    setTimeout(() => setSuccess(null), 3000);
  }

  const inputClass =
    "w-full rounded-xl border border-border px-4 py-2.5 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-transparent";

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-lg mx-auto">
          <Link href="/" className="text-sm text-accent hover:text-accent/80">
            ← Back to week
          </Link>
          <h1 className="font-serif text-3xl text-foreground mt-3">Add New</h1>
          <p className="text-sm text-muted mt-1">
            To add meals, use the{" "}
            <Link href="/recipes" className="text-accent hover:text-accent/80">
              recipe bank
            </Link>
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {success && (
          <div className="mb-6 bg-sage-light border border-sage/20 text-sage text-sm rounded-xl px-4 py-3">
            {success}
          </div>
        )}

        <div className="flex gap-1 border-b border-border mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Note" && (
          <form onSubmit={handleNoteSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-muted uppercase tracking-widest mb-2">Date</label>
              <input type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs text-muted uppercase tracking-widest mb-2">Note</label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="e.g. Remember to defrost the chicken"
                rows={4}
                className={`${inputClass} resize-none`}
                required
              />
            </div>
            <button type="submit" className="w-full bg-accent text-white text-sm font-medium py-3 rounded-xl hover:bg-accent/90 transition-colors">
              Add Note
            </button>
          </form>
        )}

        {activeTab === "Time Block" && (
          <form onSubmit={handleBlockSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-muted uppercase tracking-widest mb-2">Date</label>
              <input type="date" value={blockDate} onChange={(e) => setBlockDate(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs text-muted uppercase tracking-widest mb-2">Time</label>
              <input type="time" value={blockTime} onChange={(e) => setBlockTime(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs text-muted uppercase tracking-widest mb-2">Label</label>
              <input type="text" value={blockLabel} onChange={(e) => setBlockLabel(e.target.value)} placeholder="e.g. Start marinating" className={inputClass} required />
            </div>
            <button type="submit" className="w-full bg-accent text-white text-sm font-medium py-3 rounded-xl hover:bg-accent/90 transition-colors">
              Add Time Block
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
