import React from "react";
import QRCode from "qrcode.react";

const Home: React.FC = () => {
    return (<>
        <QRCode value="http://localhost:3000/playlist" style={{marginRight: 50 }} />
    </>)
}

export default Home;
