!function(){var e=new XMLHttpRequest;e.open("GET","https://client.hscbook.com/hits/popular-posts?limit=20",!0),e.send(),e.onreadystatechange=function(){var t=document.getElementById("posts");if(4==e.readyState&&200==e.status){var n=JSON.parse(e.responseText);for(var r in t.innerHTML="",n){var i=n[r].slug.replace("article-","article/"),a=document.createElement("li"),s=document.createElement("a");s.setAttribute("href","/"+i+"/"),s.innerHTML=n[r].title,s.setAttribute("style","color: #6e7173;text-decoration: none;");var o=document.createElement("span");o.innerHTML=n[r].pv+" Views",o.setAttribute("id","view"),o.setAttribute("style","float: right;"),a.appendChild(s),a.appendChild(o),t.appendChild(a)}}else t.innerHTML="Sorry! 文章更新不出来，不如你刷新再试试？"}}();