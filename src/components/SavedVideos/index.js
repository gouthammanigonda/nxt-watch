import {HiFire} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import {formatDistanceToNow} from 'date-fns'

import Header from '../Header'
import SideBar from '../SideBar'

import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  MainContainer,
  Div,
  Container2,
  Container1,
  Icon,
  Heading,
  ListItem,
  Image,
  Div2,
  Heading2,
  Para,
  NoResult,
} from './styled'

const SavedVideos = () => {
  const renderResult = () => (
    <BlackAndWhiteContext.Consumer>
      {value => {
        const {isDarkTheme, saveList} = value

        return (
          <Div isDarkTheme={isDarkTheme}>
            <Container1 isDarkTheme={isDarkTheme}>
              <Icon isDarkTheme={isDarkTheme}>
                <HiFire color="#ff0b37" className="icon" />
              </Icon>
              <Heading isDarkTheme={isDarkTheme}>Saved Videos</Heading>
            </Container1>
            <Container2 isDarkTheme={isDarkTheme}>
              {saveList.map(each => {
                const {
                  thumbnailUrl,
                  id,
                  publishedAt,
                  title,
                  name,
                  subscriberCount,
                  viewCount,
                } = each

                return (
                  <Link to={`/videos/${id}`} className="link">
                    <ListItem isDarkTheme={isDarkTheme}>
                      <Div2>
                        <Image src={thumbnailUrl} />
                      </Div2>

                      <Div2>
                        <Heading2 small isDarkTheme={isDarkTheme}>
                          {title}
                        </Heading2>
                        <Para smaller isDarkTheme={isDarkTheme}>
                          {name}
                        </Para>
                        <Div2 flex>
                          <Para smaller isDarkTheme={isDarkTheme}>
                            {`${viewCount} views`}
                          </Para>
                          <VscDebugStackframeDot
                            color={isDarkTheme ? '#616e7c' : '#7e858e'}
                            className="icon-position"
                          />
                          <Para smaller isDarkTheme={isDarkTheme}>
                            {formatDistanceToNow(new Date(publishedAt))}
                          </Para>
                        </Div2>
                      </Div2>
                    </ListItem>
                  </Link>
                )
              })}
            </Container2>
          </Div>
        )
      }}
    </BlackAndWhiteContext.Consumer>
  )

  const renderNoResultsView = () => (
    <BlackAndWhiteContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <NoResult isDarkTheme={isDarkTheme}>
            <Image src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" />
            <Heading small isDarkTheme={isDarkTheme}>
              No saved videos found
            </Heading>
            <Para margin smaller isDarkTheme={isDarkTheme}>
              You can save your videos while watching them
            </Para>
          </NoResult>
        )
      }}
    </BlackAndWhiteContext.Consumer>
  )

  return (
    <BlackAndWhiteContext.Consumer>
      {value => {
        const {saveList} = value
        console.log(saveList.length)
        return (
          <div>
            <Header />
            <MainContainer>
              <SideBar />
              {saveList.lenght !== 0 ? renderResult() : renderNoResultsView()}
            </MainContainer>
          </div>
        )
      }}
    </BlackAndWhiteContext.Consumer>
  )
}

export default SavedVideos
