import {Component} from 'react'
import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'

import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  Container,
  Container2,
  Image,
  Div,
  Div2,
  Button,
  Button2,
} from './styled'

class Header extends Component {
  render() {
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value
          const imageUrl = !isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const onClickThemeChange = () => {
            changeTheme()
          }

          return (
            <Container isDarkTheme={isDarkTheme}>
              <Container2>
                <Div>
                  <Image src={imageUrl} />
                </Div>

                <Div2>
                  <Button type="button" onClick={onClickThemeChange}>
                    {isDarkTheme ? (
                      <FiSun color="white" size={30} />
                    ) : (
                      <FaMoon color="black" size={30} />
                    )}
                  </Button>
                  <Image
                    profile
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  />
                  <Button2 isDarkTheme={isDarkTheme}>Logout</Button2>
                </Div2>
              </Container2>
            </Container>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default Header
