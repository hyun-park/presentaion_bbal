//  0 -> Dark Mode
// 1 -> Light Mode
var style_state = 0;
var script_font_size = 100;
var script_letter_spacing = 0;
var script_line_height = 100;

$(window).on('load', function(){
  // $(".text-style-custom").css("font-size", "100px");


  var font_size = document.getElementById("font-size")
      line_height =document.getElementById("line-height")
      letter_spacing =document.getElementById("letter-spacing");
  //     res = document.getElementById("result");

  font_size.addEventListener("input", function() {
      var size = Number(this.value) * 0.5 + 80;
      $(".text-style-custom").css("font-size", size + "px");
      script_font_size = size;
      getRowCharacterCount();
      createScriptDom();
  }, false);

  line_height.addEventListener("input", function() {
      var size = Number(this.value) * 0.6 + 120;
      $(".text-style-custom").css("line-height", size + "px");
      script_line_height = size;
  }, false);

  letter_spacing.addEventListener("input", function() {
      var size = Number(this.value) * 0.2;
      $(".text-style-custom").css("letter-spacing", size + "px");
      script_letter_spacing = size;
      getRowCharacterCount();
      createScriptDom();
  }, false);

});

function reverseStyle() {
  if (style_state === 0) {
    // to light Mode
    // $("body").attr("style", "background-color: #ffffff !important");
    // $("body").attr("style", "color: #000000 !important");
    style_state = 1;
  } else {
    // $("body").attr("style", "background-color: #000000 !important");
    // $("body").attr("style", "color: #ffffff !important");
    style_state = 0;
  }
}
function is(){

}
