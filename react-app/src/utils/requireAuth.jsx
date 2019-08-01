import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent){
    class Authenticate extends Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){
                //add flash message
                this.props.history.push('/login');
            }else{
                
            }
        }

        componentWillUpdate(nextProps){
            this.props.history.push('/register')
        }

        render(){
            return (<ComposedComponent {...this.props}/>);
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.auth.isAuthenticated,
        };
    }

    return connect(mapStateToProps)(Authenticate);
}


