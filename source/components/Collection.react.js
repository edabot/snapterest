var React = require('react');
var reactDOMServer = require('reactdom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');

var Collection = React.createClass([
  createHtmlMarkupStringOfTweetList: function () {
    var htmlString = reactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.props.tweets} />
    );

    var htmlMarkup = {
      html: htmlString;
    };

    return JSON.stringify(htmlMarkup);
  },

  getListOfTweetIds: function () {
    return Object.keys(this.props.tweets);
  },

  getNumberOfTweetsInCollection: function () {
    return this.getListOfTweetIds().length;
  },

  render: function () {
    var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();

    if(numberOfTweetsInCollection > 0) {
      var tweets = this.props.tweets;
      var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
      var removeAllTweetsFromCollection = this.props.onRemoveTweetFromCollection;
      var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;

      return (
        <div>
          <CollectionControls
          numberOfTweetsInCollection={numberOfTweetsInCollection}
          htmlMarkup={htmlMarkup}
          onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection}
          />

          <TweetList
          tweets={tweets}
          onRemoveTweetFromCollection={handleRemoveTweetFromCollection}
          />
        </div>
      );
    }

    return <Header text="Your collection ins empty" />;
  }

]);
