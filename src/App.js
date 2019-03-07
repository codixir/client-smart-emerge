import React, { Component } from 'react';
import gql from 'graphql-tag';
import client from './apollo-client';
import './App.css';
import PatientEditor from './PatientEditor';
import PatientViewer from './PatientViewer';

export const GET_PATIENTS = gql`
  query GetPatients {
    getPatients {
      id
      name
      email
      phone
    }
  }
`;

const ADD_PATIENT = gql`
  mutation GetPatients($name: String!, $email: String!, $phone: String!) {
    create(name: $name, email: $email, phone: $phone) {
      id,
      name,
      email,
      phone
    }
  }
`;

const EDIT_PATIENT = gql`
  mutation GetPatients($id: Int!, $name: String!, $email: String!, $phone: String!) {
    update(id: $id, name: $name, email: $email, phone: $phone) {
      id,
      name,
      email,
      phone
    }
  }
`;

const DELETE_PATIENT = gql`
  mutation GetPatients($id: Int!) {
    delete(id: $id) {
      id
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: '',
      email: '',
      phone: '',  
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onEdit(patient) {
    this.setState({id: patient.id});
    this.setState({name: patient.name});
    this.setState({email: patient.email});
    this.setState({phone: patient.phone});    
  }

  onDelete(patient) {
    const id = patient.id;

    async function asyncCall() {
      await client.mutate({
          variables: ({id}),
          mutation: DELETE_PATIENT,
          refetchQueries: () => [{query: GET_PATIENTS}],
      });
    }

    asyncCall()
  }

  onSubmit(props) {
      const {id, name, email, phone } = props;

      async function asyncCall() {
          if (!id) {
              await client.mutate({
                  variables: ({name, email, phone}),
                  mutation: ADD_PATIENT,
                  refetchQueries: () => [{query: GET_PATIENTS}],
              });
          } else {
              await client.mutate({
                  variables: ({id, name, email, phone}),
                  mutation: EDIT_PATIENT,
                  refetchQueries: () => [{query: GET_PATIENTS}],
              });
          }
      }

      asyncCall()

      this.setState({
          id: 0,
          name: '',
          email: '',
          phone: ''
      })
  }

  onValueChange(e) {
    const name = e.target.name;

    switch(name) {
      case 'email':
        this.setState({email: e.target.value});
        break;
      case 'name':
        this.setState({name: e.target.value});
        break;
      case 'phone':
        this.setState({phone: e.target.value});
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">    
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <PatientEditor 
                id={this.state.id}
                name={this.state.name}
                email={this.state.email}
                phone={this.state.phone}
                onSubmit={this.onSubmit}
                onValueChange={this.onValueChange}
              />
            </div>
            <div className="col-md-8">              
              <PatientViewer 
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            </div>
          </div>
        </div>
      </div>        
    );
  }
}

export default App