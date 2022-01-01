import React from 'react';
import {Pages, PendingTransaction} from "../../App";
import Button from "../../Components/Button";
import ApiClient from "../Home/ApiClient";


interface PayProps {
    setPage: (page: Pages) => void,
    pendingTransaction?: PendingTransaction,
    setPendingTransaction: (pendingTransaction: PendingTransaction | undefined) => void,
}

const Pay: React.FC<PayProps> = ({ setPage, pendingTransaction , setPendingTransaction}) => {
    const handlePlay = async () => {
        try {
            if (!pendingTransaction) { throw new Error('pending transaction required')}
            await ApiClient.playTrack(pendingTransaction.playlistUri, pendingTransaction.offset)
            setPendingTransaction(undefined);
            setPage(Pages.SUCCESS);
        } catch (e) {
            setPage(Pages.ERROR);
        }

    }

    const handleQueue = async () => {
        try {
            if (!pendingTransaction) {
                throw new Error('pending transaction required')
            }
            await ApiClient.queueTrack(pendingTransaction.trackUri)
            setPendingTransaction(undefined);
            setPage(Pages.SUCCESS);
        } catch (e) {
            setPage(Pages.ERROR);
        }
    }

    return(<>
        <p>Your song choice will be added to the queue.</p>
        <p>There is a charge for this service</p>
        <Button onClick={handlePlay}>Play now!</Button>
        <Button onClick={handleQueue}>Queue!</Button>
    </>)
}

export default Pay;
