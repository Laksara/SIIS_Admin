import React, {Component} from 'react';
import axios from 'axios';

export default class CreateAdmin extends Component{

    constructor(props){
        super(props);

        this.onChangeAdminEmail = this.onChangeAdminEmail.bind(this);
        this.onChangeAdminName = this.onChangeAdminName.bind(this);
        this.onChangeAdminPosition = this.onChangeAdminPosition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            admin_email : '',
            admin_name : '',
            admin_position : '',
            admin_deleted : false
        }
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

    onSubmit(e){
        e.preventDefault();
        console.log(`Form submitted`);
        console.log(`Admin Email: ${this.state.admin_email}`);
        console.log(`Admin Name: ${this.state.admin_name}`);
        console.log(`Admin Position: ${this.state.admin_position}`);
        console.log(`####################################################`);

        const newAdmin = {
            admin_email: this.state.admin_email,
            admin_name : this.state.admin_name,
            admin_position : this.state.admin_position,
            admin_deleted : this.state.admin_deleted
        }

        axios.post('http://localhost:4000/admins/add', newAdmin)
            .then(res => console.log(res.data));
            

        this.setState({
            admin_email : '',
            admin_name : '',
            admin_position : '',
            admin_deleted : false
        })
    }


    render(){
        return(
            <div style = {{marginTop : 10}}>
                <h3>Create Administrator</h3>
                <form onSubmit = {this.onSubmit}>
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
                                    checked={this.state.admin_position ==='System Admin'} 
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
                                    checked={this.state.admin_position==='Security Analyst'} 
                                    onChange={this.onChangeAdminPosition}
                                    />
                            <label className="form-check-label">Security Analyst</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Admin" className="btn btn-primary" />
                    </div>

                </form>

            </div>
        );
    }
}
