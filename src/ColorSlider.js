import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';

class ColorSlider extends Component {
    constructor(props) {
        super(props);

        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <Row>
                <Col xs="2">
                    {this.props.name}: 
                </Col>
                <Col xs="2">
                    {this.props.colorValue}
                </Col>
                <Col xs="7">    
                    <input 
                        type="range"
                        min="0"
                        max="255"
                        value={this.props.colorValue}
                        onChange={this.onValueChange}/>
                </Col>
            </Row>
        )
    }
}

export default ColorSlider;