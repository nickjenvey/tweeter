$(document).ready(function() {
  $(".new-tweet__textarea").on("input", function() {
    let currentChars = $(this).val().length;
    let remaining = 140 - currentChars;
    $(this).parent().find(".counter").text(remaining);
    if (currentChars > 140) {
      $(this).parent().find(".counter").addClass("counter--negative");
    } else {
      $(this).parent().find(".counter").removeClass("counter--negative");
    }
  });
});