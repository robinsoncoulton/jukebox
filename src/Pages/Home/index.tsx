import React from "react";
import QRCode from "qrcode.react";

const Home: React.FC = () => {
    return (<>
        <QRCode value="http://robinsoncoulton.github.io/jukebox" style={{marginRight: 50 }} />
    </>)
}

export default Home;
