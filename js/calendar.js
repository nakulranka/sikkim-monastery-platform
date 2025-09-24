// Interactive Festival Calendar for Sikkim Monasteries
// Complete festival management system with detailed information and planning features

class FestivalCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.festivals = [];
        this.displayedMonth = this.currentDate.getMonth();
        this.displayedYear = this.currentDate.getFullYear();
        this.init();
    }

    init() {
        this.loadFestivalData();
        this.setupCalendarNavigation();
        this.renderCalendar();
        this.updateUpcomingFestivals();
    }

    loadFestivalData() {
        // Comprehensive festival data for Sikkim monasteries
        this.festivals = [
            {
                id: 'losar_2025',
                name: 'Losar (Tibetan New Year)',
                nameTranslations: {
                    hi: 'लोसार (तिब्बती नव वर्ष)',
                    ne: 'लोसार (तिब्बती नयाँ वर्ष)',
                    bo: 'ལོ་གསར་ (བོད་ཀྱི་ལོ་གསར)'
                },
                startDate: new Date('2025-02-19'),
                endDate: new Date('2025-02-21'),
                monastery: 'All Monasteries',
                location: 'Statewide',
                type: 'Religious',
                significance: 'major',
                description: 'The most important Buddhist festival celebrating the Tibetan New Year with elaborate prayers, traditional dances, and community feasts.',
                detailedDescription: 'Losar marks the beginning of the Tibetan calendar and is celebrated with great enthusiasm across all monasteries in Sikkim. The festival spans three days with different rituals each day.',
                rituals: [
                    'Preparation rituals and cleaning',
                    'Family reunions and feasting',
                    'Monastery prayers and ceremonies',
                    'Traditional Cham dance performances',
                    'Exchange of Tashi Delek greetings'
                ],
                bestViewingSpots: ['Rumtek Monastery', 'Enchey Monastery', 'Pemayangtse Monastery'],
                timings: '6:00 AM - 10:00 PM',
                entryFee: 'Free',
                crowdLevel: 'Very High',
                photography: 'Allowed with permission',
                specialFeatures: ['Traditional costume displays', 'Cultural performances', 'Local food stalls', 'Handicraft exhibitions'],
                travelTips: 'Book accommodation well in advance. Carry warm clothing. Respect local customs.',
                weatherExpected: 'Cold, occasional snow',
                nearbyAttractions: ['Gangtok city tour', 'MG Marg shopping', 'Tsomgo Lake'],
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            },
            {
                id: 'bumchu_2025',
                name: 'Bumchu Festival',
                nameTranslations: {
                    hi: 'बुम्चु त्योहार',
                    ne: 'बुम्चु पर्व',
                    bo: 'བུམ་ཆུ་ཚེས་ཆེན'
                },
                startDate: new Date('2025-03-10'),
                endDate: new Date('2025-03-10'),
                monastery: 'Tashiding Monastery',
                location: 'Tashiding, West Sikkim',
                type: 'Prophetic/Religious',
                significance: 'major',
                description: 'Sacred water vessel ceremony that predicts the future of Sikkim based on the water level in an ancient pot.',
                detailedDescription: 'The Bumchu Festival is one of the most unique celebrations in Sikkim. The sacred pot is opened once a year, and the water level inside is believed to predict the state\'s future.',
                rituals: [
                    'Opening of the sacred Bumchu pot',
                    'Distribution of holy water',
                    'Prophecy interpretation by lamas',
                    'Community prayers for prosperity'
                ],
                bestViewingSpots: ['Tashiding Monastery main hall'],
                timings: '4:00 AM - 8:00 PM',
                entryFee: 'Free',
                crowdLevel: 'Very High',
                photography: 'Restricted during main ceremony',
                specialFeatures: ['Sacred water ceremony', 'Traditional prophecies', 'Pilgrimage atmosphere'],
                travelTips: 'Arrive very early for best viewing spots. Trek required to reach monastery. Carry water and snacks.',
                weatherExpected: 'Cool mountain weather',
                nearbyAttractions: ['Yuksom historical site', 'Khecheopalri Lake', 'Rabdentse Ruins'],
                image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=400&h=300&fit=crop'
            },
            {
                id: 'saga_dawa_2025',
                name: 'Saga Dawa',
                nameTranslations: {
                    hi: 'सागा दावा',
                    ne: 'सागा दावा',
                    bo: 'ས་ག་ཟླ་བ'
                },
                startDate: new Date('2025-05-12'),
                endDate: new Date('2025-06-10'),
                monastery: 'All Monasteries',
                location: 'Statewide',
                type: 'Religious',
                significance: 'major',
                description: 'Month-long celebration of Buddha\'s birth, enlightenment, and parinirvana with special prayers and meritorious activities.',
                detailedDescription: 'Saga Dawa is the most sacred month in the Buddhist calendar, commemorating three major events in Buddha\'s life. Merit accumulated during this month is believed to be multiplied.',
                rituals: [
                    'Daily prayers and meditation sessions',
                    'Circumambulation of sacred sites',
                    'Offering of butter lamps',
                    'Reading of Buddhist scriptures',
                    'Acts of generosity and kindness'
                ],
                bestViewingSpots: ['All major monasteries', 'Sacred lakes and stupas'],
                timings: 'Dawn to dusk prayers',
                entryFee: 'Free',
                crowdLevel: 'High throughout the month',
                photography: 'Generally allowed',
                specialFeatures: ['Intensive meditation programs', 'Merit-making activities', 'Community service'],
                travelTips: 'Perfect time for spiritual retreat. Many monasteries offer meditation courses. Respect ongoing practices.',
                weatherExpected: 'Pleasant spring weather',
                nearbyAttractions: ['Mountain trekking', 'Rhododendron blooms', 'Clear Himalayan views'],
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
            },
            {
                id: 'chaam_enchey_2025',
                name: 'Chaam Dance at Enchey',
                nameTranslations: {
                    hi: 'एन्चे में छाम नृत्य',
                    ne: 'एन्चेमा छाम नृत्य',
                    bo: 'ཨེན་ཅེར་འཆམ་གར'
                },
                startDate: new Date('2025-12-28'),
                endDate: new Date('2025-12-29'),
                monastery: 'Enchey Monastery',
                location: 'Gangtok',
                type: 'Cultural/Religious',
                significance: 'major',
                description: 'Spectacular masked dance performance by monks representing the victory of good over evil.',
                detailedDescription: 'The Chaam dance is a sacred mask dance performed by monks wearing elaborate costumes and masks. Each dance has deep spiritual significance and tells stories from Buddhist mythology.',
                rituals: [
                    'Elaborate mask and costume preparation',
                    'Sacred dance performances',
                    'Symbolic representation of good vs evil',
                    'Community blessings',
                    'Traditional music accompaniment'
                ],
                bestViewingSpots: ['Enchey Monastery courtyard'],
                timings: '9:00 AM - 5:00 PM',
                entryFee: 'Free',
                crowdLevel: 'Very High',
                photography: 'Allowed from designated areas',
                specialFeatures: ['Colorful mask dances', 'Traditional music', 'Cultural exhibitions', 'Local food stalls'],
                travelTips: 'Arrive early for good viewing spots. Bring cushions for comfort. Respect performance protocols.',
                weatherExpected: 'Cold winter weather',
                nearbyAttractions: ['Gangtok city center', 'Hanuman Tok', 'Ganesh Tok'],
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
            },
            {
                id: 'kagyat_rumtek_2025',
                name: 'Kagyat Dance at Rumtek',
                nameTranslations: {
                    hi: 'रुमटेक में कग्यत नृत्य',
                    ne: 'रुमटेकमा कग्यत नृत्य',
                    bo: 'རུམ་ཐེག་བཀའ་བརྒྱད'
                },
                startDate: new Date('2025-01-28'),
                endDate: new Date('2025-01-29'),
                monastery: 'Rumtek Monastery',
                location: 'Rumtek, East Sikkim',
                type: 'Religious',
                significance: 'major',
                description: 'Sacred Kagyat dance performed to ward off evil spirits and bring prosperity for the new year.',
                detailedDescription: 'Kagyat is performed on the 28th and 29th days of the 12th Tibetan month. It\'s a powerful ceremony believed to drive away negative forces and welcome positive energy.',
                rituals: [
                    'Preparatory prayers and rituals',
                    'Mask dance performances',
                    'Burning of symbolic offerings',
                    'Community participation',
                    'New year blessings'
                ],
                bestViewingSpots: ['Rumtek Monastery main courtyard'],
                timings: '8:00 AM - 6:00 PM',
                entryFee: 'Free',
                crowdLevel: 'High',
                photography: 'Allowed with guidelines',
                specialFeatures: ['Traditional Kagyu lineage dances', 'Spiritual cleansing ceremonies', 'Monastery tour opportunities'],
                travelTips: 'Take shared jeep from Gangtok. Carry identification for monastery entry. Respect ongoing ceremonies.',
                weatherExpected: 'Cold winter conditions',
                nearbyAttractions: ['Lingdum Monastery', 'Ranka Monastery', 'Traditional village walks'],
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
            },
            {
                id: 'drupka_teshi_2025',
                name: 'Drupka Teshi',
                nameTranslations: {
                    hi: 'द्रुप्का तेशी',
                    ne: 'द्रुप्का तेशी',
                    bo: 'འགྲུབ་པའི་ཚེས་བཅུ'
                },
                startDate: new Date('2025-07-21'),
                endDate: new Date('2025-07-21'),
                monastery: 'All Monasteries',
                location: 'Statewide',
                type: 'Religious',
                significance: 'moderate',
                description: 'Celebrates Buddha\'s first sermon and the turning of the Dharma wheel.',
                detailedDescription: 'Drupka Teshi marks the day when Buddha gave his first sermon in Sarnath after attaining enlightenment. It\'s celebrated with prayers and teachings.',
                rituals: [
                    'Special prayer sessions',
                    'Reading of Buddhist teachings',
                    'Merit-making activities',
                    'Community gatherings'
                ],
                bestViewingSpots: ['Major monasteries', 'Buddhist temples'],
                timings: '6:00 AM - 8:00 PM',
                entryFee: 'Free',
                crowdLevel: 'Moderate',
                photography: 'Usually allowed',
                specialFeatures: ['Dharma teachings', 'Community prayers', 'Merit accumulation activities'],
                travelTips: 'Good time for learning Buddhist philosophy. Participate in community activities.',
                weatherExpected: 'Monsoon season, possible rain',
                nearbyAttractions: ['Lush green landscapes', 'Waterfall viewing'],
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
            },
            {
                id: 'pang_lhabsol_2025',
                name: 'Pang Lhabsol',
                nameTranslations: {
                    hi: 'पांग ल्हाब्सोल',
                    ne: 'पांग ल्हाब्सोल',
                    bo: 'སྤང་ལྷ་གསོལ'
                },
                startDate: new Date('2025-08-15'),
                endDate: new Date('2025-08-15'),
                monastery: 'Various monasteries and sacred sites',
                location: 'Mount Khangchendzonga region',
                type: 'Regional/Religious',
                significance: 'major',
                description: 'Unique Sikkimese festival dedicated to Mount Khangchendzonga, the guardian deity of Sikkim.',
                detailedDescription: 'Pang Lhabsol is a distinct Sikkimese celebration honoring Khangchendzonga as the protecting deity. It includes traditional war dances and regional customs.',
                rituals: [
                    'Offerings to Khangchendzonga',
                    'Traditional Sikkimese dances',
                    'Warrior dance performances',
                    'Community feasts',
                    'Unity celebrations'
                ],
                bestViewingSpots: ['Pemayangtse area', 'Tashiding region', 'Areas with Khangchendzonga views'],
                timings: '10:00 AM - 6:00 PM',
                entryFee: 'Free',
                crowdLevel: 'High',
                photography: 'Encouraged',
                specialFeatures: ['Unique Sikkimese traditions', 'Warrior dances', 'Mountain worship ceremonies', 'Local cultural displays'],
                travelTips: 'Experience authentic Sikkimese culture. Try local traditional foods. Learn about regional history.',
                weatherExpected: 'Clear weather, good mountain views',
                nearbyAttractions: ['Khangchendzonga National Park', 'Traditional villages', 'Scenic viewpoints'],
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
            },
            {
                id: 'buddha_purnima_2025',
                name: 'Buddha Purnima',
                nameTranslations: {
                    hi: 'बुद्ध पूर्णिमा',
                    ne: 'बुद्ध पूर्णिमा',
                    bo: 'སངས་རྒྱས་ཀྱི་འཁྲུངས་སྐར'
                },
                startDate: new Date('2025-05-23'),
                endDate: new Date('2025-05-23'),
                monastery: 'All Monasteries and Buddhist centers',
                location: 'Statewide',
                type: 'Religious',
                significance: 'major',
                description: 'Celebration of Buddha\'s birth with special prayers, decorations, and community activities.',
                detailedDescription: 'Buddha Purnima commemorates the birth of Gautama Buddha. Monasteries are beautifully decorated, and special prayers are conducted throughout the day.',
                rituals: [
                    'Special puja ceremonies',
                    'Monastery decorations',
                    'Sharing of prasad',
                    'Community service activities',
                    'Evening prayer sessions'
                ],
                bestViewingSpots: ['All monasteries', 'Buddhist community centers'],
                timings: '4:00 AM - 10:00 PM',
                entryFee: 'Free',
                crowdLevel: 'Moderate to High',
                photography: 'Generally allowed',
                specialFeatures: ['Beautiful decorations', 'Community harmony', 'Charitable activities', 'Cultural programs'],
                travelTips: 'Participate in community service. Enjoy special monastery meals. Learn about Buddha\'s teachings.',
                weatherExpected: 'Pleasant spring weather',
                nearbyAttractions: ['Blooming rhododendrons', 'Clear mountain views', 'Nature walks'],
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop'
            }
        ];
    }

    setupCalendarNavigation() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.displayedMonth--;
                if (this.displayedMonth < 0) {
                    this.displayedMonth = 11;
                    this.displayedYear--;
                }
                this.renderCalendar();
                this.updateUpcomingFestivals();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.displayedMonth++;
                if (this.displayedMonth > 11) {
                    this.displayedMonth = 0;
                    this.displayedYear++;
                }
                this.renderCalendar();
                this.updateUpcomingFestivals();
            });
        }
    }

    renderCalendar() {
        const currentMonthElement = document.getElementById('currentMonth');
        const calendarGrid = document.getElementById('calendarGrid');

        if (!currentMonthElement || !calendarGrid) return;

        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        currentMonthElement.textContent = `${monthNames[this.displayedMonth]} ${this.displayedYear}`;

        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'calendar-day-header';
            headerDiv.textContent = day;
            headerDiv.style.cssText = `
                background: #f8f9fa;
                padding: 10px;
                text-align: center;
                font-weight: 600;
                color: #666;
                border-bottom: 1px solid #ddd;
            `;
            calendarGrid.appendChild(headerDiv);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.displayedYear, this.displayedMonth, 1).getDay();
        const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'calendar-day empty';
            emptyDiv.style.cssText = `
                background: #f8f9fa;
                min-height: 80px;
                border: 1px solid #e0e0e0;
            `;
            calendarGrid.appendChild(emptyDiv);
        }

        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            const currentDateObj = new Date(this.displayedYear, this.displayedMonth, day);
            
            dayDiv.className = 'calendar-day';
            dayDiv.style.cssText = `
                background: white;
                min-height: 80px;
                border: 1px solid #e0e0e0;
                padding: 8px;
                cursor: pointer;
                transition: background 0.3s ease;
                position: relative;
            `;

            // Check if this day has festivals
            const dayFestivals = this.getFestivalsForDate(currentDateObj);
            
            dayDiv.innerHTML = `
                <div class="day-number" style="font-weight: 600; margin-bottom: 4px;">${day}</div>
                <div class="day-festivals">
                    ${dayFestivals.map(festival => `
                        <div class="festival-indicator" style="
                            background: ${this.getFestivalColor(festival.significance)};
                            color: white;
                            font-size: 10px;
                            padding: 2px 4px;
                            margin-bottom: 2px;
                            border-radius: 8px;
                            cursor: pointer;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        " onclick="calendarSystem.showFestivalDetails('${festival.id}')">
                            ${festival.name}
                        </div>
                    `).join('')}
                </div>
            `;

            // Highlight today
            if (this.isToday(currentDateObj)) {
                dayDiv.style.background = 'rgba(212, 175, 55, 0.1)';
                dayDiv.style.border = '2px solid #d4af37';
            }

            // Add click handler
            dayDiv.addEventListener('click', () => {
                this.selectDate(currentDateObj);
            });

            // Add hover effect
            dayDiv.addEventListener('mouseenter', () => {
                if (!this.isToday(currentDateObj)) {
                    dayDiv.style.background = '#f8f9fa';
                }
            });

            dayDiv.addEventListener('mouseleave', () => {
                if (!this.isToday(currentDateObj)) {
                    dayDiv.style.background = 'white';
                }
            });

            calendarGrid.appendChild(dayDiv);
        }
    }

    getFestivalsForDate(date) {
        return this.festivals.filter(festival => {
            const festivalStart = new Date(festival.startDate.getFullYear(), festival.startDate.getMonth(), festival.startDate.getDate());
            const festivalEnd = new Date(festival.endDate.getFullYear(), festival.endDate.getMonth(), festival.endDate.getDate());
            const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            
            return checkDate >= festivalStart && checkDate <= festivalEnd;
        });
    }

    getFestivalColor(significance) {
        const colors = {
            major: '#d4af37',
            moderate: '#ff6b35',
            minor: '#4CAF50'
        };
        return colors[significance] || '#666';
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    selectDate(date) {
        this.selectedDate = date;
        const festivals = this.getFestivalsForDate(date);
        
        if (festivals.length > 0) {
            // Show festivals for selected date
            this.showDateFestivals(date, festivals);
        } else {
            // Show no festivals message
            this.showNoFestivalsMessage(date);
        }
    }

    showDateFestivals(date, festivals) {
        // Create and show date festivals modal
        const modal = this.createDateFestivalsModal(date, festivals);
        document.body.appendChild(modal);
    }

    createDateFestivalsModal(date, festivals) {
        const modal = document.createElement('div');
        modal.className = 'date-festivals-modal';
        modal.style.cssText = `
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const dateStr = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                ">&times;</button>
                
                <div style="padding: 2rem;">
                    <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 1rem; color: #d4af37;">
                        Festivals on ${dateStr}
                    </h3>
                    
                    <div class="festivals-list">
                        ${festivals.map(festival => `
                            <div class="festival-card" style="
                                border: 2px solid ${this.getFestivalColor(festival.significance)};
                                border-radius: 10px;
                                padding: 1.5rem;
                                margin-bottom: 1rem;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onclick="calendarSystem.showFestivalDetails('${festival.id}')">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                    <h4 style="color: ${this.getFestivalColor(festival.significance)}; margin: 0;">
                                        ${festival.name}
                                    </h4>
                                    <span style="
                                        background: ${this.getFestivalColor(festival.significance)};
                                        color: white;
                                        padding: 4px 8px;
                                        border-radius: 12px;
                                        font-size: 12px;
                                        text-transform: uppercase;
                                    ">
                                        ${festival.significance}
                                    </span>
                                </div>
                                
                                <div style="margin-bottom: 1rem;">
                                    <div style="color: #666; margin-bottom: 0.5rem;">
                                        <i class="fas fa-map-marker-alt"></i> ${festival.monastery}
                                    </div>
                                    <div style="color: #666; margin-bottom: 0.5rem;">
                                        <i class="fas fa-clock"></i> ${festival.timings}
                                    </div>
                                    <div style="color: #666;">
                                        <i class="fas fa-users"></i> Expected crowd: ${festival.crowdLevel}
                                    </div>
                                </div>
                                
                                <p style="color: #666; line-height: 1.5; margin-bottom: 1rem;">
                                    ${festival.description}
                                </p>
                                
                                <div style="display: flex; gap: 10px;">
                                    <button onclick="calendarSystem.showFestivalDetails('${festival.id}')" style="
                                        background: ${this.getFestivalColor(festival.significance)};
                                        color: white;
                                        border: none;
                                        padding: 8px 16px;
                                        border-radius: 15px;
                                        font-size: 12px;
                                        cursor: pointer;
                                    ">
                                        View Details
                                    </button>
                                    <button onclick="calendarSystem.planVisit('${festival.id}')" style="
                                        background: transparent;
                                        color: ${this.getFestivalColor(festival.significance)};
                                        border: 2px solid ${this.getFestivalColor(festival.significance)};
                                        padding: 8px 16px;
                                        border-radius: 15px;
                                        font-size: 12px;
                                        cursor: pointer;
                                    ">
                                        Plan Visit
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });

        return modal;
    }

    showNoFestivalsMessage(date) {
        const dateStr = date.toLocaleDateString();
        const message = `No festivals scheduled for ${dateStr}. Check nearby dates or explore our monastery virtual tours!`;
        
        // You could show this in a small toast or modal
        console.log(message);
    }

    showFestivalDetails(festivalId) {
        const festival = this.festivals.find(f => f.id === festivalId);
        if (!festival) return;

        // Close any existing modals
        const existingModals = document.querySelectorAll('.date-festivals-modal, .festival-details-modal');
        existingModals.forEach(modal => modal.remove());

        // Create detailed festival modal
        const modal = this.createFestivalDetailsModal(festival);
        document.body.appendChild(modal);
    }

    createFestivalDetailsModal(festival) {
        const modal = document.createElement('div');
        modal.className = 'festival-details-modal';
        modal.style.cssText = `
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const startDate = festival.startDate.toLocaleDateString();
        const endDate = festival.endDate.toLocaleDateString();
        const dateRange = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 15px;
                max-width: 700px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    z-index: 1;
                ">&times;</button>
                
                <img src="${festival.image}" alt="${festival.name}" style="
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 15px 15px 0 0;
                ">
                
                <div style="padding: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <h2 style="font-family: 'Playfair Display', serif; color: #d4af37; margin: 0;">
                            ${festival.name}
                        </h2>
                        <span style="
                            background: ${this.getFestivalColor(festival.significance)};
                            color: white;
                            padding: 6px 12px;
                            border-radius: 15px;
                            font-size: 12px;
                            text-transform: uppercase;
                            font-weight: 600;
                        ">
                            ${festival.significance} Festival
                        </span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                        <div><strong>📅 Date:</strong> ${dateRange}</div>
                        <div><strong>🏛️ Location:</strong> ${festival.monastery}</div>
                        <div><strong>⏰ Timing:</strong> ${festival.timings}</div>
                        <div><strong>🎫 Entry:</strong> ${festival.entryFee}</div>
                        <div><strong>👥 Crowd:</strong> ${festival.crowdLevel}</div>
                        <div><strong>📸 Photography:</strong> ${festival.photography}</div>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Festival Description</h4>
                        <p style="color: #666; line-height: 1.6;">${festival.detailedDescription}</p>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Rituals & Ceremonies</h4>
                        <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
                            ${festival.rituals.map(ritual => `<li>${ritual}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Special Features</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${festival.specialFeatures.map(feature => `
                                <span style="
                                    background: rgba(212, 175, 55, 0.1);
                                    color: #d4af37;
                                    padding: 4px 8px;
                                    border-radius: 12px;
                                    font-size: 12px;
                                ">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Best Viewing Spots</h4>
                        <p style="color: #666;">${festival.bestViewingSpots.join(', ')}</p>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Travel Tips</h4>
                        <p style="color: #666; line-height: 1.6;">${festival.travelTips}</p>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Weather & Nearby Attractions</h4>
                        <p style="color: #666; margin-bottom: 0.5rem;"><strong>Expected Weather:</strong> ${festival.weatherExpected}</p>
                        <p style="color: #666;"><strong>Nearby:</strong> ${festival.nearbyAttractions.join(', ')}</p>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                        <button onclick="calendarSystem.planVisit('${festival.id}')" style="
                            background: linear-gradient(135deg, #d4af37, #b8941f);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: 600;
                            flex: 1;
                        ">
                            <i class='fas fa-calendar-plus'></i> Plan My Visit
                        </button>
                        
                        <button onclick="calendarSystem.bookNearby('${festival.monastery}')" style="
                            background: transparent;
                            color: #d4af37;
                            border: 2px solid #d4af37;
                            padding: 12px 24px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: 600;
                            flex: 1;
                        ">
                            <i class='fas fa-bed'></i> Book Stay
                        </button>
                        
                        <button onclick="calendarSystem.shareEvent('${festival.id}')" style="
                            background: transparent;
                            color: #4CAF50;
                            border: 2px solid #4CAF50;
                            padding: 12px 24px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            <i class='fas fa-share'></i> Share
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });

        return modal;
    }

    updateUpcomingFestivals() {
        const festivalList = document.getElementById('festivalList');
        if (!festivalList) return;

        const now = new Date();
        const upcoming = this.festivals
            .filter(festival => festival.startDate >= now)
            .sort((a, b) => a.startDate - b.startDate)
            .slice(0, 5);

        festivalList.innerHTML = upcoming.map(festival => {
            const daysUntil = Math.ceil((festival.startDate - now) / (1000 * 60 * 60 * 24));
            return `
                <div class="festival-item" style="
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    border-left: 4px solid ${this.getFestivalColor(festival.significance)};
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 1rem;
                " onclick="calendarSystem.showFestivalDetails('${festival.id}')">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                        <h5 style="color: #d4af37; margin: 0;">${festival.name}</h5>
                        <span style="
                            background: ${this.getFestivalColor(festival.significance)};
                            color: white;
                            padding: 2px 8px;
                            border-radius: 10px;
                            font-size: 10px;
                        ">
                            ${daysUntil} days
                        </span>
                    </div>
                    <div style="color: #666; font-size: 14px; margin-bottom: 0.5rem;">
                        ${festival.startDate.toLocaleDateString()} • ${festival.monastery}
                    </div>
                    <p style="color: #666; font-size: 12px; line-height: 1.4; margin: 0;">
                        ${festival.description}
                    </p>
                </div>
            `;
        }).join('');
    }

    planVisit(festivalId) {
        const festival = this.festivals.find(f => f.id === festivalId);
        if (!festival) return;

        // Close modals
        document.querySelectorAll('.festival-details-modal, .date-festivals-modal').forEach(modal => modal.remove());

        // Create trip planning interface
        alert(`Trip planning for ${festival.name} would integrate with the trip planner system!`);
        
        // In a real implementation, this would:
        // 1. Pre-fill trip planning form with festival dates
        // 2. Show recommended accommodations near the monastery
        // 3. Suggest complete itinerary including the festival
        // 4. Provide travel and weather information
    }

    bookNearby(monasteryLocation) {
        // Filter accommodations by monastery location and scroll to booking section
        alert(`Booking accommodations near ${monasteryLocation}...`);
        
        // In real implementation, would filter booking results
        document.getElementById('book-stay').scrollIntoView({ behavior: 'smooth' });
    }

    shareEvent(festivalId) {
        const festival = this.festivals.find(f => f.id === festivalId);
        if (!festival) return;

        const shareText = `Join me at ${festival.name} on ${festival.startDate.toLocaleDateString()} at ${festival.monastery}! ${festival.description}`;
        
        if (navigator.share) {
            navigator.share({
                title: festival.name,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText);
            alert('Event details copied to clipboard!');
        }
    }
}

// Initialize calendar system
const calendarSystem = new FestivalCalendar();

// Export for global access
window.calendarSystem = calendarSystem;