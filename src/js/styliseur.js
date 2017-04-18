define(["d3"], function(d3) {
  var styliseur = function (selection) {
    selection.each(function (d) {
      var self = d3.select(this);
      var fillInsteadOfStroke = this instanceof SVGTextElement || false;
      d && d.style && d.style.forEach(function (e) {
        switch (e.key) {
          case "stroke":
          case "fill":
            var attribute = e.key==="stroke" && fillInsteadOfStroke ? "fill" : e.key;
            var transparent = e.value.indexOf("#")===0 &&  e.value.length === 9;
            var color = transparent ? e.value.substr(0,7) : e.value;
            var opacity = transparent ? parseInt(e.value.substr(7,2),16)/255 : 1;
            self.attr(attribute, color);
            opacity < 1 && self.attr(attribute + "-opacity", opacity);
            break;
          case "font-size":
          case "font-family":
            self.attr(e.key, e.value);
            break;
          case "style":
            if (e.value.indexOf('setline') === 0) {
              self.attr('stroke-width', 2);
            } else {
              self.attr('class', e.value);
            }
        }
      });
    });
  };

  return styliseur;
});