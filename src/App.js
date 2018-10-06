import React, { Component } from 'react';
import {Container, Row, Col, Table} from 'reactstrap';
import './App.css';
import ColorRow from './ColorRow.js';
import ColorPicker from './ColorPicker';

class App extends Component {

    constructor(props) {
        super(props);

        /*
            All the state is lifted to this Component.

            For example `pickerColor` needs to change in this Component when edititing a color.
        */
        this.state = {
            pickerColor: "#000",
            colors: [ "#FFF", "#000", "#F00"],
            isEditing: false,
            rowEditing: -1 // this is the index of the color in the colors array.
        };

        this.onAddColor = this.onAddColor.bind(this);
        this.onRemoveColor = this.onRemoveColor.bind(this);
        this.onStartEditingColor = this.onStartEditingColor.bind(this);
        this.onEditColor = this.onEditColor.bind(this);
        this.onPickerColorUpdate = this.onPickerColorUpdate.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
    }

    onPickerColorUpdate(color) {
        this.setState({
            pickerColor: color
        });
    }

    onCancelEdit() {
        this.setState({
            pickerColor: "#000",
            isEditing: false,
            rowEditing: -1
        });
    }

    onAddColor() {
        let colors = this.state.colors;
        colors.push(this.state.pickerColor);
        this.setState({
            colors: colors
        });
    }

    onEditColor() {
        let colors = this.state.colors;
        colors[this.state.rowEditing] = this.state.pickerColor;
        this.setState({
            pickerColor: "#000",
            colors: colors,
            isEditing: false,
            rowEditing: -1
        });
    }

    onStartEditingColor(index) {
        this.setState({
            pickerColor: this.state.colors[index],
            isEditing: true,
            rowEditing: index
        })
        /*
            If the list is too big, scroll to the top so the user
            can edit the color right away.
         */
        window.scrollTo(0, 0)
    }

    onRemoveColor(index) {
        /*
            In same case the state will be changed multiple times in this function.
            ReactJS is smart enough to trigger only one render for the state changes.
        */

        if (this.state.rowEditing === index) {
            // Deleting the color that is being edited. Cancel the editing first
            this.onCancelEdit();
        } else if (this.state.rowEditing > index) {
            /*
                The row that is currently edited exists later in the array.
                Its index should be updated (decreased in this case). 
            */
            this.setState({
                rowEditing: this.state.rowEditing - 1
            });          
        }

        let colors = this.state.colors;
        colors.splice(index, 1);

        this.setState({
            colors: colors
        });
    }

    render() {
        return (
            <Container className="app">
                <Row>
                    <Col>
                        <h1 className="app-title">Color Management Tool</h1>
                    </Col>
                </Row>    

                <hr />

                { this.state.isEditing ? (
                    <ColorPicker
                        color={this.state.pickerColor}
                        title={"Edit color for row " + (this.state.rowEditing + 1)}
                        buttonText="Save"
                        onFinished={this.onEditColor}
                        onColorUpdate={this.onPickerColorUpdate}
                        onCancel={this.onCancelEdit}
                        showCancel />
                ):(
                    <ColorPicker
                        color={this.state.pickerColor}
                        onFinished={this.onAddColor}
                        onColorUpdate={this.onPickerColorUpdate}
                        title="Add a new color" 
                        buttonText="Add"/>
                )}
                                
                <p className="table-counter">{ this.state.colors.length } Colors</p>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th className="centered-header">Color</th>
                            <th className="centered-header">Hex code</th>
                            <th className="centered-header">RGB</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.colors.map((color, index) =>
                            <ColorRow 
                                color={color}
                                index={index}
                                key={index}
                                isBeingEdited={index===this.state.rowEditing}
                                onRemove={this.onRemoveColor}
                                onEdit={this.onStartEditingColor}
                                onCancelEdit={this.onCancelEdit}
                                />
                            )}
                    </tbody>
                </Table>
                <p className="table-counter">{ this.state.colors.length } Colors</p>
            </Container>
        );
    }
}

export default App;
