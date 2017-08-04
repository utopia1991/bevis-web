"use strict";

function shake() {
  $(".main-register").removeClass('shake_effect');
  setTimeout(function () {
    $(".main-register").addClass('shake_effect');
  }, 1);
};

$('.slide-nav').on('click', function (e) {
  e.preventDefault();
  var current = $('.flex--active').data('slide'),
      next = $(this).data('slide');
  $('.slide-nav').removeClass('active');
  $(this).addClass('active');
  if (current === next) {
    return false;
  } else {
    $('.slider_warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
    $('.flex--active').addClass('animate--end');
    setTimeout(function () {
      $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
      $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
    }, 800);
  }
});

$('#register').on('click', function () {
  var email = $("#register-email").val();
  var name = $("#register-name").val();
  var password = $("#register-password").val();
  var repassword = $("#register-repassword").val();
  var data = {
    'email': email,
    'name': name,
    'password': password,
    'repassword': repassword
  };
  if (email === '') {
    shake();
    $('#alertMessage').html('你的邮箱为空啦~');
  } else if (name === '') {
    shake();
    $('#alertMessage').html('你的名字为空啦~');
  } else if (password === '') {
    shake();
    $('#alertMessage').html('你的密码为空啦~');
  } else if (repassword === '') {
    shake();
    $('#alertMessage').html('重复密码为空啦~');
  } else if (password !== repassword) {
    shake();
    $('#alertMessage').html('两次输入的密码不一样哦~');
  } else {
    $.ajax({
      url: '/api/register',
      type: 'POST',
      data: data,
      success: function success(data, status) {
        if (status === 'success') {
          var r = confirm("注册成功啦!,是否跳转到首页?");
          if (r === true) {
            location.href = '/index';
          }
        }
      },
      error: function error(data, status) {
        if (status === "error") {
          shake();
        }
      }
    });
  }
});