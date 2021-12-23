(function () {
	// 修改为你的部署地址  created_at
	var url = "https://client.hscbook.com/hits/popular-posts?limit=20";
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onreadystatechange = function () {
		var postsContainer = document.getElementById('posts');
		if (request.readyState == 4 && request.status == 200) {
			var popularPosts = JSON.parse(request.responseText);
			postsContainer.innerHTML = "";
			for (var key in popularPosts) {

				var slug = popularPosts[key]['slug'].replace('article-', 'article/'); ;

				var post = document.createElement('li');
				//post.setAttribute('id', 'post'); 

				var link = document.createElement('a');
				link.setAttribute('href', ('/'+slug+'/'));
				link.innerHTML = popularPosts[key]['title'];
                link.setAttribute('style', 'color: #6e7173;text-decoration: none;');

				var view = document.createElement('span');
				view.innerHTML = popularPosts[key]['pv'] + " Views";
				view.setAttribute('id', 'view');
                view.setAttribute('style', 'float: right;');

				post.appendChild(link);
				post.appendChild(view);
				
				postsContainer.appendChild(post);
			}
		} else {
			postsContainer.innerHTML = "Sorry! 文章更新不出来，不如你刷新再试试？";
		}
	};
})();