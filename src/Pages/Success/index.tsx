import React from 'react';
import {Pages} from "../../App";
import Button from "../../Components/Button";

interface SuccessProps {
    setPage: (page: Pages) => void;
}

const Success: React.FC<SuccessProps> = ({ setPage }) => {
    const onClick = () => {
        setPage(Pages.PLAYLIST);
    }
    return (<>
        <p>Your song selection has been added to the queue</p>
        <Button onClick={onClick}>Take me home!</Button>
    </>)
}

export default Success;
