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
		var title = "";
    var author = "";
    var content = "";

    if(this.props.initialEntries !== null)
    {
      title = this.props.initialEntries.title;
      author = this.props.initialEntries.author;
      content = this.props.initialEntries.content;
    }

    // For some reason I can't get the props in the constructor?  Also, this works??
    this.refreshState(title, author, content);

		return (
			<div>
        <div>
          <ul>
            <li>Title: <input type="text" name="title" onChange={this.handleTitleChange} defaultValue={title} /></li>
            <li>Author: <input type="text" name="author" onChange={this.handleAuthorChange} defaultValue={author} /></li>
            <li>Content:</li>
            <li><textarea rows="6" cols="31" onChange={this.handleContentChange} defaultValue={content} /></li>
          </ul>
        </div>
        <button className="Submit" onClick={() => this.props.onSubmit(this.state.title, this.state.author, this.state.content)}>Submit</button>
        <button className="Cancel" onClick={() => this.props.onCancel()}>Cancel</button>
      </div>
	  );
	}

	refreshState(title, author, content) {
    var oldState = this.state;

    if(oldState.title === null)
      oldState.title = title;
    if(oldState.author === null)
      oldState.author = author;
    if(oldState.content === null)
      oldState.content = content;
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