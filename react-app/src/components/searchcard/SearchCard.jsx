import React, {Component} from 'react';

import './SearchCard.css';
import uw_img from './uw-madison.jpeg';


class SearchCard extends Component{
    render(){
        const clickCard = (
            <div>
                <div class="" style = {{minHeight: '340px'}}>
                    <div class="card mt-3 tab-card" >
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

                        <div class="tab-content" id="myTabContent"  style={{minHeight: '200px'}}>
                            <div class="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
                                <h5 class="card-title">General</h5>
                                <p>
                                    Region: {"Great Lakes"} <br/>
                                    States: {"Wisconsin"} <br/>
                                    City: {"Madison"} <br/>
                                </p>
                            </div>
                            <div class="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab" >
                                <h5 class="card-title">Demographics</h5>
                                <p>
                                    Number of Students: {"???????"} <br/>
                                    Minority Serving Predominantly Black: {"YES"} <br/>
                                    Minority Serving Historically Black: {"YES"} <br/>
                                    Minority Serving Annh: {"YES"} <br/>
                                    Minority Serving Tribal: {"YES"} <br/>
                                    Minority Serving Hispanic: {"YES"} <br/>
                                    Minority Serving Aanipi: {"YES"} <br/>
                                    Minority Serving Nant: {"YES"} <br/>

                                </p>
                            </div>
                            <div class="tab-pane fade p-3" id="three" role="tabpanel" aria-labelledby="three-tab">
                                <h5 class="card-title">Financial</h5>
                                <p>
                                    In-state Tuition: {"$10533"} <br/>
                                    Out of State Tuition: {"$34783"} <br/>
                                </p>
                            </div>
                            <div class="tab-pane fade p-3" id="four" role="tabpanel" aria-labelledby="three-tab">
                                <h5 class="card-title">Statistics</h5>
                                <p>
                                    Admission Rate: {"%0.5381"} <br/>
                                    Completion Rate: {"%0.8723"} <br/>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>



            <hr/></div>


        );
        return(

            <div className="row row-custom" >
            <div className="d-flex p-2"></div>
                <div style = {{position:'relative', left: '80%'}}>
                <a href="#" className="btn btn-primary">More Info</a>
                </div>
                <div className="row"><h2 className="center-align">{"University of Wisconsin - Madison"}</h2></div>
                <div className="row">
                    <div className="col-xs-4 col-lg-4 custom-col" style ={{paddingTop: '2.2em', paddingLeft: '5.2em'}}>
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
