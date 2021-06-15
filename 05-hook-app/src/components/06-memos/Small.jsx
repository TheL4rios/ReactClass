import React, { memo } from 'react'

export const Small = memo(({ value }) => {

    console.log('Me volví a llamar xd');

    return (
        <small>{ value }</small>
    )
})
