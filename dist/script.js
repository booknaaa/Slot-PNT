$(document).ready(function() {

    function getRandomNumberWithout12345() {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 100000); // สุ่มเลข 0-99999
        } while (randomNumber === 12345); // หากค่าเท่ากับ 12345 ให้ทำการสุ่มใหม่
        return randomNumber;
    }
    // ตัวอย่างการใช้งาน
    const randomNumber = getRandomNumberWithout12345();
    console.log(randomNumber);

    var clickCount = 0,
        tMax = 4000, // animation time, ms
        height = 700,
        speeds = [],
        r = [],
        target = randomNumber,
        reading = 12345,
        sTarget = target.toString(),
        sReading = reading.toString(),
        numberOutput = [],
        reels = [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        ],
        $reels,
        start;

    function init(){
        $reels = $('.reel').each(function(i, el){
            el.innerHTML = '<div class="reel-holder"><p>' + reels[i].join('</p><p>') + '</p></div><div class="reel-holder"><p>' + reels[i].join('</p><p>') + '</p></div><div class="reel-door">?</div>'
        });

        // Add user's meter reading to fake reel for comparison
        $('.fake-reel').each(function(i, el){
            el.innerHTML = sReading.charAt(i);
        });

        $('.lever')
        .click(action);
    }

    function action(){
        if (start !== undefined) return;

        $('.reel-door').fadeOut(100);
        $('.lever').attr('disabled', true)
                   .addClass('button-inactive')
                   .text('Good luck!');
        for (var i = 0, len = sTarget.length; i < len; i += 1) {
            var intOffset = (parseInt(+sTarget.charAt(i) | 0)) * height / 10 - ((height / 10) * 2);
            numberOutput[i] = intOffset >= 0 ? intOffset : (height - (height / 10));
        }
        for (var j = 0; j < 5; ++j) {
            speeds[j] = Math.random() + .7;
            r[j] = (Math.random() * 10 | 0) * height / 10;
        }
        animate();
    }

    function animate(now){
        if (!start) start = now;
        var t = now - start || 0;

        for (var i = 0; i < 5; ++i)
            $reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + numberOutput[i]) % height | 0;
        if (t < tMax) {
            requestAnimationFrame(animate);
        } else {
            start = undefined;
            check();
        }
    }

    function check(){
        var matchedNumbers = 0;

        for (var i = 0, len = sTarget.length; i < len; i += 1) {
            var targetReading = sReading.charAt(i) | 0,
                targetInt = sTarget.charAt(i) | 0,
                reelClass = targetReading == targetInt ? 'match' : 'no-match';

            $('.reel:eq(' + i + '), .fake-reel:eq(' + i + ')').addClass(reelClass);
            targetReading == targetInt ? matchedNumbers ++ : null;
        }

        var announcement;

        if (matchedNumbers == 5) {
            announcement = 'You matched all 5 numbers! you win!!!';
            clickCount =+5;
        } else if (matchedNumbers == 1) {
            announcement = 'You matched 1 number. Better luck next time!';
            clickCount++;
        } else {
            announcement = 'You matched ' + matchedNumbers + ' numbers. Better luck next time!';
            clickCount =+matchedNumbers;
        }

        $('.js-announcement').text(announcement)
      
        $('.lever').text('-');
        console.log(clickCount)
    }
  
  init();
});