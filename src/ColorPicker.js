import React, {Component} from 'react';
import './ColorPicker.css';
import {Row, Col, Container, Alert, Button} from 'reactstrap';
import {convertRGBColorToHexCode, convertHexColorToRGB, isValidHexColorCode} from './ColorUtils';
import ColorSlider from './ColorSlider';

class ColorPicker extends Component {

    constructor(props) {
        super(props);

        /*
            The state is lifted in order to be able to change
            the current color form outside the component.
        */

        this.onHexInputChanged = this.onHexInputChanged.bind(this);
        this.onRedChanged = this.onRedChanged.bind(this);
        this.onGreenChanged = this.onGreenChanged.bind(this);
        this.onBlueChanged = this.onBlueChanged.bind(this);
        this.onFinishedPicking = this.onFinishedPicking.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    onFinishedPicking() {
        // onFinish callback is only called on valid hex code colors.
        if (this.props.onFinished && isValidHexColorCode(this.props.color)) {
            this.props.onFinished();
        }
    }

    onHexInputChanged(event) {
        if (this.props.onColorUpdate) {
            this.props.onColorUpdate(event.target.value)
        }
    }

    onColorUpdated(color) {
        if (this.props.onColorUpdate) {
            this.props.onColorUpdate(convertRGBColorToHexCode(color))
        }
    }

    onRedChanged(red) {
        let currentColor = {red:0, green:0, blue:0};
        if (isValidHexColorCode(this.props.color)) {
            currentColor = convertHexColorToRGB(this.props.color);
        }
        currentColor.red = red;
        this.onColorUpdated(currentColor);
    }

    onGreenChanged(green) {
        let currentColor = {red:0, green:0, blue:0};
        if (isValidHexColorCode(this.props.color)) {
            currentColor = convertHexColorToRGB(this.props.color);
        }
        currentColor.green = green;
        this.onColorUpdated(currentColor);
    }

    onBlueChanged(blue) {
        let currentColor = {red:0, green:0, blue:0};
        if (isValidHexColorCode(this.props.color)) {
            currentColor = convertHexColorToRGB(this.props.color);
        }
        currentColor.blue = blue;
        this.onColorUpdated(currentColor);
    }

    render() {
        let colorRGB = {red: 0, green: 0, blue: 0};
        if (isValidHexColorCode(this.props.color)) {
            colorRGB = convertHexColorToRGB(this.props.color);
        }
        let coloredBlockStyle = {
            backgroundColor: this.props.color,
            boxShadow: "0px 0px 2px 2px " + this.props.color
        };     

        console.log("Render");

        return (
            <Container fluid className="color-picker">
                <Row><Col><h4>{this.props.title}</h4></Col></Row>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ColorSlider 
                            name="Red"
                            colorValue={colorRGB.red}
                            onChange={this.onRedChanged} />
                        <ColorSlider 
                            name="Green"
                            colorValue={colorRGB.green}
                            onChange={this.onGreenChanged} />
                        <ColorSlider 
                            name="Blue"
                            colorValue={colorRGB.blue}
                            onChange={this.onBlueChanged} />

                        <hr />
                        <Row>
                            <Col xs="2">Hex:</Col>
                            <Col>
                                <input 
                                    type="text" 
                                    value={this.props.color}
                                    onChange={this.onHexInputChanged} />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="colored-block" 
                        style={coloredBlockStyle}/>
                </Row>
                <hr/>
                { !isValidHexColorCode(this.props.color) &&
                    <Alert color="danger">
                        Invalid hex code!
                    </Alert>
                }
                <Row>
                    <Col>
                        <div className="float-right">
                            { this.props.showCancel && 
                                <Button
                                    className="color-form-button"
                                    color="danger"
                                    onClick={this.onCancel}>
                                        Cancel
                                </Button>
                            }
                            <Button
                                className="color-form-button"
                                color="primary"
                                onClick={this.onFinishedPicking}>
                                    {this.props.buttonText}
                            </Button>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ColorPicker;