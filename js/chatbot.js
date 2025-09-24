// AI-Powered Multilingual Chatbot for Sikkim Monasteries
// Integrated with ChatGPT API for intelligent responses

class SikkimChatbot {
    constructor() {
        this.isVisible = false;
        this.currentLanguage = 'en';
        this.conversationHistory = [];
        this.isTyping = false;
        this.knowledgeBase = {};
        this.init();
    }

    init() {
        this.loadKnowledgeBase();
        this.setupChatInterface();
        this.setupEventListeners();
        this.initializeGreeting();
    }

    loadKnowledgeBase() {
        // Local knowledge base for immediate responses
        this.knowledgeBase = {
            en: {
                greetings: [
                    "Namaste! I'm your AI guide for Sikkim monasteries. How can I help you explore this spiritual heritage today?",
                    "Hello! Welcome to the digital gateway of Sikkim's sacred monasteries. What would you like to discover?",
                    "Greetings, fellow traveler! I'm here to guide you through Sikkim's ancient Buddhist heritage. How may I assist you?"
                ],
                monasteryInfo: {
                    rumtek: {
                        history: "Rumtek Monastery, built in 1966, is the largest monastery in Sikkim and serves as the seat of the Karmapa. It's known as the Dharma Chakra Centre and houses many precious relics.",
                        significance: "It's the main seat of the Karma Kagyu lineage and plays a crucial role in preserving Tibetan Buddhist traditions.",
                        festivals: "Major festivals include Losar (Tibetan New Year), Kagyat Dance, and various Buddha ceremonies.",
                        visiting: "Open daily from 6:00 AM to 6:00 PM. Photography is allowed with permission. Best time to visit is October to December and March to May."
                    },
                    pemayangtse: {
                        history: "Built in 1705, Pemayangtse means 'Perfect Sublime Lotus'. It's the second oldest monastery in Sikkim and offers stunning Himalayan views.",
                        significance: "It belongs to the Nyingma tradition and is famous for its three-story structure representing the celestial abode of Guru Rinpoche.",
                        festivals: "Chaam Dance during winter months and Pang Lhabsol are major celebrations here.",
                        visiting: "Open 7:00 AM to 5:00 PM. Small entry fee applies. Located at 2,085m altitude, so carry warm clothes."
                    },
                    tashiding: {
                        history: "Founded in 1641, Tashiding is considered the most sacred monastery in Sikkim, perched on a hill between two rivers.",
                        significance: "The annual Bumchu ceremony here is believed to predict Sikkim's future through the level of sacred water in a pot.",
                        festivals: "The Bumchu Festival in February/March is the most important celebration, attracting thousands of devotees.",
                        visiting: "Free entry, open 6:00 AM to 6:00 PM. The trek to reach offers beautiful mountain views."
                    },
                    enchey: {
                        history: "Built in 1909, Enchey means 'Solitary Temple'. It was constructed on the site where Lama Druptob Karpo meditated.",
                        significance: "Dedicated to Guru Padmasambhava and known for its colorful Chaam dance performances.",
                        festivals: "Annual Chaam dance in December attracts visitors from across the region.",
                        visiting: "Free entry, open 6:00 AM to 6:00 PM. Located in Gangtok, easily accessible."
                    }
                },
                festivals: {
                    losar: "Tibetan New Year, usually in February, celebrated with prayers, traditional dances, and community feasts across all monasteries.",
                    sagadawa: "Celebrates Buddha's birth, enlightenment, and death. Observed throughout May with special prayers and ceremonies.",
                    bumchu: "Sacred water vessel ceremony at Tashiding that predicts Sikkim's future. A unique and deeply spiritual event.",
                    chaam: "Masked dance performances by monks, representing the triumph of good over evil. Different monasteries have their own versions."
                },
                travel: {
                    bestTime: "October to December and March to May offer the best weather for monastery visits. Clear mountain views and comfortable temperatures.",
                    whatToWear: "Modest clothing is essential. Cover shoulders and legs. Carry warm layers as monasteries are at high altitudes.",
                    etiquette: "Remove hats and shoes before entering prayer halls. Don't point feet toward altars. Photography rules vary by monastery.",
                    transportation: "Shared jeeps, taxis, and guided tours are available. Some monasteries require short treks."
                },
                bookingHelp: "I can help you find and book accommodations near monasteries. We have eco-friendly options and luxury stays available.",
                languages: "I can assist you in English, Hindi (हिन्दी), Nepali (नेपाली), and Tibetan (བོད་སྐད་)."
            },
            hi: {
                greetings: [
                    "नमस्ते! मैं सिक्किम के मठों के लिए आपका AI गाइड हूं। आज मैं इस आध्यात्मिक विरासत की खोज में आपकी कैसे मदद कर सकता हूं?",
                    "नमस्कार! सिक्किम के पवित्र मठों के डिजिटल द्वार में आपका स्वागत है। आप क्या जानना चाहते हैं?",
                    "प्रणाम, यात्री मित्र! मैं यहां सिक्किम की प्राचीन बौद्ध विरासत के माध्यम से आपका मार्गदर्शन करने के लिए हूं।"
                ],
                bookingHelp: "मैं मठों के पास आवास खोजने और बुक करने में आपकी मदद कर सकता हूं। हमारे पास पर्यावरण-अनुकूल विकल्प और लक्ज़री स्टे उपलब्ध हैं।",
                languages: "मैं अंग्रेजी, हिन्दी, नेपाली और तिब्बती भाषाओं में आपकी सहायता कर सकता हूं।"
            },
            ne: {
                greetings: [
                    "नमस्ते! म सिक्किमका गुम्बाहरूको लागि तपाईंको AI गाइड हुँ। आज म यस आध्यात्मिक सम्पदाको अन्वेषणमा तपाईंलाई कसरी मद्दत गर्न सक्छु?",
                    "नमस्कार! सिक्किमका पवित्र गुम्बाहरूको डिजिटल द्वारमा तपाईंलाई स्वागत छ। के जान्न चाहनुहुन्छ?",
                    "प्रणाम, यात्रु साथी! म यहाँ सिक्किमको प्राचीन बौद्ध सम्पदाको माध्यमबाट तपाईंको मार्गदर्शन गर्न छु।"
                ],
                bookingHelp: "म गुम्बाहरू नजिकैको आवास खोज्न र बुकिङ गर्न तपाईंलाई मद्दत गर्न सक्छु। हामीसँग पर्यावरण-मैत्री विकल्पहरू र लक्जरी बास उपलब्ध छन्।",
                languages: "म अंग्रेजी, हिन्दी, नेपाली र तिब्बती भाषाहरूमा तपाईंलाई सहायता गर्न सक्छु।"
            },
            bo: {
                greetings: [
                    "བཀྲ་ཤིས་བདེ་ལེགས། ངའི་མིང་ལ་སི་ཁིམ་དགོན་པའི་ཆོས་རིག་ཀླད་པ་ཟེར། ད་རིང་ཁྱོད་ལ་ཆོས་དང་རིག་གཞུང་གི་སྐོར་ལ་ག་རེ་རོགས་སྐྱོར་བྱེད་དགོས་སམ།",
                    "བཀྲ་ཤིས་བདེ་ལེགས། སི་ཁིམ་གི་དགོན་པ་དམ་པ་ཚོའི་འཛིན་སྐྱོང་ལམ་ལ་བསུ་འདེབས་ཞུ།",
                    "བཀྲ་ཤིས་བདེ་ལེགས། ངས་སི་ཁིམ་གི་དགོན་པ་རྙིང་པ་ཚོའི་སྐོར་ལ་ལམ་སྟོན་ཞུ་རྒྱུ་ཡིན།"
                ],
                bookingHelp: "ངས་དགོན་པ་ཚོའི་འཁྲིས་སུ་གནས་མལ་འཚོལ་ཞིབ་དང་ཐོ་འགོད་བྱེད་པར་རོགས་སྐྱོར་ཞུ་ཐུབ།",
                languages: "ངས་དབྱིན་ཇི། ཧིན་དྷི། ནེ་པ་ལི། བོད་སྐད་བཅས་སྐད་ཡིག་དུ་མར་རོགས་སྐྱོར་ཞུ་ཐུབ།"
            }
        };
    }

