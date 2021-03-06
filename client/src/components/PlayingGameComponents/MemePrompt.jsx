'use strict';
import React from 'react';
import { Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class MemePrompt extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      memeText: '',
      img: undefined,
      canvas: undefined,
      ctx: undefined,
      x: undefined,
      y: undefined,
      scale: 1,
      responded: false
    }
    this.writeText = this.writeText.bind(this);
  };

  componentDidMount() {
    const self = this;
    const img = this.refs.image;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.font = '20pt sans-serif';
    img.onload = function(){
      let x = canvas.width/2 - img.width/2;
      let y = canvas.height/2 - img.height/2;
      // img.classList.add('test');
      // console.log('img.classList', img.classList);
      ctx.drawImage(img, x, y);
      // ctx.drawImage(img, x, y, img.width, img.height,
      //                    x, y, img.width, canvas.height);
      self.setState({img: img, canvas: canvas, ctx: ctx, x: x, y: y, memeText:'', responded:false}, () => {
        // self.scaleImage(.2)
        self.transformCanvas();
      });
    }
  }

  writeText(event) {
    let text = event.target.value.toUpperCase();
    this.setState({memeText: text}, () => {
      this.transformCanvas();
    });
    // ctx.textBaseline = 'top';
    // ctx.fillText(text, 20,20)
  }

  transformCanvas() {
    console.log('called trasform canvas')
    let {canvas, ctx, img, x, y, scale, memeText} = this.state;
    ctx.save();
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //scale
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width/2, -canvas.height/2);

    //redraw image
    ctx.drawImage(img,x,y)
    
    //add text: 
    ctx.lineWidth  = 5;
    ctx.font = '20pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.strokeText(memeText, canvas.width/2, canvas.height/2)
    ctx.fillText(memeText, canvas.width/2, canvas.height/2)


    ctx.restore();
  }



  render() {
    const responseForm = (
      <Form inline>
        <FormGroup controlId="formInlineResponse" bsSize="large">
          <FormControl type="text" placeholder="Meme Text..." onChange={this.writeText} value={this.state.memeText}/>
        </FormGroup>
        {' '}
        <Button onClick={() => {
            this.setState({responded: true});
            this.props.handleResponse(this.state.memeText);
          }
        }>
          Submit
        </Button>
      </Form>
    )


    return (
      <div className="meme-canvas">
        <canvas ref="canvas" width={300} height={400}>
        sorry, canvas not supported
        </canvas>
        <img style={{display: 'none'}} className="meme-image" ref="image" src={this.props.prompt}  alt={this.props.prompt}/>
        <Col id="submit-response">
          {!this.state.responded && this.props.role!=='judge' && responseForm}
          {this.state.responded && this.props.role!=='judge' && <p><b>Your response has been submitted!</b></p>}
        </Col>
      </div>
    );
  }
}

export default MemePrompt;