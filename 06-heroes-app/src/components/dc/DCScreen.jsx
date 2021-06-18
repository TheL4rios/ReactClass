import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const DCScreen = () => {
    return (
        <div>
            <h1>DcScreen</h1>
            <hr/>

            <HeroList publisher="DC Comics"/>
        </div>
    )
}
