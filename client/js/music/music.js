var kf = "1";                          //开关1关闭，2开启
var _index = 0;
var MusicFirstValue;
var MusicSrc;
MusicSrc = $(".Txt ul li").eq(0).find("a").attr("dataSrc");
MusicFirstValue = $(".Txt ul li").eq(0).find("a").text();
var Audio = CreatMusic(MusicSrc);      //创建音乐播发器

function MusicPlay(){
    $(".Txt ul li").eq(_index).addClass("active").siblings().removeClass("active");
    //音乐地址
    MusicSrc = $(".Txt ul li").eq(_index).find("a").attr("dataSrc");
    MusicValue = $(".Txt ul li").eq(_index).find("a").text();
    $('#musicName').html(MusicValue);
    Audio.src = MusicSrc;
    $('.but span.play').css("background-position","-79px 0px");
    Audio.play();
};

function CreatMusic(MusicSrc){
    var CreatMp3 = $("<audio src="+MusicSrc+"></audio>").get(0);
    return CreatMp3;
};

// 点击播放按钮
$(".but span.play").click(function(){
    if(kf == 1){
        $(this).css("background-position","-79px 0px");
        Audio.play();//播放
        kf = 2;
    }else {
        $(this).css("background-position","-101px 0px");
        Audio.pause();//暂停
        kf = 1;
    }
});

// 标题为第一首歌
$('#musicName').html(MusicFirstValue);

// 点击播放下一首
$(".but span.next").click(function(){
    _index++;
    MusicPlay();
});

// 点击播放上一首
$(".but span.prev").click(function(){
    _index--;
    MusicPlay();
});

// 点击列表播放歌曲
$(".Txt ul li").click(function(){
    _index = $(this).index();//获取序列号
    MusicPlay();
});