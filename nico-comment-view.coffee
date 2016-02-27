###
NicoCommentWindow: Overrap window for commments like niconico douga
(C) 2014 ICHIKAWA, Yuji (New 3 Rs)

requires jQuery
###

vendorTransform = (value) ->
    ###
    private function
    ###
    """
    -webkit-transform: #{value};
    -moz-transform: #{value};
    -ms-transform: #{value};
    -o-transform: #{value};
    transform: #{value};
    """

class NicoCommentView
    constructor: ($target, $container, @duration = 5) ->
        ###
        prepares overrap window for $target in $container.
        Both $target and $container are jQuery objects.
        duration is a time to display a commment.
        ###
        @times = []

        if not $container?
            @$window = $target
            return

        if $container.css('position') is 'static'
            throw new Error '$container need not to be static'

        @$window = $('<div class="nico-comment-view"></div>')

        # Fitting size and position
        @$window.width $target.width()
        @$window.height $target.height()
        containerOffset = $container.offset()
        targetOffset = $target.offset()
        @$window.css('left', targetOffset.left - containerOffset.left).css('top', targetOffset.top - containerOffset.top)

        $container.append @$window
        return

    comment: (comment, callback = null) ->
        ###
        displays comment.
        callback would be called after finishing comment display.
        ###
        if document.hidden
            return
        $comment = $("<div class=\"nico-comment\">#{comment}</div>")
        transform = "translateX(#{@$window.width()}px)"
        $comment.attr 'style', vendorTransform transform
        $comment.one 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend', ->
            $(this).remove()
            callback() if callback?

        @$window.append $comment
        setTimeout =>
            width = $comment.width()
            height = $comment.height()
            top = @_commentTop width, height
            transition = "transform #{@duration}s linear;"
            transform = "translateX(-#{width}px)"
            $comment.attr 'style', """
                top: #{top}px;
                -webkit-transition: -webkit-#{transition}
                -moz-transition: -moz-#{transition}
                -o-transition: -o-#{transition}
                transition: #{transition}
                """ + vendorTransform transform
        , 100 # changed transition property after rendering finished. 0 is not enough.
        return

    _commentTop: (commentWidth, commentHeight) ->
        ###
        private method
        ###
        time = new Date().getTime()
        windowWidth = @$window.width()
        speed = (windowWidth + commentWidth) / (1000 * @duration) # px/ms
        startEndTime = time + Math.floor commentWidth / speed
        goalTime = time + Math.floor windowWidth / speed
        endTime = time + @duration * 1000
        column = null
        for t, i in @times
            if not t? or (t.startEndTime < time and t.endTime < goalTime)
                column = i
                break
        column ?= i
        windowHeight = @$window.height()
        if commentHeight * column > windowHeight - commentHeight # if all columns are busy
            column = Math.floor Math.random() * Math.floor windowHeight / commentHeight
        @times[column] =
            startEndTime: startEndTime
            endTime: endTime
        commentHeight * column

window.NicoCommentView = NicoCommentView
