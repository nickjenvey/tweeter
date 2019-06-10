$(document).ready(function() {
  $(".new-tweet__textarea").on("input", function() {
    let maxChars = 140;
    let currentChars = $(this).val().length;
    let remaining = maxChars - currentChars;
    $(this).parent().find(".counter").text(remaining);
    if (currentChars > maxChars) {
      $(this).parent().find(".counter").css("color", "red");
    } else {
      $(this).parent().find(".counter").css("color", "#244751");
    }
  });
});