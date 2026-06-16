"use client";

import { useState } from "react";
import clsx from "clsx";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { useParentSession } from "@/hooks/useParentSession";

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
  const { user } = useParentSession();
  const [activeThread, setActiveThread] = useState(1);
  const [input, setInput] = useState("");

  const thread = threads.find((t) => t.id === activeThread)!;
  const messages = conversations[activeThread] ?? [];

  return (
    <div>
      <ParentPageHeader user={user} title="Messages" subtitle="Conversations sécurisées avec l'équipe SSL+++" />

      <div className="card flex overflow-hidden" style={{ height: 500 }}>
        <div className="w-48 flex-shrink-0 overflow-y-auto border-e border-line bg-surface-base">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveThread(t.id)}
              className={clsx(
                "w-full border-b border-line/60 px-4 py-3 text-start transition-colors",
                activeThread === t.id ? "bg-brand-light" : "hover:bg-surface-green"
              )}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold leading-tight text-ink">{t.name}</span>
                {t.unread && <span className="ms-1 mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-forest" />}
              </div>
              <div className="mt-1 truncate text-xs text-ink-muted">{t.preview}</div>
            </button>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-brand-deep/20 bg-brand-forest px-4 py-3 text-white">
            <h3 className="text-sm font-semibold">{thread.name}</h3>
            <p className="text-xs text-white/70">Conversation sécurisée · Réponse sous 24h</p>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface-green p-4">
            {messages.map((m, i) => (
              <div key={i} className={clsx("flex", m.mine ? "justify-end" : "justify-start")}>
                <div
                  className={clsx(
                    "max-w-[70%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed",
                    m.mine
                      ? "rounded-br-sm bg-brand-forest text-white"
                      : "rounded-bl-sm border border-line bg-white text-ink"
                  )}
                >
                  {m.text}
                  <div className={clsx("mt-1 text-[10px]", m.mine ? "text-white/60" : "text-ink-subtle")}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-line bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 rounded-full border border-line bg-surface-base px-4 py-2.5 text-xs transition-colors focus:border-brand-forest focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && setInput("")}
            />
            <button
              onClick={() => setInput("")}
              className="rounded-full bg-brand-forest px-4 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
