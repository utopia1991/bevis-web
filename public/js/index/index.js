console.log('window', this);    //在全局环境下，this永远是window

$(function () {
    // this is for slider
    $('#myCarousel').carousel({
        interval: 2500
    });

    // this is for goods
    $('.portfolio-container').isotope({
        itemSelector: '.project',
        layoutMode: 'fitRows'
    });
    $('.portfolio-filter a').click(function () {
        var current = $(this);
        current.siblings('a').removeClass('active');
        current.addClass('active');
        var filterval = current.attr('data-filter');
        var filtertarget = current.attr('data-target');
        $(filtertarget).isotope({filter: filterval});
    });
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,   // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });
    // test 函数就作为对象被赋值了a、b、c三个属性——很明显，这就是属性的集合
    var fn = function () {
        alert(100);
    };
    fn.a = 10;
    fn.b = function () {
        alert(123);
    };
    fn.c = {
        name: "shenhao",
        year: 1988
    };
    console.log(fn.c);

    function Fn() {
    }

    Fn.prototype.name = 'shenhao';
    Fn.prototype.getYear = function () {
        return 1988;
    };

    var fn = new Fn();
    console.log('aaa', fn.name);
    console.log('bbb', fn.getYear());

    var obj = {
        x : 10,
        a : function () {
            console.log('this', this);
            console.log(this.x);
        }
    };
    obj.a();

    // 要到创建这个函数的那个作用域中取值
    var zuo = 10;
    function zuofn () {
        console.log('zuo1', zuo);
    };
    function show1(a) {
        var zuo = 20;
        a();   // log 10, 因为创建zuofn函数的作用域是全局作用域, 无论fn函数将在哪里调用
    };
    function show2() {
        var zuo = 20;
        console.log('zuo2', zuo);   // log 20, 因为创建这个函数的作用域是当前作用域
    };
    show1(zuofn);
    show2();
});