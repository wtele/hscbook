var searchFunc = function(path, search_id, content_id) {
    'use strict';

    // 定位搜索框
    var prompt = $('#local-search-input');
    prompt.attr('placeholder','正在载入引索');

    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();
            // 载入结束后替换搜索框文字
            prompt.attr('placeholder','请输入关键词');
            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);
            $input.addEventListener('input', function(){
                var str='<ul class=\"search-result-list\">';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                // 控制正文列表与搜索结果DIV显示隐藏
                if (this.value.trim().length <= 0) {
                    $(document).ready(function(){ $('.local-search-css').hide(); });
                    $(document).ready(function(){ $('.content_container').show(); });
                    return;
                }
                // perform local searching
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != '') {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><a href='"+ data_url +"' class='search-result-title'>"+ data_title +"</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 30;
                            var outLength = 300;  //调大文章正文输出长度
                            if(start < 0){
                                start = 0;
                            }
                            if (start + outLength > content.length){
                                if(content.length < outLength){
                                    outLength = content.length - start;
                                }else{
                                    start = content.length - outLength;
                                }
                            }
                            var match_content = content.substr(start, outLength);
                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                            });

                            str += "<blockquote><p class=\"search-result\">" + match_content +"...</p></blockquote>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                $resultContent.innerHTML = str;
                // 搜索结果输出
                var test=document.getElementsByClassName('search-result-list');
                for(var i=0 ;i<test.length;i++) {
                    var p=test[i].parentNode;
                    if(p.getElementsByTagName('li').length!=0) {
                        $(document).ready(function(){ $('.content_container').hide(); });
                        $(document).ready(function(){ $('.local-search-css').show(); });
                    }
                }
            });
        }
    });
}
