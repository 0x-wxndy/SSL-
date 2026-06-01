"use client";

import { useState } from "react";

const threads = [
  { id: 1, name: "Équipe pédagogique", preview: "Adam a bien progressé...", unread: true },
  { id: 2, name: "Administration", preview: "Votre dossier est validé", unread: true },
  { id: 3, name: "Direction SSL+++", preview: "Rappel planning vacances", unread: false },
  { id: 4, name: "M. Rachid (Maths)", preview: "Prochaine session: lundi", unread: false },
];

const conversations: Record<number, { text: string; mine: boolean; time: string }[]> = {
  1: [
    { text: "Bonjour Mme Benali, Adam a très bien progressé cette semaine en mathématiques. Son niveau en algèbre s'améliore nettement.", mine: false, time: "Hier, 17h42" },
    { text: "Merci beaucoup pour ce retour ! Nous sommes très contents de ses progrès. Y a-t-il des exercices à faire à la maison ?", mine: true, time: "Hier, 18h10" },
    { text: "Pas d'obligation, mais quelques exercices sur les fractions seraient bénéfiques. Je lui en ai donné une liste aujourd'hui.", mine: false, time: "Hier, 18h25" },
  ],
  2: [
    { text: "Bonjour, nous avons le plaisir de vous informer que le dossier d'Adam a été validé. Bienvenue dans la famille SSL+++ !", mine: false, time: "12 Mai, 10h00" },
    { text: "Merci infiniment ! Nous sommes ravis. Quand commence-t-il ?", mine: true, time: "12 Mai, 11h30" },
    { text: "Il peut commencer dès lundi 13 Mai. Un badge ID lui sera remis à l'arrivée.", mine: false, time: "12 Mai, 12h00" },
  ],
  3: [
    { text: "Rappel : SSL+++ sera fermé durant tout le mois d'août. Merci de planifier vos arrangements à l'avance.", mine: false, time: "20 Mai, 09h00" },
  ],
  4: [
    { text: "Bonjour, la prochaine session de soutien en mathématiques pour Adam aura lieu lundi prochain à 17h00.", mine: false, time: "28 Mai, 14h00" },
    { text: "Parfait, merci ! Il sera là.", mine: true, time: "28 Mai, 15h00" },
  ],
};

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(1);
  const [input, setInput] = useState("");

  const thread = threads.find((t) => t.id === activeThread)!;
  const messages = conversations[activeThread] ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="font-sora text-xl font-semibold mb-4">Messages</h1>
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex" style={{ height: 500 }}>
        {/* Thread list */}
        <div className="w-48 flex-shrink-0 border-r border-gray-100 overflow-y-auto">
          {threads.map((t) => (
            <button key={t.id} onClick={() => setActiveThread(t.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-colors ${
                activeThread === t.id ? "bg-green-50" : "hover:bg-gray-50"
              }`}>
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-gray-800 leading-tight">{t.name}</span>
                {t.unread && <span className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ml-1" style={{ backgroundColor: "var(--brand)" }} />}
              </div>
              <div className="text-xs text-gray-400 mt-1 truncate">{t.preview}</div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">{thread.name}</h3>
            <p className="text-xs text-gray-400">Conversation sécurisée • Réponse sous 24h</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  m.mine
                    ? "text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-sm"
                }`} style={m.mine ? { backgroundColor: "var(--brand)" } : undefined}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.mine ? "text-white/60" : "text-gray-400"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-3 border-t border-gray-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 text-xs px-4 py-2.5 border border-gray-200 rounded-full bg-white focus:outline-none focus:border-brand transition-colors"
              onKeyDown={(e) => e.key === "Enter" && setInput("")}
            />
            <button onClick={() => setInput("")}
              className="px-4 py-2.5 rounded-full text-white text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--brand)" }}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
