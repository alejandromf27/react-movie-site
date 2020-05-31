import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import GlobalState from './context/GlobalState';
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/movieDetail/MovieDetail";


/**
 * render the app
 */
export default function App() {
  return (
    <GlobalState> {/* the global states to use */}
      <Switch> {/* the routes */}
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} exact />
      </Switch>
    </GlobalState>
  );
};
