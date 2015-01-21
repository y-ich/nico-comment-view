// Generated by CoffeeScript 1.8.0

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
      this.endTimes = [];
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
      var column, endTime, goalTime, i, t, time, _i, _len, _ref;
      time = new Date().getTime();
      goalTime = time + Math.floor(1000 * this.duration * this.$window.width() / (this.$window.width() + commentWidth));
      endTime = time + this.duration * 1000;
      column = null;
      _ref = this.endTimes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        t = _ref[i];
        if ((t == null) || t < goalTime) {
          column = i;
          break;
        }
      }
      if (column == null) {
        column = i;
      }
      if (commentHeight * column > this.$window.height() - commentHeight) {
        column = Math.floor(Math.random() * Math.floor(this.$window.height() / commentHeight));
      }
      this.endTimes[column] = endTime;
      return commentHeight * column;
    };

    return NicoCommentView;

  })();

  window.NicoCommentView = NicoCommentView;

}).call(this);
