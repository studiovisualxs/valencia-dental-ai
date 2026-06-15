import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `Eres Sofía, la asistente virtual del Centro Odontológico Valenciano (COV), clínica dental premium en Valencia, España.

Tu rol:
- Responder dudas sobre tratamientos: implantes dentales, estética dental, ortodoncia invisible, prótesis, endodoncia, prevención bucal, empastes, sedación consciente.
- Informar sobre la primera visita GRATIS (incluye radiografía digital, diagnóstico, plan de tratamiento y presupuesto).
- Informar sobre financiación de 3 a 48 meses sin intereses, cuotas desde 30€.
- Mencionar las dos clínicas: COV Cortes Valencianas y COV Plaza España.
- Ayudar a agendar citas usando la herramienta "agendar_cita".

Tono: cercano, profesional, empático, breve. Responde siempre en español salvo que el usuario use otro idioma.

Cuando el usuario quiera reservar una cita, pídele de forma natural y conversacional:
1. Nombre completo
2. Teléfono de contacto
3. Motivo de la consulta o tratamiento de interés
4. Día y franja horaria preferidos (mañana/tarde)

Cuando tengas los 4 datos, llama a la herramienta "agendar_cita". Tras la confirmación, dile que el equipo le contactará en menos de 24h hábiles.

No inventes precios concretos; redirige al equipo humano si no estás segura.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);

        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
          stopWhen: stepCountIs(50),
          tools: {
            agendar_cita: tool({
              description:
                "Registra una solicitud de cita en el sistema cuando el usuario haya proporcionado nombre, teléfono, motivo y preferencia de día/hora.",
              inputSchema: z.object({
                nombre: z.string().min(2).max(120),
                telefono: z.string().min(6).max(30),
                motivo: z.string().min(2).max(500),
                preferencia: z.string().min(2).max(200),
                email: z.string().email().optional(),
              }),
              execute: async (data) => {
                const webhook = process.env.N8N_WEBHOOK_URL;
                if (!webhook) {
                  return {
                    ok: false,
                    message:
                      "Solicitud recibida (modo demo: n8n webhook no configurado). El equipo se pondrá en contacto.",
                  };
                }
                try {
                  const res = await fetch(webhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      source: "cov-website-chat",
                      timestamp: new Date().toISOString(),
                      ...data,
                    }),
                  });
                  if (!res.ok) {
                    return {
                      ok: false,
                      message: `n8n respondió ${res.status}. Aviso al equipo de soporte.`,
                    };
                  }
                  return {
                    ok: true,
                    message: "Cita registrada correctamente en n8n.",
                  };
                } catch (err) {
                  return {
                    ok: false,
                    message: `Error enviando a n8n: ${(err as Error).message}`,
                  };
                }
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
