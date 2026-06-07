const LOADSCREEN_CONFIG = {
    
    news: [
        {
            title: "New Heist & Underground Economy",
            text: "The black market has expanded! Dive into the all-new underground jewelry heist, bypass advanced security systems with upgraded hacking minigames, and fence your loot to the new shady dealers across South Los Santos. Watch your back, the police response times just got faster.",
            image: "assets/images/loading4.webp", 
            date: "06.06.2026",
            author: "Kubciis Development"
        },
        {
            title: "Title",
            text: "Text...",
            image: "assets/server.png",
            date: "Date",
            author: "Author "
        }
    ],

    team: [
        { discord: "Member 1", role: "Owner", memberClass: "role-owner", img: "assets/server.png" },
        { discord: "Member 2", role: "Management", memberClass: "role-management", img: "assets/server.png" },
        { discord: "Member 3", role: "Developer", memberClass: "role-management", img: "assets/server.png" },
        { discord: "Member 4", role: "Support", memberClass: "role-support", img: "assets/server.png" }
    ],

    about: {
        title: "Welcome to Kubciis Development",
        paragraph1: "We are an innovative and constantly evolving roleplay project focused on delivering the ultimate gameplay experience. Our goal is to bring players unique mechanics, a stable player-driven economy, and advanced custom scripts that you won't find on any other server.",
        paragraph2: "Our development team works non-stop on server optimizations, custom assets, and regular content updates to ensure smooth performance and endless entertainment. Create your character, shape your own story, and become a part of our growing community today!",
        
        links: [
            {
                type: "discord",
                title: "Discord Server",
                description: "Join our active community, watch exclusive sneak-peeks, read server announcements, and talk with the staff.",
                url: "https://discord.gg/your-invite",
                icon: "fa-brands fa-discord"
            },
            {
                type: "store",
                title: "Tebex Store",
                description: "Support our project and unlock premium perks, custom import cars, exclusive houses, and unique character cosmetic options.",
                url: "https://store.your-tebex.com",
                icon: "fa-solid fa-gem"
            },
            {
                type: "web",
                title: "Website Portal",
                description: "Check live server statistics, official community guidelines, whitelist application forms, and detailed player guides.",
                url: "http://www.your-domain.com",
                icon: "fa-solid fa-globe"
            },
            {
                type: "web",
                title: "Your Link",
                description: "Your description here.",
                url: "https://www.your-domain.com",
                icon: "fa-solid fa-globe"
            }
        
        ]
    }
};

const playlist = [
    {
        Name: "Ice",
        Artist: "Smack One, P Money",
        Audio: "assets/music/music1.mp3",
        Logo: "assets/song-logo1.png"
    },
    {
        Name: "Template",
        Artist: "Template",
        Audio: "assets/music/music-template.mp3",
        Logo: "assets/song-logo-template.png"
    }
];

const totalImages = 8; 



// dont touch this if you dont know what it does
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.postMessage({ type: 'loadscreenReady' }, '*');
    }, 250);
});

const imagesArray = [...Array(totalImages).keys()].map(i => i + 1).sort(() => .5 - Math.random());
let currentBgIndex = 0, isBgAActive = true;

const bgA = document.getElementById('bgA');
const bgB = document.getElementById('bgB');

function getImagePath(indexNumber) {
    return `assets/images/loading${indexNumber}.webp`;
}

if (bgA) {
    bgA.style.backgroundImage = `url('${getImagePath(imagesArray[0])}')`;
    bgA.style.opacity = 1;
}

setInterval(() => {
    currentBgIndex = (currentBgIndex + 1) % imagesArray.length;
    const currentBg = isBgAActive ? bgA : bgB, nextBg = isBgAActive ? bgB : bgA;
    
    if (nextBg) {
        nextBg.style.backgroundImage = `url('${getImagePath(imagesArray[currentBgIndex])}')`;
        nextBg.style.opacity = 1;
    }
    if (currentBg) {
        currentBg.style.opacity = 0;
    }
    isBgAActive = !isBgAActive;
}, 5200);

let currentSongIndex = 0;

const music = document.getElementById("music");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const songTitleEl = document.getElementById("song-title");
const songArtistEl = document.getElementById("song-artist");
const songLogoEl = document.getElementById("song-logo");

