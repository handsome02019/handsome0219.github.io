/*! meting.aplayer.js v1.1.0 | MIT License */
function ready(e) {
  (document.attachEvent ?
    "complete" === document.readyState :
    "loading" !== document.readyState) ?
  e(): document.addEventListener("DOMContentLoaded", e);
}
ready(function () {
  function e(e, t) {
    var a = [],
      r = e.dataset;
    (a.element = e),
    (a.music = t),
    (a.showlrc = a.music[0].lrc ? 0 : 3),
    (a.narrow = "true" === r.narrow),
    (a.autoplay = "false" === r.autoplay),
    (a.mutex = "false" !== r.mutex),
    (a.mode = r.mode || "circulation"),
    (a.preload = r.preload || "auto"),
    (a.listmaxheight = r.listmaxheight || "231px"),
    (a.theme = r.theme || "#0487fa"),
    new APlayer(a);
  }
  console.log(
    "\n %c Meting 1.1.0 %c https://i-meto.com/ghost-aplayer/ \n\n",
    "color: #fff; background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;",
    "background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 255, 255) 100%); padding:5px 0;"
  );
  var t = "https://api.i-meto.com/meting/api";
  "undefined" != typeof meting_api && (t = meting_api);
  var a = document.querySelectorAll(".aplayer");
  //添加类名 处理侧边栏开关闪烁
  for (let i = 0; i < a.length; i++) {
    let oldClass = a[i].getAttribute("class");
    let newClass = oldClass + ' ' + 'motion-element';
    a[i].setAttribute('class',newClass)
  }
  Array.prototype.forEach.call(a, function (a) {
    var r = a.dataset.id;
    if (r) {
      var n = new XMLHttpRequest();
      n.open(
          "GET",
          t +
          "?server=" +
          a.dataset.server +
          "&type=" +
          a.dataset.type +
          "&id=" +
          r +
          "&r=" +
          Math.random(), !0
        ),
        (n.onload = function () {
          if (n.status >= 200 && n.status < 400) {
            var t = JSON.parse(n.responseText);
            e(a, t);
          }
        }),
        n.send();
    } else {
      var o = [];
      (o.title = a.dataset.title),
      (o.author = a.dataset.author),
      (o.url = a.dataset.url),
      (o.pic = a.dataset.pic),
      (o.lrc = a.dataset.lrc),
      e(a, [o]);
    }
  });
});
