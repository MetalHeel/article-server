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

	// Todo: There needs to be some sort of unique key.  Titles may collide.
	renderBody() {
		var self = this;
		return Object.keys(this.props.articles).map(function(key, index) {
			var article = self.props.articles[key];
      return <tr key={article.title}><td><h2>{article.title}</h2><p>by {article.author}</p></td></tr>;
    });
	}
}