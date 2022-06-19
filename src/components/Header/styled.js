import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`
export const Container2 = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Image = styled.img`
  max-width: ${props => (props.profile ? '40px' : '150px')};
`
export const Div = styled.div``

export const Div2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: 0px;
`

export const Button2 = styled.button`
  background-color: transparent;
  border: 1px solid ${props => (props.isDarkTheme ? 'white' : '#4f46e5')};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.isDarkTheme ? 'white' : '#4f46e5')};
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  padding: 10px;
  width: 80px;
`
