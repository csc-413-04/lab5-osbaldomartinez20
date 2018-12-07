import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import { importMessage } from './redux/actions';

const websocket = new WebSocket('ws://10.143.199.114:1234/ws');

websocket.onopen = () => {
    console.log('ws has connected!');
}

websocket.onmessage = (e) => {
    console.log(e);
    const data = JSON.parse(e.data);
    switch (data.type) {
        case 'MESSAGE_BROADCAST':
            store.dispatch(importMessage(data.message));
            break;
    }
    console.log(e);
}

websocket.onerror = (e) => {
    console.log(e);
}

websocket.onclose = (e) => {
    console.log('ws closed');
    console.log(e);
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();