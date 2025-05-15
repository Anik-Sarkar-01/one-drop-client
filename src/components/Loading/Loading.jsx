import React from 'react';
import { DotLoader } from "react-spinners";



const Loading = () => {

    return (
        <div className="flex justify-center h-lvh items-center ">
            <DotLoader
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
                color='#EB2C29'
            />
        </div>
    );
};

export default Loading;