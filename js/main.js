// Main JavaScript for Sikkim Monasteries Platform
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeNavigation();
    initializeHero();
    loadMonasteryData();
    initializeLanguageSystem();
});

// Global variables
let currentLanguage = 'en';
let monasteryData = [];
let festivalData = [];
let accommodationData = [];

// App Initialization
function initializeApp() {
    console.log('Sikkim Monasteries Platform Initialized');
    
    // Set default dates for trip planning
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    document.getElementById('startDate').value = today.toISOString().split('T')[0];
    document.getElementById('endDate').value = nextWeek.toISOString().split('T')[0];
    
    // Set default dates for booking
    if (document.getElementById('checkinDate')) {
        document.getElementById('checkinDate').value = today.toISOString().split('T')[0];
        document.getElementById('checkoutDate').value = nextWeek.toISOString().split('T')[0];
    }
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero section functionality
function initializeHero() {
    const heroVideo = document.querySelector('.hero-video');
    
    // Fallback for hero video
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            const heroBackground = document.querySelector('.hero-background');
            heroBackground.style.background = `
                linear-gradient(45deg, rgba(212, 175, 55, 0.8), rgba(184, 148, 31, 0.6)),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop') center/cover
            `;
        });
    }
}

// Load monastery data
function loadMonasteryData() {
    monasteryData = [
        {
            id: 'rumtek',
            name: 'Rumtek Monastery',
            location: 'Gangtok',
            founded: 1966,
            tradition: 'kagyu',
            description: 'The largest monastery in Sikkim, known as the Dharma Chakra Centre',
            coordinates: [27.3389, 88.5276],
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            panorama: 'assets/360tours/rumtek-360.jpg',
            details: {
                history: 'Founded in 1966, Rumtek is the seat of the Karmapa and one of the most important monasteries in Sikkim.',
                architecture: 'Traditional Tibetan architecture with golden roof and intricate woodwork.',
                significance: 'Houses many precious relics and serves as the main seat of the Karma Kagyu lineage.',
                bestTime: 'October to December, March to May',
                openHours: '6:00 AM - 6:00 PM',
                entryFee: 'Free (Photography fee applies)'
            }
        },
        {
            id: 'pemayangtse',
            name: 'Pemayangtse Monastery',
            location: 'Pelling',
            founded: 1705,
            tradition: 'nyingma',
            description: 'One of the oldest monasteries with stunning Himalayan views',
            coordinates: [27.2938, 88.2182],
            image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800&h=600&fit=crop',
            panorama: 'assets/360tours/pemayangtse-360.jpg',
            details: {
                history: 'Built in 1705 by Lama Lhatsun Chempo, it is the second oldest monastery in Sikkim.',
                architecture: 'Three-story structure representing the celestial abode of Guru Rinpoche.',
                significance: 'Home to rare Buddhist scriptures and sacred artifacts.',
                bestTime: 'October to December, March to May',
                openHours: '7:00 AM - 5:00 PM',
                entryFee: 'INR 5 for Indians, INR 20 for foreigners'
            }
        },
        {
            id: 'tashiding',
            name: 'Tashiding Monastery',
            location: 'Yuksom',
            founded: 1641,
            tradition: 'nyingma',
            description: 'Sacred hilltop monastery with panoramic mountain views',
            coordinates: [27.3847, 88.2142],
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            panorama: 'assets/360tours/tashiding-360.jpg',
            details: {
                history: 'Founded in 1641, it is considered the holiest monastery in Sikkim.',
                architecture: 'Perched on a hilltop with commanding views of the Himalayas.',
                significance: 'Sacred Bumchu ceremony held annually, believed to predict the future.',
                bestTime: 'October to December, March to May',
                openHours: '6:00 AM - 6:00 PM',
                entryFee: 'Free'
            }
        },
        {
            id: 'enchey',
            name: 'Enchey Monastery',
            location: 'Gangtok',
            founded: 1909,
            tradition: 'nyingma',
            description: 'Beautiful monastery dedicated to Guru Padmasambhava',
            coordinates: [27.3389, 88.6065],
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            panorama: 'assets/360tours/enchey-360.jpg',
            details: {
                history: 'Built in 1909 on the site where Lama Druptob Karpo meditated.',
                architecture: 'Traditional Sikkimese architecture with beautiful murals.',
                significance: 'Annual Chaam dance performances attract thousands of visitors.',
                bestTime: 'October to December, March to May',
                openHours: '6:00 AM - 6:00 PM',
                entryFee: 'Free'
            }
        }
    ];

    loadFestivalData();
    loadAccommodationData();
}

