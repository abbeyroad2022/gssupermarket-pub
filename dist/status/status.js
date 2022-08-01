jQuery(document).ready(function () {
  var devMode = true;

  function progressList() {
    var $table = $(".progress-list");
    var tableTr = $table.find("tbody tr");
    var stateFields = $table.find("tr td.state");
    var historyFields = $table.find("td.history");

    // line number
    $table.find("tr td:first-child").each(function (i, v) {
      $(v).text(i + 1);
    });

    stateFields.each(function (i, v) {
      var current = $(v);
      var prop = {
        type: "./" + current.parents(".progress-list").attr("data-type"),
        directory: current.siblings(".dir").text(),
        page: current.siblings(".page").text(),
      };
      var wrapAnchor = $("<a>")
        .attr("target", "_blank")
        .attr("href", function () {
              if(prop.directory.length === 0) return "../" + prop.page + ".html"
              else return "../html/" + prop.directory + "/" + prop.page + ".html"
            })
        .text(current.text());


      console.log(prop.directory.length)
      console.log(prop.directory)

      if (current.text() == "미정") {
        current.addClass("undecided");
        if (!devMode) wrapAnchor = current.text();
      } else if (current.text() == "진행") {
        current.addClass("working");
      } else if (current.text() == "완료") {
        current.addClass("complete");
      } else if (current.text() == "수정") {
        current.addClass("modify");
      } else if (current.text() == "대기") {
        current.addClass("hold");
      } else if (current.text() == "삭제") {
        current.addClass("delete");
        wrapAnchor = current.text();
        current.parent().css("background-color", "#f1f1f1");
      } else if (current.text() == "검증") {
        current.addClass("validation");
      } else if (current.text() == "기존") {
        current.addClass("old");
      }
      current.html(wrapAnchor);
    });

    window._yesterday = 0;
    window._today = 0;
    historyFields.each(function (i, v) {
      var current = $(v);

      var completeChk = $(v).prev().text();

      if (current.text().length != 0) {
        if (completeChk == "완료") {
          var newDate = new Date();
          var yyyy = String(newDate.getFullYear());
          var mm = String(newDate.getMonth() + 1);
          var yesterday =
            yyyy +
            "-" +
            mm.padStart(2, "0") +
            "-" +
            String(newDate.getDate() - 1).padStart(2, "0");
          var today =
            yyyy +
            "-" +
            mm.padStart(2, "0") +
            "-" +
            String(newDate.getDate()).padStart(2, "0");
          var completeDay = current.find("strong").last().text();

          switch (completeDay) {
            case yesterday:
              $(this).parents("tr").css({
                backgroundColor: "rgb(60 212 132 / 10%)",
                "box-shadow": "0 0 5px rgba(0,0,0,0.2)",
              });

              window._yesterday = ++_yesterday;

              break;
            case today:
              $(this).parents("tr").css({
                backgroundColor: "rgb(13 153 228 / 15%)",
                "box-shadow": "0 0 5px rgba(0,0,0,0.2)",
              });

              window._today = ++_today;

              break;
          }
        }

        var wrap = $("<div class='fold-text'>");
        wrap.html(current.html());
        current.html(wrap);       
      }
    });
  }
  function fullInspection() {
    // 검수 추가
    var $fullWrap = $(".full-inspection");
    if (!$fullWrap.length) return;
    $fullWrap.on("click", function (e) {
      var $this = $(this);
      var $type = prompt(
        "어떤타입을 검수하시겠습니까? \n 1.진행+완료 검수 \n 2.진행만 검수 \n 3.완료만 검수"
      );

      var $list = $this.parents(".progress-list");
      var tableTr = $list.find("tbody tr");
      var stateFields = $list.find("td.state");

      tableTr.each(function (i) {
        var tr = tableTr.eq(i);
        var txt = tr.find("td:nth-last-child(2)").text();
        var href = tr.find("td:nth-last-child(2)").find("a").attr("href");
        // console.log(href, txt);

        if ($type == 1) {
          // 전체
          if (txt === "진행" || txt === "완료") {
            openWindow(href);
          }
        } else if ($type == 2) {
          // 진행만
          if (txt === "진행") {
            openWindow(href);
          }
        } else if ($type == 3) {
          // 완료만
          if (txt === "완료") {
            openWindow(href);
          }
        } else {
          return false;
        }
        function openWindow(href) {
          window.open(href, "_blank");
        }
      });
    });
  }

  function progressDashboard() {
    var $temp = $(
      '<div class="progress"> <a href="javascript:void(0);"> <div class="title"> </div> <div class="stat"> <strong class="percent"></strong> <span class="count"> <span class="current"></span> <span class="slash">/</span> <span class="total"></span> </span> </div> </a> </div>'
    );
    var $board = $(".progress-board");
    var $lists = $(".progress-list");

    if (!$lists.length) {
      return;
    }

    $.each($lists, function (i) {
      var $list = $lists.eq(i);
      var $item = $temp.clone();
      var _id = i + 1;
      var chkLength = 0;

      $list.find(".state a").each(function(){
        var chkText = $(this).text();
        if(chkText == "확인"){
          chkLength = chkLength + 1;
        }
      });

      $item.find(".title").text($list.find("h2").text());
      $item.find(".current").text($list.find(".complete").length);
      $item.find(".total").text($list.find(".state").length - chkLength);

      $item
      .find(".percent")
      .text(Math.floor((($list.find(".complete").length + chkLength) / $list.find(".state").length) * 100) + "%");
      $item.find("a").attr("href", "#list" + _id);
      $list.attr("id", "list" + _id);

      $item.find("a").on("click", function (e) {
        e.preventDefault();
        // $("html, body").scrollTop(
        //   $(e.currentTarget.getAttribute("href")).offset().top - ($("#header").outerHeight() * 1.5)
        // );
        $("html, body").animate({
          scrollTop: $(e.currentTarget.getAttribute("href")).offset().top - ($("#header").outerHeight() * 1.5)
        });
      });
      $board.append($item);
    });

    $(".go-top").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: "0" });
    });
  }

  function destMode() {
    var url = location.pathname;
    if (location.pathname.indexOf("_dev") == -1) {
      devMode = false;
      $(".dev-tr").remove();
      $(".full-inspection").remove();
    }
  }

  destMode();
  progressList();
  fullInspection();
  progressDashboard();
});
