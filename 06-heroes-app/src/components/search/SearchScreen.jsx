import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [{ searchText }, handleInputChange] = useForm({
        searchText: q
    });

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])
    // const heroesFiltered = getHeroesByName(searchText);

    const handleSearch = e => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder="Find yout hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="sumbit"
                            className="btn m-1 btn-clock btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    { 
                        (q === '') && <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    { 
                        (q !== '' && heroesFiltered.length === 0) && <div className="alert alert-danger">
                            There is no a hero with { q }
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={ hero.id } { ...hero }/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
