import React from 'react';
import {Pages} from "../../App";
import Button from "../../Components/Button";

interface ErrorProps {
    setPage: (page: Pages) => void;
}

const Error: React.FC<ErrorProps> = ({ setPage }) => {
    const onClick = () => {
        setPage(Pages.PLAYLIST);
    }
    return (<>
        <p>Unfortunately the establishment is not currently accepting song requests. Please speak to the playlist owner.</p>
        <Button onClick={onClick}>Take me home!</Button>
    </>)
}

export default Error;
