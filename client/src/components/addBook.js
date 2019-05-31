import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { link } from 'fs';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import './addBook.scss';

class AddBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
    }

    _renderAuthorOptions() {
        console.log(this.props);
        let data = this.props.getAuthorsQuery;

        if (!data.loading) {
            return data.authors.map(author => {

                return (<option key={author.id} value={author.id} >{author.name}</option>)
            });
        } else {
            return (<option >Loading...</option>)
        }
    }

    _changeHandler(e) {
        let name = e.target.name;

        this.setState({
            [name]: e.target.value
        });

        console.log(this.state);
    }

    addBook(e) {
        let data = this.props.getAuthorsQuery;

        e.preventDefault();

        console.log(this.state);

        this.props.addBookMutation({
            variables: {
                ...this.state,
            },
            refetchQueries: (res) => {
                console.log(res);
                return [
                    { query: getBooksQuery }
                ]
            }
        });
    }

    render() {
        console.log(this.props);
        return (
            <form id="add-book" onSubmit={this.addBook.bind(this)}>
                <div className="field">
                    <label htmlFor="book-input">Book Name</label>
                    <input type="text" name="name" onChange={this._changeHandler.bind(this)} id="book-input" />
                </div>

                <div className="field">
                    <label htmlFor="genre-input">Genre</label>
                    <input type="text" id="genre-input" name="genre" onChange={this._changeHandler.bind(this)} />
                </div>

                <div className="field">
                    <label htmlFor="author-input">Author: </label>
                    <select name="author-select" id="author-input" name="authorId" onChange={this._changeHandler.bind(this)}>
                        <option >Select Author</option>
                        {this._renderAuthorOptions()}
                    </select>
                </div>

                <div className="actions">
                    <button onClick={this.addBook.bind(this)} className="action">Add Book</button>
                </div>
            </form>
        )
    }
}


export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook)