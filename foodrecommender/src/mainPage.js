import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Recommendation from './recommendation';
import './mainPage.css';

export default function MainPage() {
    const navigate = useNavigate();

    async function userLocation () {
        const options = {
            method: "GET",
            url: "https://api.ipstack.com/check?access_key=<API_KEY>",
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const { city } = response.data;
            console.log(`city: ${city}`);
            localStorage.setItem('city', city);
        } catch (error) {
            console.error(error);
        }
    }

    function HandleClick () {
        navigate('/recommendation');
    };


    return (
        <div className="mainPage">
            <h1>Welcome to the Food Recommender</h1>
            <h2>Step 1: Press Get Location Button</h2>
            <button onClick={userLocation}>Get Location</button>
            <h2>Step 2: Press Get Recommendation Button</h2>
            <button onClick={HandleClick}>Get Recommendation</button>
        </div>
    );
}