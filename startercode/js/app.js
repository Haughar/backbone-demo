var Blog = Backbone.Model.extend({
	defaults:{
		FirstName:'',
		LastName:'',
		Description:''
	}
});

var Blogs = Backbone.Collection.extend({

});

var blogs = new Blogs();

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template'))
	},
	render: function() {
		this.$el.html(this.model.toJSON());
		return this;
	}
});

var BlogsView = Backbone.View.extend({
	model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        this.model.on('add', this.render, this);

    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({
                model: blog
            })).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView();

$(document).ready(function() {
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            first: $('.first-input').val(),
            last: $('.last-input').val(),
            description: $('.description-input').val()
        });
        $('.first-input').val('');
        $('.last-input').val('');
        $('.description-input').val('');
        blogs.add(blog);

    });
});

