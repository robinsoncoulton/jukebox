import React, {useEffect, useState} from "react";
import {Pages, PendingTransaction} from "../../App";
import Button from "../../Components/Button";
import ApiClient from "../Home/ApiClient";
import {SpotifyTrack} from "../Home/types";


interface PlaylistProps {
  setPendingTransaction: (pendingTransaction: PendingTransaction) => void;
  setPage: (page: Pages) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ setPendingTransaction, setPage}) => {
  const playlistId = '4o9vfb37Yvk2SumaYq1TN9'
  const playlistUri = `spotify:playlist:${playlistId}`
  const [trackList, setTrackList] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    ApiClient.getPlaylist(playlistId).then(data => setTrackList(data));
  }, [])

  const handleClick = (playlistIndex: string, trackUri: string) => {
    setPendingTransaction({playlistUri: playlistUri, offset: playlistIndex, trackUri: trackUri});
    setPage(Pages.PAY)
  }

  return (<>
    playlist
    <Button onClick={async () => setTrackList(await ApiClient.getPlaylist(playlistId))}>Get Playlist</Button>
    <div>
      {trackList.length > 0 && trackList.map((selection, index) => <p>{selection.track.name}, {selection.track.artists[0].name} <button onClick={() => handleClick(index.toString(), selection.track.uri)}>PLAY!</button></p>)}
    </div>
  </>)
}

export default Playlist;
