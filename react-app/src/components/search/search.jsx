import React, {Component} from 'react';
import './search.css';




class Search extends Component{
    render(){
        return(
            <div>
                    <span className="border">
                        <div class="image" style={{height: '30em', width: '68em'}}>
                            <img scr="https://imgpile.com/images/1bac2d838cf439a722f8868c4cdd9a0a.jpg"/>
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
                                                            <option value="1">Wisconsin</option>
                                                            <option value="2">Texas</option>
                                                            <option value="3">Washington</option>
                                                            <option value="4">New York</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="contain">State</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="contain">City</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">APPLY</button>
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

export default Search;
