/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Reusable variables
  const $tweetContainer = $("#tweet-container");
  const $tweetForm = $(".new-tweet");
  const $tweetTextArea = $(".new-tweet__textarea");
  const $errEmptyForm = $(".error--blank-form");
  const $errTooLong = $(".error--too-long");

  // Function that happens when you hit submit on the tweet form
  $("#new-tweet__form").submit(function(e) {
    e.preventDefault();
    const tweetText = $(this).serialize();
    if (tweetText.slice(5) === "") {
      $errEmptyForm.slideDown();
      $errTooLong.slideUp();
    } else if (tweetText.slice(5).length > 140) {
      $errTooLong.slideDown();
      $errEmptyForm.slideUp();
    } else {
      $.post("/tweets", tweetText, (tweet) => {
        $tweetContainer.prepend(createTweetElement(tweet));
        $tweetTextArea.val('');
        $errEmptyForm.slideUp();
        $errTooLong.slideUp();
      });
    }
  });

  const loadTweets = () => {
    $.getJSON("/tweets", (tweet) => {
      renderTweets(tweet);
    });
  };

  const renderTweets = (tweets) => {
    let tweetArr = []
    for (const key in tweets) {
      tweetArr.push(createTweetElement(tweets[key]));
    }
    $tweetContainer.append(tweetArr.reverse());
  };

  const timeDifference = (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
      return Math.round(elapsed / msPerHour ) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear ) + ' years ago';
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
      .append('<div class="tweet__media-controls"><a class="icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 512 512"><path class="flag" d="M336.2 80c-49.1 0-93.3-32-161.9-32C143 48 116 54.5 93.5 63.2c2.2-6.7 3-13.7 2.1-20.7C93.1 19.6 74.2 1.6 51.2 0.1 23.2-1.7 0 20.4 0 48c0 17.8 9.7 33.3 24 41.6V496c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-83.4c37.9-17.3 71.3-28.6 127.8-28.6 49.1 0 93.3 32 161.9 32 58.5 0 102-22.6 128.5-40 13.6-8.9 21.7-24 21.7-40.2V95.9c0-34.5-35.3-57.8-66.9-44.1C409.2 67.3 371.6 80 336.2 80zM464 336c-21.8 15.4-60.8 32-102.3 32 -59.9 0-102-32-161.9-32 -43.4 0-96.4 9.4-127.8 24V128c21.8-15.4 60.8-32 102.3-32 59.9 0 102 32 161.9 32 43.3 0 96.3-17.4 127.8-32V336z"/></svg></a><a class="icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 640 512"><path class="retweet" d="M629.7 404.3L529 505c-9.4 9.4-24.6 9.4-33.9 0L394.3 404.3c-9.4-9.4-9.4-24.6 0-33.9l10.8-10.8c9.6-9.6 25.1-9.3 34.4 0.5l40.4 42.8V64H292.5c-6.4 0-12.5-2.5-17-7l-16-16c-15.1-15.1-4.4-41 17-41H520c13.3 0 24 10.7 24 24v378.8l40.4-42.8c9.3-9.8 24.9-10.1 34.4-0.5l10.8 10.8C639 379.7 639 394.9 629.7 404.3L629.7 404.3zM364.5 455c-4.5-4.5-10.6-7-17-7H160V109.2l40.4 42.8c9.3 9.8 24.9 10.1 34.4 0.5l10.8-10.8c9.4-9.4 9.4-24.6 0-33.9L145 7c-9.4-9.4-24.6-9.4-33.9 0L10.3 107.7c-9.4 9.4-9.4 24.6 0 33.9l10.8 10.8c9.6 9.6 25.1 9.3 34.4-0.5L96 109.2V488c0 13.3 10.7 24 24 24h243.5c21.4 0 32.1-25.9 17-41L364.5 455 364.5 455z"/></svg></a><a class="icon" href="#"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 512 512"><path class="heart" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3 -21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6C522.5 230.9 533.7 127.7 458.4 64.3zM434.8 251.8L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6C478.6 144.1 471 214.9 434.8 251.8L434.8 251.8z"/></svg></a></div>');
    const $tweet = $("<article/>").addClass("tweet")
      .append(header)
      .append(main)
      .append(footer);
    return $tweet;
  };

  // Form toggle button
  $("#compose-btn").click(() => {
    $tweetForm.slideToggle(() => {
      $tweetTextArea.focus();
    });
  });

  loadTweets();

});