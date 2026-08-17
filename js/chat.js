/**
 * js/chat.js
 * Módulo del Asistente Inteligente con Sistema de Redundancia 2.0 (Anti-503 y Anti-404)
 */
import { AppStorage } from './storage.js';

const GEMINI_API_KEY = 'AQ.Ab8RN6JjigcBkAFRgyV_Zzk-9RHdROES7CDqo6ezfG7fY0DuGg'; 

// LISTA DE REDUNDANCIA ACTUALIZADA A LAS ÚLTIMAS GENERACIONES (2026)
const FALLBACK_MODELS = [
    'gemini-3.6-flash',       // El recomendado oficial
    'gemini-3.5-flash',       // Respaldo principal
    'gemini-flash-latest',    // Alias que apunta siempre al más estable
    'gemini-3.5-flash-lite'   // Último recurso (ultraligero)
];

export const ChatAI = {
    chatHistory: [],

    async render() {
        let chatData = { bienvenida: "¡Hola! Soy tu mentor IA. ¿En qué te ayudo?", sugerencias: ["Mejora mi Propuesta de Valor", "¿Cómo calculo el margen de ganancia?"] };
        try {
            const res = await fetch('json/chatbot.json');
            if(res.ok) chatData = await res.json();
        } catch (e) { console.warn("No se cargó chatbot.json"); }

        return `
            <div class="chat-container fade-in">
                <div class="chat-header d-flex align-items-center gap-2">
                    <div class="bg-success bg-opacity-10 text-success p-2 rounded-3">
                        <i class="bi bi-robot fs-5"></i>
                    </div>
                    <div>
                        <h3 class="h6 fw-bold mb-0">Mentor IA</h3>
                        <span class="fs-7 text-success"><i class="bi bi-circle-fill" style="font-size: 0.5rem;"></i> Motor v3.6 Activo</span>
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

        if (!form || form.getAttribute('data-initialized') === 'true') return;
        form.setAttribute('data-initialized', 'true');

        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                input.value = btn.innerText;
                if(suggestionsDiv) suggestionsDiv.remove();
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (!message) return;

            if(suggestionsDiv) suggestionsDiv.remove();
            this.appendMessage('user', message);
            input.value = '';
            submitBtn.disabled = true;

            const typingId = this.showTypingIndicator();
            const responseHtml = await this.askGemini(message);

            document.getElementById(typingId)?.remove();
            this.appendMessage('ai', responseHtml);
            submitBtn.disabled = false;
            input.focus();
        });
    },

    async askGemini(prompt) {
        const userData = AppStorage.getData('dashboard')?.usuario || { nombre: "Emprendedor" };
        const systemPrompt = `Actúa como un mentor experto en negocios, tecnología y desarrollo de software para PROSPERE. El usuario se llama ${userData.nombre}. Sé claro, profesional y motivador.`;

        const userMessage = { role: "user", parts: [{ text: prompt }] };
        this.chatHistory.push(userMessage);

        let lastError = null;

        // BUCLE DE REDUNDANCIA MEJORADO
        for (const model of FALLBACK_MODELS) {
            const currentApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
            
            try {
                const response = await fetch(currentApiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        contents: this.chatHistory
                    })
                });

                if (!response.ok) {
                    // Si está saturado (503) O si el modelo ya no existe (404), pasa al siguiente
                    if (response.status === 503 || response.status === 404) {
                        console.warn(`⚠️ Modelo ${model} falló (Error ${response.status}). Cambiando al siguiente...`);
                        throw new Error("NEXT_MODEL"); 
                    }
                    
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error?.message || `Error HTTP ${response.status}`);
                }

                const data = await response.json();
                if (!data.candidates || data.candidates.length === 0) throw new Error("Filtro de seguridad activado.");

                const aiText = data.candidates[0].content.parts[0].text;
                this.chatHistory.push({ role: "model", parts: [{ text: aiText }] });
                
                return this.formatResponse(aiText);

            } catch (error) {
                lastError = error;
                // Si el error NO es "NEXT_MODEL", significa que hay un error real (ej. API key mala) y rompemos el bucle
                if (error.message !== "NEXT_MODEL") break; 
            }
        }

        // Si fallan todos los de la lista
        this.chatHistory.pop(); 

        let mensajeError = "Todos los servidores están ocupados o los modelos no están disponibles. Intenta nuevamente.";
        if (lastError && lastError.message !== "NEXT_MODEL") mensajeError = lastError.message;

        return `
            <div class="text-danger border border-danger p-2 rounded bg-danger bg-opacity-10">
                <i class="bi bi-exclamation-triangle-fill me-2"></i><b>Error de Conexión</b>
                <p class="mt-1 mb-0 fs-7">${mensajeError}</p>
            </div>
        `;
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