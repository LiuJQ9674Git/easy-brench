var React = require('react');
var CommentBox = require('./CommentBox');

React.render(
    <CommentBox url="http://localhost:3000/comments" pollInterval={2000} />,
    document.getElementById('commentbox')
);
