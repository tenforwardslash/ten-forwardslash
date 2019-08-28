import React from 'react'
import {Box, Flex, Button, Text, Link, Heading} from 'rebass'
import styled from "styled-components"
import ReactMarkdown from 'react-markdown'

import theme, { colors } from '../theme'

const BrandedMainHeading = styled(Heading)`
    text-transform: lowercase;
    font-family: "OCR A Extended", monospace;
`

const BrandedSubHeading = styled(Heading)`
    text-transform: uppercase;
    font-family: 'Ubuntu Mono', monospace;
`

//OverlayText **REQUIRES** to be contained in an element with ****position:relative;*** set, since it is using position absolute.
//  otherwise it'll just be at the top of your page, messing everything up.
const OverlayText = styled(Text)`
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    font-size: 8px;
    overflow: hidden;
    text-align: justify;
    text-transform: uppercase;
    font-family: "OCR A Extended", monospace;
    opacity: 0.5;
`


const Section = props => {
    let css = checkProps(props, {minHeight: '450px'})

    return < Flex
        py = {[2, 4]}
        css = {css}
        {...props}
    />

}

const FullHeightSection = props => {
    let css = checkProps(props, {minHeight: '100vh'})

    return < Section
        py = {[2, 4]} //TODO: if this inherits from Section, do we need to set py?
        css = {css}
        {...props}
    />

}

const FlexContent = props => {
    let css = checkProps(props, {maxWidth: '950px'})

    return <Flex
        m='auto'
        px={[3,2,1]}
        css={css}
        {...props}

    />
}

const FullHeightFlexContent = props => {
    let css = checkProps(props, {height: '100%'})

    return <FlexContent
        {...props}
        css={css}
    />
}

const ClickableButton = props => {
    let css = checkProps(props, {
        cursor: 'pointer',
        fontFamily: '"Ubuntu Mono", monospace',
        textTransform: "uppercase",
        ':focus':  {
            outline: 'none'
        }
    })

    return <Button
        {...props}
        css={css}
    />
}
// ArrowClickableButton is from our branding guide -- it will append '>>>' in OCR A font and center it properly
// still need to add animation etc
const ArrowClickableButton = props => {
    // props.buttonText

    return <ClickableButton {...props}>
        <Text color={props.color} style={{"display": "flex"}}>{props.buttonText}<Text color={props.color} style={{marginLeft: "5px", marginTop: "-1px"}} fontFamily='mono'> >>></Text></Text>
    </ClickableButton>
}


const PageTitle = props => <BrandedSubHeading {...props} alignSelf='center' fontSize={5} mb={4} />

const PageHero = (props) => (
    <Section bg={props.bg} color={props.color}>
        <FlexContent flexDirection='column' px={4} flex={1}>
            <PageTitle>{props.title}</PageTitle>
            <TextNoFirstMarginP fontSize={3} px={[4,5]}>
                <ReactMarkdown
                    source={props.blurb}
                    renderers={{ link: (props) => <a href={props.href} target="_blank">{props.children}</a> }}
                />
            </TextNoFirstMarginP>
        </FlexContent>
    </Section>
)

function checkProps (props, css) {
    if (props.hasOwnProperty('css')) {
        css = {...css, ...props.css}
        delete props.css
    }

    return css
}

// todo: review -- idk a good name for this
const TextNoFirstMarginP = styled(Text)`
p:first-child {
    margin-block-start: 0;
}
`

const ClickableLink = styled(Link)`
    text-decoration: none; 
    cursor: pointer;
    color: ${colors.darkgray};
    :hover {
        color: ${colors.mediumgray}; 
    }
`

const PrettyInput = styled.input`
    font-size: 18px;
    padding: 10px;
    width: 93%; //todo: review -- width 100% was growing past the parent div 
    font-family: ${theme.fonts['sans']}; 
    :focus {
        outline: none;
    }
`


export { Section, FlexContent, FullHeightFlexContent, ClickableButton, ArrowClickableButton, TextNoFirstMarginP,
    ClickableLink, PrettyInput, FullHeightSection, PageTitle, PageHero,
    BrandedMainHeading, BrandedSubHeading, OverlayText};
