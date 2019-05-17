import React from 'react'
import {ThemeProvider} from 'styled-components'
import theme from './theme'
import {Root, Routes, addPrefetchExcludes, withSiteData} from 'react-static'
//
import {Link, Router} from 'components/Router'
import Dynamic from 'containers/Dynamic'
import Menu from "./components/Menu";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App(siteData) {
    //TODO: make mobile collapse/uncollapse menu work
    return (
        <ThemeProvider theme={theme}>
            <Root>
                <Menu content={siteData.content}/>
                <div className="content">
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Router>
                            <Dynamic path="dynamic"/>
                            <Routes path="*"/>
                        </Router>
                    </React.Suspense>
                </div>
            </Root>
        </ThemeProvider>
    )
}

export default withSiteData(App)