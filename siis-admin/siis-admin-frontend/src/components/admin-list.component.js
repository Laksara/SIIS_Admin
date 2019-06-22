import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Admin = props => (
    <tr>
        <td className={props.admin.admin_deleted ? 'completed' : ''}>{props.admin.admin_email}</td>
        <td className={props.admin.admin_deleted ? 'completed' : ''}>{props.admin.admin_name}</td>
        <td className={props.admin.admin_deleted ? 'completed' : ''}>{props.admin.admin_position}</td>
        <td>
            <Link to={"/update/" + props.admin._id}>Update</Link>
        </td>
    </tr>
)

export default class AdminList extends Component {

    constructor(props) {
        super(props);
        this.state = {admins: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admins/')
            .then(response => {
                this.setState({ admins : response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/admins/')
            .then(response => {
                this.setState({ admins : response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }


    adminList() {
        return this.state.admins.map(function(currentAdmin, i){
            return <Admin admin = {currentAdmin} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Admins List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.adminList() }
                    </tbody>
                </table>
            </div>
        )
    }
}