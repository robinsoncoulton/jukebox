import React, {useState} from "react";
import Home from "./Pages/Home";
import Pay from "./Pages/Pay";
import Playlist from "./Pages/Playlist";
import Success from "./Pages/Success";
import Error from "./Pages/Error";

export enum Pages {
    HOME = "HOME",
    PAY = "PAY",
    SUCCESS = "SUCCESS",
    PLAYLIST = "PLAYLIST",
    ERROR = "ERROR",
}

export interface PendingTransaction {
    playlistUri: string,
    trackUri: string,
    offset: string,
}

function App () {
    const [page, setPage] = useState<Pages>(Pages.PLAYLIST);
    const [pendingTransaction, setPendingTransaction] = useState<PendingTransaction | undefined>()

    return (
        <div className="App">
            {page === Pages.HOME && <Home />}
            {page === Pages.PAY && pendingTransaction && <Pay setPage={setPage} pendingTransaction={pendingTransaction} setPendingTransaction={setPendingTransaction}/>}
            {page === Pages.SUCCESS && <Success setPage={setPage}/>}
            {page === Pages.PLAYLIST && <Playlist setPage={setPage} setPendingTransaction={setPendingTransaction}/>}
            {page === Pages.ERROR && <Error setPage={setPage} />}
        </div>
    );
}

export default App;
