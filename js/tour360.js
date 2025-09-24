// 360° Virtual Tour Functionality for Sikkim Monasteries
// Enhanced 360 tour system with navigation and hotspots

class VirtualTourSystem {
    constructor() {
        this.currentTour = null;
        this.tourData = {};
        this.hotspots = [];
        this.isVRMode = false;
        this.init();
    }

    init() {
        this.loadTourData();
        this.setupTourControls();
        this.initializeAFrame();
    }

    loadTourData() {
        // Define 360 tour data for each monastery
        this.tourData = {
            rumtek: {
                name: 'Rumtek Monastery',
                scenes: [
                    {
                        id: 'main_hall',
                        title: 'Main Prayer Hall',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg',
                        description: 'The magnificent main prayer hall with golden Buddha statues',
                        hotspots: [
                            { position: '0 2 -5', target: 'courtyard', title: 'View Courtyard' },
                            { position: '3 1 -4', type: 'info', title: 'Golden Buddha', description: 'This 16th-century golden Buddha statue...' }
                        ]
                    },
                    {
                        id: 'courtyard',
                        title: 'Monastery Courtyard',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg',
                        description: 'The central courtyard where monks gather for ceremonies',
                        hotspots: [
                            { position: '0 2 5', target: 'main_hall', title: 'Back to Main Hall' },
                            { position: '-4 1 -2', type: 'info', title: 'Prayer Flags', description: 'Colorful prayer flags carry mantras...' }
                        ]
                    }
                ],
                audio: 'assets/audio/monastery-chants.mp3',
                guide: 'Welcome to Rumtek Monastery, the seat of the Karmapa...'
            },
            pemayangtse: {
                name: 'Pemayangtse Monastery',
                scenes: [
                    {
                        id: 'entrance',
                        title: 'Monastery Entrance',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/meadow.jpg',
                        description: 'The entrance gate with traditional architecture',
                        hotspots: [
                            { position: '0 1 -5', target: 'prayer_hall', title: 'Enter Prayer Hall' },
                            { position: '4 2 -3', type: 'info', title: 'Architecture', description: 'Built in 1705 with traditional Sikkimese style...' }
                        ]
                    },
                    {
                        id: 'prayer_hall',
                        title: 'Prayer Hall',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/puydesancy.jpg',
                        description: 'The sacred prayer hall with ancient murals',
                        hotspots: [
                            { position: '0 2 5', target: 'entrance', title: 'Back to Entrance' },
                            { position: '-3 1 -4', type: 'info', title: 'Ancient Murals', description: 'These 300-year-old murals depict...' }
                        ]
                    }
                ],
                audio: 'assets/audio/tibetan-bells.mp3',
                guide: 'Pemayangtse, meaning "Perfect Sublime Lotus", is one of Sikkim\'s oldest monasteries...'
            },
            tashiding: {
                name: 'Tashiding Monastery',
                scenes: [
                    {
                        id: 'hilltop_view',
                        title: 'Hilltop Monastery',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/lake.jpg',
                        description: 'Panoramic view from the sacred hilltop location',
                        hotspots: [
                            { position: '0 1 -5', target: 'sacred_hall', title: 'Enter Sacred Hall' },
                            { position: '5 2 -2', type: 'info', title: 'Sacred Location', description: 'This hill is considered the most sacred spot in Sikkim...' }
                        ]
                    },
                    {
                        id: 'sacred_hall',
                        title: 'Sacred Hall',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg',
                        description: 'The hall where the sacred Bumchu ceremony takes place',
                        hotspots: [
                            { position: '0 2 5', target: 'hilltop_view', title: 'Back to Hilltop View' },
                            { position: '-2 1 -5', type: 'info', title: 'Bumchu Pot', description: 'The sacred water vessel used for annual predictions...' }
                        ]
                    }
                ],
                audio: 'assets/audio/mountain-winds.mp3',
                guide: 'Tashiding Monastery sits on a sacred hill between the Ratong and Rangeet rivers...'
            },
            enchey: {
                name: 'Enchey Monastery',
                scenes: [
                    {
                        id: 'main_temple',
                        title: 'Main Temple',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/forest.jpg',
                        description: 'The colorful main temple dedicated to Guru Padmasambhava',
                        hotspots: [
                            { position: '0 1 -5', target: 'meditation_hall', title: 'Meditation Hall' },
                            { position: '3 2 -4', type: 'info', title: 'Guru Padmasambhava', description: 'The temple is dedicated to the founder of Tibetan Buddhism...' }
                        ]
                    },
                    {
                        id: 'meditation_hall',
                        title: 'Meditation Hall',
                        panorama: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sahara.jpg',
                        description: 'Peaceful meditation space for spiritual practice',
                        hotspots: [
                            { position: '0 2 5', target: 'main_temple', title: 'Back to Main Temple' },
                            { position: '-4 1 -3', type: 'info', title: 'Meditation Practice', description: 'Monks practice daily meditation here...' }
                        ]
                    }
                ],
                audio: 'assets/audio/meditation-sounds.mp3',
                guide: 'Enchey Monastery, meaning "Solitary Temple", was built on a site blessed by tantric masters...'
            }
        };
    }

