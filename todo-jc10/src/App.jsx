import React from 'react';
import Axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const urlApi = 'http://localhost:8080/'


class App extends React.Component {
  state = {
    data : [],
    inputTodo: '',
    selectInput: ''
  }

  componentDidMount () {
    this.getDataApi()
  }

  getDataApi = () => {
    Axios.get(urlApi + 'getList')
    .then(res => {
      this.setState({data: res.data})
    })
    .catch(err => {
      console.log(err)
      alert('System Error')
    })
  }

  renderTodo = () => {
    let jsx = this.state.data.map((val, idx) => {
      return(
        <tr>
          <td>{idx + 1}</td>
          <td>{val.action}</td>
          <td>{val.isCompleted ? 'Done' : 'Pending'}</td>
          <td><input onClick={() => this.onBtnDeleteHandler(val.id)} type="button" value="DELETE" className="btn btn-danger"/></td>
        </tr>
      )
    })

    return jsx
  }

  onBtnDeleteHandler = (id) => {
    Axios.delete(urlApi + 'deletetodo/' + id)
    .then(res => {
      this.getDataApi()
    })
    .catch(err => {
      console.log(err)
      alert('System Error!')
    })
  }

  onBtnAddHandler = () => {
    let newAction = {
      action: this.state.inputTodo
    }

    Axios.post(urlApi + 'addtodo', newAction)
    .then(res => {
      this.getDataApi()
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      alert('Cannot Add Action')
    })
  }

  onBtnSearchHandler = () => {
    if(this.state.selectInput < 2){
      Axios.get(urlApi + 'getlistcompleted', {
        params: {
          parameterku: this.state.selectInput
        }
      })
      .then(res => {
        this.setState({data: res.data})
      })
      .catch(err => {
        console.log(err)
        alert('Error')
      })
    }else{
      this.getDataApi()
    }
  }

  render(){
    return(
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Action</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTodo()}
          </tbody>
          <tfoot>
            <tr>
              <td><input onChange={e => this.setState({inputTodo: e.target.value})} type="text" className="form-control"/></td>
              <td><input type="button" onClick={this.onBtnAddHandler} value="Add Todo" className="btn btn-primary"/></td>
              <td>
                <select onChange={(a) => this.setState({selectInput: a.target.value})} className="form-control">
                  <option value="2">All</option>
                  <option value="1">Done</option>
                  <option value="0">Pending</option>
                </select>
              </td>
              <td><input type="button" value="Search" onClick={this.onBtnSearchHandler} className="btn btn-success"/></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default App;
