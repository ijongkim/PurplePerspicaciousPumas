'use strict';
import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

class PlayerResponseEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  componentDidMount () {
    let img = this.refs.image;
    let self = this;
    img.onload = function () {
      const viewer = Raphael.sketchpad("viewer", {
        width: img.width,
        height: img.height,
        strokes: JSON.parse(self.props.response[0]),
        editing: false
      });
    }
  }

  render() {
    return (
        <Col>
          <ListGroupItem >
            <div id="editor-image-wrapper">
              <b>{this.props.response[1]}:</b> <img ref="image" src={this.props.prompt} />
              <div style={{position:'absolute', left: '0px', top:'0px', 'zIndex':99}}>
                <div id="viewer" ></div>
              </div>
            </div>
          </ListGroupItem>
        </Col>
    )
  }
}



export default PlayerResponseEntry