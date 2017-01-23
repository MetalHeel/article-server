import React, { Component } from 'react';

import { ArticleList } from './ArticleList.js';
import { AddView } from './AddView.js';
import { EditForm } from './EditForm.js';
import { View } from './View.js';
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
      articles: {},
      currentSelection: null
    };

    this.updateArticles();
  }

  render() {
    var header = null;
    var articleList = null;
    var addView = null;
    var editForm = null;
    var view = null;

    if(this.state.mode === this.Modes.STANDARD)
    {
      header = <h1>Check Out These Articles!</h1>;
      articleList = <ArticleList articles={this.state.articles}
        rowClickCallback={(selection) => this.changeSelection(selection)}
        selection={this.state.currentSelection} />;
      addView = <AddView onAdd={() => this.showAddForm()} onView={() => this.showView()} />;
    }

    if(this.state.mode === this.Modes.ADD || this.state.mode === this.Modes.EDIT)
      editForm = <EditForm onSubmit={(title, author, content) => this.submitForm(title, author, content)} onCancel={() => this.cancelEdit()} />;

    if(this.state.mode === this.Modes.VIEW)
      view = <View article={this.state.currentSelection} onDelete={() => this.deleteArticle()} onBack={() => this.goBack()} />

    return (
      <div>
        {header}
        {articleList}
        {addView}
        {editForm}
        {view}
      </div>
    );
  }

  updateArticles() {
    var self = this;

    HttpRequest.get("http://localhost:3000/articles", function(response) {
      self.setState((oldState) => {
        var newState = oldState;
        newState.articles = response;

        return newState;
      });
    });
  }

  changeSelection(selection) {
    this.setState({
      allMovies: this.state.allMovies,
      mode: this.state.mode,
      currentSelection: selection
    });
  }

  showAddForm() {
    this.setState({
      mode: this.Modes.ADD,
      articles: this.state.articles,
      currentSelection: null
    });
  }

  showEditForm() {
    this.setState({
      mode: this.Modes.EDIT,
      articles: this.state.articles,
      currentSelection: this.state.currentSelection
    });
  }

  submitForm(title, author, content) {
    this.setState({
      mode: this.Modes.STANDARD,
      articles: this.state.articles,
      currentSelection: this.state.currentSelection
    });

    var self = this;

    HttpRequest.post("http://localhost:3000/articles", this.createArticle(title, author, content), function() {
      self.updateArticles();
    });
  }

  cancelEdit() {
    this.setState({
      mode: this.Modes.STANDARD,
      articles: this.state.articles,
      currentSelection: null
    });
  }

  showView() {
    if(this.state.currentSelection !== null)
    {
      this.setState({
        mode: this.Modes.VIEW,
        articles: this.state.articles,
        currentSelection: this.state.currentSelection
      });
    }
  }

  deleteArticle() {
    this.setState({
      mode: this.Modes.STANDARD,
      articles: this.state.articles,
      currentSelection: null
    });

    var self = this;

    HttpRequest.delete("http://localhost:3000/articles/" + this.state.currentSelection.title, function() {
      self.updateArticles();
    });
  }

  goBack() {
    this.setState({
      mode: this.Modes.STANDARD,
      articles: this.state.articles,
      currentSelection: this.state.currentSelection
    });
  }

  createArticle(title, author, content) {
    return {"title": title, "author": author, "content": content};
  }
}

export default App;