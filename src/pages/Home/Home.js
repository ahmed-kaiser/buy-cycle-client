import React from 'react';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';
import GuideLine from './GuideLine';
import Headers from './Headers';

const Home = () => {
    return (
        <div>
            <Headers />
            <Categories />
            <Advertise />
            <GuideLine />
            <Banner />
        </div>
    );
};

export default Home;