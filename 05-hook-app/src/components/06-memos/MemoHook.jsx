import React, { useMemo, useState } from 'react';
import { process } from '../../helpers/process';
import { useCounter } from '../../hooks/useCounter';

import '../02-useEffect/effects.css';

export const MemoHook = () => {

    const { state: counter, increment } = useCounter(5000);
    const [show, setShow] = useState(true);
    const memo = useMemo(() => process(counter), [counter]);

    return (
        <div>
            <h1>Counter: { counter }</h1>
            <hr/>

            <p>{ memo }</p>

            <button
                className="btn btn-primary"
                onClick={ increment }
            >
                +1
            </button>

            <button
                className="btn btn-outline-primary ml-3"
                onClick={ () => {
                    setShow(!show)
                }}
            >
                Mostrar/Ocultar - { JSON.stringify(show) }
            </button>
        </div>
    )
}
