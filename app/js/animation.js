$(document).ready(function(){

    var height = window.innerHeight;
    var width = window.innerWidth;

    $('.bgSvg').css({
        'height': height + 100,
        'width': width + 100
    });

    var s = Snap('#bgSvg');

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    for(var i = 40; i > 0; i--){
        var randomValue = Math.random();
        var image = s.image( 'images/paint.png', -520, -520, randomValue * width + 1000, randomValue * height + 1000 );



        image.attr({
            fill: getRandomColor(),
            opacity: randomValue / 10
        });
    }

    function makeNewPosition($container) {

        // Get viewport dimensions (remove the dimension of the div)
        $container = ($container || $(window))
        var h = $container.height() - 500;
        var w = $container.width() - 500;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh, nw];

    }

    function animateDiv() {
        var $target = $('image');
        var newq = makeNewPosition($target.parent());
        var oldq = $target.offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);

        $('image').each(function() {
            $(this).velocity({
                x: Math.random() * width / 2,
                y: Math.random() * height / 2,
                opacity: Math.random() / 20
            }, speed, function () {
                animateDiv();
            });
        });

    };

    function calcSpeed(prev, next) {

        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);

        var greatest = x > y ? x : y;

        var speedModifier = 0.3;

        var speed = Math.ceil(greatest / speedModifier);

        return speed;

    }

    animateDiv();
});

