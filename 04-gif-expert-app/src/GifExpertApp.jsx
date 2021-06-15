import React, { useState } from 'react';
import AddCategory from './components/AddCategory';
import GifGrid from './components/GifGrid';

const GifExpertApp = props => {

    const [categories, setCategories] = useState(['One Punch']);

    return (
        <>
            <h2>GifExpertApp</h2>
            <AddCategory setCategories={setCategories} />
            <hr/>
            {/* <button onClick={handleAdd}>add</button> */}
            <ol>
                {
                    categories.map((item, i) => 
                        <GifGrid key={item} category={item}/>
                    )
                }
            </ol>
        </>
    );
}

export default GifExpertApp;