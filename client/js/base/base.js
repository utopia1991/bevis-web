$(document).ready(function () {
	//login && logout
	$(document).click(function (e) {
		target = $(e.target);
		if (target.is(".layout-myIcon")) {
			$('.headLoginButton').removeClass('hide');
		} else {
			$('.headLoginButton').addClass('hide');
		}
	});

	//SCROLL TO TOP
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.tothetop').addClass("showup");
		} else {
			$('.tothetop').removeClass("showup");
		}
	});

	//Click event to scroll to top
	$('.tothetop').click(function () {
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
	});

	//contact
	var animateTime = 300;
	$("#contact-icon").click(function () {
		$("#contact-icon").animate({left: "-160px"}, animateTime, function () {
			$("#contact").animate({left: "20px"}, animateTime);
		});
	});
	$("#contact input[type='submit']").click(function () {
		var data = {};
		data.sendName = $("#sendName").val();
		data.sendAddress = $("#sendAddress").val();
		data.sendEmail = $("#sendEmail").val();
		data.sendTelephone = $("#sendTelephone").val();
		data.sendQuestion = $("#sendQuestion").val();
		console.log('send message: ', data);
		$.ajax({
			url: '/api/sendMessage',
			type: 'POST',
			data: data,
			success: function (data, status) {
				if (status == 'success') {
					$("#contact").animate({left: "-300px"}, animateTime, function () {
						$("#contact-icon").animate({left: "20px"}, animateTime);
					});
				}
			},
			error: function (data, status) {
				if (status == "error") {
					alert('提交失败～')
				}
			}
		});
	});

	//logo page
	$('.iconHover').hover(function () {
		$(this).find('.fa').addClass('fa-2x');
	}, function () {
		$(this).find('.fa').removeClass('fa-2x');
	});

	//map page
	$(".mp").mouseover(function () {
		$(this).find(".feng").show();
	}).mouseout(function () {
		$(this).find(".feng").hide();
	});

	// copyToClipboard
	function copyToClipboard(elementId) {
		// Create a "hidden" input
		var aux = document.createElement("input");
		// Assign it the value of the specified element
		aux.setAttribute("value", document.getElementById(elementId).value);
		// Append it to the body
		document.body.appendChild(aux);
		// Highlight its content
		aux.select();
		// Copy the highlighted text
		document.execCommand("copy");
		// Remove it from the body
		document.body.removeChild(aux);
		alert('Copy Successed!');
	}

	$('#copyButton').on('click', function () {
		copyToClipboard('copyLink');
	});

	// nav bar
	var menuwidth  = 250; // 边栏宽度
	var menuspeed  = 100; // 边栏滑出耗费时间
	var $bdy       = $('body');
	var $container = $('#pgcontainer');
	var $burger    = $('#hamburgermenu');
	var negwidth   = "-"+menuwidth+"px";
	var poswidth   = menuwidth+"px";

	function jsAnimateMenu(tog) {
		if(tog == 'open') {
			$bdy.addClass('openmenu');
			$container.animate({marginRight: negwidth, marginLeft: poswidth}, menuspeed);
			$burger.animate({width: poswidth}, menuspeed);
			$('.overlay').animate({left: poswidth}, menuspeed);
		}

		if(tog == 'close') {
			$bdy.removeClass('openmenu');
			$container.animate({marginRight: "0", marginLeft: "0"}, menuspeed);
			$burger.animate({width: "0"}, menuspeed);
			$('.overlay').animate({left: "0"}, menuspeed);
		}
	};

	$('.menubtn').on('click',function(e){
		if($bdy.hasClass('openmenu')) {
			jsAnimateMenu('close');
		} else {
			jsAnimateMenu('open');
		}
	});

	$('.overlay').on('click', function(e){
		if($bdy.hasClass('openmenu')) {
			jsAnimateMenu('close');
		}
	})
});
