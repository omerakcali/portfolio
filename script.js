/* ==========================================================================
   OMER AKCALI - UNITY GAME DEVELOPER PORTFOLIO
   Interactive Engine & Media Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Web Audio API Sci-Fi Sound FX Engine
    // ==========================================
    class SoundEngine {
        constructor() {
            this.muted = false;
            this.ctx = null;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playHover() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        }

        playClick() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        }

        playLaser() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(900, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.12);

            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        }

        playExplosion() {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        }
    }

    const sfx = new SoundEngine();

    // SFX Mute Toggle
    const sfxBtn = document.getElementById('sfx-toggle');
    const sfxIcon = document.getElementById('sfx-icon');
    const sfxStatus = document.querySelector('.sfx-status');

    sfxBtn.addEventListener('click', () => {
        sfx.muted = !sfx.muted;
        if (sfx.muted) {
            sfxIcon.className = 'fa-solid fa-volume-xmark';
            sfxStatus.textContent = 'SFX OFF';
            sfxBtn.classList.add('muted');
        } else {
            sfxIcon.className = 'fa-solid fa-volume-high';
            sfxStatus.textContent = 'SFX ON';
            sfxBtn.classList.remove('muted');
            sfx.playClick();
        }
    });

    // Attach click SFX to interactive buttons
    document.querySelectorAll('.btn, .nav-link, .filter-btn, .social-icon-btn').forEach(elem => {
        elem.addEventListener('mouseenter', () => sfx.playHover());
        elem.addEventListener('click', () => sfx.playClick());
    });

    // ==========================================
    // 2. Interactive Background Particle Canvas
    // ==========================================
    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeBgCanvas() {
        width = bgCanvas.width = window.innerWidth;
        height = bgCanvas.height = window.innerHeight;
    }
    resizeBgCanvas();
    window.addEventListener('resize', resizeBgCanvas);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse repulsion / interaction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 3;
                    this.y -= (dy / dist) * force * 3;
                }
            }
        }

        draw() {
            bgCtx.beginPath();
            bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            bgCtx.fillStyle = this.color + this.alpha + ')';
            bgCtx.fill();
        }
    }

    // Initialize particle array
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 90);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateBg() {
        bgCtx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby nodes
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    bgCtx.beginPath();
                    bgCtx.moveTo(particles[i].x, particles[i].y);
                    bgCtx.lineTo(particles[j].x, particles[j].y);
                    bgCtx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
                    bgCtx.lineWidth = 0.8;
                    bgCtx.stroke();
                }
            }
        }

        requestAnimationFrame(animateBg);
    }
    animateBg();

    // FPS Counter HUD update
    let frameCount = 0;
    let fpsVal = document.getElementById('hud-fps-val');
    let lastTime = performance.now();
    function updateFPS() {
        let now = performance.now();
        frameCount++;
        if (now - lastTime >= 1000) {
            let currentFps = (frameCount * 1000 / (now - lastTime)).toFixed(1);
            if (fpsVal) fpsVal.textContent = currentFps;
            frameCount = 0;
            lastTime = now;
        }
        requestAnimationFrame(updateFPS);
    }
    updateFPS();

    // ==========================================
    // 3. Project Filtering & Dynamic Modals
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project Details Data Matrix
    const projectDetails = {
        'wavecrashers': {
            title: 'Wavecrashers',
            engine: 'Unity URP',
            genre: '3-Player Co-Op Strategy & Hero Defense (Steam Title)',
            image: 'assets/images/wavecrashers-header.jpg',
            gallery: [
                'assets/images/wavecrashers-ss-1.jpg',
                'assets/images/wavecrashers-ss-2.jpg',
                'assets/images/wavecrashers-ss-3.jpg',
                'assets/images/wavecrashers-ss-4.jpg',
                'assets/images/wavecrashers-ss-5.jpg',
                'assets/images/wavecrashers-ss-6.jpg'
            ],
            role: 'Unity Gameplay & Systems Engineer',
            timeline: 'Active Commercial Release on Steam',
            description: 'Hold the line or everything falls. Wavecrashers is a 3-player co-op strategy game where heroes defend against relentless waves of enemies. Build powerful synergies, push your limits, and survive the chaos with friends or solo with AI bots. Every run is a fight to endure the storm.',
            highlights: [
                'Engineered 3-player co-op hero defense mechanics with real-time synergy & build progression systems.',
                'Implemented Hero Mastery skill trees and Lane Defense dynamic wave spawner algorithms.',
                'Designed solo bot companion AI system allowing single-player squad runs when playing offline.',
                'Built Hard Mode Endgame progression systems, wave scaling curves, and custom URP visual effects.',
                'Optimized batch rendering, UI HUD performance, and physics collisions for high-density enemy wave counts.'
            ],
            techSpecs: {
                'Target Platform': 'Steam PC (Windows)',
                'Steam App ID': '3664090',
                'Core Mechanics': '3-Player Co-Op / Lane Defense / Hero Mastery',
                'Graphics Pipeline': 'Universal Render Pipeline (URP)',
                'Scripting Architecture': 'C# Event-Driven Modular Systems'
            },
            steamUrl: 'https://store.steampowered.com/app/3664090/Wavecrashers/'
        },
        'everything-store': {
            title: 'Everything Store',
            engine: 'Unity URP',
            genre: 'Thrift Shop Management & Customer Bargaining Simulator (Steam Title)',
            image: 'assets/images/everything-store-header.jpg',
            gallery: [
                'assets/images/everything-store-ss-1.jpg',
                'assets/images/everything-store-ss-2.jpg',
                'assets/images/everything-store-ss-3.jpg',
                'assets/images/everything-store-ss-4.jpg',
                'assets/images/everything-store-ss-5.jpg',
                'assets/images/everything-store-ss-6.jpg'
            ],
            role: 'Unity Gameplay & Systems Engineer',
            timeline: 'Active Commercial Release on Steam',
            description: 'Ever wanted to be a thrift shop owner and trade all sorts of unique items, from vintage perfumes to D20 dice? Everything Store lets you manage your own store, buy items from suppliers or source them for free, fit them into your shop layout, and negotiate prices with dynamic NPC customers to grow your thrift empire.',
            highlights: [
                'Engineered shop management systems, item placement grid physics, and shelf organization mechanics.',
                'Designed dynamic customer negotiation algorithm with price elasticity, mood states, and bargaining UI.',
                'Implemented store expansion progression, license unlocks, and inventory item database architecture.',
                'Optimized asset loading, UI layout rendering, and save/load state serialization for smooth gameplay.'
            ],
            techSpecs: {
                'Target Platform': 'Steam PC (Windows)',
                'Steam App ID': '3975960',
                'Core Mechanics': 'Store Management / Customer AI Haggling / Inventory Grid',
                'Graphics Pipeline': 'Universal Render Pipeline (URP)',
                'Scripting Architecture': 'C# ScriptableObject Database & Event Systems'
            },
            steamUrl: 'https://store.steampowered.com/app/3975960/Everything_Store/'
        },
        'fionas-farm': {
            title: "Fiona's Farm",
            engine: 'Unity Mobile',
            genre: 'LiveOps & Adventure Quest Title (iOS & Android)',
            image: 'assets/images/fionas-farm-cover.jpg',
            gallery: [
                'assets/images/fionas-farm-ss-1.jpg',
                'assets/images/fionas-farm-ss-2.jpg',
                'assets/images/fionas-farm-ss-3.jpg',
                'assets/images/fionas-farm-ss-4.jpg',
                'assets/images/fionas-farm-ss-5.jpg'
            ],
            role: 'Unity Mobile Gameplay & LiveOps Engineer',
            timeline: 'Active Published Title on App Store & Google Play',
            description: "Fiona's Farm is a feature-rich mobile adventure quest title. Features dynamic LiveOps events, time-limited seasonal challenges, farm renovation, and expanding adventure story chapters across millions of active mobile devices.",
            highlights: [
                'Engineered dynamic LiveOps event architecture, time-limited seasonal event schedules, and quest progression frameworks.',
                'Designed timed event challenge systems, limited-time leaderboards, and adventure quest story triggers.',
                'Optimized asset memory footprint, texture atlasing, and mobile draw calls for smooth 60 FPS performance on mid/low-end devices.',
                'Integrated mobile analytics, live remote config pipelines, and event-driven UI systems.'
            ],
            techSpecs: {
                'Target Platforms': 'iOS App Store & Google Play Store',
                'Category': 'Casual Mobile / Adventure Quests',
                'Package ID': 'games.ace.fionasfarm',
                'LiveOps Architecture': 'Timed Events / LiveOps Schedules / Adventure Quests',
                'Performance Target': '60 FPS Mobile Asset Optimization'
            },
            gplayUrl: 'https://play.google.com/store/apps/details?id=games.ace.fionasfarm&hl=tr',
            appstoreUrl: 'https://apps.apple.com/tr/app/fionas-farm/id1585193132'
        },
        'block-puzzle-jam': {
            title: 'Block Puzzle Jam',
            engine: 'Unity Mobile',
            genre: 'Hybrid Casual Block Grid Matching Puzzle (Android)',
            image: 'assets/images/block-puzzle-jam-cover.jpg',
            gallery: [
                'assets/images/block-puzzle-jam-cover.jpg',
                'assets/images/block-puzzle-jam-ss-2.jpg',
                'assets/images/block-puzzle-jam-ss-3.jpg',
                'assets/images/block-puzzle-jam-ss-4.jpg',
                'assets/images/block-puzzle-jam-ss-5.jpg'
            ],
            role: 'Unity Hybrid Casual Developer',
            timeline: 'Active Published Hybrid Casual Title',
            description: 'Addictive block grid matching & spatial puzzle game engineered with combo scoring algorithms, responsive drag-and-drop touch input, and mobile performance tuning.',
            highlights: [
                'Implemented 2D block grid matching logic, row/column line clear detection, and combo multipliers.',
                'Designed responsive drag-and-drop touch physics and particle explosion VFX triggers.',
                'Optimized memory allocation to ensure zero garbage collection spikes during high-speed combo gameplay.'
            ],
            techSpecs: {
                'Target Platform': 'Google Play Store (Android)',
                'Sub-Category': 'Hybrid Casual / Block Puzzle',
                'Package ID': 'com.playbliss.blockpuzzlejamgame',
                'Performance': '60 FPS Mobile Optimization'
            },
            gplayUrl: 'https://play.google.com/store/apps/details?id=com.playbliss.blockpuzzlejamgame'
        },
        'find-the-dog': {
            title: 'Find Puppy: Spot Hidden Object',
            engine: 'Unity Mobile',
            genre: 'Hybrid Casual Search & Find Hidden Object Game (Android)',
            image: 'assets/images/find-the-dog-cover.jpg',
            gallery: [
                'assets/images/find-the-dog-cover.jpg',
                'assets/images/find-the-dog-ss-2.jpg',
                'assets/images/find-the-dog-ss-3.jpg',
                'assets/images/find-the-dog-ss-4.jpg',
                'assets/images/find-the-dog-ss-5.jpg'
            ],
            role: 'Unity Hybrid Casual Developer',
            timeline: 'Active Published Hybrid Casual Title',
            description: 'Engaging hidden object & visual search adventure featuring zoomable vector scene rendering, hint trigger systems, and level progression frameworks.',
            highlights: [
                'Engineered multi-touch pan & pinch zoom camera controller for high-resolution scene exploration.',
                'Designed hidden item placement system with hint particle guidance and level completion triggers.',
                'Optimized asset bundle streaming and UI resolution scaling across various Android screen sizes.'
            ],
            techSpecs: {
                'Target Platform': 'Google Play Store (Android)',
                'Sub-Category': 'Hybrid Casual / Hidden Object',
                'Package ID': 'com.playbliss.findthedog',
                'Performance': '60 FPS Mobile Optimization'
            },
            gplayUrl: 'https://play.google.com/store/apps/details?id=com.playbliss.findthedog'
        },
        'goods-sorting': {
            title: 'Sort Puzzle: Goods Match',
            engine: 'Unity Mobile',
            genre: 'Hybrid Casual 3D Shelf Goods Sorting Simulator (Android)',
            image: 'assets/images/goods-sorting-cover.jpg',
            gallery: [
                'assets/images/goods-sorting-cover.jpg',
                'assets/images/goods-sorting-ss-2.jpg',
                'assets/images/goods-sorting-ss-3.jpg',
                'assets/images/goods-sorting-ss-4.jpg',
                'assets/images/goods-sorting-ss-5.jpg'
            ],
            role: 'Unity Hybrid Casual Developer',
            timeline: 'Active Published Hybrid Casual Title',
            description: '3D shelf sorting & goods matching simulator featuring 3D item physics, shelf placement logic, combo cascades, and smooth 60 FPS mobile rendering.',
            highlights: [
                'Built 3D shelf spatial grid logic, triple-matching detection algorithms, and item snap physics.',
                'Created 3D item asset pipeline with lightweight URP materials and batching optimization.',
                'Integrated level progression manager, timer challenge mechanics, and rewarding clear animations.'
            ],
            techSpecs: {
                'Target Platform': 'Google Play Store (Android)',
                'Sub-Category': 'Hybrid Casual / 3D Sorting',
                'Package ID': 'com.playbliss.goodsortinggame',
                'Performance': '60 FPS Mobile Optimization'
            },
            gplayUrl: 'https://play.google.com/store/apps/details?id=com.playbliss.goodsortinggame'
        },
        'traffic-jam-escape': {
            title: 'Unblock Cars: Traffic Control',
            engine: 'Unity Mobile',
            genre: 'Hybrid Casual Strategic Car Escape Puzzle (Android)',
            image: 'assets/images/traffic-jam-escape-cover.jpg',
            gallery: [
                'assets/images/traffic-jam-escape-cover.jpg',
                'assets/images/traffic-jam-escape-ss-2.jpg',
                'assets/images/traffic-jam-escape-ss-3.jpg',
                'assets/images/traffic-jam-escape-ss-4.jpg',
                'assets/images/traffic-jam-escape-ss-5.jpg'
            ],
            role: 'Unity Hybrid Casual Developer',
            timeline: 'Active Published Hybrid Casual Title',
            description: 'Strategic car escape & traffic clearing puzzle game built with custom Raycast car movement, level generator pipelines, and dynamic obstacle pathfinding.',
            highlights: [
                'Engineered Raycast-based vehicle movement physics and lane intersection collision logic.',
                'Designed level generation pipeline supporting hundreds of unblock puzzle configurations.',
                'Optimized draw-call batching and mobile memory footprint for instant level transitions.'
            ],
            techSpecs: {
                'Target Platform': 'Google Play Store (Android)',
                'Sub-Category': 'Hybrid Casual / Car Escape',
                'Package ID': 'com.playbliss.traffic.jam.car.escape.out',
                'Performance': '60 FPS Mobile Optimization'
            },
            gplayUrl: 'https://play.google.com/store/apps/details?id=com.playbliss.traffic.jam.car.escape.out'
        }
    };

    // Animated Screenshot Preview Cycling (GIF-like auto preview)
    const animatedCards = document.querySelectorAll('.animated-game-preview');
    animatedCards.forEach(card => {
        const previewAttr = card.getAttribute('data-preview');
        if (!previewAttr) return;

        const images = previewAttr.split(',');
        const targetImg = card.querySelector('.preview-img-target');
        let idx = 0;

        setInterval(() => {
            idx = (idx + 1) % images.length;
            if (targetImg) {
                targetImg.style.opacity = '0.6';
                setTimeout(() => {
                    targetImg.src = images[idx];
                    targetImg.style.opacity = '1';
                }, 150);
            }
        }, 2400);
    });

    // Modal Elements
    const projectModal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content-area');
    const modalCloseBtn = document.getElementById('modal-close');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projKey = btn.getAttribute('data-project');
            const data = projectDetails[projKey];
            if (!data) return;

            modalContent.innerHTML = `
                <img src="${data.image}" alt="${data.title}" class="modal-project-img">
                <div class="modal-project-header">
                    <div>
                        <span class="engine-tag"><i class="fa-solid fa-cube"></i> ${data.engine}</span>
                        <h2 style="font-size: 1.8rem; margin-top: 0.4rem;">${data.title}</h2>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">${data.genre} | ${data.role}</p>
                    </div>
                </div>

                <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">${data.description}</p>

                ${data.gallery ? `
                    <h3 style="font-size: 1.2rem; margin-bottom: 0.8rem; color: var(--cyan);"><i class="fa-solid fa-images"></i> Official Steam Gameplay Gallery</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem; margin-bottom: 1.5rem;">
                        ${data.gallery.map(img => `
                            <a href="${img}" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color);" title="Click to view full resolution">
                                <img src="${img}" style="width: 100%; height: 130px; object-fit: cover; display: block; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                            </a>
                        `).join('')}
                    </div>
                ` : ''}

                <h3 style="font-size: 1.2rem; margin-bottom: 0.8rem; color: var(--cyan);">Key Technical Accomplishments</h3>
                <ul class="modal-bullet-list">
                    ${data.highlights.map(item => `<li><i class="fa-solid fa-check" style="color: var(--cyan); margin-right: 0.5rem;"></i> ${item}</li>`).join('')}
                </ul>

                <h3 style="font-size: 1.2rem; margin-bottom: 0.8rem; color: var(--purple);">Engine & Architecture Specs</h3>
                <div class="modal-tech-specs">
                    ${Object.entries(data.techSpecs).map(([key, val]) => `
                        <div class="spec-item">
                            <span class="label">${key}</span>
                            <span class="val">${val}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                    ${data.steamUrl ? `
                        <a href="${data.steamUrl}" target="_blank" class="btn btn-gradient-cyan">
                            <i class="fa-brands fa-steam"></i> View on Steam Store
                        </a>
                    ` : ''}
                    ${data.gplayUrl ? `
                        <a href="${data.gplayUrl}" target="_blank" class="btn btn-gradient-cyan">
                            <i class="fa-brands fa-google-play"></i> View on Google Play
                        </a>
                    ` : ''}
                    ${data.appstoreUrl ? `
                        <a href="${data.appstoreUrl}" target="_blank" class="btn btn-outline-purple">
                            <i class="fa-brands fa-app-store"></i> View on App Store
                        </a>
                    ` : ''}
                    ${data.github ? `<a href="${data.github}" target="_blank" class="btn btn-gradient-cyan"><i class="fa-brands fa-github"></i> View GitHub Repository</a>` : ''}
                </div>
            `;

            projectModal.classList.add('active');
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });
    }

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });

    // CV Download Modal
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const cvModal = document.getElementById('cv-modal');
    const cvModalClose = document.getElementById('cv-modal-close');
    const cvCloseAction = document.getElementById('cv-close-action');

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            cvModal.classList.add('active');
        });
    }
    if (cvModalClose) cvModalClose.addEventListener('click', () => cvModal.classList.remove('active'));
    if (cvCloseAction) cvCloseAction.addEventListener('click', () => cvModal.classList.remove('active'));

    // ==========================================
    // 5. Toast Notifications & Email Copying
    // ==========================================
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-msg');

    function showToast(message) {
        if (!toast) return;
        toastMsg.textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'omerakcali99@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email address copied to clipboard!');
            }).catch(() => {
                showToast('Email: omerakcali99@gmail.com');
            });
        });
    }

    // Contact Form Handler (Real Email Transmission via FormSubmit & Mailto Fallback)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;

            // Transmitting state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const type = document.getElementById('form-type').value;
            const message = document.getElementById('form-msg').value;

            const targetEmail = 'omerakcali99@gmail.com';

            // Send via FormSubmit AJAX Service
            fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    inquiry_type: type,
                    message: message,
                    _subject: `🎮 Portfolio Inquiry from ${name}`
                })
            })
            .then(res => res.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                sfx.playClick();
                showToast('Transmission Received! Email sent directly to developer.');
                contactForm.reset();
            })
            .catch(err => {
                // Fallback: Open mailto link if offline or service blocked
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent('Portfolio Inquiry: ' + type + ' - ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                window.location.href = mailtoLink;
                showToast('Opening default email client for transmission...');
                contactForm.reset();
            });
        });
    }

    // ==========================================
    // 6. Number Counter Animation on Scroll
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    function checkCounters() {
        if (counted) return;
        const statsSection = document.querySelector('.stats-bar-section');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                updateCount();
            });
            counted = true;
        }
    }
    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // ==========================================
    // 7. Navbar Sticky & ScrollSpy
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
