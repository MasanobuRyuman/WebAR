import React from 'react';
import ReactDOM from 'react-dom';
import {Pagination} from 'react-laravel-paginex';
function MainPage() {
    return (
        <div>
            <h1>main</h1>
        </div>
    );
}

export default MainPage;

if (document.getElementById('mainPage')) {
    ReactDOM.render(<MainPage />, document.getElementById('mainPage'));
}
