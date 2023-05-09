import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = itemDetails
  return (
    <li className="list-card">
      <div className="img-container">
        <img className="repo-img" src={avatarUrl} alt={name} />
        <h1 className="name">{name}</h1>
      </div>
      <div className="div">
        <img
          className="pic"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="pic-para">{starsCount} stars</p>
      </div>
      <div className="div">
        <img
          className="pic"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="pic-para">{forksCount} forks</p>
      </div>
      <div className="div">
        <img
          className="pic"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="pic-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
