import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateAdmin extends Component {

    constructor(props) {
        super(props);

        this.onChangeAdminEmail = this.onChangeAdminEmail.bind(this);
        this.onChangeAdminName = this.onChangeAdminName.bind(this);
        this.onChangeAdminPosition = this.onChangeAdminPosition.bind(this);
        this.onChangeAdminDeleted = this.onChangeAdminDeleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            admin_email : '',
            admin_name : '',
            admin_position : '',
            admin_deleted : false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admins/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    admin_email: response.data.admin_email,
                    admin_name: response.data.admin_name,
                    admin_position: response.data.admin_position,
                    admin_deleted: response.data.admin_deleted
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    onChangeAdminEmail(e){
        this.setState({
            admin_email : e.target.value
        });
    }

    onChangeAdminName(e){
        this.setState({
            admin_name : e.target.value
        });
    }

    onChangeAdminPosition(e) {
        this.setState({
            admin_position : e.target.value
        });
    }

    onChangeAdminDeleted(e) {
        this.setState({
            admin_deleted : !this.state.admin_deleted
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            admin_email: this.state.admin_email,
            admin_name: this.state.admin_name,
            admin_position: this.state.admin_position,
            admin_deleted: this.state.admin_deleted
        };
        console.log(obj);
        axios.post('http://localhost:4000/admins/update/'+ this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Admins</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Email: </label>
                        <input  type="email"
                                className="form-control"
                                value={this.state.admin_email}
                                onChange={this.onChangeAdminEmail}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.admin_name}
                                onChange={this.onChangeAdminName}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="positionOptions" 
                                    id="System Admin" 
                                    value="System Admin"
                                    checked={this.state.admin_position === 'System Admin'} 
                                    onChange={this.onChangeAdminPosition}
                                    />
                            <label className="form-check-label">System Admin</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="positionOptions" 
                                    id="Webmaster" 
                                    value="Webmaster" 
                                    checked={this.state.admin_position === 'Webmaster'} 
                                    onChange={this.onChangeAdminPosition}
                                    />
                            <label className="form-check-label">Webmaster</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="positionOptions" 
                                    id="Security Analyst" 
                                    value="Security Analyst" 
                                    checked={this.state.admin_position === 'Security Analyst'} 
                                    onChange={this.onChangeAdminPosition}
                                    />
                            <label className="form-check-label">Security Analyst</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="deletedCheckbox"
                                type="checkbox"
                                name="deletedCheckbox"
                                onChange={this.onChangeAdminDeleted}
                                checked={this.state.admin_deleted}
                                value={this.state.admin_deleted}
                                />
                        <label className="form-check-label" htmlFor="deletedCheckbox">
                            Delete Administrator
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Admin" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}