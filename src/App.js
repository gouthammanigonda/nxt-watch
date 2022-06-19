import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import BlackAndWhiteContext from './BandWContext/BlackAndWhiteContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    saveList: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  onAddOrRemoveList = (isActive, item) => {
    if (!isActive) {
      this.setState(prevState => ({
        saveList: [...prevState.saveList, item],
      }))
    } else {
      const {saveList} = this.state
      const filteredList = saveList.filter(each => each.id !== item.id)
      this.setState({
        saveList: filteredList,
      })
    }
  }

  render() {
    const {isDarkTheme, saveList} = this.state
    console.log(saveList)
    return (
      <BlackAndWhiteContext.Provider
        value={{
          isDarkTheme,
          saveList,
          changeTheme: this.changeTheme,
          onAddOrRemoveList: this.onAddOrRemoveList,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/videos/:id" component={VideoItemDetails} />
            <Route exact path="/saved-videos" component={SavedVideos} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path="/gaming" component={Gaming} />
          </Switch>
        </>
      </BlackAndWhiteContext.Provider>
    )
  }
}

export default App
