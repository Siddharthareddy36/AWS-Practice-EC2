"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!text) return;

    setLoading(true);

    await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchNotes();
    setLoading(false);
  };

  const deleteNote = async (id: number) => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Notes App 🚀
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={addNote}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "..." : "Add"}
          </button>
        </div>

        {/* Notes List */}
        <ul className="space-y-2">
          {notes.length === 0 ? (
            <p className="text-gray-400 text-center">No notes yet 😴</p>
          ) : (
            notes.map((note) => (
              <li
                key={note.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border"
              >
                <span>{note.text}</span>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}