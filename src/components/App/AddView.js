import React, { Component } from 'react';

export class AddView extends Component {
  render() {
    return (
      <div>
        <button className="Add" onClick={() => this.props.onAdd()}>Add</button>
        <button className="View" onClick={() => this.props.onView()}>View</button>
      </div>
    );
  }
}