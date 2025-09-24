// Gamified Exploration System for Sikkim Monastery Platform
// Interactive virtual tour guide with achievements, progress tracking, and challenges

class VirtualTourGuide {
    constructor() {
        this.userData = {
            level: 1,
            experience: 0,
            achievements: [],
            visitedMonasteries: [],
            completedChallenges: [],
            badges: [],
            totalPoints: 0,
            streakDays: 0,
            lastVisit: null
        };
        
        this.achievementDefinitions = [];
        this.challenges = [];
        this.dailyQuests = [];
        this.leaderboard = [];
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.defineAchievements();
        this.setupChallenges();
        this.generateDailyQuests();
        this.setupEventListeners();
        this.updateGameInterface();
    }

    loadUserData() {
        // Load from localStorage
        const saved = localStorage.getItem('sikkimMonasteryProgress');
        if (saved) {
            try {
                this.userData = { ...this.userData, ...JSON.parse(saved) };
            } catch (e) {
                console.warn('Could not load saved progress');
            }
        }
        
        // Update streak
        this.updateStreak();
    }

    saveUserData() {
        localStorage.setItem('sikkimMonasteryProgress', JSON.stringify({
            ...this.userData,
            lastVisit: new Date().toISOString()
        }));
    }

    defineAchievements() {
        this.achievementDefinitions = [
            {
                id: 'first_visit',
                name: 'First Steps',
                description: 'Begin your spiritual journey by visiting your first monastery',
                icon: '🏛️',
                points: 100,
                type: 'milestone',
                requirement: { type: 'monasteries_visited', count: 1 },
                badge: 'Beginner Explorer'
            },
            {
                id: 'tour_master',
                name: 'Virtual Tour Master',
                description: 'Complete 360° tours of 5 different monasteries',
                icon: '🌐',
                points: 500,
                type: 'activity',
                requirement: { type: 'tours_completed', count: 5 },
                badge: 'Tour Master'
            },
            {
                id: 'festival_enthusiast',
                name: 'Festival Enthusiast',
                description: 'Learn about 10 different monastery festivals',
                icon: '🎭',
                points: 300,
                type: 'knowledge',
                requirement: { type: 'festivals_learned', count: 10 },
                badge: 'Cultural Expert'
            },
            {
                id: 'chat_scholar',
                name: 'Chat Scholar',
                description: 'Ask 25 questions to the AI guide about monasteries',
                icon: '💬',
                points: 250,
                type: 'interaction',
                requirement: { type: 'questions_asked', count: 25 },
                badge: 'Curious Scholar'
            },
            {
                id: 'map_explorer',
                name: 'Map Explorer',
                description: 'Discover all monastery locations on the interactive map',
                icon: '🗺️',
                points: 400,
                type: 'exploration',
                requirement: { type: 'map_locations_discovered', count: 15 },
                badge: 'Master Navigator'
            },
            {
                id: 'booking_pro',
                name: 'Journey Planner',
                description: 'Successfully book your first monastery stay',
                icon: '📅',
                points: 200,
                type: 'action',
                requirement: { type: 'bookings_made', count: 1 },
                badge: 'Travel Planner'
            },
            {
                id: 'streak_warrior',
                name: 'Dedicated Pilgrim',
                description: 'Visit the platform for 7 consecutive days',
                icon: '🔥',
                points: 350,
                type: 'streak',
                requirement: { type: 'streak_days', count: 7 },
                badge: 'Consistent Explorer'
            },
            {
                id: 'eco_champion',
                name: 'Eco Champion',
                description: 'Plan 3 eco-friendly trips with low carbon footprint',
                icon: '🌿',
                points: 300,
                type: 'sustainability',
                requirement: { type: 'eco_trips_planned', count: 3 },
                badge: 'Green Traveler'
            },
            {
                id: 'sharing_spirit',
                name: 'Sharing Spirit',
                description: 'Share 5 monastery experiences on social media',
                icon: '📱',
                points: 150,
                type: 'social',
                requirement: { type: 'shares_made', count: 5 },
                badge: 'Ambassador'
            },
            {
                id: 'legend',
                name: 'Monastery Legend',
                description: 'Reach Level 10 and become a true monastery expert',
                icon: '👑',
                points: 1000,
                type: 'master',
                requirement: { type: 'level_reached', count: 10 },
                badge: 'Legend of Sikkim'
            }
        ];
    }

