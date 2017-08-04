"use strict";

var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

$("#datepicker1").datepicker();

$("#datepicker2").datepicker();

$("#popDialog").on('click', function () {
    $('.backCloth').fadeIn(400).removeClass('hide');
    $("#dialog").removeClass('hide').dialog({
        resizable: false,
        height: "auto",
        modal: true,
        buttons: {
            "Go ahead": function GoAhead() {
                location.href = '/';
            },
            "Cancel": function Cancel() {
                $(this).fadeOut(400).dialog("close");
                $('.backCloth').fadeOut(400);
            }
        },
        close: function close() {
            $('.backCloth').fadeOut(400);
        }
    });
});

$("#accordion").accordion({
    collapsible: true,
    heightStyle: "content"
});

$("#tags").autocomplete({
    source: availableTags
});

$(".radio").checkboxradio();

$(".checkBox").checkboxradio({
    icon: false
});

$("#slider-range").slider({
    range: true,
    min: 0,
    max: 500,
    values: [75, 300],
    slide: function slide(event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    }
});

$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

$("#currency").selectmenu().on("change", function () {
    $("#spinner").spinner("option", "culture", $(this).val());
});

$("#spinner").spinner({
    min: 5,
    max: 2500,
    step: 10,
    start: 1000,
    numberFormat: "C"
});

$('.checked-go').on('click', function () {
    var progressbar = $("#progressbar");
    var progressLabel = $(".progress-label");
    $('.backCloth').fadeIn(400).removeClass('hide');
    progressbar.removeClass('hide').progressbar({
        value: false,
        change: function change() {
            progressLabel.text(progressbar.progressbar("value") + "%");
        },
        complete: function complete() {
            progressLabel.text("Complete!");
            location.reload();
        }
    });
    function progress() {
        var val = progressbar.progressbar("value") || 0;
        progressbar.progressbar("value", val + 2);
        if (val < 99) {
            setTimeout(progress, 80);
        }
    };
    setTimeout(progress, 1000);
});

// marquee
$('.str4').liMarquee({
    drag: false,
    scrollamount: 100
    //        跑马灯文字在鼠标滑过或悬停时不会暂停
    //        hoverstop: false
    //
    //        可以控制方向是右边的
    //        direction: 'right'
    //
    //        可以控制暂停或者开始
    //        $('.btnPause').on('click',function(){
    //            $('.str6').liMarquee('pause');
    //        });
    //        $('.btnPlay').on('click',function(){
    //            $('.str6').liMarquee('play');
    //        })
});