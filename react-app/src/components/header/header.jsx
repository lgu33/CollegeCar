import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authActions';


class Header extends Component{
    
    logout(e){
        this.props.logout();
    }

    render(){


        const isAuthenticated = this.props.auth.isAuthenticated;

        const userLinksLeft = (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                        <a className="nav-link" href="#">College Review <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Search And Find</a>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Do we need a dropdown?
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Some link</a>
                                <a className="dropdown-item" href="#">Another link</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                </div>
        );

        const userLinksRight = (
            <div className="nav navbar-nav ml-auto">
                <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User Profile
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Profile</a>
                                <a className="dropdown-item" href="#">Favorites</a>
                                <a className="dropdown-item" onClick={this.logout.bind(this)}>Log Out</a>
                            </div>
                </li>
            </div>
        );

        const userSearchForm = (
            <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Quick Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        );

        const guestLinksRight = (
            <div>
                &ensp;
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
                &ensp;
                <Link to="/register" className="btn btn-primary">
                    Register
                </Link>
            </div>
        );

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <i className="fa fa-university fa-lg"></i>
                    &ensp; College Card
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                { isAuthenticated ? userLinksLeft : <div>&nbsp;</div>}
                
                {isAuthenticated ? userSearchForm:<div>&nbsp;</div>}
                
                {isAuthenticated ? userLinksRight : guestLinksRight}
                
            </nav>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logout})(Header);