import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  inProgress: 'IN_PROGRESS',
  active: 'ACTIVE',
  failed: 'FAILED',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiConstants.inProgress,
    languageId: languageFiltersData[0].id,
    responseList: [],
    activeTabId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getPopularRepo()
  }

  getPopularRepo = async () => {
    const {languageId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${languageId}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachItem => ({
      name: eachItem.name,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    console.log(response)

    if (response.ok === true) {
      this.setState({responseList: updatedData, apiStatus: apiConstants.active})
    } else {
      this.setState({apiStatus: apiConstants.failed})
    }
  }

  onClickChangeRepoId = languageId => {
    this.setState(
      {languageId, activeTabId: languageId, apiStatus: apiConstants.inProgress},
      this.getPopularRepo,
    )
  }

  renderResult = () => {
    const {responseList} = this.state
    return (
      <ul className="response-container">
        {responseList.map(eachItem => (
          <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  render() {
    const {activeTabId, apiStatus} = this.state
    let result
    switch (apiStatus) {
      case apiConstants.inProgress:
        result = this.renderLoader()
        break
      case apiConstants.active:
        result = this.renderResult()
        break
      case apiConstants.failed:
        result = this.renderFailure()
        break
      default:
        result = null
    }
    return (
      <div className="main-container">
        <div className="container">
          <h1 className="popular">Popular</h1>
          <ul className="filter-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                activeTabId={activeTabId}
                languageDetails={eachItem}
                key={eachItem.id}
                onClickChangeRepoId={this.onClickChangeRepoId}
              />
            ))}
          </ul>
          {result}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
