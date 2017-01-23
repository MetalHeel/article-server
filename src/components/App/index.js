import React, { Component } from 'react';

import { ArticleList } from './ArticleList.js';
import { AddView } from './AddView.js';
import { EditForm } from './EditForm.js';
import { HttpRequest } from '../../HttpRequest.js';

import './index.css';

class App extends Component {
  constructor() {
    super();

    this.Modes = {
      STANDARD: 0,
      ADD: 1,
      EDIT: 2,
      VIEW: 3
    };

    this.state = {
      mode: this.Modes.STANDARD,
      articles: {}
    };

    this.updateArticles();
  }

  render() {
    var header = null;
    var articleList = null;
    var addView = null;
    var editForm = null;

    if(this.state.mode === this.Modes.STANDARD)
    {
      header = <h1>Check Out These Articles!</h1>;
      articleList = <ArticleList articles={this.state.articles} />;
      addView = <AddView onAdd={() => this.showAddForm()} />;
    }

    if(this.state.mode === this.Modes.ADD || this.state.mode === this.Modes.EDIT)
      editForm = <EditForm onSubmit={(title, author, content) => this.submitForm(title, author, content)} onCancel={() => this.cancelEdit()} />;

    return (
      <div>
        {header}
        {articleList}
        {addView}
        {editForm}
      </div>
    );
  }

  updateArticles() {
    var articles = null;
    var self = this;

    HttpRequest.get("http://localhost:3000/articles", function(response) {
      self.setState((oldState) => {
        var newState = oldState;
        newState.articles = response;

        return newState;
      });
    });
  }

  showAddForm() {
    this.setState({
      mode: this.Modes.ADD,
      articles: this.state.articles
    });
  }

  showEditForm() {
    this.setState({
      mode: this.Modes.EDIT,
      articles: this.state.articles
    });
  }

  submitForm(title, author, content) {
    this.setState({
      mode: this.Modes.STANDARD,
      articles: this.state.articles
    });

    var self = this;

    HttpRequest.post("http://localhost:3000/articles", this.createArticle(title, author, content), function() {
      self.updateArticles();
    });
  }

  cancelEdit() {
    this.setState({
      mode: this.Modes.STANDARD,
      articles: this.state.articles
    });
  }

  createArticle(title, author, content) {
    return {"title": title, "author": author, "content": content};
  }
}

export default App;