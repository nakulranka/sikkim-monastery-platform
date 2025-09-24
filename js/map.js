// Interactive Map for Sikkim Monasteries
// Using Leaflet.js for monastery locations and exploration

class MonasteryMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.clusters = null;
        this.currentMonastery = null;
        this.filterSettings = {
            all: true,
            nyingma: true,
            kagyu: true,
            gelug: true
        };
        this.init();
    }

    init() {
        this.initMap();
        this.loadMonasteryMarkers();
        this.setupMapControls();
        this.setupFilterControls();
    }

    initMap() {
        // Initialize the map centered on Sikkim
        this.map = L.map('monasteryMap').setView([27.3389, 88.6065], 10);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(this.map);

        // Add terrain layer option
        const terrainLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri',
            maxZoom: 18,
        });

        // Add satellite layer option
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri',
            maxZoom: 18,
        });

        // Layer control
        const baseMaps = {
            "Street Map": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }),
            "Terrain": terrainLayer,
            "Satellite": satelliteLayer
        };

        L.control.layers(baseMaps).addTo(this.map);

        // Add scale control
        L.control.scale().addTo(this.map);

        console.log('Map initialized');
    }

    loadMonasteryMarkers() {
        // Define monastery locations with detailed information
        const monasteries = [
            {
                id: 'rumtek',
                name: 'Rumtek Monastery',
                position: [27.3389, 88.5276],
                tradition: 'kagyu',
                founded: 1966,
                description: 'The largest monastery in Sikkim, seat of the Karmapa',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
                details: {
                    altitude: '1,550m',
                    monks: '300+',
                    significance: 'Seat of the 17th Karmapa',
                    festivals: ['Losar', 'Kagyat Dance'],
                    visitingHours: '6:00 AM - 6:00 PM',
                    entryFee: 'Free',
                    facilities: ['Parking', 'Guide Available', 'Photography Allowed'],
                    nearbyAttractions: ['Lingdum Monastery', 'Do Drul Chorten']
                }
            },
            {
                id: 'pemayangtse',
                name: 'Pemayangtse Monastery',
                position: [27.2938, 88.2182],
                tradition: 'nyingma',
                founded: 1705,
                description: 'Second oldest monastery with stunning Himalayan views',
                image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=400&h=300&fit=crop',
                details: {
                    altitude: '2,085m',
                    monks: '108',
                    significance: 'Perfect Sublime Lotus',
                    festivals: ['Chaam Dance', 'Pang Lhabsol'],
                    visitingHours: '7:00 AM - 5:00 PM',
                    entryFee: 'INR 5 (Indians), INR 20 (Foreigners)',
                    facilities: ['Museum', 'Library', 'Meditation Hall'],
                    nearbyAttractions: ['Rabdentse Ruins', 'Kanchenjunga Falls']
                }
            },
            {
                id: 'tashiding',
                name: 'Tashiding Monastery',
                position: [27.3847, 88.2142],
                tradition: 'nyingma',
                founded: 1641,
                description: 'Most sacred monastery perched on a hilltop',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                details: {
                    altitude: '1,465m',
                    monks: '45',
                    significance: 'Most Sacred Site in Sikkim',
                    festivals: ['Bumchu Festival', 'Saga Dawa'],
                    visitingHours: '6:00 AM - 6:00 PM',
                    entryFee: 'Free',
                    facilities: ['Sacred Bumchu Pot', 'Prayer Hall', 'Meditation Area'],
                    nearbyAttractions: ['Yuksom', 'Khangchendzonga National Park']
                }
            },
            {
                id: 'enchey',
                name: 'Enchey Monastery',
                position: [27.3389, 88.6065],
                tradition: 'nyingma',
                founded: 1909,
                description: 'Beautiful monastery dedicated to Guru Padmasambhava',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
                details: {
                    altitude: '1,675m',
                    monks: '90',
                    significance: 'Solitary Temple',
                    festivals: ['Chaam Dance', 'Losar'],
                    visitingHours: '6:00 AM - 6:00 PM',
                    entryFee: 'Free',
                    facilities: ['Prayer Hall', 'Meditation Room', 'Library'],
                    nearbyAttractions: ['Ganesh Tok', 'Hanuman Tok']
                }
            },
            {
                id: 'dubdi',
                name: 'Dubdi Monastery',
                position: [27.3825, 88.2119],
                tradition: 'nyingma',
                founded: 1701,
                description: 'Oldest monastery in Sikkim, hidden in dense forest',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
                details: {
                    altitude: '2,100m',
                    monks: '12',
                    significance: 'First monastery in Sikkim',
                    festivals: ['Traditional Ceremonies'],
                    visitingHours: '8:00 AM - 5:00 PM',
                    entryFee: 'Free',
                    facilities: ['Trek Required', 'Forest Setting'],
                    nearbyAttractions: ['Yuksom Coronation Site', 'Norbugang Park']
                }
            },
            {
                id: 'lingdum',
                name: 'Lingdum Monastery',
                position: [27.3156, 88.5732],
                tradition: 'kagyu',
                founded: 1999,
                description: 'Modern monastery with traditional architecture',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
                details: {
                    altitude: '1,220m',
                    monks: '150',
                    significance: 'Modern Kagyu Center',
                    festivals: ['Buddha Purnima', 'Losar'],
                    visitingHours: '6:00 AM - 7:00 PM',
                    entryFee: 'Free',
                    facilities: ['Modern Amenities', 'Guest House', 'Library'],
                    nearbyAttractions: ['Ranka Monastery', 'Rumtek Monastery']
                }
            }
        ];

        // Create custom icons for different traditions
        const traditionIcons = {
            nyingma: L.divIcon({
                className: 'monastery-marker nyingma-marker',
                html: '<i class="fas fa-dharmachakra"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15]
            }),
            kagyu: L.divIcon({
                className: 'monastery-marker kagyu-marker',
                html: '<i class="fas fa-om"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15]
            }),
            gelug: L.divIcon({
                className: 'monastery-marker gelug-marker',
                html: '<i class="fas fa-peace"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15]
            })
        };

        // Add CSS for custom markers
        this.addMarkerStyles();

        // Create markers for each monastery
        monasteries.forEach(monastery => {
            const marker = L.marker(monastery.position, {
                icon: traditionIcons[monastery.tradition],
                title: monastery.name
            }).addTo(this.map);

            // Create detailed popup content
            const popupContent = this.createPopupContent(monastery);
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'monastery-popup'
            });

            // Add click event to show detailed info
            marker.on('click', () => {
                this.showMonasteryDetails(monastery);
                this.currentMonastery = monastery;
            });

            // Store marker with monastery data
            marker.monasteryData = monastery;
            this.markers.push(marker);
        });

        console.log(`Added ${monasteries.length} monastery markers to map`);
    }

    addMarkerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .monastery-marker {
                background: rgba(212, 175, 55, 0.9);
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                color: white;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .monastery-marker:hover {
                background: rgba(255, 107, 53, 0.9);
                transform: scale(1.2);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            }

            .nyingma-marker {
                background: rgba(255, 87, 51, 0.9);
            }

            .kagyu-marker {
                background: rgba(212, 175, 55, 0.9);
            }

            .gelug-marker {
                background: rgba(76, 175, 80, 0.9);
            }

            .monastery-popup {
                font-family: 'Poppins', sans-serif;
            }

            .monastery-popup .leaflet-popup-content-wrapper {
                border-radius: 15px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
            }

            .monastery-popup .leaflet-popup-tip {
                background: white;
            }
        `;
        document.head.appendChild(style);
    }

    createPopupContent(monastery) {
        return `
            <div class="monastery-popup-content">
                <img src="${monastery.image}" alt="${monastery.name}" style="
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-bottom: 10px;
                ">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-family: 'Playfair Display', serif;">
                    ${monastery.name}
                </h4>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; line-height: 1.4;">
                    ${monastery.description}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; font-size: 12px;">
                    <div><strong>Founded:</strong> ${monastery.founded}</div>
                    <div><strong>Tradition:</strong> ${monastery.tradition.charAt(0).toUpperCase() + monastery.tradition.slice(1)}</div>
                    <div><strong>Altitude:</strong> ${monastery.details.altitude}</div>
                    <div><strong>Monks:</strong> ${monastery.details.monks}</div>
                </div>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <button onclick="mapSystem.start360Tour('${monastery.id}')" style="
                        background: linear-gradient(135deg, #d4af37, #b8941f);
                        color: white;
                        border: none;
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        flex: 1;
                    ">
                        <i class='fas fa-vr-cardboard'></i> 360° Tour
                    </button>
                    <button onclick="mapSystem.getDirections('${monastery.id}')" style="
                        background: transparent;
                        color: #d4af37;
                        border: 2px solid #d4af37;
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        flex: 1;
                    ">
                        <i class='fas fa-route'></i> Directions
                    </button>
                </div>
            </div>
        `;
    }

    showMonasteryDetails(monastery) {
        const sidebar = document.querySelector('.map-sidebar .selected-monastery');
        if (!sidebar) return;

        sidebar.innerHTML = `
            <div class="monastery-details">
                <img src="${monastery.image}" alt="${monastery.name}" style="
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 15px;
                ">
                
                <h3 style="color: #d4af37; margin-bottom: 10px; font-family: 'Playfair Display', serif;">
                    ${monastery.name}
                </h3>
                
                <p style="color: #666; margin-bottom: 15px; line-height: 1.5;">
                    ${monastery.description}
                </p>
                
                <div class="monastery-info-grid" style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 15px;
                    font-size: 14px;
                ">
                    <div><strong>Founded:</strong> ${monastery.founded}</div>
                    <div><strong>Tradition:</strong> ${monastery.tradition.charAt(0).toUpperCase() + monastery.tradition.slice(1)}</div>
                    <div><strong>Altitude:</strong> ${monastery.details.altitude}</div>
                    <div><strong>Monks:</strong> ${monastery.details.monks}</div>
                    <div><strong>Hours:</strong> ${monastery.details.visitingHours}</div>
                    <div><strong>Entry:</strong> ${monastery.details.entryFee}</div>
                </div>
                
                <div class="monastery-significance" style="margin-bottom: 15px;">
                    <h5 style="margin-bottom: 5px;">Significance</h5>
                    <p style="color: #666; font-size: 14px;">${monastery.details.significance}</p>
                </div>
                
                <div class="monastery-festivals" style="margin-bottom: 15px;">
                    <h5 style="margin-bottom: 5px;">Major Festivals</h5>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${monastery.details.festivals.map(festival => 
                            `<span style="
                                background: rgba(212, 175, 55, 0.1);
                                color: #d4af37;
                                padding: 3px 8px;
                                border-radius: 12px;
                                font-size: 12px;
                            ">${festival}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="monastery-facilities" style="margin-bottom: 15px;">
                    <h5 style="margin-bottom: 5px;">Facilities</h5>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${monastery.details.facilities.map(facility => 
                            `<li style="font-size: 14px; color: #666; margin-bottom: 3px;">
                                <i class="fas fa-check" style="color: #4CAF50; margin-right: 5px;"></i>
                                ${facility}
                            </li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="monastery-nearby" style="margin-bottom: 20px;">
                    <h5 style="margin-bottom: 5px;">Nearby Attractions</h5>
                    <div style="font-size: 14px; color: #666;">
                        ${monastery.details.nearbyAttractions.join(', ')}
                    </div>
                </div>
                
                <div class="monastery-actions" style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="mapSystem.start360Tour('${monastery.id}')" style="
                        background: linear-gradient(135deg, #d4af37, #b8941f);
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fas fa-vr-cardboard'></i> Start 360° Virtual Tour
                    </button>
                    
                    <button onclick="mapSystem.getDirections('${monastery.id}')" style="
                        background: transparent;
                        color: #d4af37;
                        border: 2px solid #d4af37;
                        padding: 10px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fas fa-route'></i> Get Directions
                    </button>
                    
                    <button onclick="mapSystem.bookNearbyStay('${monastery.id}')" style="
                        background: transparent;
                        color: #4CAF50;
                        border: 2px solid #4CAF50;
                        padding: 10px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fas fa-bed'></i> Book Nearby Stay
                    </button>
                </div>
            </div>
        `;
    }

    setupMapControls() {
        // Add custom controls to the map
        const customControls = L.control({ position: 'topright' });
        
        customControls.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'map-custom-controls');
            div.style.cssText = `
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                padding: 8px;
                display: flex;
                flex-direction: column;
                gap: 5px;
            `;
            
            div.innerHTML = `
                <button onclick="mapSystem.fitAllMonasteries()" title="View All Monasteries" style="
                    background: none;
                    border: none;
                    padding: 8px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background 0.3s ease;
                ">
                    <i class="fas fa-expand-arrows-alt"></i>
                </button>
                
                <button onclick="mapSystem.findNearestMonastery()" title="Find Nearest Monastery" style="
                    background: none;
                    border: none;
                    padding: 8px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background 0.3s ease;
                ">
                    <i class="fas fa-crosshairs"></i>
                </button>
                
                <button onclick="mapSystem.toggleTrafficLayer()" title="Toggle Traffic" style="
                    background: none;
                    border: none;
                    padding: 8px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background 0.3s ease;
                ">
                    <i class="fas fa-road"></i>
                </button>
            `;
            
            return div;
        };
        
        customControls.addTo(this.map);
    }

    setupFilterControls() {
        // Setup filter checkboxes functionality
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
        
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const filterType = e.target.value;
                this.filterSettings[filterType] = e.target.checked;
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        this.markers.forEach(marker => {
            const monastery = marker.monasteryData;
            const shouldShow = this.filterSettings.all || this.filterSettings[monastery.tradition];
            
            if (shouldShow) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    fitAllMonasteries() {
        const group = L.featureGroup(this.markers.filter(marker => this.map.hasLayer(marker)));
        if (group.getLayers().length > 0) {
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    findNearestMonastery() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                let nearestMonastery = null;
                let minDistance = Infinity;
                
                this.markers.forEach(marker => {
                    if (!this.map.hasLayer(marker)) return;
                    
                    const lat = marker.getLatLng().lat;
                    const lng = marker.getLatLng().lng;
                    const distance = this.calculateDistance(userLat, userLng, lat, lng);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestMonastery = marker;
                    }
                });
                
                if (nearestMonastery) {
                    this.map.setView(nearestMonastery.getLatLng(), 15);
                    nearestMonastery.openPopup();
                    this.showMonasteryDetails(nearestMonastery.monasteryData);
                }
                
                // Add user location marker
                const userMarker = L.marker([userLat, userLng], {
                    icon: L.divIcon({
                        className: 'user-location-marker',
                        html: '<i class="fas fa-user-circle"></i>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    })
                }).addTo(this.map);
                
                userMarker.bindPopup('Your Location').openPopup();
                
            }, (error) => {
                alert('Unable to get your location. Please enable location services.');
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    start360Tour(monasteryId) {
        // Integration with 360 tour system
        if (window.tourSystem) {
            window.tourSystem.startTour(monasteryId);
        } else {
            alert('360° tour system is loading...');
        }
    }

    getDirections(monasteryId) {
        const monastery = this.markers.find(m => m.monasteryData.id === monasteryId);
        if (!monastery) return;

        const lat = monastery.getLatLng().lat;
        const lng = monastery.getLatLng().lng;
        
        // Create directions modal
        const modal = this.createDirectionsModal(monastery.monasteryData, lat, lng);
        document.body.appendChild(modal);
    }

    createDirectionsModal(monastery, lat, lng) {
        const modal = document.createElement('div');
        modal.className = 'directions-modal';
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
            <div class="directions-content" style="
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 100%;
                padding: 2rem;
                position: relative;
            ">
                <button class="close-directions" style="
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
                    Directions to ${monastery.name}
                </h3>
                
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Address:</strong> ${monastery.name}, ${monastery.details.altitude}</p>
                    <p><strong>Coordinates:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
                </div>
                
                <div class="direction-options" style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}', '_blank')" style="
                        background: #4285f4;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fab fa-google'></i> Open in Google Maps
                    </button>
                    
                    <button onclick="window.open('https://maps.apple.com/?daddr=${lat},${lng}', '_blank')" style="
                        background: #007aff;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fab fa-apple'></i> Open in Apple Maps
                    </button>
                    
                    <button onclick="navigator.clipboard.writeText('${lat}, ${lng}')" style="
                        background: transparent;
                        color: #d4af37;
                        border: 2px solid #d4af37;
                        padding: 12px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        <i class='fas fa-copy'></i> Copy Coordinates
                    </button>
                </div>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <h5>Travel Tips:</h5>
                    <ul style="margin: 10px 0; padding-left: 20px; color: #666;">
                        <li>Best time to visit: ${monastery.details.visitingHours}</li>
                        <li>Entry fee: ${monastery.details.entryFee}</li>
                        <li>Altitude: ${monastery.details.altitude} - Carry warm clothes</li>
                        <li>Respect photography rules and monastery customs</li>
                    </ul>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-directions')) {
                modal.remove();
            }
        });

        return modal;
    }

    bookNearbyStay(monasteryId) {
        // Scroll to booking section and filter by location
        const monastery = this.markers.find(m => m.monasteryData.id === monasteryId);
        if (!monastery) return;

        // Set location filter based on monastery location
        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter && monastery.monasteryData.position) {
            // Determine location based on coordinates
            const lat = monastery.monasteryData.position[0];
            const lng = monastery.monasteryData.position[1];
            
            if (lat > 27.35) {
                locationFilter.value = 'lachen'; // Northern monasteries
            } else if (lng < 88.3) {
                locationFilter.value = 'pelling'; // Western monasteries
            } else {
                locationFilter.value = 'gangtok'; // Central/Eastern monasteries
            }
        }

        // Trigger accommodation search
        if (window.searchAccommodations) {
            window.searchAccommodations();
        }

        // Scroll to booking section
        document.getElementById('book-stay').scrollIntoView({ behavior: 'smooth' });
    }

    toggleTrafficLayer() {
        // This would integrate with traffic data if available
        console.log('Traffic layer toggle (feature for future enhancement)');
    }
}

// Initialize map system
const mapSystem = new MonasteryMap();

// Export for global access
window.mapSystem = mapSystem;

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure map container is properly sized
    setTimeout(() => {
        if (mapSystem.map) {
            mapSystem.map.invalidateSize();
        }
    }, 100);
});