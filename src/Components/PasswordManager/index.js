import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../Password Item'

class PasswordManager extends Component {
  state = {
    nopasswords: true,
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    paswrdsCount: 0,
    searcInput: '',
    checked: false,
  }

  getwebsite = event => {
    const websiteval = event.target.value
    this.setState({website: websiteval})
  }

  getusername = event => {
    const usernme = event.target.value
    this.setState({username: usernme})
  }

  password = event => {
    const pass = event.target.value
    this.setState({password: pass})
  }

  getinput = event => {
    const {passwordsList, website} = this.state
    const serch = event.target.value
    const serchfilter = passwordsList.filter(each =>
      each.website.toLowerCase().includes(serch.toLowerCase()),
    )
    this.setState(prev => {
      if (serchfilter.length >= 1) {
        return {passwordsList: serchfilter, paswrdsCount: serchfilter.length}
      }
      return {nopasswords: true, paswrdsCount: 0}
    })
  }

  submit = event => {
    event.preventDefault()
    const {username, website, password, passwordsList} = this.state
    console.log('SubmitBtn Is Clicked')
    const item = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prev => ({
      passwordsList: [...passwordsList, item],
      nopasswords: false,
      username: '',
      website: '',
      password: '',
      paswrdsCount: prev.paswrdsCount + 1,
    }))
  }

  deletecasrd = id => {
    const {passwordsList} = this.state
    const filtered = passwordsList.filter(each => each.id !== id)
    this.setState(prev => {
      if (prev.paswrdsCount === 1) {
        return {nopasswords: true, paswrdsCount: 0, passwordsList: []}
      }
      return {passwordsList: filtered, paswrdsCount: prev.paswrdsCount - 1}
    })
  }

  check = () => {
    const {checked} = this.state
    this.setState(prev => ({checked: !prev.checked}))
  }

  render() {
    const {
      website,
      nopasswords,
      username,
      password,
      passwordsList,
      paswrdsCount,
      checked,
    } = this.state
    console.log(checked)
    return (
      <div className="bgContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className=" img"
        />
        <div className="middle">
          <div className="frontCard">
            <form className="fcard">
              <h1 className="pheading">Add New Password</h1>
              <div className="srchcard">
                <img
                  className="serchimgs"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                />
                <input
                  type="text"
                  className="input"
                  value={website}
                  placeholder="Enter Website"
                  onChange={this.getwebsite}
                />
              </div>
              <div className="srchcard">
                <img
                  className="serchimgs"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                />
                <input
                  type="text"
                  className="input"
                  value={username}
                  placeholder="Enter Username"
                  onChange={this.getusername}
                />
              </div>
              <div className="srchcard">
                <img
                  className="serchimgs"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  className="input"
                  value={password}
                  placeholder="Enter  Password"
                  onChange={this.password}
                />
              </div>
              <div className="btncard">
                <button
                  className="submtbtn"
                  type="submit"
                  onClick={this.submit}
                >
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="sideimg"
            />
          </div>
        </div>
        <div className="middle">
          <div className="frontCard2">
            <div className="hori">
              <div className="countcard">
                <h1 className="pheading">Your Passwords</h1>
                <p className="mscount">{paswrdsCount}</p>
              </div>
              <div className="srchcard4">
                <img
                  className="serchimgs"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                />
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  onChange={this.getinput}
                />
              </div>
            </div>
            <hr />
            <div className="checkboxContainer">
              <input type="checkbox" id="Show passwords" onClick={this.check} />
              <label htmlFor="Show passwords">Show passwords</label>
            </div>
            {nopasswords && (
              <div className="nopascont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="nopsimg"
                />
                <p className="nopasswordpara">No Passwords</p>
              </div>
            )}
            {!nopasswords && (
              <ul className="passwords">
                {passwordsList.map(each => (
                  <PasswordItem
                    info={each}
                    key={each.id}
                    deletfun={this.deletecasrd}
                    ckeck={checked}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
