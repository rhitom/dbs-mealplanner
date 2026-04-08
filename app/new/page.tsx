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

  // Note form state
  const [noteDate, setNoteDate] = useState("2026-04-08");
  const [noteText, setNoteText] = useState("");

  // Time block form state
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
    "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to week
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 mt-2">Add New</h1>
        <p className="text-sm text-zinc-500 mt-1">
          To add meals, use the{" "}
          <Link href="/recipes" className="text-blue-600 hover:underline">
            recipe bank
          </Link>
        </p>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg px-4 py-3">
            {success}
          </div>
        )}

        <div className="flex border-b border-zinc-200 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Note" && (
          <form onSubmit={handleNoteSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-1">Date</label>
              <input type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-1">Note</label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="e.g. Remember to defrost the chicken"
                rows={4}
                className={`${inputClass} resize-none`}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              Add Note
            </button>
          </form>
        )}

        {activeTab === "Time Block" && (
          <form onSubmit={handleBlockSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-1">Date</label>
              <input type="date" value={blockDate} onChange={(e) => setBlockDate(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-1">Time</label>
              <input type="time" value={blockTime} onChange={(e) => setBlockTime(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-1">Label</label>
              <input type="text" value={blockLabel} onChange={(e) => setBlockLabel(e.target.value)} placeholder="e.g. Start marinating" className={inputClass} required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              Add Time Block
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
