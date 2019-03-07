import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Patient from './Patient';
import './PatientViewer.css';

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

const PatientViewer = (props) => { 
  const { onEdit, onDelete } = props;
  return (
    <Query query={GET_PATIENTS}>
      {({ loading, data }) => { 
        if (data) {
              return !loading && (
                <div className="table-container table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.getPatients.map(patient => (
                        <Patient patient={patient} onEdit={onEdit} onDelete={onDelete} />
                      ))} 
                    </tbody>
                  </table>
                </div>          
            )
          } 
        }
      }
    </Query>
  )};

  export default PatientViewer;

