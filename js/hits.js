/**
 * 这里处理一下 slug，去掉多余字符。
 * Hexo 博客中的页面（即 layout 为 page）的 `page.path` 会带上一个 `index.html`，搞不懂为什么。
 */
String.prototype.cleanSlug = function () {
    var search1 = '/index.html';
	var search2 = '/';
    var dataz = this;

    if (dataz.indexOf(search1) === -1) {
        dataz = dataz.slice(0, -1);
    } else {
        dataz = dataz.replace(search1, '');
    }

    if (dataz.indexOf(search2) === -1) {
        dataz = dataz.slice(0, -1);
    } else {
        dataz = dataz.replace(search2, '-');
    }

	return dataz;
}

var Counter = function (url) {
    this.baseCounterUrl = url;

    this.initAllPostViews = function () {
        var self = this;

        // 遍历 post-view
        // 如果你的容器不是这个 ID，请自行修改
        $('[id=pv_read]').each(function () {
            // 默认 PV 设为 0
            var span = $(this).html(0);
            
            // 获取文章 slug，按需修改，我是把文章的 `post.path` 直接写入计数器容器的 `data` 属性了
            var slug = span.attr('data').cleanSlug();

            self.getPostViewBySlug(slug, function (pv) {
                span.html(pv);
            })
        });
    }

    this.getPostViewBySlug = function (slug, callback) {
        var url = this.baseCounterUrl + '/get/' + slug;

        $.getJSON(url, function (data) {
            callback(data.pv);
        });
    }

    this.incPostViewBySlug = function (slug) {
        var url = this.baseCounterUrl + '/increase/' + slug;

        $.post(url, {}, function (data) {
            $('#pv_write').html(data.pv);
        });
    }
}

// 参数中的 URL 修改为你自己的部署地址
var counter = new Counter('https://client.hscbook.com/hits');


// 初始化页面 pv_read 的计数器（只读不写）
$('[id=pv_read]').each(function () {
$(document).ready(function () {
  counter.initAllPostViews();
});
});

// 初始化页面 pv_write 的计数器（先写再读）
$('[id=pv_write]').each(function () {
counter.incPostViewBySlug(
  $('#pv_write').attr('data').cleanSlug()
);
});