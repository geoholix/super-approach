import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import MapView from './MapView';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import car from '../images/car_button.svg';
import dump from '../images/dump_button.svg';
import life from '../images/life_button.svg';
import snow from '../images/snow_button.svg';
import traffic from '../images/traffic_button.svg';
import tree from '../images/tree_button.svg';

class ReportView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      featuresAround: this.props.featuresAround,
      pageStatus: 0,
      uploadImageUrl: null
    };
    this.currentSelection = {
      Category: null,
      Image: null,
      Time: null,
      Content: null,
      LikeIt: 0,
      DislikeIt: 0,
      Status: 'New',
      Flag: 0
    };
    this.featuresCount = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.featuresAround !== this.state.featuresAround) {
      this.setState({
        featuresAround: nextProps.featuresAround
      });
      if (nextProps.featuresAround) {
        this.featuresCount = nextProps.featuresAround.length;
      }
    }
  }

  goToMap = () => {
    this.props.onToggleToMapView();
  }

  createNew = () => {

  }

  handleCommentLike = (id, isLike) => {
    this.props.onCommentLike(id, isLike);
  }

  handleAddNew = () => {
    this.setState({
      pageStatus: 1
    })
  }

  handleCategorySelected = (category) => {
    this.currentSelection.Category = category
    this.setState({
      pageStatus: 2
    })
  }

  handleProceedToCamera = (evt) => {
    const input = document.getElementById('descriptionInput');
    this.currentSelection.Content = input.value;
    this.setState({
      pageStatus: 3
    })
  }

  handleUploadImageBtnClicked = () => {
    const input = document.getElementById('imageInput');
    input.click();
  }


  handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    if (file){
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.setState({
          uploadImageUrl: e.target.result
        })
      }

    }
  }

  handleProceedToConfirm = () => {
    this.currentSelection.Image = this.state.uploadImageUrl;
    this.currentSelection.Time = this.getTimeNow();
    console.log(this.currentSelection);
    this.setState({
      pageStatus: 4
    })
  }

  handleConfirmClicked = () => {
    this.setState({
      pageStatus: 5
    })
  }

  handleBackToList= () => {
    this.setState({
      pageStatus: 0
    })
  }

  getTimeNow() {
    const today = new Date();
    const date = today.toLocaleString('en-US', { month:'numeric', day: 'numeric', year: 'numeric'});
    const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
    const result = date + ' '+ time;
    return result;
  }

  render() {

    const features = this.state.featuresAround;
    let listItems = '';
    if (features) {
      listItems = features.map((feature) =>
        <CommentCardView
          key={feature.attributes.OBJECTID.toString()}
          data={feature.attributes}
          isActionDisplayed = {true}
          onCommentLike={this.handleCommentLike}
        />
      );
    }

    const styleHeight = {
      height: '100%'
    };
    return (
      <div id="reportView" className="subPage">
        { this.state.pageStatus === 0 &&
          <div>
            <div>
              <h1>Hi There!</h1>
              <h2>Help your neighborhood to grow by providing your feedback or helping evaluting the existing feedback</h2>
            </div>
            <div>
              {this.featuresCount} Nearby Comments
            </div>
            <RaisedButton label="go to map" onClick={this.goToMap}/>
            <FloatingActionButton onClick={this.handleAddNew}>
              <ContentAdd />
            </FloatingActionButton>
            <div>
              {listItems}
            </div>
          </div>

        }

        { this.state.pageStatus === 1 &&
          <div>
            <h3>Category</h3>
            <div>
              <span onClick={() => {
                  this.handleCategorySelected('Quality of Life')
                }}>
                <img src={life} alt=""/>
                <span>Quality of Life</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Parking & Vehicles')
                }}>
                <img src={traffic} alt=""/>
                <span>Parking & Vehicles</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Streets & Sidewalks')
                }}>
                <img src={car} alt=""/>

                <span>Streets & Sidewalks</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Sanitation')
                }}>
              <img src={dump} alt=""/>
                <span>Sanitation</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Winter Conditions')
                }}>
              <img src={snow} alt=""/>
                <span>Winter Conditions</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Trees & Parks')
                }}>
                <img src={tree} alt=""/>
                <span>Trees & Parks</span>
              </span>
            </div>
          </div>
        }

        { this.state.pageStatus === 2 &&
          <div>
            <h3>Please describe your issue</h3>
            <div>
              <TextField
                id = "descriptionInput"
                hintText="Description"
                multiLine={true}
                rows={1}
              />
            </div>
            <RaisedButton label="next" onClick={this.handleProceedToCamera}/>

          </div>
        }

        { this.state.pageStatus === 3 &&
          <div>
            <h3>Take Photo</h3>
            <div>
              <img src={this.state.uploadImageUrl} alt="Uploaded"/>
              <div onClick={this.handleUploadImageBtnClicked}> Upload Image</div>
              <input className="hidden" id="imageInput" type="file" accept="image/*" onChange={this.handleImageUpload}/>
            </div>
            <RaisedButton label="next" onClick={this.handleProceedToConfirm}/>

          </div>
        }

        { this.state.pageStatus === 4 &&
          <div style={styleHeight}>
            <div className="thumbNailMap">
              <MapView
                isDisplayed = {true}
                queryPoint={this.props.queryPoint}
                onQueryResultsReturned={()=>{}}
                onMapClicked={()=>{}}
                hideFeatures={true}
              />
              <CommentCardView
                data={this.currentSelection}
                onCommentLike={()=>{}}
                isActionDisplayed = {false}
              />
              <RaisedButton label="next" onClick={this.handleConfirmClicked}/>
            </div>


          </div>
        }

        { this.state.pageStatus === 5 &&
          <div>
            <div>
              <h3>Thank you</h3>
            </div>
            <RaisedButton label="next" onClick={this.handleBackToList}/>
          </div>
        }


      </div>
    )
  }
}

export default ReportView;