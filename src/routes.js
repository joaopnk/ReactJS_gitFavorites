import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

// Importando componentes
import Main         from './pages/Main';
import Repositorio  from './pages/Repositorio';


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"            component={Main} />
                {/* /:parametro */}
                <Route exact path="/repositorio/:repositorio" component={Repositorio} />
            </Switch>
        </BrowserRouter>
    )
}