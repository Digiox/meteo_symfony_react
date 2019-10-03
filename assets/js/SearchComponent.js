import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }
const datas = [
  {
    title: "Apt",
    lat: "43.883333",
    long: "5.400000"
  },
  {
    title: "Toulouse",
    lat: "43.600000",
    long: "1.433333"
  },
  {
    title: "Paris",
    lat: "48.866667",
    long: "2.333333"
  },
]

const source = _.times(datas.length, (index) => ({
  title: datas[index].title
}))

export default class SearchExampleStandard extends Component {
 constructor(){
   super();
   this.state = { isLoading: false, results: [], value: '' }

   this.handleResultSelect = this.handleResultSelect.bind(this)
 }
  getLat = (city) =>  {
    for ( let i = 0; i < datas.length; i++){
      if(datas[i].title === city){
        return datas[i].lat
      }
    }
    
    return data
  }
  getLong = (city) =>  {
    for ( let i = 0; i < datas.length; i++){
      if(datas[i].title === city){
        return datas[i].long
      }
    }
    
    
  }

  handleResultSelect = (e, { result }) => {this.setState({ value: result.title }); this.props.getSearchedCity(result.title, this.getLat(result.title), this.getLong(result.title))}

  handleSearchChange = (e, { value }) => {
    console.log(value);
    
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      console.log(re);
      
      const isMatch = (result) => re.test(result.title)
      console.log(isMatch);
      

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 1000)
  }

  render() {
    console.log(source);
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search className="searchBar"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            showNoResults={false}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}