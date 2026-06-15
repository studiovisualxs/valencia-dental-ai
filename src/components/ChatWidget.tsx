import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, CalendarCheck } from "lucide-react";

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "¡Hola! Soy **Sofía**, tu asistente del Centro Odontológico Valenciano. ¿Quieres reservar tu primera visita gratuita o tienes alguna duda sobre tratamientos? 🦷",
    },
  ],
};

function renderText(message: UIMessage) {
  return message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();
}

function toolPart(message: UIMessage) {
  return message.parts.find((p) => p.type.startsWith("tool-"));
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const transportRef = useRef(new DefaultChatTransport({ api: "/api/chat" }));
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: "cov-chat",
    messages: [WELCOME],
    transport: transportRef.current,
  });

  const loading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full gradient-cyan text-ink shadow-2xl ring-glow transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] max-h-[calc(100vh-7rem)] w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border">
          {/* Header */}
          <div className="gradient-cyan px-5 py-4 text-ink">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/10 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-display text-lg font-semibold leading-none">Sofía</div>
                <div className="text-xs opacity-80">Asistente IA · COV Valencia</div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-ink/10 px-2.5 py-1 text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                en línea
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-cream/50 px-4 py-5">
            {messages.map((m) => {
              const text = renderText(m);
              const tp = toolPart(m);
              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm"
                        : "max-w-[85%] space-y-2 text-sm text-ink"
                    }
                  >
                    {text && (
                      <div
                        className="whitespace-pre-wrap leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: text.replace(
                            /\*\*(.+?)\*\*/g,
                            '<strong class="font-semibold">$1</strong>',
                          ),
                        }}
                      />
                    )}
                    {tp && (
                      <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2.5 text-xs text-ink">
                        <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <div className="font-semibold">Solicitud de cita enviada</div>
                          <div className="opacity-80">
                            Reenviada al sistema n8n. El equipo te contactará en menos de 24h.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Error de conexión. Inténtalo de nuevo.
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border bg-card p-3">
            <div className="flex items-end gap-2 rounded-2xl bg-muted px-3 py-2 ring-1 ring-border focus-within:ring-2 focus-within:ring-primary">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Escribe tu mensaje…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] text-muted-foreground">
              Asistente IA · No reemplaza el diagnóstico de un profesional
            </div>
          </div>
        </div>
      )}
    </>
  );
}
