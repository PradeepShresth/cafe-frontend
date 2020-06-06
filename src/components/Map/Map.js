import React from 'react';

const Map = props => {
    return (
        <section className="section-contact">
            <div className="row">
                <h2 style={{paddingBottom: '20px'}}>Find us</h2>
            </div>
            <iframe 
                title='map'
                src={process.env.REACT_APP_GOOGLE_MAP_URL}
                width="100%" 
                height="450" 
                frameBorder="0" 
                style={{border:'0', allowFullScreen:"", ariaHidden:"false", tabIndex:"0"}}
            ></iframe>
        </section>
    );
};

export default Map;