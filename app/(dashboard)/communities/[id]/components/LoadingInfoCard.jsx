import React from 'react'

const LoadingInfoCard = () => {
    return (
        <div className="community-container relative w-screen md:w-[350px] max-w-md h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="community-header p-5">
                <div className="loading-image rounded-t-lg w-full h-52 bg-gray-300 animate-pulse"></div>
                <div className="community-info">
                    <h5 className="mb-2 mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white animate-pulse">
                        <div className="loading-rectangle w-20 h-6 bg-gray-300 mb-1 animate-pulse"></div>
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 animate-pulse">
                        <div className="loading-rectangle w-full h-4 bg-gray-300 mb-1 animate-pulse"></div>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 animate-pulse">
                        <div className="loading-rectangle w-16 h-4 bg-gray-300 mb-1 animate-pulse"></div>
                    </p>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 animate-pulse">
                        <div className="loading-rectangle w-24 h-3 bg-gray-300 mb-1 animate-pulse"></div>
                    </p>
                </div>
                <div className="community-creator flex items-center space-x-1">
                    <div className="avatar loading-avatar">
                        <div className="loading-avatar-image bg-gray-300 animate-pulse"></div>
                        <div className="loading-avatar-fallback bg-gray-300 animate-pulse"></div>
                    </div>

                </div>
            </div>
            <div className="community-actions p-5 -mt-5 flex justify-between">
                <div className="subscribe-leave-toggle">
                </div>
                <div className="create-post-button">
                </div>
            </div>
        </div>
    );

}

export default LoadingInfoCard