// Load festival data
function loadFestivalData() {
    festivalData = [
        {
            name: 'Losar (Tibetan New Year)',
            date: '2025-02-20',
            monastery: 'All Monasteries',
            description: 'The most important Buddhist festival celebrating the New Year with prayers, dances, and feasts.',
            duration: '3 days',
            significance: 'Religious and Cultural'
        },
        {
            name: 'Saga Dawa',
            date: '2025-05-15',
            monastery: 'All Monasteries',
            description: 'Celebrates the birth, enlightenment, and death of Buddha.',
            duration: '1 month',
            significance: 'Religious'
        },
        {
            name: 'Bumchu Festival',
            date: '2025-02-10',
            monastery: 'Tashiding Monastery',
            description: 'Sacred water vessel ceremony that predicts the future of Sikkim.',
            duration: '1 day',
            significance: 'Religious and Prophetic'
        },
        {
            name: 'Chaam Dance',
            date: '2025-12-15',
            monastery: 'Enchey Monastery',
            description: 'Traditional masked dance performance by monks.',
            duration: '2 days',
            significance: 'Cultural and Spiritual'
        },
        {
            name: 'Kagyat Dance',
            date: '2025-01-28',
            monastery: 'Rumtek Monastery',
            description: 'Sacred dance performed to ward off evil spirits.',
            duration: '2 days',
            significance: 'Spiritual Protection'
        }
    ];
}

// Load accommodation data
function loadAccommodationData() {
    accommodationData = [
        {
            id: 1,
            name: 'Hotel Tibet',
            location: 'Gangtok',
            rating: 4.5,
            price: 3500,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
            amenities: ['WiFi', 'Restaurant', 'Room Service', 'Parking'],
            description: 'Luxury hotel with traditional Tibetan decor and modern amenities.',
            eco: true,
            available: true
        },
        {
            id: 2,
            name: 'Monastery View Lodge',
            location: 'Pelling',
            rating: 4.2,
            price: 2800,
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
            amenities: ['WiFi', 'Mountain View', 'Garden', 'Library'],
            description: 'Cozy lodge with stunning views of monasteries and mountains.',
            eco: true,
            available: true
        },
        {
            id: 3,
            name: 'Himalayan Retreat',
            location: 'Yuksom',
            rating: 4.0,
            price: 2200,
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
            amenities: ['WiFi', 'Organic Food', 'Meditation Hall', 'Trekking Guide'],
            description: 'Eco-friendly retreat perfect for spiritual seekers.',
            eco: true,
            available: true
        },
        {
            id: 4,
            name: 'Royal Heritage Hotel',
            location: 'Gangtok',
            rating: 4.8,
            price: 5200,
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
            amenities: ['WiFi', 'Spa', 'Fine Dining', 'Concierge', 'Butler Service'],
            description: 'Luxury heritage hotel with world-class amenities.',
            eco: false,
            available: true
        }
    ];
}

// Hero section actions
function startVirtualTour() {
    // Start with the first monastery tour
    start360Tour('rumtek');
}

