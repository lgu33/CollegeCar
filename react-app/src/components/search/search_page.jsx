import React, {Component} from 'react';
import './search_page.css';

class SearchPage extends Component{
    render(){
        return(

            <div className="container">
                <h2>Search Specification</h2>
                <hr/>
                <p></p>
                <p></p>
                <h3>Checkboxes</h3>
                <hr/>
                <h4>Geographic</h4>
                <div className="col-sm-12">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                            Option one is this and that — be sure to include why it's great
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="" checked/>
                            <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                            Option two is checked by default
                        </label>
                    </div>
                    <div className="checkbox disabled">
                        <label>
                            <input type="checkbox" value="" disabled/>
                            <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                            Option three is disabled
                        </label>
                    </div>
                </div>

                <h4>Default example (other icon)</h4>

                <div className="col-sm-12">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i
                                className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                            Option one is this and that — be sure to include why it's great
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="" checked/>
                            <span className="cr"><i
                                className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                            Option two is checked by default
                        </label>
                    </div>
                    <div className="checkbox disabled">
                        <label>
                            <input type="checkbox" value="" disabled/>
                            <span className="cr"><i
                                className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                            Option three is disabled
                        </label>
                    </div>
                </div>

                <h4>Font awesome example</h4>

                <div className="col-sm-12">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                            Option one is this and that — be sure to include why it's great
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="" checked/>
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                            Option two is checked by default
                        </label>
                    </div>
                    <div className="checkbox disabled">
                        <label>
                            <input type="checkbox" value="" disabled/>
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                            Option three is disabled
                        </label>
                    </div>
                </div>

                <h4>Font awesome example (other icon)<br/>
                    <small>Works best with square icons =)</small>
                </h4>

                <div className="col-sm-12">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value=""/>
                            <span className="cr"><i className="cr-icon fa fa-rocket"></i></span>
                            Option one is this and that — be sure to include why it's great
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="" checked/>
                            <span className="cr"><i className="cr-icon fa fa-rocket"></i></span>
                            Option two is checked by default
                        </label>
                    </div>
                    <div className="checkbox disabled">
                        <label>
                            <input type="checkbox" value="" disabled/>
                            <span className="cr"><i className="cr-icon fa fa-rocket"></i></span>
                            Option three is disabled
                        </label>
                    </div>
                </div>

                {/*<h3>Any size you want depending on label font-size</h3>*/}

                {/*<div className="col-sm-12">*/}
                {/*<div className="checkbox">*/}
                {/*<label style={{fontSize: "2.5em"}}>*/}
                {/*<input type="checkbox" value="" checked/>*/}
                {/*<span className="cr"><i className="cr-icon fa fa-check"></i></span>*/}
                {/*Huge*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*<div className="checkbox">*/}
                {/*<label style={{fontSize: "2em"}}>*/}
                {/*<input type="checkbox" value="" checked/>*/}
                {/*<span className="cr"><i className="cr-icon fa fa-check"></i></span>*/}
                {/*Big*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*<div className="checkbox">*/}
                {/*<label style={{fontSize: "1.5em"}}>*/}
                {/*<input type="checkbox" value="" checked/>*/}
                {/*<span className="cr"><i className="cr-icon fa fa-check"></i></span>*/}
                {/*Bigger*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*<div className="checkbox">*/}
                {/*<label style={{fontSize: "1em"}}>*/}
                {/*<input type="checkbox" value="" checked/>*/}
                {/*<span className="cr"><i className="cr-icon fa fa-check"></i></span>*/}
                {/*Default*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*<div className="checkbox">*/}
                {/*<label style={{fontSize: ".8em"}}>*/}
                {/*<input type="checkbox" value="" checked/>*/}
                {/*<span className="cr"><i className="cr-icon fa fa-check"></i></span>*/}
                {/*Smaller*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*<div className="checkbox">*/}
                {/*<label style={{fontSize: ".5em"}}>*/}
                {/*<input type="checkbox" value="" checked/>*/}
                {/*<span className="cr"><i className="cr-icon fa fa-check"></i></span>*/}
                {/*Small*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*</div>*/}
            </div>


        );
    }
}

export default SearchPage;
