import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose, renderToStringWithData } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

    componentDidMount() {

        console.log(this.props);

    }

    _showBookDetails() {
        if (this.props.data.loading) {
            return (<div>Loading...</div>)
        }

        else {
            const { book } = this.props.data;
            console.log(this.props.data);

            if (book)
                return (
                    <div id="book-details">
                        <p> Book Details are here </p>

                        <div className="book-display">
                            Book Name: {book.name}
                        </div>
                        <div className="book-display">
                            Book Genre: {book.genre}
                        </div>
                        <div className="book-display">
                            Author: {book.author.name}
                        </div>

                        <div className="other-books">
                            Other Books by this author
                            <ul>
                                {
                                    book.author.books.map(item => {
                                        console.log(item.id);
                                        return <li key={item.id}>
                                            {item.name}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
            else return (<div>No Book selected</div>);
        }
    }

    render() {
        console.log(this.props);

        return this._showBookDetails();
    }
}


export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: { id: props.bookId }
        }
    }
})(BookDetails)
