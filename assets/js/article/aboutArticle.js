"use strict";

$(function () {
    var tabTitle = $("#tab_title"),
        tabContent = $("#tab_content"),
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
        tabCounter = 2;

    var tabs = $("#tabs").tabs();

    var dialog = $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Add: function Add() {
                addTab();
                $('.backCloth').fadeOut(400);
                $(this).dialog("close");
            },
            Cancel: function Cancel() {
                $('.backCloth').fadeOut(400);
                $(this).dialog("close");
            }
        },
        close: function close() {
            $('.backCloth').fadeOut(400);
            form[0].reset();
        }
    });

    var form = dialog.find("form").on("submit", function (event) {
        addTab();
        dialog.dialog("close");
        event.preventDefault();
    });

    function addTab() {
        var label = tabTitle.val() || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
            tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
        tabs.tabs("refresh");
        tabCounter++;
    }

    $("#add_tab").button().on("click", function () {
        $('.backCloth').fadeIn(400).removeClass('hide');
        dialog.dialog("open");
    });

    tabs.on("click", "span.ui-icon-close", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });

    tabs.on("keyup", function (event) {
        if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
            var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
        }
    });
});