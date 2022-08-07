import styled from 'styled-components'

const BodyDiv = styled.div`
    position: absolute;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-family: 'Kanit', sans-serif;
`

const BodyCenter = styled.div`
    position: absolute;
    top: 100px;
    width: 100%;
    max-width: 400px;
    left: 50%;
    transform: translateX(-50%);
`

const InputGroup = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
    padding-bottom: 115px;
    max-width: 750px;
`

const ProfileContent = styled.div`
    margin: 70px 0px 0px 0px;
    width: 100%;
    max-width: 500px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
`

export { BodyDiv, BodyCenter, InputGroup, ProfileContent }