    setupChallenges() {
        this.challenges = [
            {
                id: 'speed_tour',
                name: 'Speed Explorer',
                description: 'Complete a 360° tour in under 5 minutes',
                icon: '⚡',
                points: 150,
                difficulty: 'easy',
                type: 'timed',
                duration: 300000, // 5 minutes in milliseconds
                active: false
            },
            {
                id: 'festival_quiz',
                name: 'Festival Knowledge Challenge',
                description: 'Answer 10 questions about Sikkim festivals correctly',
                icon: '🧠',
                points: 200,
                difficulty: 'medium',
                type: 'quiz',
                questions: [
                    {
                        question: 'Which festival celebrates the Tibetan New Year?',
                        options: ['Losar', 'Bumchu', 'Saga Dawa', 'Pang Lhabsol'],
                        correct: 0
                    },
                    {
                        question: 'What does the Bumchu Festival predict?',
                        options: ['Weather', 'Harvest', 'Future of Sikkim', 'Number of visitors'],
                        correct: 2
                    },
                    {
                        question: 'Which monastery is famous for the Bumchu Festival?',
                        options: ['Rumtek', 'Enchey', 'Tashiding', 'Pemayangtse'],
                        correct: 2
                    }
                ],
                active: false
            },
            {
                id: 'photo_hunt',
                name: 'Virtual Photo Hunt',
                description: 'Find 5 hidden details in monastery 360° tours',
                icon: '📸',
                points: 250,
                difficulty: 'hard',
                type: 'hidden_objects',
                targets: [
                    { monastery: 'rumtek', item: 'Golden Stupa', location: 'main_hall' },
                    { monastery: 'enchey', item: 'Ancient Scroll', location: 'library' },
                    { monastery: 'pemayangtse', item: 'Prayer Wheels', location: 'courtyard' }
                ],
                active: false
            },
            {
                id: 'trivia_master',
                name: 'Monastery Trivia Master',
                description: 'Score 100% on the comprehensive monastery knowledge test',
                icon: '🎯',
                points: 300,
                difficulty: 'expert',
                type: 'comprehensive_quiz',
                questionCount: 20,
                passingScore: 100,
                active: false
            }
        ];
    }

