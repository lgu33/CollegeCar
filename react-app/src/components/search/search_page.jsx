import React, {Component} from 'react';
import './search_page.css';


class SearchPage extends Component {
    createSelectItems() {
        let items = ['','Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        for (let i = 1; i <= 58; i++) {
            items.push(<option key={i} value={items[i]}>{items[i]}</option>);

        }
        return items;
    }


    render() {
        return (

            <div className="container">
                <h2>Search Specification</h2>
                <hr/>
                <h4>Geographic</h4>
                <div className="col-sm-12">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary" type="button">States</button>
                        </div>
                        {/*<option value="39">TX</option>*/}
                        <select className="custom-select" id="inputGroupSelect03">
                            <option value = "0"> choose...</option>
                            {this.createSelectItems()}

                        </select>
                    </div>
                    <br/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary" type="button">City</button>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label=""
                               aria-describedby="basic-addon1"/>
                    </div>
                    <br/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary" type="button">Zipcode</button>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label=""
                               aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <hr/>
                <h4>Ethnicity</h4>
                <div className="col-sm-12">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Predominantly Black
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Historically Black
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Annh
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Tribal
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Aanipi
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Hispanic
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Nant
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Minority Serving Nant
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Men Only
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Women Only
                        </label>
                    </div>

                </div>
                <hr/>
                <h4>Addmission Rate and Tuition</h4>

                <div className="col-sm-12">
                    <small>Addmission Rate</small>
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button">Less than</button>
                            </div>
                            <input type="text" className="form-control" placeholder="" aria-label=""
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button">More than</button>
                            </div>
                            <input type="text" className="form-control" placeholder="" aria-label=""
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <small>Tuition</small>
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button">Less than</button>
                            </div>
                            <input type="text" className="form-control" placeholder="" aria-label=""
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button">More than</button>
                            </div>
                            <input type="text" className="form-control" placeholder="" aria-label=""
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default SearchPage;
