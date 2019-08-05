import React, {Component} from 'react';
import './search_page.css';




class SearchPage extends Component{
    render(){
        return(

            <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">

                <div className="container">
                    <h1>CheckboxRadio (no JS)</h1>
                    <hr/>

                    <p>This snippet allows you create nice animated checkboxes and radios without JavaScript. <br/>Just
                        put <code><span className="cr"><i
                            className="cr-icon glyphicon glyphicon-ok"></i></span></code> right after your checkbox or
                        radio.</p>
                    <p>Other markup was copied from <a href="http://getbootstrap.com/css/#forms" target="_blank">Bootstrap
                        example</a>.</p>
                    <h2>Checkboxes</h2>
                    <hr/>

                    <h3>Default example</h3>

                    <div className="col-sm-12">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="">
                                    <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="checkbox disabled">
                            <label>
                                <input type="checkbox" value="" disabled>
                                    <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Default example (other icon)</h3>

                    <div className="col-sm-12">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="">
                                    <span className="cr"><i
                                        className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i
                                        className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="checkbox disabled">
                            <label>
                                <input type="checkbox" value="" disabled>
                                    <span className="cr"><i
                                        className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Font awesome example</h3>

                    <div className="col-sm-12">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="">
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="checkbox disabled">
                            <label>
                                <input type="checkbox" value="" disabled>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Font awesome example (other icon)<br/>
                        <small>Works best with square icons =)</small>
                    </h3>

                    <div className="col-sm-12">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="">
                                    <span className="cr"><i className="cr-icon fa fa-rocket"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-rocket"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="checkbox disabled">
                            <label>
                                <input type="checkbox" value="" disabled>
                                    <span className="cr"><i className="cr-icon fa fa-rocket"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Any size you want depending on label font-size</h3>

                    <div className="col-sm-12">
                        <div className="checkbox">
                            <label style="font-size: 2.5em">
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Huge
                            </label>
                        </div>
                        <div className="checkbox">
                            <label style="font-size: 2em">
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Big
                            </label>
                        </div>
                        <div className="checkbox">
                            <label style="font-size: 1.5em">
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Bigger
                            </label>
                        </div>
                        <div className="checkbox">
                            <label style="font-size: 1em">
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Default
                            </label>
                        </div>
                        <div className="checkbox">
                            <label style="font-size: .8em">
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Smaller
                            </label>
                        </div>
                        <div className="checkbox">
                            <label style="font-size: .5em">
                                <input type="checkbox" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                    Small
                            </label>
                        </div>
                    </div>

                    <h2>Radio</h2>
                    <hr/>

                    <h3>Default example</h3>

                    <div className="col-sm-12">
                        <div className="radio">
                            <label>
                                <input type="radio" name="o1" value="">
                                    <span className="cr"><i className="cr-icon glyphicon glyphicon-ok-sign"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="o1" value="" checked>
                                    <span className="cr"><i className="cr-icon glyphicon glyphicon-ok-sign"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="radio disabled">
                            <label>
                                <input type="radio" name="o1" value="" disabled>
                                    <span className="cr"><i className="cr-icon glyphicon glyphicon-ok-sign"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Default example (other icon)</h3>

                    <div className="col-sm-12">
                        <div className="radio">
                            <label>
                                <input type="radio" name="o2" value="">
                                    <span className="cr"><i
                                        className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="o2" value="" checked>
                                    <span className="cr"><i
                                        className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="radio disabled">
                            <label>
                                <input type="radio" name="o2" value="" disabled>
                                    <span className="cr"><i
                                        className="cr-icon glyphicon glyphicon-arrow-right"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Font awesome example</h3>

                    <div className="col-sm-12">
                        <div className="radio">
                            <label>
                                <input type="radio" name="o3" value="">
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="o3" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="radio disabled">
                            <label>
                                <input type="radio" name="o3" value="" disabled>
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Font awesome example (other icon)<br/>
                        <small>Works best with square icons =)</small>
                    </h3>

                    <div className="col-sm-12">
                        <div className="radio">
                            <label>
                                <input type="radio" name="o4" value="">
                                    <span className="cr"><i className="cr-icon fa fa-star"></i></span>
                                    Option one is this and that — be sure to include why it's great
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="o4" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-star"></i></span>
                                    Option two is checked by default
                            </label>
                        </div>
                        <div className="radio disabled">
                            <label>
                                <input type="radio" name="o4" value="" disabled>
                                    <span className="cr"><i className="cr-icon fa fa-star"></i></span>
                                    Option three is disabled
                            </label>
                        </div>
                    </div>

                    <h3>Any size you want depending on label font-size</h3>

                    <div className="col-sm-12">
                        <div className="radio">
                            <label style="font-size: 2.5em">
                                <input type="radio" name="o5" value="" checked>
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Huge
                            </label>
                        </div>
                        <div className="radio">
                            <label style="font-size: 2em">
                                <input type="radio" name="o5" value="">
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Big
                            </label>
                        </div>
                        <div className="radio">
                            <label style="font-size: 1.5em">
                                <input type="radio" name="o5" value="">
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Bigger
                            </label>
                        </div>
                        <div className="radio">
                            <label style="font-size: 1em">
                                <input type="radio" name="o5" value="">
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Default
                            </label>
                        </div>
                        <div className="radio">
                            <label style="font-size: .8em">
                                <input type="radio" name="o5" value="">
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Smaller
                            </label>
                        </div>
                        <div className="radio">
                            <label style="font-size: .5em">
                                <input type="radio" name="o5" value="">
                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                    Small
                            </label>
                        </div>
                    </div>
                </div>

        );
    }
}

export default SearchPage;
