// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {StrictMode} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PageNotFound from "./components/PageNotFound";
import MenuBar from "./components/MenuBar";
import Home from "./components/Home";


const App = () => {

    return (
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuBar />} >
                        <Route index element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </StrictMode>
    );
};


export default App;
