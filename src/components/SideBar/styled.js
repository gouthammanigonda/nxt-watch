import styled from 'styled-components'

export const Container2 = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  width: 20%;

  padding: 0px 20px;
`
export const Container3 = styled.div`
  height: 91vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SubContainer = styled.div``

export const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-weight: 400;
  margin-left: 5px;
`
export const Heading = styled.h1`
  font-family: 'Roboto';
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const Image = styled.img`
  width: ${props => (props.ad ? '200px' : '30px')};
`
export const Para2 = styled.p`
  font-family: 'Roboto';
  font-size: ${props => (props.ad ? '20px' : '15px')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-weight: ${props => (props.ad ? '400' : '600')};
  width: 70%;
`
