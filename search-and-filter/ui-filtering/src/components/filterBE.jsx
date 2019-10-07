import React, { Component } from 'react';
import Axios from 'axios'
import querystring from 'query-string'

const URL_API = 'http://localhost:8080/'

class filterBE extends Component {
    state = {
        data : [],
        name : '',
        agemin : null,
        agemax : null,
        pclass : 0,
        gender : null,
        survived : 2,
        pClassOption : []
    }

    componentDidMount () {
        this.getDataApi()
        this.getDataPClass()
    }

    getDataApi = () => {
        let filterObj = {}

        if(this.props.location.search){
            console.log(this.props.location.search)
            filterObj = querystring.parse(this.props.location.search)
            console.log(filterObj)
        }

        Axios.get(URL_API + 'getalldata', {
            params : filterObj
        })
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataPClass = () => {
        Axios.get(URL_API + 'getpclass')
        .then(res => {
            this.setState({pClassOption : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderPClass = () => {
        let jsx = this.state.pClassOption.map(val => {
            return (
                <option value={val.pclass}>{val.pclass}</option>
            )
        })

        return jsx
    }

    onBtnSubmit = () => {
        let filterData = {}
        let {name, agemax, agemin, gender, survived, pclass} = this.state

        if(name) {
            filterData = {...filterData, name}
        }
        if(agemax && agemin) {
            filterData = {...filterData, agemax, agemin}
        }
        if(gender == 'Male' || gender == 'Female') {
            filterData = {...filterData, gender}
        }
        if(survived < 2) {
            filterData = {...filterData, survived}
        }
        if(pclass != 0) {
            filterData = {...filterData, pclass}
        }
        this.pushUrl()

        Axios.get(URL_API + 'getalldata', {
            params : filterData
        })
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    pushUrl = () => {
        let filterData = {}
        let {name, agemax, agemin, gender, pclass, survived} = this.state

        if(name) {
            filterData = {...filterData, name}
        }
        if(agemax && agemin) {
            filterData = {...filterData, agemax, agemin}
        }
        if(gender == 'Male' || gender == 'Female') {
            filterData = {...filterData, gender}
        }
        if(survived < 2) {
            filterData = {...filterData, survived}
        }
        if(pclass) {
            filterData = {...filterData, pclass}
        }

        // console.log(querystring.stringify(filterData))
        this.props.history.push('/search?'+querystring.stringify(filterData))
    }

    renderTable = () => {
        let jsx = this.state.data.map(val => {
            return (
                <tr>
                    <td>{val.PassengerId}</td>
                    <td>{val.Name}</td>
                    <td>{val.Sex == 'male' ? 'M' : 'F'}</td>
                    <td>{val.Age}</td>
                    <td>{val.Pclass == 1 ? 'Executive' : val.Pclass == 2 ? 'First Class' : 'Economy'}</td>
                    <td>{val.Survived ? 'Alive' : 'Deceased'}</td>
                </tr>
            )
        })

        return jsx
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        {/* NAMA */}
                        <input onChange={e => this.setState({name : e.target.value})} type="text" className="form-control" placeholder="Nama"/>
                    </div>
                    <div className="col-4">
                        {/* UMUR */}
                        <div className="row">
                            <div className="col-6">
                                <input onChange={e => this.setState({agemin : e.target.value})} type="number" className="form-control"/>
                            </div>
                            <div className="col-6">
                                <input onChange={e => this.setState({agemax : e.target.value})} type="number" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {/* PCLASS */}
                        <select className="form-control" onChange={e => this.setState({pclass : e.target.value})}>
                            {/* RENDER OPTION */}
                            <option value="0">PClass</option>
                            {this.renderPClass()}
                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <select className="form-control" onChange={e => this.setState({gender : e.target.value})}>
                            <option value="All">Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <select className="form-control" onChange={e => this.setState({survived : e.target.value})}>
                            <option value="2">All</option>
                            <option value="1">Survived</option>
                            <option value="0">Deceased</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <input type="button" value="SUBMIT" onClick={this.onBtnSubmit} className="btn btn-success btn-block"/>
                    </div>
                </div>
                <table className="table mt-5">
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