import React, {Component} from 'react';
import './search.css';
import PropTypes from 'prop-types';



class Search extends Component{
    createSelectItems() {
        let items = ['','Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        for (let i = 1; i <= 58; i++) {
            items.push(<option key={i} value={items[i]}>{items[i]}</option>);

        }
        return items;
    }
    render(){
        return(
            <div>
                <span className="border">
                    <div class="image" style={{height: '30em', width: '68em'}}>
                        <img scr="https://morgridge.wisc.edu/wp-content/uploads/sites/4/2017/07/Civic-Action-Plan.jpg"/>
                    </div>
                </span>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group" id="adv-search">
                                <input type="text" class="form-control" placeholder="Search for schools" />
                                <div class="input-group-btn">
                                    <div class="btn-group" role="group">
                                        <div class="dropdown dropdown-lg">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                                <form class="form-horizontal" role="form">
                                                    <div class="form-group">
                                                        <label for="filter">Filter by</label>
                                                        <select class="form-control">
                                                            <option value="0" selected>States</option>
                                                            {this.createSelectItems()}
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="contain">State</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="contain">City</label>
                                                        <input class="form-control" type="text"/>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">APPLY</button>
                                                    <button type="submit" className="btn btn-primary">MORE</button>
                                                </form>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

Search.proTypes = {

    states: PropTypes.arrayOf(PropTypes.string),
    university: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
}




export default Search;