    setupChatInterface() {
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatbotContainer');

        if (chatToggle && chatContainer) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        }
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        const languageSelect = document.getElementById('chatLanguage');

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Auto-resize chat input
        if (chatInput) {
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
            });
        }
    }

    initializeGreeting() {
        // Add initial greeting message
        setTimeout(() => {
            const greetings = this.knowledgeBase[this.currentLanguage]?.greetings || this.knowledgeBase.en.greetings;
            const greeting = greetings[Math.floor(Math.random() * greetings.length)];
            this.addBotMessage(greeting);
            
            // Add quick action buttons
            this.addQuickActions();
        }, 1000);
    }

    toggleChat() {
        const chatContainer = document.getElementById('chatbotContainer');
        if (!chatContainer) return;

        this.isVisible = !this.isVisible;
        chatContainer.style.display = this.isVisible ? 'flex' : 'none';

        // Update toggle button icon
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle) {
            const icon = chatToggle.querySelector('i');
            icon.className = this.isVisible ? 'fas fa-times' : 'fas fa-comment';
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addUserMessage(message);
        input.value = '';
        input.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Process message and get response
            const response = await this.processMessage(message);
            this.hideTypingIndicator();
            this.addBotMessage(response);
        } catch (error) {
            this.hideTypingIndicator();
            this.addBotMessage(this.getErrorMessage());
            console.error('Chatbot error:', error);
        }
    }

    async processMessage(message) {
        // Store conversation history
        this.conversationHistory.push({ role: 'user', content: message });

        // First check local knowledge base for quick responses
        const localResponse = this.checkLocalKnowledge(message.toLowerCase());
        if (localResponse) {
            this.conversationHistory.push({ role: 'assistant', content: localResponse });
            return localResponse;
        }

        // If no local match, use ChatGPT API (simulated for demo)
        return await this.getChatGPTResponse(message);
    }

    checkLocalKnowledge(message) {
        const kb = this.knowledgeBase[this.currentLanguage] || this.knowledgeBase.en;
        
        // Monastery-specific questions
        if (message.includes('rumtek') || message.includes('रुमटेक')) {
            if (message.includes('history') || message.includes('इतिहास')) {
                return kb.monasteryInfo?.rumtek?.history || "Rumtek Monastery was built in 1966 and serves as the seat of the Karmapa.";
            }
            if (message.includes('festival') || message.includes('त्योहार')) {
                return kb.monasteryInfo?.rumtek?.festivals || "Rumtek celebrates Losar, Kagyat Dance, and various Buddha ceremonies.";
            }
            return kb.monasteryInfo?.rumtek?.history || "Rumtek is the largest monastery in Sikkim, built in 1966.";
        }

        if (message.includes('pemayangtse') || message.includes('पेमायंगत्से')) {
            return kb.monasteryInfo?.pemayangtse?.history || "Pemayangtse, built in 1705, means 'Perfect Sublime Lotus' and offers stunning Himalayan views.";
        }

        if (message.includes('tashiding') || message.includes('तशीदिंग')) {
            return kb.monasteryInfo?.tashiding?.history || "Tashiding, founded in 1641, is considered the most sacred monastery in Sikkim.";
        }

        if (message.includes('enchey') || message.includes('एन्चे')) {
            return kb.monasteryInfo?.enchey?.history || "Enchey Monastery, built in 1909, is dedicated to Guru Padmasambhava.";
        }

        // Festival questions
        if (message.includes('festival') || message.includes('त्योहार') || message.includes('चाडपर्व')) {
            if (message.includes('losar') || message.includes('लोसार')) {
                return kb.festivals?.losar || "Losar is the Tibetan New Year, celebrated in February with prayers and traditional dances.";
            }
            if (message.includes('bumchu') || message.includes('बुम्चु')) {
                return kb.festivals?.bumchu || "Bumchu is a sacred ceremony at Tashiding that predicts Sikkim's future through water levels.";
            }
            return "Sikkim monasteries celebrate various festivals throughout the year including Losar, Saga Dawa, Bumchu, and Chaam dance performances.";
        }

        // Travel advice
        if (message.includes('visit') || message.includes('travel') || message.includes('यात्रा') || message.includes('जाने')) {
            if (message.includes('time') || message.includes('when') || message.includes('समय')) {
                return kb.travel?.bestTime || "The best time to visit is October-December and March-May for clear weather and mountain views.";
            }
            if (message.includes('what') && message.includes('wear')) {
                return kb.travel?.whatToWear || "Wear modest clothing covering shoulders and legs. Carry warm layers for high-altitude monasteries.";
            }
            return kb.travel?.bestTime || "Plan your visit during October-December or March-May for the best weather conditions.";
        }

        // Booking help
        if (message.includes('book') || message.includes('hotel') || message.includes('stay') || message.includes('accommodation')) {
            return kb.bookingHelp || "I can help you find and book accommodations near monasteries. Would you like to see available options?";
        }

        // Language support
        if (message.includes('language') || message.includes('भाषा') || message.includes('भाषा')) {
            return kb.languages || "I can assist you in English, Hindi, Nepali, and Tibetan languages.";
        }

        // 360 tour questions
        if (message.includes('360') || message.includes('virtual') || message.includes('tour')) {
            return "You can experience immersive 360° virtual tours of all major monasteries! Click the VR button on any monastery card or use the 'Start Virtual Tour' button on the homepage.";
        }

        // Map questions
        if (message.includes('map') || message.includes('location') || message.includes('where')) {
            return "Check out our interactive map showing all monastery locations! You can filter by tradition, get directions, and see detailed information for each monastery.";
        }

        return null; // No local match found
    }

    async getChatGPTResponse(message) {
        // In a real implementation, this would call the OpenAI ChatGPT API
        // For demo purposes, we'll simulate intelligent responses
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = this.generateContextualResponse(message);
                resolve(responses[Math.floor(Math.random() * responses.length)]);
            }, 1000 + Math.random() * 2000); // Simulate API delay
        });
    }

    generateContextualResponse(message) {
        const msg = message.toLowerCase();
        
        // Contextual responses based on message content
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
            return [
                "Hello! I'm excited to help you explore Sikkim's beautiful monasteries. What would you like to know?",
                "Namaste! Welcome to your spiritual journey through Sikkim's ancient monasteries. How can I guide you today?",
                "Greetings! I'm here to share the rich heritage of Sikkim's Buddhist monasteries with you. What interests you most?"
            ];
        }

        if (msg.includes('help') || msg.includes('guide')) {
            return [
                "I'm here to help you with:\n• Information about monasteries and their history\n• Festival dates and celebrations\n• Travel planning and recommendations\n• Booking accommodations\n• 360° virtual tours\n• Cultural insights and etiquette\n\nWhat would you like to explore first?",
                "I can assist you with planning your monastery visit, learning about Buddhist traditions, finding accommodations, and much more! What specific information would you like?"
            ];
        }

        if (msg.includes('recommend') || msg.includes('suggest')) {
            return [
                "I recommend starting with these must-visit monasteries:\n\n🏛️ **Rumtek** - The largest monastery and seat of Karmapa\n🏔️ **Pemayangtse** - Amazing Himalayan views\n🙏 **Tashiding** - Most sacred site with annual Bumchu ceremony\n🎭 **Enchey** - Famous for Chaam dance performances\n\nWould you like detailed information about any of these?",
                "For first-time visitors, I suggest:\n1. Start with Rumtek for its grandeur\n2. Visit Enchey for cultural performances\n3. Experience Tashiding's sacred atmosphere\n4. End with Pemayangtse for stunning views\n\nShall I help you plan a detailed itinerary?"
            ];
        }

        if (msg.includes('culture') || msg.includes('tradition') || msg.includes('buddhist')) {
            return [
                "Sikkim's monasteries represent different Buddhist traditions:\n\n🔴 **Nyingma** (Red Hat) - Oldest tradition, includes Pemayangtse and Tashiding\n⚪ **Kagyu** (White Hat) - Includes Rumtek, the Karmapa's seat\n🟡 **Gelug** (Yellow Hat) - Dalai Lama's tradition\n\nEach tradition has unique practices, festivals, and architectural styles. Which tradition interests you most?",
                "Buddhist culture in Sikkim is deeply intertwined with daily life. Monasteries serve as:\n• Spiritual centers for meditation and prayer\n• Educational institutions preserving ancient texts\n• Cultural hubs for festivals and ceremonies\n• Community gathering places\n\nWould you like to know about specific rituals or practices?"
            ];
        }

        // Default intelligent responses
        return [
            "That's an interesting question about Sikkim's monasteries! While I process your specific query, let me share that each monastery has its unique story and significance. Could you be more specific about what aspect interests you most?",
            "I understand you're curious about our monastery heritage. Sikkim's Buddhist monasteries are treasure troves of history, art, and spirituality. What particular information would you like me to provide?",
            "Thank you for your question! Sikkim's monasteries offer rich experiences in spirituality, architecture, and culture. Let me help you discover what you're looking for. Could you elaborate on your interest?",
            "Your curiosity about Sikkim's spiritual heritage is wonderful! I'm here to provide detailed information about monasteries, festivals, travel tips, and cultural insights. What specific aspect would you like to explore?"
        ];
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${this.formatMessage(message)}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${this.formatMessage(message)}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addQuickActions() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const quickActionsDiv = document.createElement('div');
        quickActionsDiv.className = 'bot-message quick-actions-message';
        
        quickActionsDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Here are some quick actions you can try:</p>
                <div class="quick-actions" style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 10px;
                ">
                    <button class="quick-action-btn" onclick="chatBot.askQuestion('Tell me about Rumtek Monastery')" style="
                        background: rgba(212, 175, 55, 0.1);
                        color: #d4af37;
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        🏛️ Rumtek Info
                    </button>
                    <button class="quick-action-btn" onclick="chatBot.askQuestion('When is the best time to visit?')" style="
                        background: rgba(212, 175, 55, 0.1);
                        color: #d4af37;
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        📅 Best Time
                    </button>
                    <button class="quick-action-btn" onclick="chatBot.askQuestion('Show me festivals')" style="
                        background: rgba(212, 175, 55, 0.1);
                        color: #d4af37;
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        🎭 Festivals
                    </button>
                    <button class="quick-action-btn" onclick="chatBot.askQuestion('Help me book accommodation')" style="
                        background: rgba(212, 175, 55, 0.1);
                        color: #d4af37;
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        🏨 Book Stay
                    </button>
                </div>
            </div>
        `;

        messagesContainer.appendChild(quickActionsDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    askQuestion(question) {
        const input = document.getElementById('chatInput');
        if (input) {
            input.value = question;
            this.sendMessage();
        }
    }

    formatMessage(message) {
        // Basic message formatting
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/🏛️|🏔️|🙏|🎭|🔴|⚪|🟡|•/g, '<span style="font-size: 1.2em;">$&</span>');
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots" style="display: flex; align-items: center; gap: 4px;">
                    <span style="color: #666;">AI Guide is typing</span>
                    <div class="dots" style="display: flex; gap: 2px;">
                        <div class="dot" style="
                            width: 6px;
                            height: 6px;
                            background: #d4af37;
                            border-radius: 50%;
                            animation: typing 1.5s infinite;
                        "></div>
                        <div class="dot" style="
                            width: 6px;
                            height: 6px;
                            background: #d4af37;
                            border-radius: 50%;
                            animation: typing 1.5s infinite 0.2s;
                        "></div>
                        <div class="dot" style="
                            width: 6px;
                            height: 6px;
                            background: #d4af37;
                            border-radius: 50%;
                            animation: typing 1.5s infinite 0.4s;
                        "></div>
                    </div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add typing animation CSS if not already added
        if (!document.querySelector('#typing-animation-style')) {
            const style = document.createElement('style');
            style.id = 'typing-animation-style';
            style.textContent = `
                @keyframes typing {
                    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(-4px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        
        // Add language change confirmation message
        const langNames = {
            'en': 'English',
            'hi': 'हिन्दी (Hindi)',
            'ne': 'नेपाली (Nepali)',
            'bo': 'བོད་སྐད་ (Tibetan)'
        };
        
        const confirmationMessage = this.currentLanguage === 'en' 
            ? `Language changed to ${langNames[language]}. I'll now respond in this language.`
            : this.knowledgeBase[this.currentLanguage]?.greetings?.[0] || "Language changed successfully.";
            
        this.addBotMessage(confirmationMessage);
    }

    getErrorMessage() {
        const errorMessages = {
            en: "I apologize, but I'm having trouble processing your request right now. Please try again or ask me something else about Sikkim's monasteries.",
            hi: "मुझे खुशी है, लेकिन अभी आपके अनुरोध को संसाधित करने में कुछ समस्या हो रही है। कृपया फिर से कोशिश करें।",
            ne: "माफ गर्नुहोस्, तर अहिले तपाईंको अनुरोध प्रक्रिया गर्न समस्या भइरहेको छ। कृपया फेरि प्रयास गर्नुहोस्।",
            bo: "དགོངས་དག མི་འདུག འདི་ལྟའི་དུས་སུ་ཁྱོད་ཀྱི་ཞུ་བ་དེ་སྒྲིག་སྤྲོད་བྱེད་པར་དཀའ་ངལ་ཞིག་འདུག"
        };
        
        return errorMessages[this.currentLanguage] || errorMessages.en;
    }
}

// Initialize chatbot
const chatBot = new SikkimChatbot();

// Global functions for chatbot
function toggleChat() {
    chatBot.toggleChat();
}

function sendChatMessage() {
    chatBot.sendMessage();
}

// Export for global access
window.chatBot = chatBot;
window.toggleChat = toggleChat;
window.sendChatMessage = sendChatMessage;