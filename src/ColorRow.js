import React, {Component} from 'react';
import "./ColorRow.css";
import {Button} from 'reactstrap';
import {convertHexColorToRGB} from './ColorUtils.js';

class ColorRow extends Component {

    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
    }

    onRemove() {
        if (this.props.onRemove && ('index' in this.props)) {
            this.props.onRemove(this.props.index)
        }
    }

    onEdit() {
        if (this.props.onEdit && ('index' in this.props)) {
            this.props.onEdit(this.props.index);
        }
    }

    onCancelEdit() {
        if (this.props.onCancelEdit) {
            this.props.onCancelEdit();
        }
    }

    render() {
        let rgb = convertHexColorToRGB(this.props.color);
        let coloredBlockStyle = {
            backgroundColor: this.props.color,
        }

        return (
            <tr className="color-row">
                <td>
                    <div className="row-colored-block" style={coloredBlockStyle} />
                </td>
                <td>
                    {this.props.color}
                </td>
                <td>
                    rgb({rgb.red}, {rgb.green}, {rgb.blue})
                </td>
                <td>
                    { this.props.isBeingEdited ? (
                        <Button color="primary" onClick={this.onCancelEdit}>Cancel Edit</Button>
                    ): (
                        <Button color="primary" onClick={this.onEdit}>Edit</Button>
                    )}
                    
                </td>
                <td>
                    <Button color="danger" onClick={this.onRemove}>Remove</Button>
                </td>
            </tr>
        )
    }
}

export default ColorRow;