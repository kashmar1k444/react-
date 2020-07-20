import React, { Component } from 'react';

export default class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term : ''
        }
        this.omUpdateSearch = this.omUpdateSearch.bind(this)
    }
    
    omUpdateSearch(e) {
        const term = e.target.value;

        this.setState({
            term            
        });
        this.props.onUpdateSearch(term);
    }
    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записях"
                onChange={this.omUpdateSearch}
            />
        )
    }
}
