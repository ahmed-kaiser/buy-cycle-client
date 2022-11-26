import React from 'react';
import Advertise from './Advertise';
import Categories from './Categories';

const Home = () => {
    return (
        <div>
            <h1>Home page</h1>
            <Categories />
            <Advertise />
        </div>
    );
};

export default Home;