    generateDailyQuests() {
        const currentDate = new Date().toDateString();
        const lastQuestDate = localStorage.getItem('lastQuestDate');
        
        if (lastQuestDate !== currentDate) {
            const questTemplates = [
                {
                    name: 'Daily Explorer',
                    description: 'Visit 2 different monastery pages today',
                    points: 50,
                    requirement: { type: 'daily_monastery_visits', count: 2 }
                },
                {
                    name: 'Question of the Day',
                    description: 'Ask the AI chatbot about monastery history',
                    points: 30,
                    requirement: { type: 'daily_chat_interactions', count: 3 }
                },
                {
                    name: 'Festival Learning',
                    description: 'Read about today\'s festival if available',
                    points: 40,
                    requirement: { type: 'daily_festival_reading', count: 1 }
                },
                {
                    name: 'Map Discovery',
                    description: 'Click on 3 monastery markers on the map',
                    points: 35,
                    requirement: { type: 'daily_map_clicks', count: 3 }
                }
            ];

            // Randomly select 2-3 quests for today
            this.dailyQuests = this.shuffleArray(questTemplates).slice(0, 2 + Math.floor(Math.random() * 2));
            localStorage.setItem('lastQuestDate', currentDate);
            localStorage.setItem('dailyQuests', JSON.stringify(this.dailyQuests));
        } else {
            const saved = localStorage.getItem('dailyQuests');
            this.dailyQuests = saved ? JSON.parse(saved) : [];
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    setupEventListeners() {
        // Listen for various user actions to award points and track progress
        document.addEventListener('monastery-visited', (e) => {
            this.trackMonasteryVisit(e.detail.monasteryId);
        });

        document.addEventListener('tour-completed', (e) => {
            this.trackTourCompletion(e.detail.monasteryId, e.detail.duration);
        });

        document.addEventListener('festival-viewed', (e) => {
            this.trackFestivalLearning(e.detail.festivalId);
        });

        document.addEventListener('chat-interaction', (e) => {
            this.trackChatInteraction();
        });

        document.addEventListener('map-location-clicked', (e) => {
            this.trackMapExploration(e.detail.locationId);
        });

        document.addEventListener('booking-completed', (e) => {
            this.trackBookingCompletion(e.detail.bookingId);
        });

        document.addEventListener('share-action', (e) => {
            this.trackSocialSharing(e.detail.type);
        });
    }

    trackMonasteryVisit(monasteryId) {
        if (!this.userData.visitedMonasteries.includes(monasteryId)) {
            this.userData.visitedMonasteries.push(monasteryId);
            this.awardPoints(25, `Visited ${monasteryId}`);
            this.checkAchievements();
            
            // Check daily quest
            this.updateDailyQuest('daily_monastery_visits');
        }
        
        this.updateProgress();
    }

    trackTourCompletion(monasteryId, duration) {
        const tourKey = `tour_${monasteryId}`;
        if (!this.userData.completedChallenges.includes(tourKey)) {
            this.userData.completedChallenges.push(tourKey);
            this.awardPoints(100, `Completed ${monasteryId} virtual tour`);
            
            // Check for speed challenge
            if (duration < 300000) { // Less than 5 minutes
                this.completeChallenge('speed_tour');
            }
            
            this.checkAchievements();
        }
        
        this.updateProgress();
    }

    trackFestivalLearning(festivalId) {
        const festivalKey = `festival_${festivalId}`;
        if (!this.userData.completedChallenges.includes(festivalKey)) {
            this.userData.completedChallenges.push(festivalKey);
            this.awardPoints(15, `Learned about ${festivalId}`);
            this.updateDailyQuest('daily_festival_reading');
            this.checkAchievements();
        }
        
        this.updateProgress();
    }

    trackChatInteraction() {
        this.awardPoints(5, 'Chat interaction');
        this.updateDailyQuest('daily_chat_interactions');
        
        // Track total questions for achievement
        const chatCount = (this.userData.totalChatInteractions || 0) + 1;
        this.userData.totalChatInteractions = chatCount;
        
        this.checkAchievements();
        this.updateProgress();
    }

    trackMapExploration(locationId) {
        const mapKey = `map_${locationId}`;
        if (!this.userData.completedChallenges.includes(mapKey)) {
            this.userData.completedChallenges.push(mapKey);
            this.awardPoints(10, `Discovered ${locationId} on map`);
            this.updateDailyQuest('daily_map_clicks');
            this.checkAchievements();
        }
        
        this.updateProgress();
    }

    trackBookingCompletion(bookingId) {
        this.userData.bookingsMade = (this.userData.bookingsMade || 0) + 1;
        this.awardPoints(200, 'Completed booking');
        this.checkAchievements();
        this.updateProgress();
    }

    trackSocialSharing(type) {
        this.userData.sharesMade = (this.userData.sharesMade || 0) + 1;
        this.awardPoints(25, `Shared ${type}`);
        this.checkAchievements();
        this.updateProgress();
    }

    awardPoints(points, reason) {
        this.userData.totalPoints += points;
        this.userData.experience += points;
        
        // Check for level up
        const newLevel = Math.floor(this.userData.experience / 1000) + 1;
        if (newLevel > this.userData.level) {
            this.userData.level = newLevel;
            this.showLevelUpNotification(newLevel);
        }
        
        // Show points notification
        this.showPointsNotification(points, reason);
    }

    updateDailyQuest(questType) {
        this.dailyQuests.forEach(quest => {
            if (quest.requirement.type === questType) {
                quest.progress = (quest.progress || 0) + 1;
                
                if (quest.progress >= quest.requirement.count && !quest.completed) {
                    quest.completed = true;
                    this.awardPoints(quest.points, quest.name);
                    this.showQuestCompletedNotification(quest);
                }
            }
        });
        
        localStorage.setItem('dailyQuests', JSON.stringify(this.dailyQuests));
    }

    checkAchievements() {
        this.achievementDefinitions.forEach(achievement => {
            if (this.userData.achievements.includes(achievement.id)) return;
            
            let qualified = false;
            const req = achievement.requirement;
            
            switch (req.type) {
                case 'monasteries_visited':
                    qualified = this.userData.visitedMonasteries.length >= req.count;
                    break;
                case 'tours_completed':
                    const tourCount = this.userData.completedChallenges.filter(c => c.startsWith('tour_')).length;
                    qualified = tourCount >= req.count;
                    break;
                case 'festivals_learned':
                    const festivalCount = this.userData.completedChallenges.filter(c => c.startsWith('festival_')).length;
                    qualified = festivalCount >= req.count;
                    break;
                case 'questions_asked':
                    qualified = (this.userData.totalChatInteractions || 0) >= req.count;
                    break;
                case 'map_locations_discovered':
                    const mapCount = this.userData.completedChallenges.filter(c => c.startsWith('map_')).length;
                    qualified = mapCount >= req.count;
                    break;
                case 'bookings_made':
                    qualified = (this.userData.bookingsMade || 0) >= req.count;
                    break;
                case 'streak_days':
                    qualified = this.userData.streakDays >= req.count;
                    break;
                case 'shares_made':
                    qualified = (this.userData.sharesMade || 0) >= req.count;
                    break;
                case 'level_reached':
                    qualified = this.userData.level >= req.count;
                    break;
            }
            
            if (qualified) {
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        this.userData.achievements.push(achievement.id);
        this.userData.badges.push(achievement.badge);
        this.awardPoints(achievement.points, achievement.name);
        this.showAchievementNotification(achievement);
    }

    completeChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge && !this.userData.completedChallenges.includes(challengeId)) {
            this.userData.completedChallenges.push(challengeId);
            this.awardPoints(challenge.points, challenge.name);
            this.showChallengeCompletedNotification(challenge);
        }
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastVisit = this.userData.lastVisit ? new Date(this.userData.lastVisit).toDateString() : null;
        
        if (lastVisit) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            
            if (lastVisit === yesterdayStr) {
                // Consecutive day
                this.userData.streakDays++;
            } else if (lastVisit !== today) {
                // Streak broken
                this.userData.streakDays = 1;
            }
        } else {
            // First visit
            this.userData.streakDays = 1;
        }
        
        this.checkAchievements();
    }

    updateProgress() {
        this.saveUserData();
        this.updateGameInterface();
    }

    updateGameInterface() {
        // Update progress bar
        const progressBar = document.getElementById('gameProgress');
        if (progressBar) {
            const currentLevelExp = (this.userData.level - 1) * 1000;
            const nextLevelExp = this.userData.level * 1000;
            const progressPercent = ((this.userData.experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
            
            progressBar.innerHTML = `
                <div class="game-progress-content">
                    <div class="level-info">
                        <div class="level-badge">Level ${this.userData.level}</div>
                        <div class="points-display">${this.userData.totalPoints} pts</div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="streak-info">
                        🔥 ${this.userData.streakDays} day streak
                    </div>
                </div>
            `;
        }

        // Update achievements panel
        this.updateAchievementsPanel();
        
        // Update daily quests
        this.updateDailyQuestsPanel();
    }

    updateAchievementsPanel() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;

        achievementsGrid.innerHTML = this.achievementDefinitions.map(achievement => {
            const isUnlocked = this.userData.achievements.includes(achievement.id);
            return `
                <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" 
                     onclick="gameGuide.showAchievementDetails('${achievement.id}')">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                    <div class="achievement-points">${achievement.points} pts</div>
                    ${isUnlocked ? '<div class="achievement-badge">✓</div>' : ''}
                </div>
            `;
        }).join('');
    }

    updateDailyQuestsPanel() {
        const questsList = document.getElementById('dailyQuestsList');
        if (!questsList) return;

        questsList.innerHTML = this.dailyQuests.map(quest => {
            const progress = quest.progress || 0;
            const progressPercent = Math.min((progress / quest.requirement.count) * 100, 100);
            
            return `
                <div class="daily-quest ${quest.completed ? 'completed' : ''}">
                    <div class="quest-info">
                        <div class="quest-name">${quest.name}</div>
                        <div class="quest-description">${quest.description}</div>
                        <div class="quest-reward">${quest.points} pts</div>
                    </div>
                    <div class="quest-progress">
                        <div class="progress-bar-small">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <div class="progress-text">${progress}/${quest.requirement.count}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    showPointsNotification(points, reason) {
        this.createNotification(`+${points} points`, reason, 'success', 3000);
    }

    showLevelUpNotification(newLevel) {
        this.createNotification('🎉 LEVEL UP!', `You reached Level ${newLevel}!`, 'levelup', 5000);
    }

    showAchievementNotification(achievement) {
        this.createNotification(`🏆 ${achievement.name}`, achievement.description, 'achievement', 5000);
    }

    showChallengeCompletedNotification(challenge) {
        this.createNotification(`⚡ ${challenge.name}`, 'Challenge completed!', 'challenge', 4000);
    }

    showQuestCompletedNotification(quest) {
        this.createNotification(`✅ ${quest.name}`, 'Daily quest completed!', 'quest', 3000);
    }

    createNotification(title, message, type, duration) {
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // Public methods for integration with other systems
    triggerMonasteryVisit(monasteryId) {
        document.dispatchEvent(new CustomEvent('monastery-visited', {
            detail: { monasteryId }
        }));
    }

    triggerTourCompletion(monasteryId, duration) {
        document.dispatchEvent(new CustomEvent('tour-completed', {
            detail: { monasteryId, duration }
        }));
    }

    triggerFestivalViewing(festivalId) {
        document.dispatchEvent(new CustomEvent('festival-viewed', {
            detail: { festivalId }
        }));
    }

    triggerChatInteraction() {
        document.dispatchEvent(new CustomEvent('chat-interaction', {}));
    }

    triggerMapClick(locationId) {
        document.dispatchEvent(new CustomEvent('map-location-clicked', {
            detail: { locationId }
        }));
    }

    triggerBookingCompletion(bookingId) {
        document.dispatchEvent(new CustomEvent('booking-completed', {
            detail: { bookingId }
        }));
    }

    triggerShare(type) {
        document.dispatchEvent(new CustomEvent('share-action', {
            detail: { type }
        }));
    }

    // Challenge management
    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.active = true;
            challenge.startTime = Date.now();
            this.showChallengeStartNotification(challenge);
        }
    }

    showChallengeStartNotification(challenge) {
        this.createNotification(`🚀 ${challenge.name}`, 'Challenge started!', 'challenge-start', 3000);
    }

    getLeaderboard() {
        // In a real app, this would fetch from server
        return [
            { name: 'Spiritual Seeker', level: 12, points: 15420 },
            { name: 'Mountain Explorer', level: 10, points: 12890 },
            { name: 'Culture Lover', level: 9, points: 11250 },
            { name: 'You', level: this.userData.level, points: this.userData.totalPoints },
            { name: 'Temple Guardian', level: 8, points: 9876 },
            { name: 'Peace Walker', level: 7, points: 8432 },
            { name: 'Dharma Student', level: 6, points: 7123 }
        ].sort((a, b) => b.points - a.points);
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('sikkimMonasteryProgress');
            localStorage.removeItem('dailyQuests');
            localStorage.removeItem('lastQuestDate');
            location.reload();
        }
    }
}

// Initialize the gamification system
const gameGuide = new VirtualTourGuide();

// Export for global access
window.gameGuide = gameGuide;