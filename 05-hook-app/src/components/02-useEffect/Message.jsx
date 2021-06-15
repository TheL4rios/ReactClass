import React, { useEffect, useState } from "react";

export const Message = () => {

    const [{ x, y }, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {

        const mouseMove = (e) => {
            const { x, y } = { x: e.x, y: e.y }
            setCoords({ x, y })
        }

        window.addEventListener('mousemove', mouseMove);

        console.log('Componente montado');
        return () => {
            console.log('Componente desmpontado');
            window.removeEventListener('mousemove', mouseMove);
        }
    }, []);

    return (
        <>
            <h1>oli</h1>
            <p>
                x: { x } y: { y }
            </p>
        </>
    );
}