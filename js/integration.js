// Platform Integration & Initialization
// Connects all systems: gamification, calendar, chatbot, tours, maps, booking

class SikkimMonasteryPlatform {
    constructor() {
        this.systems = {
            gamification: null,
            calendar: null,
            chatbot: null,
            tours: null,
            map: null,
            booking: null
        };
        
        this.init();
    }

    async init() {
        console.log('🏛️ Initializing Sikkim Monastery Platform...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeSystems());
        } else {
            this.initializeSystems();
        }
    }

    async initializeSystems() {
        try {
            // Initialize core systems
            await this.initializeGamification();
            await this.initializeCalendar();
            await this.initializeChatbot();
            await this.initializeTours();
            await this.initializeMap();
            await this.initializeBooking();
            
            // Setup cross-system integrations
            this.setupIntegrations();
            
            // Setup event handlers
            this.setupEventHandlers();
            
            // Run initial setup
            this.runInitialSetup();
            
            console.log('✅ Platform initialization complete!');
            
        } catch (error) {
            console.error('❌ Platform initialization failed:', error);
            this.showErrorNotification('Failed to initialize platform. Please refresh the page.');
        }
    }

    async initializeGamification() {
        if (typeof gameGuide !== 'undefined') {
            this.systems.gamification = gameGuide;
            console.log('🎮 Gamification system loaded');
        }
    }

    async initializeCalendar() {
        if (typeof calendarSystem !== 'undefined') {
            this.systems.calendar = calendarSystem;
            console.log('📅 Calendar system loaded');
        }
    }

    async initializeChatbot() {
        if (typeof sikkimChatbot !== 'undefined') {
            this.systems.chatbot = sikkimChatbot;
            console.log('🤖 Chatbot system loaded');
        }
    }

    async initializeTours() {
        if (typeof virtualTourSystem !== 'undefined') {
            this.systems.tours = virtualTourSystem;
            console.log('🌐 Virtual tour system loaded');
        }
    }

    async initializeMap() {
        if (typeof monasteryMap !== 'undefined') {
            this.systems.map = monasteryMap;
            console.log('🗺️ Interactive map system loaded');
        }
    }

    async initializeBooking() {
        // Booking system is integrated in main.js
        this.systems.booking = true;
        console.log('🏨 Booking system loaded');
    }

    setupIntegrations() {
        // Calendar → Gamification
        if (this.systems.calendar && this.systems.gamification) {
            document.addEventListener('festival-viewed', (e) => {
                this.systems.gamification.triggerFestivalViewing(e.detail.festivalId);
            });
        }

        // Tours → Gamification
        if (this.systems.tours && this.systems.gamification) {
            document.addEventListener('tour-started', (e) => {
                this.systems.gamification.triggerMonasteryVisit(e.detail.monasteryId);
            });
            
            document.addEventListener('tour-completed', (e) => {
                this.systems.gamification.triggerTourCompletion(
                    e.detail.monasteryId, 
                    e.detail.duration
                );
            });
        }

        // Map → Gamification
        if (this.systems.map && this.systems.gamification) {
            document.addEventListener('marker-clicked', (e) => {
                this.systems.gamification.triggerMapClick(e.detail.locationId);
            });
        }

        // Chatbot → Gamification
        if (this.systems.chatbot && this.systems.gamification) {
            document.addEventListener('chat-message-sent', (e) => {
                this.systems.gamification.triggerChatInteraction();
            });
        }

        // Booking → Gamification
        document.addEventListener('booking-confirmed', (e) => {
            if (this.systems.gamification) {
                this.systems.gamification.triggerBookingCompletion(e.detail.bookingId);
            }
        });

        console.log('🔗 Cross-system integrations established');
    }

