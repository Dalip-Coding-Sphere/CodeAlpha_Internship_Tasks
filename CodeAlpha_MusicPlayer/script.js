document.addEventListener('DOMContentLoaded', function () {
    // Array of tracks with their details
    const tracks = [
        {
            title: 'Love of My Life',
            artist: 'Ben Lvcas',
            albumArt: 'image/img1.jpeg',
            audioSrc: 'music/Love of My Life.mp3'
        },
        {
            title: 'Find A Way',
            artist: 'THE DLX',
            albumArt: 'image/img2.jpeg',
            audioSrc: 'music/Find A Way.mp3'
        },
        {
            title: 'How Far',
            artist: 'Samie Bower',
            albumArt: 'image/img3.jpeg',
            audioSrc: 'music/How Far.mp3'
        },
        {
            title: 'Bad Intentions',
            artist: 'Bessonn&Sa',
            albumArt: 'image/img4.jpeg',
            audioSrc: 'music/Bad Intentions.mp3'
        },
        {
            title: 'Baila',
            artist: 'Alfonso Lugo',
            albumArt: 'image/img5.jpeg',
            audioSrc: 'music/Baila.mp3'
        },
        {
            title: 'Tell Me Why',
            artist: 'Axl & Arth',
            albumArt: 'image/img6.jpeg',
            audioSrc: 'music/Tell Me Why.mp3'
        },
        {
            title: 'Roses',
            artist: 'Jekk',
            albumArt: 'image/img7.jpeg',
            audioSrc: 'music/Roses.mp3'
        }
    ];

    let currentTrackIndex = 0;
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const albumArt = document.getElementById('albumArt');
    const trackTitle = document.getElementById('trackTitle');
    const artist = document.getElementById('artist');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const scrubber = document.querySelector('.scrubber');
    const timeStart = document.querySelector('.time-start');
    const timeEnd = document.querySelector('.time-end');

    let isPlaying = false;

    // Toggle play/pause button
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerText = 'play_arrow';
        } else {
            audio.play();
            playPauseBtn.innerText = 'pause';
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    // Load a track into the audio element
    function loadTrack(trackIndex) {
        const track = tracks[trackIndex];
        audio.src = track.audioSrc;
        albumArt.src = track.albumArt;
        trackTitle.innerText = track.title;
        artist.innerText = track.artist;
        progress.style.width = '0%';
        scrubber.style.left = '0%';
        audio.load();
        audio.addEventListener('loadedmetadata', function () {
            timeEnd.innerText = formatTime(audio.duration);
        });
        // Start or pause audio based on current state
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    // Time format in MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainderSeconds.toString().padStart(2, '0')}`;
    }

    // Switch to the next track
    nextBtn.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    // Switch to the previous track
    prevBtn.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    // Update progress bar and time display as audio plays
    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';
        scrubber.style.left = percent + '%';
        timeStart.innerText = formatTime(audio.currentTime);
    }

    audio.addEventListener('timeupdate', updateProgress);

    // Update audio playback position based on click position on progress bar
    function updateProgressOnClick(event) {
        const progressBarWidth = progressBar.clientWidth;
        const clickPositionX = event.clientX - progressBar.getBoundingClientRect().left;
        let percent = (clickPositionX / progressBarWidth);
        percent = Math.min(1, Math.max(0, percent));
        audio.currentTime = percent * audio.duration;
    }

    progressBar.addEventListener('click', updateProgressOnClick);

    // Handle scrubbing functionality
    function scrub(event) {
        const progressBarWidth = progressBar.clientWidth;
        const clickPositionX = event.clientX - progressBar.getBoundingClientRect().left;
        let percent = (clickPositionX / progressBarWidth);
        percent = Math.min(1, Math.max(0, percent));
        audio.currentTime = percent * audio.duration;
        scrubber.style.left = percent * 100 + '%';
        progress.style.width = percent * 100 + '%';
    }

    progressBar.addEventListener('mousedown', (event) => {
        scrub(event);
        document.addEventListener('mousemove', scrub);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', scrub);
        }, { once: true });
    });

    scrubber.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', scrub);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', scrub);
        }, { once: true });
    });

    // Switch to the next track when the current track ends
    audio.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    // Initial load: Load the first track and start in paused state
    loadTrack(currentTrackIndex);
});