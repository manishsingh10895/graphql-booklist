import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { link } from 'fs';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './bookDetails';

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    displayBooks() {
        let data = this.props.data;

        if (data.loading) {
            return (
                <div>
                    Loading Books....
                </div>
            )
        }

        return data.books.map(book => {
            return (
                <li onClick={this.showBookDetails.bind(this, book.id)} key={book.id} className="book-item"> {book.name} </li>
            )
        });
    }

    showBookDetails(id) {

        this.setState({
            selected: id
        });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>

                <BookDetails bookId={this.state.selected} ></BookDetails>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);