import React from 'react';
import notfound from '../images/notfound.svg';

const NotFoundView = () => {
    return (
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <img src={notfound} alt="not-found" style={{ width: '35vw', height: 'auto' }} />
        </div>
    );
};
export default NotFoundView;
