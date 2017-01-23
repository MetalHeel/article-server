import React, { Component } from 'react';

export class ArticleList extends Component {
	render() {
		return (<div>{this.renderTable()}</div>);
	}

	renderTable() {
		return (
      <table>
        <tbody>
          {this.renderBody()}
        </tbody>
      </table>
    );
	}

	renderBody() {
		var self = this;
		const rowClickCallback = this.props.rowClickCallback;
		const selection = this.props.selection;

		return Object.keys(this.props.articles).map(function(key, index) {
			const highlight = { backgroundColor: "yellow" };

			var article = self.props.articles[key];

			if(selection != null && selection.title.localeCompare(article.title) === 0)
				return <tr key={article.title} onClick={() => rowClickCallback(article)} style={highlight}><td><h2>{article.title}</h2><p>by {article.author}</p></td></tr>;
			else
      	return <tr key={article.title} onClick={() => rowClickCallback(article)}><td><h2>{article.title}</h2><p>by {article.author}</p></td></tr>;
    });
	}
}