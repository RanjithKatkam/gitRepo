import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeTabId, onClickChangeRepoId} = props
  const {id, language} = languageDetails

  const onClickChangeId = () => {
    onClickChangeRepoId(id)
  }

  const classForTab = activeTabId === id ? 'activeTab' : ''

  return (
    <li className={classForTab} onClick={onClickChangeId}>
      <button type="button" className="link">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
