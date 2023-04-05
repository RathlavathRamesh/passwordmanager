import './index.css'
import {Component} from 'react'

class PasswordItem extends Component {
  render() {
    const {info, deletfun, ckeck} = this.props
    const {website, id, username, password} = info
    const char = website[0]
    const fs = char.toUpperCase()
    const deletecard = () => {
      deletfun(id)
    }
    console.log(ckeck)
    return (
      <li className="Item">
        <div className="profile">
          <p className="prof">{fs}</p>
          <div className="info">
            <p className="website">{website}</p>
            <p className="name">{username}</p>
            {!ckeck === true && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                alt="stars"
                className="stars"
              />
            )}
            {ckeck && <p className="name">{password}</p>}
          </div>
        </div>
        <button
          type="button"
          data-testid="delete"
          className="btn"
          onClick={deletecard}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="deleteimg"
          />
        </button>
      </li>
    )
  }
}
export default PasswordItem
