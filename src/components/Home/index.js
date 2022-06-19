import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

import {MdClose} from 'react-icons/md'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import {
  MainContainer,
  Container,
  Image,
  Para2,
  Container3,
  PopUpDiv,
  Button,
  Div2,
  Container4,
  Div3,
  Input,
  UnorderedList,
  ListItem,
  Div4,
  Div5,
  Image3,
  Heading2,
  Para3,
  SearchFail,
  Image4,
} from './styled'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    closeInActive: true,
    searchIp: '',
    rerender: false,
    videosList: [],
    retry: false,
    apiState: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchIp} = this.state
    this.setState({apiState: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchIp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        channel: each.channel,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      const channelDetails = data.videos.map(each => ({
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))

      this.setState({
        videosList: updatedData,
        apiState: apiStatusConstants.success,
      })
    } else {
      this.setState({apiState: apiStatusConstants.failure})
    }
  }

  onClickCloseBTN = () => {
    this.setState({
      closeInActive: false,
    })
  }

  renderAd = () => (
    <PopUpDiv>
      <Div2>
        <Image
          ad
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <Para2 ad>Buy NXT Watch Premium prepaid plans with UPI</Para2>
        <Button>GET IT NOW</Button>
      </Div2>
      <Div2>
        <Button icon type="button" onClick={this.onClickCloseBTN}>
          <MdClose />
        </Button>
      </Div2>
    </PopUpDiv>
  )

  onChangeSearchIp = event => {
    this.setState({
      searchIp: event.target.value,
    })
  }

  onClickSearch = () => {
    this.setState(
      {
        rerender: true,
      },
      this.getVideos,
    )
  }

  onClickRetry = () => {
    this.setState({retry: true}, this.getVideos)
  }

  renderSearchResults = () => {
    const {videosList} = this.state

    const renderIfResultsSuccess = () =>
      videosList.map(each => {
        const {channel, id, title, publishedAt, thumbnailUrl, viewCount} = each

        const style = {
          position: 'relative',
          alignSelf: 'flex-start',
        }
        const style2 = {textDecorator: 'none'}
        return (
          <BlackAndWhiteContext.Consumer>
            {value => {
              const {isDarkTheme} = value
              return (
                <Link to={`videos/${id}`} className="link">
                  <ListItem>
                    <Div4>
                      <Image3 src={thumbnailUrl} />
                    </Div4>
                    <Div4>
                      <Div5>
                        <Image3 logo src={channel.profile_image_url} />
                      </Div5>
                      <Div5>
                        <Heading2 isDarkTheme={isDarkTheme}>{title}</Heading2>
                        <Para3 isDarkTheme={isDarkTheme}>{channel.name}</Para3>
                        <Div4 column>
                          <Para3 isDarkTheme={isDarkTheme}>
                            {`${viewCount} views`}
                          </Para3>

                          <VscDebugStackframeDot
                            color={isDarkTheme ? '#616e7c' : '#7e858e'}
                            style={style}
                          />
                          <Para3 isDarkTheme={isDarkTheme}>
                            {formatDistanceToNow(new Date(publishedAt))}
                          </Para3>
                        </Div4>
                      </Div5>
                    </Div4>
                  </ListItem>
                </Link>
              )
            }}
          </BlackAndWhiteContext.Consumer>
        )
      })

    const renderSearchFailureView = () => (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <SearchFail>
              <Image4 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
              <Heading2 isDarkTheme={isDarkTheme} fail>
                No Search Results Found
              </Heading2>
              <Para3 isDarkTheme={isDarkTheme} fail>
                Try different keywords or remove search filter
              </Para3>
              <Button
                isDarkTheme={isDarkTheme}
                type="button"
                onClick={this.onClickRetry}
              >
                Retry
              </Button>
            </SearchFail>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )

    return (
      <UnorderedList>
        {videosList.length > 0
          ? renderIfResultsSuccess()
          : renderSearchFailureView()}
      </UnorderedList>
    )
  }

  renderLoadingView = () => (
    <SearchFail data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </SearchFail>
  )

  renderFailureView = () => (
    <BlackAndWhiteContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imageUrl = !isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <SearchFail isDarkTheme={isDarkTheme}>
            <Image4 src={imageUrl} />
            <Heading2 isDarkTheme={isDarkTheme} fail>
              Oops ! Something went wrong
            </Heading2>
            <Para3 isDarkTheme={isDarkTheme} fail>
              We Have Some Trouble In completing your request
            </Para3>
            <Button isDarkTheme={isDarkTheme} fail>
              Retry
            </Button>
          </SearchFail>
        )
      }}
    </BlackAndWhiteContext.Consumer>
  )

  renderViews = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatusConstants.success:
        return this.renderSearchResults()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {closeInActive} = this.state
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const imageUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <MainContainer>
              <Header />
              <Container>
                <SideBar />
                <Container3>
                  {closeInActive && this.renderAd()}
                  <Container4 isDarkTheme={isDarkTheme}>
                    <Div3 isDarkTheme={isDarkTheme}>
                      <Input
                        type="search"
                        placeholder="search"
                        onChange={this.onChangeSearchIp}
                      />
                      <Button icon search onClick={this.onClickSearch}>
                        <AiOutlineSearch
                          size={19}
                          color={isDarkTheme ? '#cccccc' : null}
                        />
                      </Button>
                    </Div3>
                    {this.renderViews()}
                  </Container4>
                </Container3>
              </Container>
            </MainContainer>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default Home