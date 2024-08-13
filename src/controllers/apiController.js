import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiNoAuth = async (req, res) => {
    try {
        const config = {
            method: 'get',
            url: 'https://test.kubilockers.com/',
        };
        const respuesta = await axios(config);
        console.log("LLAMANDO API");
        
        res.status(200).json({
            success: true,
            data: respuesta.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
        });
    }
}

const apiAuth = async (req, res) => {
    try {
        const token = process.env.TOKEN
        const config = {
            method: 'get',
            url: 'https://test.kubilockers.com/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const respuesta = await axios(config);
        console.log("LLAMANDO API LOGGED");
        
        res.status(200).json({
            success: true,
            data: respuesta.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
        });
    }
}

export default {
    apiNoAuth,
    apiAuth,
}