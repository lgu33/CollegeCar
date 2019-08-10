import React, {Component} from 'react';

import './SearchCard.css';
import uw_img from './uw-madison.jpeg';


class SearchCard extends Component{
    render(){
        const clickCard = (
            <div>
                <div class="">
                    <div class="card mt-3 tab-card">
                        <div class="card-header tab-card-header">
                            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">General</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Demographics</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Financial</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="four-tab" data-toggle="tab" href="#four" role="tab" aria-controls="Three" aria-selected="false">Statistics</a>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
                                <h5 class="card-title">General</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                            <div class="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
                                <h5 class="card-title">Demographics</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                            <div class="tab-pane fade p-3" id="three" role="tabpanel" aria-labelledby="three-tab">
                                <h5 class="card-title">Financial</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                            <div class="tab-pane fade p-3" id="four" role="tabpanel" aria-labelledby="three-tab">
                                <h5 class="card-title">Statistics</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
        return(

            <div className="row row-custom">
            <div className="d-flex p-2"></div>
                <div className="row"><h2 className="center-align">University of Wisconsin - Madison</h2></div>
                <div className="row">
                    <div className="col-xs-4 col-lg-4 custom-col">
                        <img src={uw_img} className="img-responsive university-image"></img>
                    </div>
                    
                    <div className="col-xs-7 col-lg-7 custom-col">
                    {clickCard}
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default SearchCard;