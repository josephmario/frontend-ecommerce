import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

//router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import AddOrder from './pages/AddOrder';
import UpdateOrder from './pages/UpdateOrder';

const App = () => {
  return (

    <Router>
        <div className="App" >
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/add_order" exact component={AddOrder} />
                <Route path="/update_order/:product_name/:quantity/:order_detail_id" exact component={UpdateOrder} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
