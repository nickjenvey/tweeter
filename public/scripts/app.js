/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {
  const renderTweets = (tweets) => {
    let tweetArr = []
    for (const key in tweets) {
      tweetArr.push(createTweetElement(tweets[key]));
    }
    $("#tweet-container").append(tweetArr);
  };

  const timeDifference = (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago...';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago...';
    } else if (elapsed < msPerDay ) {
      return Math.round(elapsed / msPerHour ) + ' hours ago...';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago...';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago...';
    } else {
      return Math.round(elapsed / msPerYear ) + ' years ago...';
    }
  };

  const createTweetElement = (tweet) => {
    const {user, content, created_at} = tweet;
    const header = $("<header/>")
      .append(`<div class="tweet__avatar" style="background-image:url('${tweet.user.avatars.large}');"></div>`)
      .append(`<h2>${tweet.user.name}</h2>`)
      .append(`<h4>${tweet.user.handle}</h4>`);
    const main = $("<section/>")
      .append(`<p>${tweet.content.text}</p>`);
    const footer = $("<footer/>")
      .append(`<h6>${timeDifference(new Date(), tweet.created_at)}</h6>`)
      .append('<div class="tweet__media-controls"><a class="icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 512 512"><path class="flag" d="M349.6 98.8C296 98.8 251.7 64 184.3 64c-25 0-47.3 4.4-68 12 2.9-7.5 4.1-15.5 3.6-23.6C118.1 24 94.8 1.2 66.3 0 34.3-1.3 8 24.3 8 56c0 19 9.5 35.8 24 45.9V488c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24v-94.4c28.3-12.1 63.6-22.1 114.4-22.1 53.6 0 97.8 34.8 165.2 34.8 48.2 0 86.7-16.3 122.5-40.9 8.7-6 13.8-15.8 13.8-26.4V95.9c0-23.4-24.3-38.9-45.5-29C432.2 82.9 390.1 98.8 349.6 98.8z"/></svg></a><a class="icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 640 512"><path class="retweet" d="M629.7 404.3L529 505c-9.4 9.4-24.6 9.4-33.9 0L394.3 404.3c-9.4-9.4-9.4-24.6 0-33.9l10.8-10.8c9.6-9.6 25.1-9.3 34.4 0.5l40.4 42.8V64H292.5c-6.4 0-12.5-2.5-17-7l-16-16c-15.1-15.1-4.4-41 17-41H520c13.3 0 24 10.7 24 24v378.8l40.4-42.8c9.3-9.8 24.9-10.1 34.4-0.5l10.8 10.8C639 379.7 639 394.9 629.7 404.3L629.7 404.3zM364.5 455c-4.5-4.5-10.6-7-17-7H160V109.2l40.4 42.8c9.3 9.8 24.9 10.1 34.4 0.5l10.8-10.8c9.4-9.4 9.4-24.6 0-33.9L145 7c-9.4-9.4-24.6-9.4-33.9 0L10.3 107.7c-9.4 9.4-9.4 24.6 0 33.9l10.8 10.8c9.6 9.6 25.1 9.3 34.4-0.5L96 109.2V488c0 13.3 10.7 24 24 24h243.5c21.4 0 32.1-25.9 17-41L364.5 455 364.5 455z"/></svg></a><a class="icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 512 512"><path class="heart" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8C528.4 212.4 525.1 116.2 462.3 62.6L462.3 62.6z"/></svg></a></div>');
    const $tweet = $("<article/>").addClass("tweet")
      .append(header)
      .append(main)
      .append(footer);
    return $tweet;
  };

  renderTweets(data);
});