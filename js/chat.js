/**
 * js/chat.js
 * Módulo del Asistente Inteligente utilizando Gemini API (Versión Fortificada)
 */
let chatHistory = [];
import { AppStorage } from './storage.js';

// Tu API Key y el modelo correcto que soporta systemInstruction

export const ChatAI = {
    async render() {
        // Fallback rápido si no encuentra el JSON
        let chatData = { bienvenida: "¡Hola! Soy tu mentor IA. ¿En qué te ayudo?", sugerencias: [] };
        try {
            const res = await fetch('json/chatbot.json');
            if (res.ok) chatData = await res.json();
        } catch (e) { console.warn("No se cargó chatbot.json, usando datos por defecto."); }

        return `
            <div class="chat-container fade-in">
                <div class="chat-header d-flex align-items-center gap-2">
                    <div class="bg-success bg-opacity-10 text-success p-2 rounded-3">
                        <i class="bi bi-robot fs-5"></i>
                    </div>
                    <div>
                        <h3 class="h6 fw-bold mb-0">Mentor IA</h3>
                        <span class="fs-7 text-success"><i class="bi bi-circle-fill" style="font-size: 0.5rem;"></i> En línea</span>
                    </div>
                </div>

                <div class="chat-messages" id="chat-messages">
                    <div class="chat-bubble ai">
                        <p>${chatData.bienvenida}</p>
                    </div>
                    <div class="d-flex flex-wrap gap-2 mt-2" id="chat-suggestions">
                        ${chatData.sugerencias.map(sug => `
                            <button class="btn btn-sm btn-outline-secondary rounded-pill suggestion-btn">${sug}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="chat-input-area">
                    <form id="chat-form" class="chat-input-wrapper">
                        <input type="text" id="chat-input" class="chat-input" placeholder="Escribe tu pregunta..." autocomplete="off">
                        <button type="submit" id="chat-submit" class="btn-send" aria-label="Enviar">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
    },

    initEvents() {
        const form = document.getElementById('chat-form');
        const input = document.getElementById('chat-input');
        const submitBtn = document.getElementById('chat-submit');
        const suggestionsDiv = document.getElementById('chat-suggestions');

        // SEGURO 1: Evitar que el evento se registre múltiples veces si el usuario entra y sale de la vista
        if (!form || form.getAttribute('data-initialized') === 'true') return;
        form.setAttribute('data-initialized', 'true');

        // Sugerencias rápidas
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                input.value = btn.innerText;
                if (suggestionsDiv) suggestionsDiv.remove();
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            });
        });

        // Evento de envío principal
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (!message) return;

            // Limpieza de UI inicial
            if (suggestionsDiv) suggestionsDiv.remove();
            this.appendMessage('user', message);
            input.value = '';
            submitBtn.disabled = true;

            // Mostrar "pensando"
            const typingId = this.showTypingIndicator();

            // Llamada a la IA (Esperamos la respuesta)
            const responseHtml = await this.askGemini(message);

            // SEGURO 2: Borrar los puntos de carga de forma segura usando Optional Chaining (?.)
            document.getElementById(typingId)?.remove();

            // Mostrar respuesta y reactivar UI
            this.appendMessage('ai', responseHtml);
            submitBtn.disabled = false;
            input.focus();
        });
    },

    async askGemini(prompt) {
        const userData = AppStorage.getData('dashboard')?.usuario || { nombre: "Emprendedor" };
        const systemPrompt = `Actúa como un mentor experto en negocios, tecnología y desarrollo de software para PROSPERE. El usuario se llama ${userData.nombre}. Sé claro, profesional y motivador.`;

        // SEGURO 3: Guardamos el estado temporal del historial
        const userMessage = { role: "user", parts: [{ text: prompt }] };
        chatHistory.push(userMessage);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    contents: chatHistory,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `Error del servidor HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data.candidates || data.candidates.length === 0) {
                throw new Error("La IA no generó una respuesta válida (posible filtro de seguridad).");
            }

            const aiText = data.candidates[0].content.parts[0].text;

            // Si fue exitoso, guardamos la respuesta de la IA en el historial
            chatHistory.push({ role: "model", parts: [{ text: aiText }] });

            return this.formatResponse(aiText);

        } catch (error) {
            console.error("🚨 Error capturado en askGemini:", error);

            // ROLLBACK: Si falló, sacamos la pregunta del usuario del historial para no corromper la API
            chatHistory.pop();

            // Retornamos el error en formato HTML para que se pinte en la burbuja
            return `
                <div class="text-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i><b>Error de conexión</b>
                    <p class="mt-1 mb-0 fs-7">${error.message}</p>
                </div>
                <small class="text-muted mt-2 d-block border-top pt-2">Tip: Presiona <b>F12</b> y revisa la pestaña 'Consola' para ver el detalle técnico.</small>
            `;
        }
    },

    appendMessage(sender, htmlContent) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        bubble.innerHTML = htmlContent;

        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
    },

    showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return id;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ai typing-indicator`;
        bubble.id = id;
        bubble.innerHTML = `<span></span><span></span><span></span>`;

        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
        return id;
    },

    formatResponse(text) {
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/\n/g, '<br>');
        return `<p>${formatted}</p>`;
    }
};