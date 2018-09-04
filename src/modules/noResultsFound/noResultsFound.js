import React, { Component } from 'react';
import SearchPurple from '../../resources/images/Search_Purple.svg'


export default class NoResultsFound extends Component {

    render() {
      return( <div>
            <div className="product-search-result-not-found"><img src={SearchPurple}/></div>
              <div className="sorry-no-results-found"><p>Sorry no results found</p></div>
            <div className =" please-try-searching-with-another-criteria">Please try searching with another criteria</div>
        </div>
      )
    }

}