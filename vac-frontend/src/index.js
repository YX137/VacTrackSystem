import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./app/store";
import App from "./app/app"; //default import

render( //requires two parameters 1.the app component to be rendered, 2. root element over which this needs to be rendered
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root") //bootstrapping of application component to root element(container)
)
