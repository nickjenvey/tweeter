/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function() {
  const createTweetElement = () => {
    const header = $("<header/>")
      .append("<div/>").addClass("tweet__avatar")
      .append("<h2/>")
      .append("<h4/>");
    const main = $("<section/>")
      .append("<p/>");
    const footer = $("<footer/>")
      .append("<h6/>")
      .append("<div/>").addClass("tweet__media-controls");
    const tweet = $("<article/>").addClass("tweet")
      .append(header)
      .append(main)
      .append(footer);
    return tweet;
  };
  
  const $tweet = createTweetElement(tweetData);

  console.log($tweet);
  
  // $(".new-tweet__btn").click(function(e) {
  //   e.preventDefault();
  // });
});