    setupTourControls() {
        // Enhanced tour controls
        const tourModal = document.getElementById('tourModal');
        if (!tourModal) return;

        // Add enhanced controls
        const controlsContainer = tourModal.querySelector('.tour-controls');
        if (controlsContainer) {
            controlsContainer.innerHTML = `
                <button class="tour-control-btn" onclick="tourSystem.resetView()">
                    <i class="fas fa-expand"></i> Reset View
                </button>
                <button class="tour-control-btn" onclick="tourSystem.toggleVR()">
                    <i class="fas fa-vr-cardboard"></i> VR Mode
                </button>
                <button class="tour-control-btn" onclick="tourSystem.toggleAudio()">
                    <i class="fas fa-volume-up"></i> Audio Guide
                </button>
                <button class="tour-control-btn" onclick="tourSystem.toggleFullscreen()">
                    <i class="fas fa-expand-arrows-alt"></i> Fullscreen
                </button>
                <div class="tour-navigation" id="tourNavigation" style="display: none;">
                    <button class="nav-btn" onclick="tourSystem.previousScene()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <span class="scene-info" id="sceneInfo">Scene 1 of 2</span>
                    <button class="nav-btn" onclick="tourSystem.nextScene()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;
        }

        // Add tour information panel
        this.createTourInfoPanel();
    }

    createTourInfoPanel() {
        const tourModal = document.getElementById('tourModal');
        if (!tourModal) return;

        const infoPanel = document.createElement('div');
        infoPanel.className = 'tour-info-panel';
        infoPanel.id = 'tourInfoPanel';
        infoPanel.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 300px;
            backdrop-filter: blur(10px);
            transform: translateX(-320px);
            transition: transform 0.3s ease;
            z-index: 10002;
        `;

        infoPanel.innerHTML = `
            <button class="toggle-info" onclick="tourSystem.toggleInfoPanel()" style="
                position: absolute;
                right: -40px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 0 5px 5px 0;
                cursor: pointer;
            ">
                <i class="fas fa-info"></i>
            </button>
            <div class="tour-info-content" id="tourInfoContent">
                <h4 id="tourTitle">Tour Information</h4>
                <p id="tourDescription">Click on a monastery to start the tour</p>
                <div id="tourGuide" style="margin-top: 15px; display: none;">
                    <h5>Audio Guide</h5>
                    <p id="guideText"></p>
                    <audio id="tourAudio" controls style="width: 100%; margin-top: 10px;"></audio>
                </div>
                <div id="hotspotInfo" style="margin-top: 15px; display: none;">
                    <h5>Point of Interest</h5>
                    <p id="hotspotDescription"></p>
                </div>
            </div>
        `;

        tourModal.appendChild(infoPanel);
    }

    initializeAFrame() {
        // Wait for A-Frame to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Register custom A-Frame components for hotspots
            AFRAME.registerComponent('hotspot', {
                schema: {
                    title: { type: 'string' },
                    target: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string', default: 'navigation' }
                },

                init: function() {
                    const el = this.el;
                    const data = this.data;

                    // Create hotspot visual element
                    el.setAttribute('geometry', 'primitive: sphere; radius: 0.1');
                    el.setAttribute('material', 'color: #d4af37; opacity: 0.8; transparent: true');
                    el.setAttribute('animation', 'property: scale; to: 1.2 1.2 1.2; loop: true; dir: alternate; dur: 1000');

                    // Add hover effects
                    el.addEventListener('mouseenter', () => {
                        el.setAttribute('material', 'color: #ff6b35; opacity: 1');
                        el.setAttribute('scale', '1.5 1.5 1.5');
                        this.showTooltip();
                    });

                    el.addEventListener('mouseleave', () => {
                        el.setAttribute('material', 'color: #d4af37; opacity: 0.8');
                        el.setAttribute('scale', '1 1 1');
                        this.hideTooltip();
                    });

                    // Add click functionality
                    el.addEventListener('click', () => {
                        if (data.type === 'navigation' && data.target) {
                            tourSystem.navigateToScene(data.target);
                        } else if (data.type === 'info') {
                            tourSystem.showHotspotInfo(data.title, data.description);
                        }
                    });
                },

                showTooltip: function() {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'hotspot-tooltip';
                    tooltip.textContent = this.data.title;
                    tooltip.style.cssText = `
                        position: fixed;
                        background: rgba(0, 0, 0, 0.9);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 5px;
                        font-size: 14px;
                        pointer-events: none;
                        z-index: 10003;
                        transform: translate(-50%, -100%);
                        margin-top: -10px;
                    `;
                    document.body.appendChild(tooltip);

                    // Position tooltip relative to cursor
                    document.addEventListener('mousemove', this.updateTooltipPosition);
                },

                hideTooltip: function() {
                    const tooltip = document.querySelector('.hotspot-tooltip');
                    if (tooltip) tooltip.remove();
                    document.removeEventListener('mousemove', this.updateTooltipPosition);
                },

                updateTooltipPosition: function(e) {
                    const tooltip = document.querySelector('.hotspot-tooltip');
                    if (tooltip) {
                        tooltip.style.left = e.clientX + 'px';
                        tooltip.style.top = e.clientY + 'px';
                    }
                }
            });
        });
    }

    startTour(monasteryId) {
        const tour = this.tourData[monasteryId];
        if (!tour) {
            console.error('Tour not found:', monasteryId);
            return;
        }

        this.currentTour = {
            ...tour,
            id: monasteryId,
            currentSceneIndex: 0
        };

        // Show tour modal
        const modal = document.getElementById('tourModal');
        modal.style.display = 'block';

        // Load first scene
        this.loadScene(tour.scenes[0]);

        // Update tour info
        this.updateTourInfo();

        // Show navigation if multiple scenes
        if (tour.scenes.length > 1) {
            document.getElementById('tourNavigation').style.display = 'flex';
            this.updateSceneInfo();
        }

        console.log(`Started 360° tour of ${tour.name}`);
    }

    loadScene(scene) {
        const panorama = document.getElementById('panorama');
        const aScene = document.querySelector('a-scene');

        if (!panorama || !aScene) return;

        // Update panorama
        panorama.setAttribute('src', scene.panorama);

        // Clear existing hotspots
        this.clearHotspots();

        // Add new hotspots
        setTimeout(() => {
            this.addHotspots(scene.hotspots);
        }, 500);

        // Update scene info
        document.getElementById('tourTitle').textContent = scene.title;
        document.getElementById('tourDescription').textContent = scene.description;
    }

    addHotspots(hotspots) {
        const aScene = document.querySelector('a-scene');
        if (!aScene) return;

        hotspots.forEach((hotspot, index) => {
            const hotspotEl = document.createElement('a-entity');
            hotspotEl.setAttribute('id', `hotspot-${index}`);
            hotspotEl.setAttribute('position', hotspot.position);
            hotspotEl.setAttribute('hotspot', {
                title: hotspot.title,
                target: hotspot.target || '',
                description: hotspot.description || '',
                type: hotspot.type || 'navigation'
            });

            // Add visual indicator
            hotspotEl.setAttribute('cursor', 'rayOrigin: mouse');
            
            aScene.appendChild(hotspotEl);
        });

        this.hotspots = hotspots;
    }

    clearHotspots() {
        const aScene = document.querySelector('a-scene');
        if (!aScene) return;

        // Remove all hotspot entities
        const existingHotspots = aScene.querySelectorAll('[hotspot]');
        existingHotspots.forEach(hotspot => hotspot.remove());
    }

    navigateToScene(sceneId) {
        if (!this.currentTour) return;

        const scene = this.currentTour.scenes.find(s => s.id === sceneId);
        if (!scene) return;

        // Update current scene index
        this.currentTour.currentSceneIndex = this.currentTour.scenes.findIndex(s => s.id === sceneId);

        // Load the scene
        this.loadScene(scene);
        this.updateSceneInfo();
    }

    nextScene() {
        if (!this.currentTour || this.currentTour.currentSceneIndex >= this.currentTour.scenes.length - 1) return;

        this.currentTour.currentSceneIndex++;
        this.loadScene(this.currentTour.scenes[this.currentTour.currentSceneIndex]);
        this.updateSceneInfo();
    }

    previousScene() {
        if (!this.currentTour || this.currentTour.currentSceneIndex <= 0) return;

        this.currentTour.currentSceneIndex--;
        this.loadScene(this.currentTour.scenes[this.currentTour.currentSceneIndex]);
        this.updateSceneInfo();
    }

    updateSceneInfo() {
        const sceneInfo = document.getElementById('sceneInfo');
        if (sceneInfo && this.currentTour) {
            sceneInfo.textContent = `Scene ${this.currentTour.currentSceneIndex + 1} of ${this.currentTour.scenes.length}`;
        }
    }

    updateTourInfo() {
        if (!this.currentTour) return;

        document.getElementById('tourTitle').textContent = this.currentTour.name;
        document.getElementById('tourDescription').textContent = this.currentTour.guide;

        // Setup audio guide if available
        if (this.currentTour.audio) {
            const audioGuide = document.getElementById('tourGuide');
            const audioElement = document.getElementById('tourAudio');
            const guideText = document.getElementById('guideText');

            audioGuide.style.display = 'block';
            guideText.textContent = this.currentTour.guide;
            audioElement.src = this.currentTour.audio;
        }
    }

    showHotspotInfo(title, description) {
        const hotspotInfo = document.getElementById('hotspotInfo');
        const hotspotDescription = document.getElementById('hotspotDescription');

        hotspotInfo.style.display = 'block';
        hotspotDescription.innerHTML = `<strong>${title}</strong><br>${description}`;

        // Show info panel if hidden
        const infoPanel = document.getElementById('tourInfoPanel');
        infoPanel.style.transform = 'translateX(0)';
    }

    toggleInfoPanel() {
        const infoPanel = document.getElementById('tourInfoPanel');
        const currentTransform = infoPanel.style.transform;
        
        if (currentTransform === 'translateX(0px)' || !currentTransform) {
            infoPanel.style.transform = 'translateX(-320px)';
        } else {
            infoPanel.style.transform = 'translateX(0)';
        }
    }

    resetView() {
        const camera = document.getElementById('camera');
        if (camera) {
            camera.setAttribute('rotation', '0 0 0');
            camera.setAttribute('position', '0 0 0');
        }
    }

    toggleVR() {
        const aScene = document.querySelector('a-scene');
        if (aScene) {
            if (this.isVRMode) {
                aScene.exitVR();
                this.isVRMode = false;
            } else {
                aScene.enterVR();
                this.isVRMode = true;
            }
        }
    }

    toggleAudio() {
        const audioElement = document.getElementById('tourAudio');
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        }
    }

    toggleFullscreen() {
        const tourModal = document.getElementById('tourModal');
        if (!document.fullscreenElement) {
            tourModal.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    closeTour() {
        const modal = document.getElementById('tourModal');
        modal.style.display = 'none';
        
        // Stop audio if playing
        const audioElement = document.getElementById('tourAudio');
        if (audioElement) {
            audioElement.pause();
        }

        // Clear current tour
        this.currentTour = null;

        // Hide navigation
        const tourNavigation = document.getElementById('tourNavigation');
        if (tourNavigation) {
            tourNavigation.style.display = 'none';
        }

        // Reset info panel
        const infoPanel = document.getElementById('tourInfoPanel');
        if (infoPanel) {
            infoPanel.style.transform = 'translateX(-320px)';
        }

        console.log('Tour closed');
    }
}

// Initialize the tour system
const tourSystem = new VirtualTourSystem();

// Enhanced global functions for tour system
function start360Tour(monasteryId) {
    tourSystem.startTour(monasteryId);
}

function closeTour() {
    tourSystem.closeTour();
}

function resetView() {
    tourSystem.resetView();
}

function toggleFullscreen() {
    tourSystem.toggleFullscreen();
}

// Export for global access
window.tourSystem = tourSystem;
window.start360Tour = start360Tour;
window.closeTour = closeTour;
window.resetView = resetView;
window.toggleFullscreen = toggleFullscreen;