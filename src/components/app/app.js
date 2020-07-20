import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list'
import PostListForm from '../post-list-form'

//css import

import './css/app-header.css';
import './css/app.css';
import './css/index.css';
import './css/post-add-form.css';
import './css/post-list-item.css';
import './css/post-list.css';
import './css/post-status-filter.css';
import './css/search-panel.css';

export default class App extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            data : [ 
                {label:'Going to learn react' , important : false , id : 1},
                {label:'That is good' , important : false , id : 2},
                {label:'I need a breal...' , important : false , id : 3}
            ],
            term : '',
            filter : 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0 , index) , ...data.slice(index + 1)];
            return {
                data : newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label : body ,
            important : false ,
            id : this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data , newItem];
            return {
                data : newArr
            }
        })
    }
    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old , important : !old.important};
            
            const newArr = [...data.slice(0 , index) , newItem , ...data.slice(index + 1)];

            return {
                data : newArr
            }
        })
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old , like : !old.like};
            
            const newArr = [...data.slice(0 , index) , newItem , ...data.slice(index + 1)];

            return {
                data : newArr
            }
        })
    }

    searchPost(items , term) {
        if(term.length === 0) {
            return items
        } 
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    filterPost(items , filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }
    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data , term , filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data , term) , filter);

        return (
            <div className="app">
                 <AppHeader
                 liked={liked}
                 allPosts={allPosts}/>
                 <div className="search-panel d-flex">
                     <SearchPanel
                     onUpdateSearch={this.onUpdateSearch}/>
                     <PostStatusFilter
                     filter={filter}
                     onFilterSelect={this.onFilterSelect}/>
                 </div>
                 <PostList posts={visiblePosts}
                 onDelete={this.deleteItem}
                 onToggleLike={this.onToggleLike}
                 onToggleImportant={this.onToggleImportant}/>
                 <PostListForm 
                 onAdd={this.addItem}/>
            </div>
         )
    }

   
}

