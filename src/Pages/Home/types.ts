export interface SpotifyTrack {
    track: {
        artists: [
            {
                name: string,
            }
        ],
        name: string,
        uri: string,
    }
}