const volumeSlider = document.getElementById('vol');
const volumeText = document.getElementById('volume-text');
const progressLine = document.getElementById('progress-line');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity || seconds < 0) return "0:00";
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function loadTrack(index) {
    if (!playlist[index] || !music) return;
    
    const song = playlist[index];
    music.src = song.Audio;
    
    if (songTitleEl) songTitleEl.innerText = song.Name;
    if (songArtistEl) songArtistEl.innerText = song.Artist;
    
    if (songLogoEl) {
        const imgTag = songLogoEl.querySelector("img");
        if (imgTag) imgTag.src = song.Logo;
    }
    
    if (progressLine) progressLine.style.width = '0%';
    if (currentTimeEl) currentTimeEl.innerText = "0:00";
}

function togglePlay() {
    if (!music) return;
    if (music.paused) {
        music.play();
        if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        music.pause();
        if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

if (playBtn && music) {
    playBtn.addEventListener("click", () => { togglePlay(); });
}

function nextTrack() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadTrack(currentSongIndex);
    music.play();
    if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

if (nextBtn) { nextBtn.addEventListener("click", nextTrack); }

function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentSongIndex);
    music.play();
    if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

if (prevBtn) { prevBtn.addEventListener("click", prevTrack); }

if (music) {
    music.removeAttribute('loop');
    music.addEventListener('ended', nextTrack);
}

function updateVolumeStyle() {
    if (!volumeSlider) return;
    const value = volumeSlider.value;
    volumeSlider.style.background = `linear-gradient(to right, #1a5cb8 ${value}%, rgba(255, 255, 255, 0.15) ${value}%)`;
    if (volumeText) volumeText.innerText = value + '%';
    if (music) music.volume = value / 100;
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', updateVolumeStyle);
    updateVolumeStyle();
}

if (progressBar && music) {
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        if (!music.duration || isNaN(music.duration) || music.duration === Infinity) return; 
        music.currentTime = (clickX / width) * music.duration;
    });
}

if (music) {
    music.addEventListener('timeupdate', () => {
        if (!music.duration || isNaN(music.duration) || music.duration === Infinity || music.duration === 0) {
            if (currentTimeEl) currentTimeEl.innerText = formatTime(music.currentTime);
            return;
        }
        const percentage = (music.currentTime / music.duration) * 100;
        if (progressLine) progressLine.style.width = `${percentage}%`;
        if (progressBar) progressBar.style.setProperty('--progress-pos', `${percentage}%`);
        if (currentTimeEl) currentTimeEl.innerText = formatTime(music.currentTime);
        if (totalTimeEl) totalTimeEl.innerText = formatTime(music.duration);
    });
}

