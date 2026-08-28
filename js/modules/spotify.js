// SPOTIFY NOW PLAYING

const spotifyFallbackCover = "/assets/images/Spotify_Primary_Logo_RGB_Black.png";

export function initSpotify() {
    const spotifyCard = document.querySelector(".card-spotify");
    const spotifyCover = document.querySelector(".spotify-cover");
    const spotifyTrack = document.querySelector(".spotify-track");
    const spotifyArtist = document.querySelector(".spotify-artist");
    const spotifyStatusText = document.querySelector(".spotify-status-text");
    const spotifyStatusDot = document.querySelector(".spotify-status-dot");

    const updateSpotifyCard = (data) => {
        if (!spotifyCard) return;
        if (!data || !data.isPlaying) {
            if (data?.track) {
                spotifyTrack.textContent = data.track;
                spotifyArtist.textContent = data.artist || "—";
                const fallbackNeeded = !data.albumArt;
                spotifyCover.src = data.albumArt || spotifyFallbackCover;
                spotifyCover.alt = `${data.track} album cover`;
                spotifyCover.classList.toggle("spotify-cover--fallback", fallbackNeeded);
            } else {
                spotifyTrack.textContent = "—";
                spotifyArtist.textContent = "—";
                spotifyCover.src = spotifyFallbackCover;
                spotifyCover.alt = "Spotify logo";
                spotifyCover.classList.add("spotify-cover--fallback");
            }
            if (spotifyStatusText) spotifyStatusText.textContent = "MUSIC - LAST PLAYED";
            if (spotifyStatusDot) spotifyStatusDot.classList.add("is-hidden");
            return;
        }
        spotifyTrack.textContent = data.track;
        spotifyArtist.textContent = data.artist;
        const fallbackNeeded = !data.albumArt;
        spotifyCover.src = data.albumArt || spotifyFallbackCover;
        spotifyCover.alt = `${data.track} album cover`;
        spotifyCover.classList.toggle("spotify-cover--fallback", fallbackNeeded);
        if (spotifyStatusText) spotifyStatusText.textContent = "MUSIC - NOW PLAYING";
        if (spotifyStatusDot) spotifyStatusDot.classList.remove("is-hidden");
    };

    const fetchNowPlaying = async () => {
        if (!spotifyCard) return;
        try {
            const response = await fetch(`/.netlify/functions/spotify?t=${Date.now()}`, {
                cache: "no-store",
            });
            if (!response.ok) {
                updateSpotifyCard(null);
                return;
            }
            const data = await response.json();
            updateSpotifyCard(data);
        } catch (error) {
            updateSpotifyCard(null);
        }
    };

    fetchNowPlaying();
    setInterval(fetchNowPlaying, 60000);
}
