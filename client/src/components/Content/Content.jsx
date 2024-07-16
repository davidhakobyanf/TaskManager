import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Content = () => {
    return (
        <div>
            <Navbar />
            <div style={{marginTop:'70px'}}>
            <Outlet />
            </div>
        </div>
    );
};

export default Content;