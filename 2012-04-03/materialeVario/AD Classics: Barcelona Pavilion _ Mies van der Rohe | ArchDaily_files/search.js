var ref = document.referrer;
var sevisitor;
var SE = new Array('web.info.com', 'search.', 'del.icio.us/search', 'soso.com', '.yahoo.','/url','.google.','.ask.','.baidu.','.bing.','.aol.','.answers.');
for ( var source in SE){
var match = ref.indexOf(SE[source]);
if (match !=-1) {
var match2 = ref.indexOf('siteurl=www.archdaily.com');
if (match2 != -1) { continue; }
sevisitor=true;
break;
}
}

function searchrTop(){
if (sevisitor){
document.write('<div style="text-align:center">');
GA_googleFillSlot("AD_300x250_se");
document.write('</div>');
}
}

function recommend_proyects(){
	ajaxurl = 'http://vitruvius.kicks-ass.net/wp-admin/admin-ajax.php';
	var data = {
		action: 'get_recommended_search_building',
		cant: 4
	};
	// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
	jQuery.post(ajaxurl, data, function(response) {
		jQuery("#search-adv").html(response)
	});
}

function welcome(){
//if (sevisitor){
	document.write('<div id="welcome-to-ad" style="width:525px;height:250px;border:1px solid yellow;">');
		document.write('<div style="width:295px;height:250px;float:left;border:1px solid blue;">');
		GA_googleFillSlot("AD_300x250_se");
		document.write('</div>');
		document.write('<div style="text-align:center;width:225px;height:250px;float:right;border:1px solid red;">');
		document.write('<div id="follow-archdaily"></div>');
/*		document.write('<iframe src="http://www.facebook.com/plugins/like.php?href=www.archdaily.com&amp;layout=standard&amp;show_faces=true&amp;width=200&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=150" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:150px;" allowTransparency="true"></iframe>');*/
		document.write('<iframe scrolling="no" frameborder="0" src="http://www.facebook.com/connect/connect.php?id=210740790602&amp;connections=0&amp;stream=0&amp;border_color=%23ffffff&amp;css=http%3A%2F%2Fvitruvius.kicks-ass.net%2Fwp-content%2Fthemes%2Farchdaily%2Fwelcome-fanbox.css" allowtransparency="true" style="border: none;"></iframe>');
		document.write('</div>');
	document.write('</div>');
//}
}