    setupEventHandlers() {
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Monastery card interactions
        document.querySelectorAll('.monastery-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.card-actions')) {
                    const monasteryId = card.dataset.monasteryId;
                    if (monasteryId) {
                        this.viewMonasteryDetails(monasteryId);
                    }
                }
            });
        });

        // Tour button handlers
        document.querySelectorAll('.tour-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const monasteryId = btn.dataset.monasteryId;
                if (monasteryId && this.systems.tours) {
                    this.systems.tours.startTour(monasteryId);
                    
                    // Track tour start for gamification
                    document.dispatchEvent(new CustomEvent('tour-started', {
                        detail: { 
                            monasteryId, 
                            startTime: Date.now() 
                        }
                    }));
                }
            });
        });

        // Location button handlers
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const monasteryId = btn.dataset.monasteryId;
                if (monasteryId && this.systems.map) {
                    this.scrollToMap();
                    setTimeout(() => {
                        this.systems.map.focusOnMonastery(monasteryId);
                    }, 500);
                }
            });
        });

        // Share functionality
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const monasteryId = btn.dataset.monasteryId;
                this.shareMonastery(monasteryId);
            });
        });

        console.log('🎛️ Event handlers configured');
    }

    runInitialSetup() {
        // Trigger initial monastery visit for homepage
        if (this.systems.gamification) {
            this.systems.gamification.triggerMonasteryVisit('homepage');
        }

        // Show welcome message for new users
        const isFirstVisit = !localStorage.getItem('sikkimMonasteryVisited');
        if (isFirstVisit) {
            setTimeout(() => {
                this.showWelcomeMessage();
                localStorage.setItem('sikkimMonasteryVisited', 'true');
            }, 2000);
        }

        // Update user interface
        this.updateUI();
    }

    viewMonasteryDetails(monasteryId) {
        // Show detailed monastery information
        const monastery = this.getMonasteryData(monasteryId);
        if (monastery) {
            this.showMonasteryModal(monastery);
            
            // Track monastery visit
            document.dispatchEvent(new CustomEvent('monastery-visited', {
                detail: { monasteryId }
            }));
        }
    }

    getMonasteryData(monasteryId) {
        const monasteries = {
            'rumtek': {
                name: 'Rumtek Monastery',
                description: 'The seat of the Karma Kagyu lineage, known for its golden stupa and sacred relics.',
                details: 'Founded in the 16th century, Rumtek is one of the most significant monasteries in Sikkim.',
                location: 'Rumtek, East Sikkim',
                founded: '1966 (rebuilt)',
                significance: 'Seat of Karmapa',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop'
            },
            'enchey': {
                name: 'Enchey Monastery',
                description: 'A 200-year-old monastery famous for its annual Chaam dance festival.',
                details: 'Perched on a hilltop, Enchey offers panoramic views of Gangtok and the surrounding mountains.',
                location: 'Gangtok, East Sikkim',
                founded: '1909',
                significance: 'Famous for Chaam dances',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
            },
            'pemayangtse': {
                name: 'Pemayangtse Monastery',
                description: 'The perfect sublime lotus, one of the oldest and most important monasteries.',
                details: 'This three-storied monastery houses rare Buddhist sculptures and paintings.',
                location: 'Pelling, West Sikkim',
                founded: '1705',
                significance: 'Second oldest monastery',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
            },
            'tashiding': {
                name: 'Tashiding Monastery',
                description: 'The sacred center of Sikkim, famous for the Bumchu festival.',
                details: 'Located on a hilltop, it\'s considered the most sacred monastery in Sikkim.',
                location: 'Tashiding, West Sikkim',
                founded: '1641',
                significance: 'Most sacred monastery',
                image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=600&h=400&fit=crop'
            }
        };

        return monasteries[monasteryId];
    }

    showMonasteryModal(monastery) {
        const modal = document.createElement('div');
        modal.className = 'monastery-details-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${monastery.image}" alt="${monastery.name}" class="monastery-modal-image">
                <div class="monastery-modal-content">
                    <h2>${monastery.name}</h2>
                    <p class="monastery-location">
                        <i class="fas fa-map-marker-alt"></i> ${monastery.location}
                    </p>
                    <p class="monastery-founded">
                        <i class="fas fa-calendar"></i> Founded: ${monastery.founded}
                    </p>
                    <p class="monastery-significance">
                        <i class="fas fa-star"></i> ${monastery.significance}
                    </p>
                    <p class="monastery-description">${monastery.description}</p>
                    <p class="monastery-details">${monastery.details}</p>
                    
                    <div class="monastery-modal-actions">
                        <button class="btn btn-primary" onclick="platform.startVirtualTour('${monastery.name.toLowerCase().replace(' ', '-')}')">
                            <i class="fas fa-vr-cardboard"></i> Virtual Tour
                        </button>
                        <button class="btn btn-secondary" onclick="platform.viewOnMap('${monastery.name.toLowerCase().replace(' ', '-')}')">
                            <i class="fas fa-map"></i> View on Map
                        </button>
                        <button class="btn btn-outline" onclick="platform.planVisit('${monastery.name.toLowerCase().replace(' ', '-')}')">
                            <i class="fas fa-calendar-plus"></i> Plan Visit
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Event handlers
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || 
                e.target.classList.contains('modal-close')) {
                modal.remove();
            }
        });

        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    startVirtualTour(monasteryId) {
        if (this.systems.tours) {
            this.systems.tours.startTour(monasteryId);
        }
        this.closeModals();
    }

    viewOnMap(monasteryId) {
        this.scrollToMap();
        if (this.systems.map) {
            setTimeout(() => {
                this.systems.map.focusOnMonastery(monasteryId);
            }, 500);
        }
        this.closeModals();
    }

    planVisit(monasteryId) {
        this.scrollToSection('plan-trip');
        // Pre-fill trip planner with monastery selection
        setTimeout(() => {
            const tripForm = document.querySelector('.trip-planner select');
            if (tripForm) {
                tripForm.value = monasteryId;
                tripForm.dispatchEvent(new Event('change'));
            }
        }, 500);
        this.closeModals();
    }

    closeModals() {
        document.querySelectorAll('.monastery-details-modal').forEach(modal => {
            modal.remove();
        });
    }

    scrollToMap() {
        const mapSection = document.getElementById('map');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    shareMonastery(monasteryId) {
        const monastery = this.getMonasteryData(monasteryId);
        if (!monastery) return;

        const shareData = {
            title: monastery.name,
            text: `Discover the spiritual beauty of ${monastery.name} - ${monastery.description}`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(
                `${shareData.title}\n${shareData.text}\n${shareData.url}`
            );
            this.showNotification('Monastery details copied to clipboard!');
        }

        // Track sharing for gamification
        if (this.systems.gamification) {
            this.systems.gamification.triggerShare('monastery');
        }
    }

    showWelcomeMessage() {
        const welcomeModal = document.createElement('div');
        welcomeModal.className = 'welcome-modal';
        welcomeModal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content welcome-content">
                <button class="modal-close">&times;</button>
                <div class="welcome-header">
                    <h2>🏛️ Welcome to Sikkim's Sacred Monasteries</h2>
                    <p>Begin your spiritual journey through the mystical monasteries of Sikkim</p>
                </div>
                
                <div class="welcome-features">
                    <div class="welcome-feature">
                        <i class="fas fa-vr-cardboard"></i>
                        <h4>360° Virtual Tours</h4>
                        <p>Explore sacred halls and hidden treasures</p>
                    </div>
                    <div class="welcome-feature">
                        <i class="fas fa-map"></i>
                        <h4>Interactive Map</h4>
                        <p>Discover monastery locations and plan visits</p>
                    </div>
                    <div class="welcome-feature">
                        <i class="fas fa-calendar"></i>
                        <h4>Festival Calendar</h4>
                        <p>Join sacred celebrations and ceremonies</p>
                    </div>
                    <div class="welcome-feature">
                        <i class="fas fa-robot"></i>
                        <h4>AI Guide</h4>
                        <p>Get personalized recommendations and insights</p>
                    </div>
                </div>
                
                <div class="welcome-actions">
                    <button class="btn btn-primary" onclick="platform.startExploration()">
                        Begin Exploration
                    </button>
                    <button class="btn btn-secondary" onclick="platform.closeWelcome()">
                        Skip Introduction
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(welcomeModal);
        
        welcomeModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || 
                e.target.classList.contains('modal-close')) {
                this.closeWelcome();
            }
        });
    }

    startExploration() {
        this.closeWelcome();
        // Trigger first achievement
        if (this.systems.gamification) {
            setTimeout(() => {
                this.systems.gamification.triggerMonasteryVisit('first-exploration');
            }, 500);
        }
        
        // Scroll to monasteries section
        this.scrollToSection('monasteries');
    }

    closeWelcome() {
        const welcomeModal = document.querySelector('.welcome-modal');
        if (welcomeModal) {
            welcomeModal.remove();
        }
    }

    updateUI() {
        // Update dynamic elements based on current state
        this.updateProgressIndicators();
        this.updateRecommendations();
    }

    updateProgressIndicators() {
        // Update various progress indicators throughout the platform
        if (this.systems.gamification) {
            const userData = this.systems.gamification.userData;
            
            // Update navigation badge if user has achievements
            if (userData.achievements.length > 0) {
                const navBadge = document.createElement('span');
                navBadge.className = 'nav-achievement-badge';
                navBadge.textContent = userData.achievements.length;
                
                const profileLink = document.querySelector('nav .profile-link');
                if (profileLink && !profileLink.querySelector('.nav-achievement-badge')) {
                    profileLink.appendChild(navBadge);
                }
            }
        }
    }

    updateRecommendations() {
        // Show personalized recommendations based on user activity
        const recommendationsContainer = document.getElementById('recommendations');
        if (recommendationsContainer && this.systems.gamification) {
            const recommendations = this.generateRecommendations();
            this.displayRecommendations(recommendations, recommendationsContainer);
        }
    }

    generateRecommendations() {
        const userData = this.systems.gamification.userData;
        const recommendations = [];

        // Based on visited monasteries
        if (userData.visitedMonasteries.length === 0) {
            recommendations.push({
                type: 'monastery',
                title: 'Start Your Journey',
                description: 'Begin with Rumtek Monastery, the golden jewel of Sikkim',
                action: 'Visit Rumtek',
                target: 'rumtek'
            });
        }

        // Based on achievements
        if (userData.achievements.length < 3) {
            recommendations.push({
                type: 'achievement',
                title: 'Unlock Your First Achievement',
                description: 'Complete a 360° virtual tour to earn points',
                action: 'Start Tour',
                target: 'tours'
            });
        }

        // Seasonal recommendations
        const currentMonth = new Date().getMonth();
        if (currentMonth === 1 || currentMonth === 2) { // Feb-Mar
            recommendations.push({
                type: 'festival',
                title: 'Losar Festival Season',
                description: 'Experience Tibetan New Year celebrations',
                action: 'View Calendar',
                target: 'festivals'
            });
        }

        return recommendations;
    }

    displayRecommendations(recommendations, container) {
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="rec-icon">
                    <i class="fas fa-${this.getRecommendationIcon(rec.type)}"></i>
                </div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <button class="btn btn-small" onclick="platform.followRecommendation('${rec.target}')">
                        ${rec.action}
                    </button>
                </div>
            </div>
        `).join('');
    }

    getRecommendationIcon(type) {
        const icons = {
            monastery: 'temple',
            achievement: 'trophy',
            festival: 'calendar',
            tour: 'vr-cardboard',
            map: 'map'
        };
        return icons[type] || 'star';
    }

    followRecommendation(target) {
        switch (target) {
            case 'rumtek':
                this.viewMonasteryDetails('rumtek');
                break;
            case 'tours':
                this.scrollToSection('monasteries');
                break;
            case 'festivals':
                this.scrollToSection('festivals');
                break;
            default:
                this.scrollToSection(target);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `platform-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showErrorNotification(message) {
        this.showNotification(message, 'error');
    }

    // Utility methods for other systems to use
    static getInstance() {
        if (!SikkimMonasteryPlatform.instance) {
            SikkimMonasteryPlatform.instance = new SikkimMonasteryPlatform();
        }
        return SikkimMonasteryPlatform.instance;
    }
}

// Initialize platform when script loads
const platform = SikkimMonasteryPlatform.getInstance();

// Export for global access
window.platform = platform;
window.SikkimMonasteryPlatform = SikkimMonasteryPlatform;