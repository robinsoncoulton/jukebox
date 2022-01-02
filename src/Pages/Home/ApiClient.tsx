import axios from "axios";
import {SpotifyTrack} from "./types";

let token: string;
const getToken = async () => {
    if (!token) {
        console.log('getting token from server');
        await axios({
            // url: `http://localhost:8888/token`,
            url: `https://protected-tundra-64098.herokuapp.com/token`,
            method: 'GET',
        }).then((res) => {
            token = res.data.token
        })
    } else {
        console.log('using cached token', token)
    }
    return token;
};

const ApiClient = {
    getPlaylist: async (playlistId: string): Promise<SpotifyTrack[]> => {
        const res = await axios({
            url: `https://api.spotify.com/v1/users/zelkia/playlists/${playlistId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        }).
            then((res) => res.data)
        return res.tracks.items;
    },
    playTrack: async (playlistUri: string, trackOffset: string): Promise<void> => {
        await axios({
            url: `https://api.spotify.com/v1/me/player/play`,
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
            data: {
                "context_uri": playlistUri,
                "offset": {
                    "position": trackOffset
                }
            }
        })
    },
    queueTrack: async (trackUri: string): Promise<void> => {
        await axios({
            url: `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        })
    }
}

export default ApiClient;
