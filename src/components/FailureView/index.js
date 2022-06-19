import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {FailView, Image, Heading, Para, Button} from './styled'

const FailureView = () => (
  <BlackAndWhiteContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imageUrl = !isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      return (
        <FailView isDarkTheme={isDarkTheme}>
          <Image src={imageUrl} />
          <Heading isDarkTheme={isDarkTheme} fail>
            Oops ! Something went wrong
          </Heading>
          <Para isDarkTheme={isDarkTheme} fail>
            We Have Some Trouble In completing your request
          </Para>
          <Button isDarkTheme={isDarkTheme} fail>
            Retry
          </Button>
        </FailView>
      )
    }}
  </BlackAndWhiteContext.Consumer>
)

export default FailureView
