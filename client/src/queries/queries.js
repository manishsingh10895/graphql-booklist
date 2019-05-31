import { gql } from 'apollo-boost';


export const getBooksQuery = gql`
{ 
    books {
        name,
        id
    }
}
`



export const getAuthorsQuery = gql`
    { 
        authors {
            name,
            age,
            id
        }
    }
`

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name,
            genre
            author {
                name,
                age
            }
        }
    }
`

export const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            id,
            name, 
            genre,
            author {
                id
                name,
                age,
                books {
                    name,
                    genre,
                    id
                }
            }
        }
    }
`