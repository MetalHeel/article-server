var storage = require('node-persist');

storage.init({dir: 'storage'}).then(function() {
	storage.getItem('articles').then(function(value) {
		if(value === null)
			storage.setItem('articles', {});
	});
});

// For now, article titles should be unique.  If this was a true project, there,
// for one, would be a database, but two, would at least have some sort of unqiue
// ID for articles.

module.exports = {
	create: function(article) {
		storage.getItem('articles').then(function(value) {
			var articles = value;
			articles[article.title] = article;

			storage.setItem('articles', articles);
		});
	},

	get: function(title) {
		var articles = storage.getItemSync('articles');
		return articles[title];
	},

	getAll: function() {
		return storage.getItemSync('articles');
	},

	update: function(oldTitle, article) {
		var articles = storage.getItem('articles').then(function(value) {
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
		});
	},

	remove: function(title)
	{
		var articles = storage.getItemSync('articles');

		if(articles[title] !== null)
		{
			delete articles[title];
			storage.setItem('articles', articles);
		}
	}
};

// Todo: Validate article object fields.