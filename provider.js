import React, { Component } from 'react'

export const Context = React.createContext()
class Provider extends Component {
  constructor(props) {
    super(props)
    this.toggleSiteVisibility = this.toggleSiteVisibility.bind(this)

    this.state = {
      // Global
      isPageVisible: true,
    }
  }

  toggleSiteVisibility() {
    this.setState({
      isPageVisible: !this.state.isPageVisible,
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          toggleSiteVisibility: (url) => this.toggleSiteVisibility(url),
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider
