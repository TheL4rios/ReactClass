import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { DCScreen } from '../components/dc/DCScreen'
import { HeroScreen } from '../components/heroes/HeroScreen'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar/>  

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/marvel" component={ MarvelScreen }/>
                    <Route exact path="/hero/:heroeId" component={ HeroScreen }/>
                    <Route exact path="/dc" component={ DCScreen }/>
                    <Route exact path="/search" component={ SearchScreen }/>

                    <Redirect to="/marvel"/>
                </Switch>
            </div> 
        </>
    )
}
