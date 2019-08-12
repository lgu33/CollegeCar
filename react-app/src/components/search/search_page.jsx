import React, {Component} from 'react';
import './search_page.css';


class SearchPage extends Component {
    createSelectItems() {
        let items =


            ['AK',
                'AL',
                'AR',
                'AS',
                'AZ',
                'CA',
                'CO',
                'CT',
                'DC',
                'DE',
                'FL',
                'FM',
                'GA',
                'GU',
                'HI',
                'IA',
                'ID',
                'IL',
                'IN',
                'KS',
                'KY',
                'LA',
                'MA',
                'MD',
                'ME',
                'MH',
                'MI',
                'MN',
                'MO',
                'MP',
                'MS',
                'MT',
                'NC',
                'ND',
                'NE',
                'NH',
                'NJ',
                'NM',
                'NV',
                'NY',
                'OH',
                'OK',
                'OR',
                'PA',
                'PR',
                'PW',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VA',
                'VI',
                'VT',
                'WA',
                'WI',
                'WV',
                'WY'];


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
                        <select className="custom-select" id="inputGroupSelect03">
                            <option value="0"> choose...</option>
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

                        <div className="funkyradio">
                            <div className="funkyradio-default">
                                <input type="radio" name="radio" id="radio1"/>
                                <label htmlFor="radio1">first</label>
                            </div>
                            <div className="funkyradio-primary">
                                <input type="radio" name="radio" id="radio2"/>
                                <label htmlFor="radio2">second</label>
                            </div>
                        </div>

                </div>
                <hr/>
                <button type="button" className="btn btn-primary" style = {{marginBottom: '5em'}}>Search</button>
            </div>

        );
    }
}

export default SearchPage;
