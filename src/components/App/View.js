import React, { Component } from 'react';

export class View extends Component {
	render() {
		return (
			<div>
				<h2>{this.props.article.title}</h2>
				<h3>by {this.props.article.author}</h3>
				<p>{this.props.article.content}</p>
				<button className="Back" onClick={() => this.props.onBack()}>Back</button>
	    </div>
	  );
	}
}