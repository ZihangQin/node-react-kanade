import React from 'react';

function TopTitle({ title, className }) {
    return (
        <div className={`search_top_log ${className}`}>
            <div className="title_log">{title}</div>
        </div>
    );
}

export default TopTitle;
