import Loader from 'react-loader-spinner'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {FlexCenter} from './styled'

const LoaderView = () => (
  <BlackAndWhiteContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <FlexCenter data-testid="loader">
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        </FlexCenter>
      )
    }}
  </BlackAndWhiteContext.Consumer>
)

export default LoaderView
