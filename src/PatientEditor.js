import React, { Component } from 'react';
import './PatientEditor.css'

const PatientEditor = ({id, name, email, phone, onSubmit, onValueChange}) => {
    return (
        <div className="patient-editor">
            <form className="form" onSubmit={() => onSubmit({id, name, email, phone})}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" 
                        className="form-control" 
                        name="email"   
                        onChange={onValueChange}    
                        value={email}                       
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" 
                        className="form-control" 
                        name="name"
                        onChange={onValueChange}    
                        value={name}                       
                    />
                </div>  
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" 
                        className="form-control" 
                        name="phone"
                        onChange={onValueChange}       
                        value={phone}                                         
                    />
                </div>                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default PatientEditor