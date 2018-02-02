import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import MapView from './MapView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import car from '../images/car_button.svg';
import dump from '../images/dump_button.svg';
import life from '../images/life_button.svg';
import snow from '../images/snow_button.svg';
import traffic from '../images/traffic_button.svg';
import tree from '../images/tree_button.svg';
import owl from '../images/owl.svg';
import background from '../images/bg.png';
import camera from '../images/camera.png';

class AddNewView extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.showPreviewImage = false;
  }

  handleCategorySelected = (category) => {
    if (category){
      this.currentSelection.Category = category
    }
    this.setState({
      pageStatus: 1
    })
  }

  handleProceedToCategory = () => {
    this.currentSelection.Category = null
    this.setState({
      pageStatus: 0
    })
  }

  handleProceedToCamera = () => {
    const input = document.getElementById('descriptionInput');
    this.currentSelection.Content = input.value;
    this.setState({
      pageStatus: 2,
      uploadImageUrl: null
    })
  }

  handleBackToCamera = () => {
    this.setState({
      pageStatus: 2
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
          uploadImageUrl: e.target.result,
          pageStatus: 3
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
    });
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
  }

  handleBackToList = () => {
    this.props.onToggleToReportView();
  }

  handleViewStatus = () => {
    this.props.onViewStatus();
  }

  getTimeNow() {
    const today = new Date();
    const date = today.toLocaleString('en-US', { month:'numeric', day: 'numeric', year: 'numeric'});
    const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
    const result = date + ' '+ time;
    return result;
  }

  render() {

    const styleHeight = {
      height: '100%',
      backgroundImage:"url(" + background + ")"
    };

    const bgStyle = {
      backgroundImage:"url(" + background + ")",
    };

    return (
      <div id="addNewView" className="subPage">
      { this.state.pageStatus === 0 &&
        <div className="newCommentPage" style={bgStyle}>
          <h1 className="header">Which category would you like to report?</h1>
          <div className="categoryList">
            <span className="category" onClick={() => {
                this.handleCategorySelected('Quality of Life')
              }}>
              <img src={life} alt=""/>
              <span>Quality of Life</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Parking & Vehicles')
              }}>
              <img src={traffic} alt=""/>
              <span>Parking & Vehicles</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Streets & Sidewalks')
              }}>
              <img src={car} alt=""/>

              <span>Streets & Sidewalks</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Sanitation')
              }}>
            <img src={dump} alt=""/>
              <span>Sanitation</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Winter Conditions')
              }}>
            <img src={snow} alt=""/>
              <span>Winter Conditions</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Trees & Parks')
              }}>
              <img src={tree} alt=""/>
              <span>Trees & Parks</span>
            </span>
          </div>
          <div className="bottomBar">
            <FlatButton onClick={this.handleBackToList}>
              <i className="material-icons">chevron_left</i>
              <span className="buttonLabel"> back </span>
            </FlatButton>
            <div className="stepIndicator">
              <span className="current"> </span>
              <span className="step"> </span>
              <span className="step"> </span>
            </div>
            <FlatButton label=" " className="hidden">
            </FlatButton>
          </div>
        </div>
      }

      { this.state.pageStatus === 1 &&
        <div className="newCommentPage" style={bgStyle}>
          <h1 className="header">Please describe your issue.</h1>
          <div className="textFieldContainer">
            <TextField
              id = "descriptionInput"
              hintText="Description"
              multiLine={true}
              rows={1}
            />
          </div>
          <div className="bottomBar">
            <FlatButton onClick={this.handleProceedToCategory}>
              <i className="material-icons">chevron_left</i>
              <span className="buttonLabel"> back </span>
            </FlatButton>
            <div className="stepIndicator">
              <span className="step"> </span>
              <span className="current"> </span>
              <span className="step"> </span>
            </div>
            <FlatButton onClick={this.handleProceedToCamera}>
              <span className="buttonLabel"> next </span>
              <i className="material-icons">chevron_right</i>
            </FlatButton>
          </div>

        </div>
      }

      { this.state.pageStatus === 2 &&
        <div className="newCommentPage" style={bgStyle}>
          <h1 className="header">A picture is worth a thousand words.</h1>
          <div>
            <div id="uploadImageBtn" className="uploadImageBtn" onClick={this.handleUploadImageBtnClicked}> <img src={camera} alt="upload button"/></div>
            <input className="hidden" id="imageInput" type="file" accept="image/*" onChange={this.handleImageUpload}/>
          </div>
          <div className="bottomBar">
            <FlatButton onClick={this.handleCategorySelected}>
              <i className="material-icons">chevron_left</i>
              <span className="buttonLabel"> back </span>
            </FlatButton>
            <div className="stepIndicator">
              <span className="step"> </span>
              <span className="step"> </span>
              <span className="current"> </span>
            </div>
            <FlatButton label=" " className="hidden">
            </FlatButton>
          </div>

        </div>
      }

      { this.state.pageStatus === 3 &&
        <div className="newCommentPage" style={bgStyle}>
          <div className="previewImageContainer">
              <img className="previewImage" src={this.state.uploadImageUrl} alt="thumbnail"/>
          </div>
          <div className="bottomBar">
            <FlatButton onClick={this.handleBackToCamera}>
              <i className="material-icons">chevron_left</i>
              <span className="buttonLabel"> back </span>
            </FlatButton>
            <div className="stepIndicator">
              <span className="step"> </span>
              <span className="step"> </span>
              <span className="current"> </span>
            </div>
            <FlatButton onClick={this.handleProceedToConfirm}>
              <span className="buttonLabel"> next </span>
              <i className="material-icons">chevron_right</i>
            </FlatButton>
          </div>
        </div>
      }

      { this.state.pageStatus === 4 &&
        <div style={styleHeight} className="newCommentPage thumbNailPage">
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
              isProgressDisplayed={false}
              cardMode={2}
            />
            <div className="bottomBar">
              <FlatButton onClick={this.handleBackToCamera}>
                <i className="material-icons">chevron_left</i>
                <span className="buttonLabel"> back </span>
              </FlatButton>
              <FlatButton onClick={this.handleConfirmClicked}>
                <span className="buttonLabel"> report </span>
                <i className="material-icons">chevron_right</i>
              </FlatButton>
            </div>
          </div>


        </div>
      }

      { this.state.pageStatus === 5 &&
        <div className="newCommentPage thankPage" style={bgStyle}>
          <div className="thankContainer">
            <img className = "owl" src={owl} alt="logo"/>
            <h1 className="header">Thank you for your contribution! </h1>
          </div>
          <div className="buttonContainer">
            <RaisedButton label="continue to browse" primary={true}  onClick={this.handleBackToList}/>
            <RaisedButton label="track status" onClick={this.handleViewStatus}/>
          </div>
        </div>
      }
      </div>
    );
  }

}

export default AddNewView;
