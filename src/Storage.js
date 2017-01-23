var storage = require('node-persist');

storage.init({dir: 'storage'})
	.then(function() {
		storage.setItem('articles', {})
	});

// For now, article titles should be unique.  If this was a true project, there,
// for one, would be a database, but two, would at least have some sort of unqiue
// ID for articles.

module.exports = {
	create: function(article) {
		var articles = storage.getItem('articles');

		if(articles[article.title] === null)
		{
			articles[article.title] = article;
			storage.setItem('articles', articles);
		}
	},

	get: function(title) {
		var articles = storage.getItem('articles');
		return articles[title];
	},

	getAll: function() {
		return storage.getItem('articles');
	},

	update: function(oldTitle, article) {
		var articles = storage.getItem('articles');

		if(articles[oldTitle] !== null)
		{
			delete articles[oldTitle];
			articles[article.title] = article;
			storage.setItem('articles', articles);
		}
		else
		{
			create(article);
		}
	},

	remove: function(title)
	{
		if(articles[oldTitle] !== null)
		{
			delete articles[oldTitle];
			storage.setItem('articles', articles);
		}
	}
};