function exploreMap() {
    // Scroll to map section
    const mapSection = document.getElementById('virtual-tours');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Monastery actions
function start360Tour(monasteryId) {
    const monastery = monasteryData.find(m => m.id === monasteryId);
    if (!monastery) return;

    const modal = document.getElementById('tourModal');
    const panorama = document.getElementById('panorama');
    
    // For demo purposes, we'll use placeholder 360 images
    const panoramaUrl = `https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg`;
    
    panorama.setAttribute('src', panoramaUrl);
    modal.style.display = 'block';
    
    // Add monastery info overlay (you can extend this)
    console.log(`Starting 360° tour of ${monastery.name}`);
}

function showMonasteryInfo(monasteryId) {
    const monastery = monasteryData.find(m => m.id === monasteryId);
    if (!monastery) return;

    // Create and show info modal
    const infoModal = createInfoModal(monastery);
    document.body.appendChild(infoModal);
    infoModal.style.display = 'flex';
}

function createInfoModal(monastery) {
    const modal = document.createElement('div');
    modal.className = 'info-modal';
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

    modal.innerHTML = `
        <div class="info-content" style="
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        ">
            <button class="close-info" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            ">&times;</button>
            
            <img src="${monastery.image}" alt="${monastery.name}" style="
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 15px 15px 0 0;
            ">
            
            <div style="padding: 2rem;">
                <h2 style="font-family: 'Playfair Display', serif; margin-bottom: 1rem; color: #d4af37;">
                    ${monastery.name}
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <div><strong>Location:</strong> ${monastery.location}</div>
                    <div><strong>Founded:</strong> ${monastery.founded}</div>
                    <div><strong>Tradition:</strong> ${monastery.tradition.charAt(0).toUpperCase() + monastery.tradition.slice(1)}</div>
                    <div><strong>Best Time:</strong> ${monastery.details.bestTime}</div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;">History</h4>
                    <p style="color: #666; line-height: 1.6;">${monastery.details.history}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;">Architecture</h4>
                    <p style="color: #666; line-height: 1.6;">${monastery.details.architecture}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;">Significance</h4>
                    <p style="color: #666; line-height: 1.6;">${monastery.details.significance}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <div><strong>Open Hours:</strong> ${monastery.details.openHours}</div>
                    <div><strong>Entry Fee:</strong> ${monastery.details.entryFee}</div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="start360Tour('${monastery.id}')" style="
                        background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fas fa-vr-cardboard'></i> Start 360° Tour
                    </button>
                    <button onclick="showOnMap('${monastery.id}')" style="
                        background: transparent;
                        color: #d4af37;
                        border: 2px solid #d4af37;
                        padding: 12px 24px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fas fa-map'></i> Show on Map
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add close functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-info')) {
            modal.remove();
        }
    });

    return modal;
}

function viewAllMonasteries() {
    // Create a comprehensive monastery listing page
    console.log('Viewing all monasteries');
    // You can expand this to show a detailed listing
}

function showOnMap(monasteryId) {
    const monastery = monasteryData.find(m => m.id === monasteryId);
    if (!monastery) return;

    // Close any open modals
    const infoModals = document.querySelectorAll('.info-modal');
    infoModals.forEach(modal => modal.remove());

    // Scroll to map
    const mapSection = document.getElementById('virtual-tours');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Highlight monastery on map (this would integrate with the map functionality)
    setTimeout(() => {
        console.log(`Showing ${monastery.name} on map`);
        // Map highlighting logic would go here
    }, 1000);
}

// 360 Tour controls
function closeTour() {
    const modal = document.getElementById('tourModal');
    modal.style.display = 'none';
}

function resetView() {
    const camera = document.getElementById('camera');
    if (camera) {
        camera.setAttribute('rotation', '0 0 0');
    }
}

function toggleFullscreen() {
    const tourModal = document.getElementById('tourModal');
    if (!document.fullscreenElement) {
        tourModal.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Trip Planning
function generateTripPlan() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const groupSize = document.getElementById('groupSize').value;
    
    // Get selected interests
    const selectedInterests = Array.from(document.querySelectorAll('.interest-tag.active'))
        .map(tag => tag.dataset.interest);

    if (!startDate || !endDate) {
        alert('Please select your travel dates');
        return;
    }

    // Show loading state
    const tripResults = document.getElementById('tripResults');
    const itineraryContent = document.getElementById('itineraryContent');
    
    tripResults.style.display = 'block';
    itineraryContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Generating your personalized itinerary...</div>';

    // Simulate AI trip planning
    setTimeout(() => {
        const itinerary = generatePersonalizedItinerary(startDate, endDate, selectedInterests, groupSize);
        itineraryContent.innerHTML = itinerary;
    }, 2000);
}

function generatePersonalizedItinerary(startDate, endDate, interests, groupSize) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    let itinerary = `
        <div class="itinerary-header">
            <h4>Your ${days}-Day Sikkim Monastery Experience</h4>
            <p>Customized for ${interests.join(', ')} • ${groupSize} ${groupSize === '1' ? 'traveler' : 'travelers'}</p>
        </div>
        <div class="itinerary-days">
    `;

    // Generate day-by-day itinerary based on interests
    for (let i = 0; i < days; i++) {
        const dayDate = new Date(start);
        dayDate.setDate(start.getDate() + i);
        
        itinerary += `
            <div class="itinerary-day">
                <div class="day-header">
                    <h5>Day ${i + 1}</h5>
                    <span class="day-date">${dayDate.toLocaleDateString()}</span>
                </div>
                <div class="day-activities">
                    ${generateDayActivities(i + 1, interests)}
                </div>
            </div>
        `;
    }

    itinerary += `
        </div>
        <div class="itinerary-footer">
            <div class="trip-highlights">
                <h5>Trip Highlights</h5>
                <ul>
                    <li>Visit 4-6 major monasteries</li>
                    <li>Experience traditional festivals (if in season)</li>
                    <li>Eco-friendly accommodations</li>
                    <li>Local cultural interactions</li>
                    <li>Professional guide services</li>
                </ul>
            </div>
            <div class="estimated-cost">
                <h5>Estimated Cost</h5>
                <div class="cost-breakdown">
                    <div>Accommodation: ₹${days * (groupSize === '1' ? 3000 : 5000)}</div>
                    <div>Transportation: ₹${days * 1500}</div>
                    <div>Meals: ₹${days * (parseInt(groupSize) || 1) * 800}</div>
                    <div>Activities: ₹${days * 1200}</div>
                    <div class="total-cost">Total: ₹${days * (parseInt(groupSize) || 1) * 2000 + 5000}</div>
                </div>
            </div>
        </div>
        <div class="itinerary-actions">
            <button class="btn btn-primary" onclick="bookTripPlan()">
                <i class="fas fa-calendar-check"></i> Book This Itinerary
            </button>
            <button class="btn btn-secondary" onclick="customizeTrip()">
                <i class="fas fa-edit"></i> Customize Trip
            </button>
        </div>
    `;

    return itinerary;
}

function generateDayActivities(day, interests) {
    const activities = {
        1: [
            "Arrival in Gangtok",
            "Check-in to eco-friendly accommodation",
            "Visit Enchey Monastery for evening prayers",
            "Welcome dinner with traditional Sikkimese cuisine"
        ],
        2: [
            "Morning visit to Rumtek Monastery",
            "360° virtual tour experience",
            "Lunch with monastery view",
            "Afternoon meditation session",
            "Cultural performance in the evening"
        ],
        3: [
            "Travel to Pelling",
            "Visit Pemayangtse Monastery",
            "Himalayan sunrise photography",
            "Local village interaction",
            "Traditional craft workshop"
        ]
    };

    const defaultActivities = activities[day] || [
        "Monastery exploration",
        "Cultural activities",
        "Local cuisine experience",
        "Rest and reflection time"
    ];

    return defaultActivities.map(activity => `
        <div class="activity-item">
            <i class="fas fa-clock"></i>
            <span>${activity}</span>
        </div>
    `).join('');
}

// Interest tag functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('interest-tag')) {
        e.target.classList.toggle('active');
    }
});

function bookTripPlan() {
    alert('Trip booking functionality would integrate with booking system');
    // This would connect to the booking system
}

function customizeTrip() {
    alert('Trip customization feature would allow detailed modifications');
    // This would open a detailed customization interface
}

// Eco-friendly travel functions
function calculateCarbon() {
    // Create carbon calculator modal
    const modal = createCarbonCalculatorModal();
    document.body.appendChild(modal);
}

function showEcoStays() {
    // Filter accommodations to show only eco-friendly options
    const ecoStays = accommodationData.filter(acc => acc.eco);
    displayAccommodations(ecoStays);
    
    // Scroll to booking section
    document.getElementById('book-stay').scrollIntoView({ behavior: 'smooth' });
}

function exploreCommunity() {
    alert('Community tourism programs showcase local culture and support communities');
}

function learnConservation() {
    alert('Learn about monastery restoration and environmental conservation efforts');
}

function createCarbonCalculatorModal() {
    const modal = document.createElement('div');
    modal.className = 'carbon-modal';
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

    modal.innerHTML = `
        <div class="carbon-content" style="
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            padding: 2rem;
            position: relative;
        ">
            <button class="close-carbon" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            ">&times;</button>
            
            <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 1.5rem; color: #4CAF50;">
                Carbon Footprint Calculator
            </h3>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Travel Distance (km)</label>
                <input type="number" id="travelDistance" placeholder="Enter distance from your city" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                ">
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Transportation Mode</label>
                <select id="transportMode" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                ">
                    <option value="flight">Flight</option>
                    <option value="train">Train</option>
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                </select>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Number of Travelers</label>
                <input type="number" id="travelerCount" value="1" min="1" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                ">
            </div>
            
            <div id="carbonResult" style="
                background: #f0f8f0;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                text-align: center;
                display: none;
            ">
                <div style="font-size: 1.5rem; font-weight: 600; color: #4CAF50;" id="carbonAmount"></div>
                <div style="color: #666; margin-top: 0.5rem;">CO₂ emissions for your trip</div>
                <div style="margin-top: 1rem;">
                    <strong>Offset Cost: <span id="offsetCost" style="color: #4CAF50;"></span></strong>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="calculateCarbonFootprint()" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">Calculate Impact</button>
                <button id="offsetButton" onclick="offsetCarbon()" style="
                    background: transparent;
                    color: #4CAF50;
                    border: 2px solid #4CAF50;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    display: none;
                ">Offset Now</button>
            </div>
        </div>
    `;

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-carbon')) {
            modal.remove();
        }
    });

    return modal;
}

function calculateCarbonFootprint() {
    const distance = document.getElementById('travelDistance').value;
    const mode = document.getElementById('transportMode').value;
    const travelers = document.getElementById('travelerCount').value;

    if (!distance) {
        alert('Please enter travel distance');
        return;
    }

    // Carbon emission factors (kg CO2 per km per person)
    const emissionFactors = {
        flight: 0.255,
        train: 0.041,
        car: 0.171,
        bus: 0.089
    };

    const totalEmissions = distance * emissionFactors[mode] * travelers;
    const offsetCost = Math.ceil(totalEmissions * 2); // ₹2 per kg CO2

    document.getElementById('carbonResult').style.display = 'block';
    document.getElementById('carbonAmount').textContent = `${totalEmissions.toFixed(2)} kg`;
    document.getElementById('offsetCost').textContent = `₹${offsetCost}`;
    document.getElementById('offsetButton').style.display = 'inline-block';
}

function offsetCarbon() {
    alert('Carbon offset purchase would integrate with environmental organizations');
}

// Language System
function initializeLanguageSystem() {
    const languageBtn = document.getElementById('languageBtn');
    const languageModal = document.getElementById('languageModal');

    languageBtn.addEventListener('click', function() {
        languageModal.style.display = 'flex';
    });

    languageModal.addEventListener('click', function(e) {
        if (e.target === languageModal) {
            languageModal.style.display = 'none';
        }
    });
}

function setLanguage(lang) {
    currentLanguage = lang;
    
    const langNames = {
        'en': 'English',
        'hi': 'हिन्दी',
        'ne': 'नेपाली',
        'bo': 'བོད་སྐད་'
    };
    
    document.getElementById('languageBtn').innerHTML = `
        <i class="fas fa-globe"></i> ${langNames[lang]}
    `;
    
    document.getElementById('languageModal').style.display = 'none';
    
    // Here you would implement actual translation
    console.log(`Language changed to: ${lang}`);
}

// Search and booking functionality
function searchAccommodations() {
    const location = document.getElementById('locationFilter').value;
    const checkin = document.getElementById('checkinDate').value;
    const checkout = document.getElementById('checkoutDate').value;
    const guests = document.getElementById('guestCount').value;

    let filteredAccommodations = accommodationData;

    if (location) {
        filteredAccommodations = filteredAccommodations.filter(acc => 
            acc.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    displayAccommodations(filteredAccommodations);
}

function displayAccommodations(accommodations) {
    const resultsContainer = document.getElementById('accommodationResults');
    
    if (accommodations.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">No accommodations found matching your criteria.</p>';
        return;
    }

    resultsContainer.innerHTML = accommodations.map(acc => `
        <div class="accommodation-card">
            <div class="accommodation-image">
                <img src="${acc.image}" alt="${acc.name}">
                ${acc.eco ? '<div class="eco-badge"><i class="fas fa-leaf"></i> Eco-Friendly</div>' : ''}
            </div>
            <div class="accommodation-content">
                <h4 class="accommodation-name">${acc.name}</h4>
                <div class="accommodation-location">
                    <i class="fas fa-map-marker-alt"></i> ${acc.location}
                </div>
                <div class="accommodation-rating">
                    <div class="stars">${'★'.repeat(Math.floor(acc.rating))}${'☆'.repeat(5 - Math.floor(acc.rating))}</div>
                    <span>${acc.rating}/5</span>
                </div>
                <p class="accommodation-description">${acc.description}</p>
                <div class="accommodation-amenities">
                    ${acc.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
                <div class="accommodation-price">₹${acc.price}/night</div>
                <button class="book-now-btn" onclick="bookAccommodation(${acc.id})">
                    <i class="fas fa-calendar-check"></i> Book Now
                </button>
            </div>
        </div>
    `).join('');
}

function bookAccommodation(accommodationId) {
    const accommodation = accommodationData.find(acc => acc.id === accommodationId);
    if (!accommodation) return;

    // Create booking modal
    const modal = createBookingModal(accommodation);
    document.body.appendChild(modal);
}

function createBookingModal(accommodation) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
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

    modal.innerHTML = `
        <div class="booking-content" style="
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            padding: 2rem;
            position: relative;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <button class="close-booking" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            ">&times;</button>
            
            <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 1rem; color: #d4af37;">
                Book ${accommodation.name}
            </h3>
            
            <img src="${accommodation.image}" alt="${accommodation.name}" style="
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 10px;
                margin-bottom: 1.5rem;
            ">
            
            <div class="booking-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Check-in</label>
                        <input type="date" id="bookingCheckin" style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                        ">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Check-out</label>
                        <input type="date" id="bookingCheckout" style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #ddd;
                            border-radius: 8px;
                        ">
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Number of Guests</label>
                    <select id="bookingGuests" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                    ">
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4+ Guests</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Your Name</label>
                    <input type="text" id="guestName" placeholder="Enter your full name" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                    ">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
                    <input type="email" id="guestEmail" placeholder="Enter your email" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                    ">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone</label>
                    <input type="tel" id="guestPhone" placeholder="Enter your phone number" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                    ">
                </div>
                
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Room Rate:</span>
                        <span>₹${accommodation.price}/night</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Taxes & Fees:</span>
                        <span>₹${Math.round(accommodation.price * 0.18)}</span>
                    </div>
                    <hr style="margin: 0.5rem 0;">
                    <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 1.1rem;">
                        <span>Total:</span>
                        <span id="totalPrice">₹${accommodation.price + Math.round(accommodation.price * 0.18)}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="confirmBooking(${accommodation.id})" style="
                        background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                        flex: 1;
                    ">
                        <i class='fas fa-credit-card'></i> Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-booking')) {
            modal.remove();
        }
    });

    return modal;
}

