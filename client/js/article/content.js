(function(){
    setTimeout(function (){
        $('#background').fadeOut();
    },1000);
    $('.jumpGoogle').bind('click',function () {
        alert('good job!');
    });
})();

//定义两个类
function Person(name,age){        
    this.name=name;              
    this.age=age;                   
    this.sayhello=function(){
      console.log(this.age)
   };
}
function Print(){                    
    this.show=function(){
        var msg=[];
        for(var key in this){
            if(typeof(this[key])!="function"){
                msg.push([key,":",this[key]].join(""));
            }
        }
        console.log(msg.join(" "));
    };
}
function Student(name,age,grade,school){
    Person.apply(this,arguments);     //将 Person 方法带给 Student
    Print.apply(this,arguments);      //将 Print 方法带给 Student
    this.grade=grade;                 //年级
    this.school=school;               //学校
}
var p1=new Person("jake",10);
p1.sayhello();
var s1=new Student("tom",13,6,"清华小学");
s1.show();
s1.sayhello();

// pay
function dashangToggle(){
    $(".hide_box").fadeToggle();
    $(".shang_box").fadeToggle();
}
$(function(){
    $(".pay_item").click(function(){
        $(this).addClass('checked').siblings('.pay_item').removeClass('checked');
        var dataid=$(this).attr('data-id');
        $(".shang_payimg img").attr("src","/images/payme/"+dataid+"img.jpg");
        $("#shang_pay_txt").text(dataid=="alipay"?"支付宝":"微信");
    });
});
