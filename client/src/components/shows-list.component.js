import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Show = props => (
    <tr>
        <td>{props.show.username}</td>
        <td>{props.show.title}</td>
        <td>{props.show.site}</td>
        <td>{props.show.episodes}</td>
        <td>
            <Link to={"/edit/" + props.show._id}>edit</Link> | <a href="/" onClick={() => { props.deleteShow(props.show._id) }}>delete</a>
        </td>
    </tr>
)

export default class ShowsList extends Component {
    constructor(props) {
        super(props);

        this.deleteShow = this.deleteShow.bind(this);

        this.state = {shows: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/shows/')
            .then(response => {
                this.setState({shows: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteShow(id) {
        axios.delete('http://localhost:5000/shows/' + id)
            .then(res => console.log(res.data));

        this.setState({
            shows: this.state.shows.filter(el => el._id !== id)
        })
    }

    showList() {
        return this.state.shows.map(currentshow => {
            return <Show show={currentshow} deleteShow={this.deleteShow} key={currentshow._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Recently Watched</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Site</th>
                            <th>Episodes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showList() }
                    </tbody>
                </table>
            </div>
        )
    }
}