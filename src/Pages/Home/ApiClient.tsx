import axios from "axios";
import {SpotifyTrack} from "./types";

let token: string;
const getToken = async () => {
    if (!token) {
        console.log('getting token from server');
        await axios({
            url: `http://localhost:8888/token`,
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
                Authorization: `Bearer BQDUkYHmcZRiwBuIHECErppmelT0iGQMAQhTsuofd8W_Gom6o_0735OB-NZo2vzOd2h317b-qdqvPfdX2yDEZPjhEV8RGT5SA77YxKA0GbIbjDk7F3IwlUUgnHWSFVSFtMvGgs2ZoNWD9OzhUBWSFj2vlKI9MYZoOLcbZPjScp7NuJOLbMZgeZUg8uosKkFB-dz8qQ`,
            },
        })
    }
}

export default ApiClient;
