import React from 'react'
import { useRouteData } from "react-static";

export default () => {
    const { data } = useRouteData()

    return (
        <div>
            <p>This is how you contact us</p>
        </div>
    )
}