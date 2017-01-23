import React, { Component } from 'react';

export class EditForm extends Component {
	constructor() {
    super();

    this.state = {
      title: null,
      author: null,
      content: null
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

	// Todo: Add tags.
	render() {
		return (
			<div>
        <div>
          <ul>
            <li>Title: <input type="text" name="title" onChange={this.handleTitleChange} /></li>
            <li>Author: <input type="text" name="author" onChange={this.handleAuthorChange} /></li>
            <li>Content:</li>
            <li><textarea rows="6" cols="31" onChange={this.handleContentChange} /></li>
          </ul>
        </div>
        <button className="Submit" onClick={() => this.props.onSubmit(this.state.title, this.state.author, this.state.content)}>Submit</button>
        <button className="Cancel">Cancel</button>
      </div>
	  );
	}

	handleTitleChange(e) {
    this.setState({
      title: e.target.value,
      author: this.state.author,
      content: this.state.content
    });
  }

  handleAuthorChange(e) {
    this.setState({
      title: this.state.title,
      author: e.target.value,
      content: this.state.content
    });
  }

  handleContentChange(e) {
    this.setState({
      title: this.state.title,
      author: this.state.author,
      content: e.target.value
    });
  }
}