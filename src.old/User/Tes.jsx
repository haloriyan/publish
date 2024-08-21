import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";

const Tes = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            const ws = new WebSocket('wss://whatsapp.zainzo.com/ws');

            // Listen for messages from the server
            ws.onmessage = (event) => {
                const receivedData = JSON.parse(event.data);
                console.log(receivedData);
            };

            // Handle WebSocket connection errors
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            // Cleanup WebSocket connection when the component unmounts
            return () => {
                ws.close();
            };

            // axios.post(`${config.whatsappUrl}/contacts`, {
            //     client_id: "9773",
            // })
            // .then(response => {
            //     let res = response.data;
            //     console.log(res);
            // })
        }
    }, [isLoading]);

    return (
        <>
            HEhe
        </>
    )
}

export default Tes