import React, { Component } from 'react';
import Axios from 'axios'

const URL_API = 'http://localhost:8080/'

class filterBE extends Component {
    state = {
        data : []
    }

    componentDidMount () {
        this.getDataApi()
    }

    getDataApi = () => {
        Axios.get(URL_API + 'getalldata')
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderTable = () => {
        let jsx = this.state.data.map(val => {
            return (
                <tr>
                    <td>{val.PassengerId}</td>
                    <td>{val.Name}</td>
                    <td>{val.Sex}</td>
                    <td>{val.Age}</td>
                    <td>{val.Pclass}</td>
                    <td>{val.Survived}</td>
                </tr>
            )
        })

        return jsx
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Class</th>
                        <th>Survived</th>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default filterBE;