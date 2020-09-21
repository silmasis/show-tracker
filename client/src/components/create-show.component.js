import React, { Component } from 'react';
import axios from 'axios';

export default class CreateShow extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSite = this.onChangeSite.bind(this);
        this.onChangeEpisodes = this.onChangeEpisodes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            title: '',
            site: '',
            episodes: 0,
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeSite(e) {
        this.setState({
            site: e.target.value
        });
    }

    onChangeEpisodes(e) {
        this.setState({
            episodes: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const show = {
            username: this.state.username,
            title: this.state.title,
            site: this.state.site,
            episodes: this.state.episodes,
        }

        console.log(show)

        axios.post('http://localhost:5000/shows/add', show)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Add New Show</h3>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            />
                    </div>

                    <div className="form-group">
                        <label>Site: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.site}
                            onChange={this.onChangeSite}>
                            <option value="defaultValue">Choose a Site</option>
                            <option value="Crunchyroll">Crunchyroll</option>
                            <option value="Netflix">Netflix</option>
                            <option value="Funimation">Funimation</option>
                            <option value="Amazon Prime">Amazon Prime</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Number of Episodes: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.episodes}
                            onChange={this.onChangeEpisodes}
                            />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add New Show" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}