(function ($) {

    $.fn.quiz = function (options) {

        var settings = $.extend({
            form:   '#quiz',
            next:   '.next-question',
            cookie: 'quiz_finished',
            url:    ''
        }, options);


        var current_fs, next_fs, previous_fs;
        var left, opacity, scale;
        var animating, current = 0, selected = false;
        var total = $(settings.form + ' fieldset').length;

        /**
         * CHECKBOXES - click event
         * @param question
         */

        function addBoxesListeners(question) {
            var fieldset = $(settings.form + ' fieldset').eq(question);
            var boxes = fieldset.find('.answer');
            var isClicked = false;
                boxes.each(function (index, elem) {
                    $(elem).bind('click', function () {
                        $(this).siblings().removeClass('selected-answer');
                        $(this).addClass('selected-answer');
                        fieldset.find('.submit-button').addClass('submit-button-active');
                        isClicked = true;
                        $('.submit-button-error').removeClass('error-visible');
                    })
                });

                $('.submit-button').click(function () {
                    if (isClicked === true) {
                        return; 
                    } else {
                    $('.submit-button-error').addClass('error-visible');
                    }

                });


        }

        addBoxesListeners(0);
        animateBackgrounds(0);

        $(settings.next).click(function (e) {

            var selectedAnswer = ($(this).parent('fieldset').find('input:checked').length >= 1) ? true : false;
            if (animating || !selectedAnswer) return false;

            animating = true;

            current_fs = $(this).parent('fieldset');
            next_fs = $(this).parent('fieldset').next();
            current = next_fs.index();

            if (current >= 0 && current < total) {

                $('.text-number .current').html(current + 1);
                
                next_fs.show();
                TweenMax.staggerFrom(next_fs.find(".stagger"), 0.5, {delay:0.5, x:300, alpha: 0}, 0.1);

                current_fs.animate({opacity: 0}, {
                    step: function (now, mx) {
                        left = (now * 50) + "%";
                        opacity = 1 - now;
                        next_fs.css({'left': left, 'opacity': opacity});
                    },
                    duration: 700,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                        addBoxesListeners(current);
                        animateBackgrounds(current);
                    },
                    easing: 'easeInOutBack'
                });

            } else {
                Cookies.set(settings.cookie, '1', { expires: 60 * 60 * 24 * 365 });
                window.location.href = settings.url;
            }
            return false;
        });


        /**
         * ANIMATIONS
         */

        function animateBackgrounds(currentQuestion) {

            switch (currentQuestion) {
                case 0:
                {
                    var fieldset = $(settings.form + ' fieldset').eq(currentQuestion);
                    TweenMax.staggerFrom(fieldset.find(".stagger"), 0.5, {x:300, alpha: 0}, 0.1);

                    var animation = $('.images-anim').eq(currentQuestion).removeClass('hidden');
                    var tlFront = new TimelineMax();
                        tlFront.from(animation.find('.ilu1'), 0.4, {x: 300, autoAlpha: 0}, "+=0.2");
                        tlFront.from(animation.find('.ilu2'), 0.4, {x: 300, autoAlpha: 0}, "-=0.2");
                        tlFront.from(animation.find('.ilu3'), 0.4, {x: 300, autoAlpha: 0}, "-=0.2");
                        tlFront.play();
                    break;
                }
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                {

                    var animationOld = $('.images-anim .set-' + (currentQuestion - 1));
                    var animationNew = $('.images-anim .set-' + currentQuestion).removeClass('hidden');

                    var tlFront = new TimelineMax();
                        tlFront.to(animationOld.find('.ilu1'), 0.4, {x: -300, autoAlpha: 0});
                        tlFront.to(animationOld.find('.ilu2'), 0.4, {x: -300, autoAlpha: 0}, "-=0.2");
                        tlFront.to(animationOld.find('.ilu3'), 0.4, {x: -300, autoAlpha: 0}, "-=0.2");

                        tlFront.from(animationNew.find('.ilu1'), 0.4, {x: 300, autoAlpha: 0}, "+=0.2");
                        tlFront.from(animationNew.find('.ilu2'), 0.4, {x: 300, autoAlpha: 0}, "-=0.2");
                        tlFront.from(animationNew.find('.ilu3'), 0.4, {x: 300, autoAlpha: 0}, "-=0.2");

                        tlFront.play();

                    break;
                }
            }
        }

    };

}(jQuery));


;(function() {
    $(document).ready(function () {
        var isQuizAnswered = Cookies.get('quiz_finished');
        var url = 'atest.html';
        if(isQuizAnswered != undefined && isQuizAnswered === '1') {
            window.location.href = url;
        }
        else {
            $().quiz({url: url, next: '.next-question', cookie: 'quiz_finished'});
        }
    });
})();