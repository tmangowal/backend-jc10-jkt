import React from 'react';
import Axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import swal from 'sweetalert'

const urlApi = 'http://localhost:8080/'


class App extends React.Component {
  state = {
    data : [],
    inputTodo: '',
    selectInput: '',
    selectedFile: null,
    products: [],
    productName: ''
  }

  componentDidMount () {
    this.getDataApi()
  }

  getDataApi = () => {
    Axios.get(urlApi + 'get')
    .then(res => {
      this.setState({products: res.data})
    })
    .catch(err => {
      console.log(err)
      alert('System Error')
    })
  }

  renderTodo = () => {
    // let jsx = this.state.data.map((val, idx) => {
    //   return(
    //     <tr>
    //       <td>{idx + 1}</td>
    //       <td>{val.action}</td>
    //       <td>{val.isCompleted ? 'Done' : 'Pending'}</td>
    //       <td><input onClick={() => this.onBtnDeleteHandler(val.id)} type="button" value="DELETE" className="btn btn-danger"/></td>
    //       <td><input onClick={() => this.onCompleteAction(val.id)} type="button" value="Complete Action" className={"btn btn-secondary " + (val.isCompleted ? 'disabled' : null)}/></td>
    //     </tr>
    //   )
    // })

    // return jsx
  }

  onCompleteAction = (id) => {
    Axios.put(urlApi + 'completeaction', {id: id})
    .then(res => {
      console.log(res)
      swal('Success', 'Successfully completed action', 'success')
      this.getDataApi()
    })
    .catch(err => {
      alert('Error')
      console.log(err)
    })
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

  onSubmit = () => {
    var fd = new FormData()
    fd.append('aneh', this.state.selectedFile, this.state.selectedFile.name)
    fd.append('productName', this.state.productName)

    console.log(this.state.productName)

    Axios.post('http://localhost:8080/uploadimage', fd)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderProducts = () => {
    let jsx = this.state.products.map(val => {
      return(
        <tr>
          <td>{val.id}</td>
          <td>{val.product_name}</td>
          <td><img src={urlApi + val.product_image} width="200px" alt=""/></td>
          {/* src="http://localhost:8080/files/PRD-124y23r12.jpeg" */}
        </tr>
      )
    })
    return jsx
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
              <th>Button</th>
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
        <hr/>
        <div className="row">
          <div className="col-4">
            <input type="text" className="form-control" onChange={e => this.setState({productName: e.target.value})} placeholder="Product Name"/>
          </div>
          <div className="col-4">
            <input type="file" ref="fileBtn" className="d-none" onChange={e => this.setState({selectedFile: e.target.files[0]})} />
            <input type="button" onClick={() => this.refs.fileBtn.click()} value="Select a file" className="btn btn-block btn-primary"/>
          </div>
          <div className="col-4">
            <input type="button" onClick={this.onSubmit} value="Submit" className="btn btn-block btn-success"/>
          </div>
        </div>
        <hr/>
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
          </thead>
          <tbody>
            {this.renderProducts()}
          </tbody>

        </table>
      </div>
    )
  }
}

export default App;
