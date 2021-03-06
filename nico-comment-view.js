// Generated by CoffeeScript 1.10.0

/*
NicoCommentWindow: Overrap window for commments like niconico douga
(C) 2014 ICHIKAWA, Yuji (New 3 Rs)

requires jQuery
 */

(function() {
  var NicoCommentView, vendorTransform;

  vendorTransform = function(value) {

    /*
    private function
     */
    return "-webkit-transform: " + value + ";\n-moz-transform: " + value + ";\n-ms-transform: " + value + ";\n-o-transform: " + value + ";\ntransform: " + value + ";";
  };

  NicoCommentView = (function() {
    function NicoCommentView($target, $container, duration) {
      var containerOffset, targetOffset;
      this.duration = duration != null ? duration : 5;

      /*
      prepares overrap window for $target in $container.
      Both $target and $container are jQuery objects.
      duration is a time to display a commment.
       */
      this.times = [];
      if ($container == null) {
        this.$window = $target;
        return;
      }
      if ($container.css('position') === 'static') {
        throw new Error('$container need not to be static');
      }
      this.$window = $('<div class="nico-comment-view"></div>');
      this.$window.width($target.width());
      this.$window.height($target.height());
      containerOffset = $container.offset();
      targetOffset = $target.offset();
      this.$window.css('left', targetOffset.left - containerOffset.left).css('top', targetOffset.top - containerOffset.top);
      $container.append(this.$window);
      return;
    }

    NicoCommentView.prototype.comment = function(comment, callback) {
      var $comment, transform;
      if (callback == null) {
        callback = null;
      }

      /*
      displays comment.
      callback would be called after finishing comment display.
       */
      if (document.hidden) {
        return;
      }
      $comment = $("<div class=\"nico-comment\">" + comment + "</div>");
      transform = "translateX(" + (this.$window.width()) + "px)";
      $comment.attr('style', vendorTransform(transform));
      $comment.one('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend', function() {
        $(this).remove();
        if (callback != null) {
          return callback();
        }
      });
      this.$window.append($comment);
      setTimeout((function(_this) {
        return function() {
          var height, top, transition, width;
          width = $comment.width();
          height = $comment.height();
          top = _this._commentTop(width, height);
          transition = "transform " + _this.duration + "s linear;";
          transform = "translateX(-" + width + "px)";
          return $comment.attr('style', ("top: " + top + "px;\n-webkit-transition: -webkit-" + transition + "\n-moz-transition: -moz-" + transition + "\n-o-transition: -o-" + transition + "\ntransition: " + transition) + vendorTransform(transform));
        };
      })(this), 100);
    };

    NicoCommentView.prototype._commentTop = function(commentWidth, commentHeight) {

      /*
      private method
       */
      var column, endTime, goalTime, i, j, len, ref, speed, startEndTime, t, time, windowHeight, windowWidth;
      time = new Date().getTime();
      windowWidth = this.$window.width();
      speed = (windowWidth + commentWidth) / (1000 * this.duration);
      startEndTime = time + Math.floor(commentWidth / speed);
      goalTime = time + Math.floor(windowWidth / speed);
      endTime = time + this.duration * 1000;
      column = null;
      ref = this.times;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        t = ref[i];
        if ((t == null) || (t.startEndTime < time && t.endTime < goalTime)) {
          column = i;
          break;
        }
      }
      if (column == null) {
        column = i;
      }
      windowHeight = this.$window.height();
      if (commentHeight * column > windowHeight - commentHeight) {
        column = Math.floor(Math.random() * Math.floor(windowHeight / commentHeight));
      }
      this.times[column] = {
        startEndTime: startEndTime,
        endTime: endTime
      };
      return commentHeight * column;
    };

    return NicoCommentView;

  })();

  window.NicoCommentView = NicoCommentView;

}).call(this);
