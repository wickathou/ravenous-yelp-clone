import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term:'',
      location:'',
      sortBy:'best_match',
      searchButton:`Let's go!`
    }
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    }
    this.searchButtonText = {
      0: `Search again?`,
      1: `Other search?`,
      2: `One more time?`
    }
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  renderSortByOptions () {
    return Object.keys(this.sortByOptions).map((sortByOption)=>{
      let sortByOptionValue = this.sortByOptions[sortByOption]
      return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOption)} key={sortByOptionValue}>{sortByOption}</li>
    })
  }

  getSortByClass(sortByOption) {
    return this.state.sortBy === this.sortByOptions[sortByOption] ? 'active' : ''
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy:sortByOption
    })
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    })
  }

  handleSearch(event) {
    this.setState({
      location: event.target.text
    })
  }

  changeSearchButtonText(event) {
    const randomizer = () => Math.round(Math.random()*2)
    let randomNumber = randomizer()
    while (this.searchButtonText[randomNumber] === this.state.searchButton) {
      randomNumber = randomizer()
    }
    this.setState({
      searchButton:this.searchButtonText[randomNumber]
    })
    event.preventDefault()
  }

  handleSearchYelp(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
    event.preventDefault()
  }

  handleSearch(event) {
    this.changeSearchButtonText(event)
    this.handleSearchYelp(event)
  }

  render() {
    return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input onChange={this.handleTermChange} placeholder="Search Businesses" />
        <input onChange={this.handleLocationChange} placeholder="Where?" />
      </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>{this.state.searchButton}</a>
        </div>
    </div>
    )
  }
}

export default SearchBar