const wakeUpAudio = () => {
    if (music && music.paused) {
        music.play();
        if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    window.removeEventListener('mousemove', wakeUpAudio);
};
window.addEventListener('mousemove', wakeUpAudio);

const customCursor = document.getElementById('custom-cursor');
if (customCursor) {
    window.addEventListener('mousemove', (e) => {
        customCursor.style.display = 'block';
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });
    window.addEventListener('mouseout', () => { customCursor.style.display = 'none'; });
}

loadTrack(currentSongIndex);

function openTab(event, tabId) {
    const mainWindow = document.getElementById('main-window');
    const playerCore = document.getElementById('player-core');
    const textCore = document.getElementById('text-core');
    const panes = document.querySelectorAll('.tab-pane');

    if (!mainWindow || !playerCore || !textCore) return;

    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(btn => btn.classList.remove('active-text'));
    
    let clickedBtn = event ? event.currentTarget : document.querySelector('.buttons button');
    if (clickedBtn) {
        clickedBtn.classList.add('active-text');
    }

    if (tabId === 'home-tab') {
        textCore.classList.add('hidden-content');
        panes.forEach(pane => pane.classList.add('hidden'));
        mainWindow.classList.remove('expanded');
        
        setTimeout(() => {
            playerCore.classList.remove('hidden-content');
        }, 300);
    } else {
        playerCore.classList.add('hidden-content');
        mainWindow.classList.add('expanded');
        panes.forEach(pane => pane.classList.add('hidden'));
        
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.classList.remove('hidden');
        
        textCore.classList.remove('hidden-content');
    }

    const slider = document.querySelector('.nav-slider');
    if (slider && clickedBtn) {
        slider.style.left = clickedBtn.offsetLeft + 'px';
        slider.style.width = clickedBtn.offsetWidth + 'px';
    }
}

function initializeDynamicUI() {
    const newsContainer = document.getElementById('discord-news');
    const teamContainer = document.getElementById('dynamic-team');
    const aboutContainer = document.getElementById('about-tab');

    if (newsContainer && LOADSCREEN_CONFIG.news) {
        newsContainer.innerHTML = '';
        LOADSCREEN_CONFIG.news.forEach(item => {
            const cardHTML = `
                <div class="news-card">
                    ${item.image ? `
                    <div class="news-image-wrapper">
                        <img src="${item.image}" class="news-image" alt="News Image">
                    </div>
                    ` : ''}
                    <div class="news-body" style="${!item.image ? 'width: 100%;' : ''}">
                        <h3>${item.title}</h3>
                        <p style="white-space: pre-wrap;">${item.text}</p>
                        <div class="news-footer">
                            <span class="news-date">${item.date}</span>
                            <span class="news-author">@${item.author}</span>
                        </div>
                    </div>
                </div>
            `;
            newsContainer.innerHTML += cardHTML;
        });
    }

    if (teamContainer && LOADSCREEN_CONFIG.team) {
        teamContainer.innerHTML = ''; 
        LOADSCREEN_CONFIG.team.forEach(member => {
            const memberHTML = `
                <div class="team-card" onclick="copyDiscordToClipboard('${member.discord}', this)">
                    <div class="team-avatar-wrapper">
                        <img src="${member.img}" class="team-avatar" alt="Avatar" onerror="this.src='assets/server.png'">
                    </div>
                    <div class="team-card-text">
                        <h3>${member.discord}</h3>
                        <div class="team-role ${member.memberClass}">${member.role}</div>
                    </div>
                    <div class="copy-indicator"><i class="fa-solid fa-copy"></i></div>
                </div>
            `;
            teamContainer.innerHTML += memberHTML;
        });
    }

    if (aboutContainer && LOADSCREEN_CONFIG.about) {
        let aboutStructureHTML = `
            <div class="about-container">
                <div class="about-story-card">
                    <h2><i class="fa-solid fa-earth-european"></i> ${LOADSCREEN_CONFIG.about.title}</h2>
                    <p>${LOADSCREEN_CONFIG.about.paragraph1}</p>
                    <p>${LOADSCREEN_CONFIG.about.paragraph2}</p>
                </div>
                <div class="about-links-grid" id="about-links-dynamic-grid"></div>
            </div>
        `;
        aboutContainer.innerHTML = aboutStructureHTML;

        const gridContainer = document.getElementById('about-links-dynamic-grid');
        if (gridContainer && LOADSCREEN_CONFIG.about.links) {
            LOADSCREEN_CONFIG.about.links.forEach(link => {
                const linkHTML = `
                    <div onclick="openFiveMLink('${link.url}')" class="about-link-box ${link.type}" style="cursor: pointer;">
                        <div class="link-icon"><i class="${link.icon}"></i></div>
                        <div class="link-text">
                            <h3>${link.title}</h3>
                            <p>${link.description}</p>
                        </div>
                        <div class="link-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                `;
                gridContainer.innerHTML += linkHTML;
            });
        }
    }
}

function openFiveMLink(url) {
    if (url) {
        window.invokeNative('openUrl', url);
    }
}

function copyDiscordToClipboard(username, element) {
    const textarea = document.createElement('textarea');
    textarea.value = username;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    let success = false;
    try {
        document.execCommand('copy');
        success = true;
    } catch (err) {
        console.error('Nepodařilo se zkopírovat:', err);
    }
    document.body.removeChild(textarea);

    if (success) {
        const indicator = element.querySelector('.copy-indicator');
        if (indicator) {
            indicator.innerHTML = '<i class="fa-solid fa-check" style="color: #2ecc71;"></i>';
        }
        
        let notification = document.createElement('div');
        notification.className = 'toast-notification';
        notification.innerHTML = `<i class="fa-solid fa-circle-check"></i> Discord name <b>${username}</b> copied successfully!`;
        document.body.appendChild(notification);
        
        setTimeout(() => { notification.classList.add('show'); }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => { notification.remove(); }, 300);
            if (indicator) {
                indicator.innerHTML = '<i class="fa-solid fa-copy"></i>';
            }
        }, 2500);
    }
}

window.addEventListener('load', () => {
    openTab(null, 'home-tab');
    initializeDynamicUI();
    setTimeout(() => {
        openTab(null, 'home-tab');
    }, 150);
});