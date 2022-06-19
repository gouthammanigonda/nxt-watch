import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/youtube'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import SideBar from '../SideBar'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {
  MainContainer,
  ItemContainer,
  Container,
  Image,
  Heading,
  Div,
  Para,
  Hrline,
  Button,
  Para2,
  Div2,
  Div3,
  VideoContainer,
} from './styled'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetail extends Component {
  state = {
    videoDetails: [],
    channel: [],
    isBtnActiveLike: false,
    isBtnActiveDislike: false,
    isBtnActiveSave: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        channel: data.video_details.channel,
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      const channel = {
        profileImageUrl: data.video_details.channel.profile_image_url,
        name: data.video_details.channel.name,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      this.setState({
        videoDetails: updatedData,
        channel,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSaveBTN = () => {}

  onClickLikeBtn = () => {
    const {isBtnActiveDislike} = this.state
    if (isBtnActiveDislike) {
      this.setState(prevState => ({
        isBtnActiveLike: !prevState.isBtnActiveLike,
        isBtnActiveDislike: false,
      }))
    } else {
      this.setState(prevState => ({
        isBtnActiveLike: !prevState.isBtnActiveLike,
      }))
    }
  }

  onClickDislikeBtn = () => {
    const {isBtnActiveLike} = this.state
    if (isBtnActiveLike) {
      this.setState(prevState => ({
        isBtnActiveDislike: !prevState.isBtnActiveDislike,
        isBtnActiveLike: false,
      }))
    } else {
      this.setState(prevState => ({
        isBtnActiveDislike: !prevState.isBtnActiveDislike,
      }))
    }
  }

  renderSuccessView = () => {
    const {
      videoDetails,
      channel,
      isBtnActiveSave,
      isBtnActiveLike,
      isBtnActiveDislike,
    } = this.state
    const {
      videoUrl,
      title,
      viewCount,
      thumbnailUrl,

      description,
      id,
      publishedAt,
    } = videoDetails

    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme, onAddOrRemoveList} = value
          const style = {
            position: 'relative',
            alignSelf: 'flex-start',
          }

          const style2 = {
            color: '#4f46e5',
          }

          const dataToSaveList = {
            thumbnailUrl,
            id,
            publishedAt,
            title,
            name: channel.name,
            subscriberCount: channel.subscriberCount,
            viewCount,
          }

          const onClickSaveBTN = () => {
            this.setState(prevState => ({
              isBtnActiveSave: !prevState.isBtnActiveSave,
            }))
            onAddOrRemoveList(isBtnActiveSave, dataToSaveList)
          }

          return (
            <Container>
              <VideoContainer>
                <ReactPlayer url={videoUrl} width="100%" height="100%" />
              </VideoContainer>

              <Heading isDarkTheme={isDarkTheme}>{title}</Heading>
              <Div main>
                <Div>
                  <Para isDarkTheme={isDarkTheme}>{`${viewCount} views`}</Para>
                  <VscDebugStackframeDot
                    color={isDarkTheme ? '#616e7c' : '#7e858e'}
                    style={style}
                  />
                  <Para isDarkTheme={isDarkTheme}>
                    {formatDistanceToNow(new Date(publishedAt))}
                  </Para>
                </Div>
                <Div align>
                  <Div>
                    <Button onClick={this.onClickLikeBtn}>
                      <AiOutlineLike
                        color={!isBtnActiveLike ? '#616e7c' : '#4f46e5'}
                      />
                      <Para style={isBtnActiveLike ? style2 : null}>Like</Para>
                    </Button>
                  </Div>
                  <Div>
                    <Button onClick={this.onClickDislikeBtn}>
                      <AiOutlineDislike
                        color={!isBtnActiveDislike ? '#616e7c' : '#4f46e5'}
                      />
                      <Para style={isBtnActiveDislike ? style2 : null}>
                        Dislike
                      </Para>
                    </Button>
                  </Div>
                  <Div>
                    <Button onClick={onClickSaveBTN}>
                      <MdPlaylistAdd
                        color={!isBtnActiveSave ? '#616e7c' : '#4f46e5'}
                        size={18}
                      />
                      <Para2 style={isBtnActiveSave ? style2 : null}>
                        {isBtnActiveSave ? 'Saved' : 'Save'}
                      </Para2>
                    </Button>
                  </Div>
                </Div>
              </Div>
              <Hrline />
              <Div>
                <Div2>
                  <Image src={channel.profileImageUrl} />
                </Div2>
                <Div2>
                  <Div3>
                    <Para isDarkTheme={isDarkTheme}>{channel.name}</Para>
                    <Para isDarkTheme={isDarkTheme}>
                      {channel.subscriberCount}
                    </Para>
                  </Div3>
                  <Div3>
                    <Heading h2 isDarkTheme={isDarkTheme}>
                      {description}
                    </Heading>
                  </Div3>
                </Div2>
              </Div>
            </Container>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }

  renderFailureView = () => <FailureView />

  renderLoadingView = () => <LoaderView />

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div>
              <Header />
              <MainContainer>
                <SideBar />
                <ItemContainer isDarkTheme={isDarkTheme}>
                  {this.renderViews()}
                </ItemContainer>
              </MainContainer>
            </div>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default VideoItemDetail
