import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme, { colors } from './theme'

import { Root, Routes, addPrefetchExcludes, withSiteData } from 'react-static'

import { Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import 'app.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

const GlobalStyles = createGlobalStyle`
    html, body, div#root {
        height: 100%;
    } 
    body {
        font-family: 'Nunito Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: ${colors.darkgray};
        margin: 0;
    }
    input, select, textarea, button {
        font-family:inherit;
    }
    a {
        color: ${colors.yellow};
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`

function App(siteData) {
    return (
        <ThemeProvider theme={theme}>
            <Root>
                <GlobalStyles/>

                <Menu content={siteData.content} logos={siteData.logos} theme='black'/>

                <div style={{marginTop: "-1px"}}>
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Router>
                            <Dynamic path="dynamic"/>
                            <Routes path="*"/>
                        </Router>
                    </React.Suspense>
                </div>

                <Footer social={siteData.social} do={siteData.digitalOcean}/>
            </Root>
        </ThemeProvider>
    )
}

export default withSiteData(App)