function confirmBooking(accommodationId) {
    const guestName = document.getElementById('guestName').value;
    const guestEmail = document.getElementById('guestEmail').value;
    const guestPhone = document.getElementById('guestPhone').value;
    const checkin = document.getElementById('bookingCheckin').value;
    const checkout = document.getElementById('bookingCheckout').value;

    if (!guestName || !guestEmail || !guestPhone || !checkin || !checkout) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate booking confirmation
    alert(`Booking confirmed for ${guestName}!\n\nYou will receive a confirmation email shortly.`);
    
    // Close modal
    const modal = document.querySelector('.booking-modal');
    if (modal) modal.remove();
}

// Initialize accommodation display on page load
document.addEventListener('DOMContentLoaded', function() {
    // Display all accommodations initially
    setTimeout(() => {
        if (accommodationData.length > 0) {
            displayAccommodations(accommodationData);
        }
    }, 1000);
});

// Global utility functions
window.start360Tour = start360Tour;
window.showMonasteryInfo = showMonasteryInfo;
window.closeTour = closeTour;
window.resetView = resetView;
window.toggleFullscreen = toggleFullscreen;
window.generateTripPlan = generateTripPlan;
window.calculateCarbon = calculateCarbon;
window.showEcoStays = showEcoStays;
window.exploreCommunity = exploreCommunity;
window.learnConservation = learnConservation;
window.setLanguage = setLanguage;
window.searchAccommodations = searchAccommodations;
window.bookAccommodation = bookAccommodation;
window.confirmBooking = confirmBooking;
window.startVirtualTour = startVirtualTour;
window.exploreMap = exploreMap;
window.viewAllMonasteries = viewAllMonasteries;