document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // --- Enhanced Feature Data ---
    const RESPONSES = {
        'negative': {
            emojis: '😔',
            replies: [
                "It sounds like you're carrying a heavy load, and I want you to know that's completely valid. Your feelings matter. Let's start with a moment of gentle breathing.",
                "I hear the struggle in your words. Please be kind to yourself right now. What is the very *smallest* act of self-care you can manage in the next 5 minutes?",
                "Thank you for sharing that vulnerability. Remember, you have survived every challenge so far. Let's focus on one small, achievable goal for the next hour.",
            ],
        },
        'positive': {
            emojis: '😊',
            replies: [
                "That is genuinely wonderful news! I'm happy for you. What brought this positive feeling on today? Keep shining!",
                "Fantastic! Celebrating moments of joy is key to well-being. How can you carry this good feeling into the rest of your day?",
            ],
        },
        'neutral': {
            emojis: '🤔',
            replies: [
                "I appreciate you reaching out. Sometimes we just need to talk things through. Tell me more about what's been occupying your mind lately.",
                "That's a thoughtful question/statement. If you're looking for an idea, we could try a guided mini-meditation or a quick motivational quote.",
            ],
        },
        'crisis': {
            emojis: '🚨',
            replies: [
                "**Immediate Safety is Paramount.** I am an AI and cannot replace a human crisis professional. Please reach out to a professional human resource *right now*.",
            ],
            // A special flag to emphasize the immediate need for resources
            isCrisis: true 
        }
    };

    const RELAXATION_TIPS = [
        "**4-7-8 Breathing:** Inhale quietly through your nose for a count of 4, hold your breath for 7, and exhale completely through your mouth for a count of 8. Repeat 4 times.",
        "**5-4-3-2-1 Grounding:** Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This anchors you to the present moment.",
        "**Mindful Movement:** Stand up and gently stretch your arms over your head, focusing only on the sensation in your body as you move. Hold for 15 seconds.",
        "**Water Break:** Slowly drink a glass of water, paying attention to the temperature and the feeling as you swallow. Hydration is key to clarity.",
    ];
    
    const RESOURCES = {
        'professional': "**Crisis Hotline:** Text HOME to 741741 (Crisis Text Line) or call 988 (Suicide & Crisis Lifeline) in the US/Canada. Please seek help immediately if you are in danger.",
        'counseling': "**University Counseling:** Look up your school's student health services website for free, confidential sessions.",
        'apps': "**Recommended Apps:** Calm, Headspace, or Insight Timer offer excellent guided meditations and sleep stories.",
    }

    // --- Logic Functions ---

    function detectMood(text) {
        const lowerText = text.toLowerCase();
        const negative = ['stress', 'anxiety', 'lonely', 'sad', 'overwhelmed', 'tired', 'down', 'worried', 'struggling', 'bad'];
        const positive = ['happy', 'great', 'good', 'fine', 'excited', 'well', 'amazing'];
        const crisis = ['kill myself', 'end my life', 'suicide', 'self-harm', 'want to die']; // High-alert words

        if (crisis.some(keyword => lowerText.includes(keyword))) {
            return 'crisis';
        } else if (negative.some(keyword => lowerText.includes(keyword))) {
            return 'negative';
        } else if (positive.some(keyword => lowerText.includes(keyword))) {
            return 'positive';
        } else {
            return 'neutral';
        }
    }

    function generateBotResponse(mood, userText) {
        const moodData = RESPONSES[mood];
        let response = moodData.replies[Math.floor(Math.random() * moodData.replies.length)];

        // Check for feature commands
        const lowerUserText = userText.toLowerCase();
        if (lowerUserText.includes('tip') || lowerUserText.includes('breathe')) {
            response = "Of course, here is a helpful tip: " + RELAXATION_TIPS[Math.floor(Math.random() * RELAXATION_TIPS.length)];
        } else if (lowerUserText.includes('resource')) {
            response = RESOURCES.counseling + " For immediate help: " + RESOURCES.professional;
        } else if (lowerUserText.includes('app')) {
            response = RESOURCES.apps;
        }

        return {
            text: response,
            emoji: moodData.emojis,
            isCrisis: moodData.isCrisis || false
        };
    }

    function addMessage(text, sender, emoji = null, isCrisis = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'bot' && isCrisis) {
            messageDiv.classList.add('crisis');
        }

        let contentHTML = text;
        if (emoji && sender === 'bot') {
            // Add sentiment indicator emoji
            contentHTML = `<span class="sentiment-indicator">${emoji}</span>${text}`;
        }
        
        messageDiv.innerHTML = `<div class="message-content">${contentHTML}</div>`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function processUserMessage() {
        const text = userInput.value.trim();
        if (text === '') return;

        // 1. Display User Message
        addMessage(text, 'user');

        // 2. Clear input field
        userInput.value = '';
        
        // 3. Analyze and Generate Response
        const mood = detectMood(text);
        const botResponse = generateBotResponse(mood, text);
        
        // 4. Display Bot Response after a small delay
        setTimeout(() => {
            addMessage(botResponse.text, 'bot', botResponse.emoji, botResponse.isCrisis);
            
            // If negative or neutral, offer a prompt to guide the conversation
            if (mood === 'negative' || mood === 'neutral') {
                setTimeout(() => {
                    addMessage("You can ask for a **'tip'**, **'resource'**, or just continue sharing.", 'bot', '💡');
                }, 1500);
            }
        }, 700);
    }

    // Event Listeners
    sendBtn.addEventListener('click', processUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processUserMessage();
        }
    });

});