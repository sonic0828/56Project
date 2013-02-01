/*
 * Copyright 2012, 56.com
 * @todo: 2012大头小头(hf,mini_hf)合并
 * @overflow: 大头小头大脚小脚输出
 * Creator: Sonic 2012-08-26
 * $Author$
 * $Date$
 */

/*
 * HTML页面调用的方法列表
----------------------------------------------------------------------------------------------------------*/
// 大头 ################################################
/* 新的调用方法如下, 传6个参数：*/
//if(typeof(__header_) != "underfine"){ var a_h_b = new __header_("", 0, 1, 1, 1, 1); }
/* 兼容旧的调用方法如下, (旧的调用方法没有观看记录与消息数的传值，无法选择是否显示“观看记录”，是否显示“消息记录” ): */
 
// var a_h_b = new __header_('',0,1);    //接收3个参数， 1：搜索框的默认值；2：是否新窗口打开，可选1/0；3：是否打开搜索框的关键词提示,可选 1/0
// document.domain='56.com';

// 输出页头 --------
// a_h_b.loadHeader();

// 输出页脚 --------
// if(typeof(__footer_) == "function") __footer_();



// 小头 ################################################
// 输出页头 --------
// if(typeof(h_f_v3) == "object") h_f_v3.showHeader(); */

// 输出页脚 --------
// 默认
// if(typeof(h_f_v3) == "object") h_f_v3.showFooter();
	
// mini页头 白色字
// if(typeof(h_f_v3) == "object") h_f_v3.showMiniFooter();

// mini页头 黑色字 （带参数2 的为白色字体，适应于深颜色的专题）
//if(typeof(h_f_v3) == "object") h_f_v3.showMiniFooter(2);



// 2013版输出页头页脚代码 ################################################
// 大页头(hf) --------
// if(typeof moduleHF == "object"){ moduleHF.showHeader();}

// 大页头(mini_hf) --------
// if(typeof moduleHF == "object"){ moduleHF.showMiniHeader();}

// 大页脚
// if(typeof moduleHF == "object"){ moduleHF.showFooter();}

// 小页脚
// if(typeof moduleHF == "object"){ moduleHF.showMiniFooter();}
// 小页脚(白色文字,适用于黑底)
// if(typeof moduleHF == "object") moduleHF.showMiniFooter(2);



/* 以下是大头小头公用的 func
 * 早期后端整理的函数，前端没修改过，只过格式处理
----------------------------------------------------------------------------------------------------------*/
// @unknow 
// var _h_menu_t;
var isIE = !! window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;

// isApple
function isApple(){
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))){
			return true;
	}
	return false;
}
// jLoader
if (typeof jLoader == 'undefined') {
	var jLoader = function (source, autoRemove, id, charset) {
		id = id || "";
		charset = charset || "gb2312";
		autoRemove = autoRemove || false;
		var b = document.getElementsByTagName("head")[0];
		var c = document.createElement("script");
		c.type = "text/javascript";
		c.charset = charset;
		if (id) {
			c.id = id;
		}
		c.src = source;
		var remove = function () {
			c.onload = null;
			var h = c.parentNode;
			h.removeChild(c);
			delete c;
		};
		var e = function (h) {
			var j = (h ? h : window.event).target
				? (h ? h : window.event).target
				: (h ? h : window.event).srcElement;
			if (j.readyState == "loaded" || j.readyState == "complete") {
				j.onreadystatechange = null;
				if (autoRemove) {
					remove();
				}
			}
		};
		if (navigator.product == "Gecko" && autoRemove) {
			c.onload = remove;
		} else {
			c.onreadystatechange = e;
		}
		b.appendChild(c);
	};
}
var jLoad = {};
// setStat
if (typeof setStat == 'undefined') {
	function setStat(s, t) {
		var u = "http://stat3.corp.v-56.com/player.htm?s=";
		if (typeof t == 'number') {
			setTimeout(function () {
					jLoader(u + s, true);
				}, t);
		} else {
			jLoader(u + s, true);
		}
	}
}
// getCookieVal & getCookie
if (typeof getCookieVal == "undefined") {
	function getCookieVal(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	}
	function getCookie(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0)
				break;
		}
		return "";
	}
}
// 空函数保护
if(typeof(_page_)=="undefined"){var _page_;}


/* 以下是大头hf
 * 早期后端整理的函数，前端接手后，略做修改
----------------------------------------------------------------------------------------------------------*/

// @unknow 
// window.__header_filesLoaded = false;


/**
 * 模块：显示页头(大页头，小页头)
 */
var moduleHF = (function(){
	/* 大页头
	 * -------------------------------------------------------------------------------------------*/
	/**
	 * 大页头构造函数
	 * @param  {string} key       搜索框默认关键词
	 * @param  {number} newwindow 是否新开窗口
	 * @param  {number} auto      搜索自动完成是否打开
	 * @param  {number} vRecord   观看记录是否打开
	 * @param  {number} msgPopup  短消息数是否打开
	 * @param  {number} msgPush   消息提醒是否打开
	 * @return {action}           [description]
	 */
	function __header_(headType) {
		/*
		__header_.uo.key = key || "";
		this.newwindow = newwindow == 0 ? 0 : 1;
		this.auto = auto == 0 ? 0 : 1;
		this.vRecord = vRecord == 0 ? 0 : 1;
		this.msgPopup = msgPopup == 0 ? 0 : 1;
		this.msgPush = msgPush == 0 ? 0 : 1;
		*/
	
		this.newwindow = false;
		this.vRecord = 1;
		this.msgPopup = 1;
		this.msgPush = 1;
		this.headType = headType;
		// 普通页头的处理
		if(this.headType =="normal"){
			// alert(headType);
			//__header_.uo.key = key || "";
			this.auto = true;
			this.loadLoginBox();
			var hs = this.headerHTML();

		}// mini页头的处理
		else if(this.headType =="mini"){
			// alert(headType);
			this.auto = false;
			this.loadLoginBox();
			var hs = this.miniHeaderHTML();
		}
		this.hs = hs;
	}
	// 大页头模块HTML代码分解
	__header_.prototype = {
		headerHTML : function () {
			return '' + 
			'<div class="h_v4">' +
			'<div class="h_site">' +
				'<div class="h_site_in">' +
					'<div class="h_site_home"><a href="http://www.56.com" title="主页" class="h_site_home_a"><s class="icon_home"></s></a></div>' +
					'<ul class="h_site_nav">' +
						'<li class="first"><a id="addToFavoritesHandle" href="javascript:;" title="加入收藏">加入收藏</a></li>' +
						'<li><a href="http://z.56.com" title="小镇">小镇</a></li>' +
						'<li><a href="http://kan.56.com" title="看台">看台</a></li>' +
						'<li><a href="http://like.56.com" title="随心看">随心看</a></li>' +
						'<li onclick="setStat(\'n_nav_mall\');"><a href="http://i.56.com/56mall/" title="乐币商城">乐币商城</a></li>' +
						'<li><a href="http://union.56.com/info.html" title="视频分享计划">视频分享计划</a></li>' +
						'<li onclick="setStat(\'n_nav_mobile\');"><a href="http://mobile.56.com" title="手机客户端">手机客户端</a></li>' +
						'<li><a href="http://feedback.56.com/" title="反馈">反馈</a></li>' +
					'</ul>' +
					'<div class="h_site_info">'+ (this.rUserStatus(this.headType)) +'</div>' +
				'</div>' +
			'</div>' + 
			'<div class="h_main">' + 
				'<div class="logo">' + 
					'<a class="logo_56" title="56.com - 中国最大的视频分享网站,在线视频观看,视频搜索,视频上传及分享互动" href="http://www.56.com">56.com</a>' + 
					'<div class="logo_act"></div>' + 
				'</div>' + 
				'<div class="h_search">' + 
					'<div class="h_search_main">' + 
						'<form id="hSearchForm" name="search" action="http://so.56.com/index/" accept-charset="utf-8" method="GET" onsubmit="" target="_blank">' + 
							'<div class="h_search_p">' + 
								'<div id="dropMenu0" class="f_drop_menu h_search_drop">' + 
									'<div class="f_drop_menu_main">' + 
										'<a href="#" title="全部" class="f_drop_menu_main_title" hidefocus="true"><span id="hSearchOptCur">全部</span><em class="f_drop_menu_main_arrow">v</em></a>' + 
									'</div>' + 
									'<div class="f_drop_menu_sub">' + 
										'<div class="f_drop_menu_sub_ct">' + 
											'<ul class="f_drop_menu_sub_list">' + 
												'<li><a href="javascript:;" id="searchAllHandle" hidefocus="true">全部</a></li>' + 
												'<li><a href="javascript:;" id="searchVideoHandle" hidefocus="true">视频</a></li>' + 
												'<li><a href="javascript:;" id="searchAlbumHandle" hidefocus="true">专辑</a></li>' +
											'</ul>' + 
										'</div>' + 
									'</div>' + 
								'</div>' + 
								'<div class="h_search_input">' + 
									//'<input type="text" maxlength="60" id="Search_input" name="key" class="inp_search" value="' + __header_.uo.key + '" autocomplete="off" onPropertyChange="ajaxsearch()" oninput="ajaxsearch()" onblur="hiddensearch(),resetSearchInVal()" onfocus="create_prompt_list(),ajaxsearch()" onkeydown="searchkeydown(event)"/>' + 
									// '<input type="text" maxlength="60" id="Search_input" name="key" class="inp_search" value="" autocomplete="off" onPropertyChange="ajaxsearch()" oninput="ajaxsearch()" onblur="hiddensearch(),resetSearchValue(this)" onfocus="ajaxsearch()" onkeydown="searchkeydown(event)"/>' + 
									// '<input type="text" maxlength="60" id="Search_input" name="key" class="inp_search" value="" autocomplete="off" onPropertyChange="ajaxsearch()" oninput="ajaxsearch()" onblur="hiddensearch()" onfocus="create_prompt_list(),ajaxsearch()" onkeydown="searchkeydown(event)"/>' + 
									'<input type="text" maxlength="60" id="Search_input" class="inp_search" value="" autocomplete="off" rel="Search_btn" />' + 
									'<input type="hidden" value="all" id="Type_input" />' + 
									'<div id="showJKL" style="display:none;"></div>' + 
								'</div>' + 
							'</div>' + 
							'<div class="h_search_b">' + 
								'<input type="submit" onclick="" class="h_btn_search_hover" value="搜索" id="Search_btn" />' + 
							'</div>' + 
						'</form>' + 
					'</div>' + 
					'<div class="h_search_extra">' + 
						'<ul class="h_search_keyword" id="hSearchKeyword"></ul>' + 
					'</div>' + 
				'</div>' + 
				'<div class="h_info"><ul class="h_info_shortcuts"><li><a href="http://upload.56.com/v/" class="upload" target="_blank" onclick="setStat(\'n_nav_upload\',1000);"><s class="icon_upload"></s><em>上传视频</em></a></li><li><a href="http://mv.56.com/" target="_blank" onclick="setStat(\'n_nav_mv\',1000);" class="m2v"><em>制作相册视频</em></a></span></li></ul></div>' + 
			'</div>' + 
			'<div class="h_nav" role="navigation">' + 
				'<div class="h_nav_in">' + 
					'<div class="h_nav_chn">' + 
						'<ul class="h_nav_chn_ul">' + 
							//'<li onclick="setStat(\'n_nav_home\');"><a href="http://www.56.com/" title="首页" class="nav_home"><em>首页</em></a></li>' + 
							'<li onclick="setStat(\'newfront4\');" ' + f2e_fn.isCurrent('video.56') + '><a href="http://video.56.com/" title="全部">视频</a></li>' + 
							'<li onclick="setStat(\'n_nav_dv\');" ' + f2e_fn.isCurrent('dv.56') + '><a href="http://dv.56.com/" title="原创">原创</a></li>' + 
							'<li onclick="setStat(\'n_nav_56product\');" ' + f2e_fn.isCurrent('dv.56') + '><a href="http://dv.56.com/product/" title="56出品">56出品</a></li>' + 
							'<li onclick="setStat(\'n_nav_mp\');" ' + f2e_fn.isCurrent('mp.56') + '><a href="http://mp.56.com/" title="微栏目">微栏目</a></li>' + 
							'<li onclick="setStat(\'n_nav_ent\');" ' + f2e_fn.isCurrent('ent.56') + '><a href="http://ent.56.com/" title="娱乐">娱乐</a></li>' + 
							'<li onclick="setStat(\'n_nav_music\');" ' + f2e_fn.isCurrent('music.56') + '><a href="http://music.56.com/" title="音乐">音乐</a></li>' + 
							'<li onclick="setStat(\'i_nav_tv\');" ' + f2e_fn.isCurrent('tvlist.56') + '><a href="http://tvlist.56.com/" title="电视剧">电视剧</a></li>' + 
							'<li onclick="setStat(\'total_1_31115539\');" ' + f2e_fn.isCurrent('movielist.56') + '><a href="http://movielist.56.com/" title="电影">电影</a></li>' + 
							'<li onclick="setStat(\'n_nav_zy\');" ' + f2e_fn.isCurrent('zy.56') + '><a href="http://zy.56.com/" title="综艺">综艺</a></li>' + 
							'<li onclick="setStat(\'n_nav_news\');" ' + f2e_fn.isCurrent('news.56') + '><a href="http://news.56.com/" title="热点">热点</a></li>' + 
							'<li onclick="setStat(\'n_nav_gaoxiao\');" ' + f2e_fn.isCurrent('fun.56') + ' class="last"><a href="http://fun.56.com/" title="搞笑">搞笑</a></li>' + 
							'<li onclick="setStat(\'n_nav_xiu\');" ' + f2e_fn.isCurrent('xiu.56') + ' class="last"><a href="http://xiu.56.com/" title="我秀">我秀</a></li>' + 
						'</ul>' + 
					'</div>' + 
					'<div class="h_nav_pro">' + 
						'<ul class="h_nav_pro_ul">' + 
							'<li onclick="setStat(\'n_nav_space\');"><a href="http://i.56.com/" title="空间">空间</a></li>' + 
							'<li onclick="setStat(\'n_nav_mm\');"><a href="http://mm.56.com" title="美女主播">美女主播</a></li>' + 
							'<li onclick="setStat(\'n_nav_photo\');"><a href="http://photo.56.com/" title="相册">相册</a></li>' + 
							'<li onclick="setStat(\'n_nav_ican\');"><a href="http://www.56.com/ican/ican.html" title="iCan" class="ican"><strong>i</strong>Can</a></li>' + 
						'</ul>' + 
					'</div>' + 
				'</div>' + 
			'</div>' +
			'</div>';
		}, 
		// @unknow
		// c : '', 
		miniHeaderHTML : function(){
			return '' + 
			'<div class="mini_h_v4">'+
				'<div class="inner">'+
						'<a href="http://www.56.com" title="56.com - 中国领先的视频分享网站,在线视频观看,视频搜索,视频上传及分享互动" class="logo" onclick="setStat(\'title_logo\');">56.com</a>'+
						'<div class="mini_h_nav">'+
						'<ul class="mini_h_menu">'+
							'<li><a href="http://kan.56.com/">看台</a></li>'+
							'<li><a href="http://video.56.com/" onclick="setStat(\'title_video\');">视频</a></li>'+
							'<li><a href="http://photo.56.com/">相册</a></li>'+
							'<li><a href="http://xiu.56.com/">我秀</a></li>'+
							'<li>'+
								'<div id="dropMenu3" class="f_drop_menu drop_menu_theme_1 c_n_drop_menu">'+
									'<div class="f_drop_menu_main">'+
										'<a href="javascript:;" class="f_drop_menu_main_title">频道<em class="f_drop_menu_main_arrow">v</em></a>'+
									'</div>'+
									'<div class="f_drop_menu_sub">'+
										'<div class="f_drop_menu_sub_ct">'+
											'<ul class="chn_list_item">'+ 
												'<li class="bold"><a href="http://dv.56.com/" target="_blank">原创</a></li>'+
												'<li><a href="http://dv.56.com/hongren/" target="_blank">红人馆</a></li>'+
												'<li><a href="http://dv.56.com/ycsyl/" target="_blank">首映礼</a></li>'+
												'<li><a href="http://dv.56.com/school/" target="_blank">高校影像力</a></li>'+
												'<li><a href="http://dv.56.com/56paike/" target="_blank">拍客</a></li>'+
												'<li><a href="http://dv.56.com/funny/" target="_blank">微播江湖</a></li>'+
												'<li><a href="http://mp.56.com/" target="_blank">微栏目</a></li>'+
											'</ul>'+
											'<ul class="chn_list_item">'+
												'<li class="bold"><a href="http://ent.56.com/" target="_blank">娱乐</a></li>'+
												'<li><a href="http://tv.56.com/" target="_blank">影视</a></li>'+
												'<li><a href="http://music.56.com/" target="_blank">音乐</a></li>'+
												'<li><a href="http://so.56.com/videolist-type-hot_t-_c-8.html" target="_blank">动漫</a></li>'+
												'<li><a href="http://fun.56.com/" target="_blank">搞笑</a></li>'+
												'<li><a href="http://mm.56.com/" target="_blank">美女主播</a></li>'+
											'</ul>'+
											'<ul class="chn_list_item">'+
												'<li class="bold"><a class="first" href="http://news.56.com/" target="_blank">热点</a></li>'+
												'<li><a href="http://2012.56.com/" target="_blank">奥运</a></li>'+
												'<li><a href="http://sport.56.com/" target="_blank">体育</a></li>'+
												'<li><a href="http://so.56.com/videolist-type-hot_t-_c-10.html" target="_blank">科教</a></li>'+
												'<li><a href="http://video.56.com/videolist-v-_type-hot_c-28.html" target="_blank">汽车</a></li>'+
												'<li><a class="active" href="http://video.56.com/videolist-v-_type-hot_c-11.html" target="_blank">女性</a></li>'+
												'<li><a href="http://video.56.com/videolist-v-_type-hot_c-34.html" target="_blank">母婴</a></li>'+
												'<li><a href="http://travel.56.com/" target="_blank">旅游</a></li>'+
											'</ul>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</li>'+
						'</ul>'+
					'</div>'+
					'<div class="mini_h_search">'+
						'<div class="mini_h_search_in">'+
							'<div class="mini_h_search_input">'+
								'<form method="GET" accept-charset="utf-8" action="http://so.56.com/index/" name="search" id="hSearchForm" target="_blank">'+
									'<input type="text" class="gray inp_search" id="Search_input" maxlength="60" autocomplete="off" value="" />'+
									'<input type="submit" class="btn_search" value="搜索" id="Search_btn" onclick="setStat(\'title_home\');"/>'+
									// '<input type="hidden" value="utf-8" name="charset" id="charset"/>'+
									'<input type="hidden" value="all" id="Type_input"/>'+
									// '<input type="hidden" value="" name="kw" id="kw"/>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="mini_h_info">'+ (this.rUserStatus(this.headType)) +'</div>'+
				'</div></div>';
		},

		loginUserId : function () {
			if (this.user_id) 
				return this.user_id;
			this.user_id = getCookie("member_id").replace("@56.com", "");
			if (this.user_id.indexOf('guest') > -1) {
				this.user_id = '';
			}
			return this.user_id;
		}, 

		/**
		 * msgPopHTML : 返回消息弹开层HTML代码
		 * @tudo 通过收集回来的 msgPopup 的传值跟是否已登录返回消息下拉菜单代码
		 * @author Sonic
		 * @lastModify: sonic (2012-07-27)
		 */
		msgPopupHTML : function () {
			// if(this.msgPopup == 1 && usr.gIsLogin()){
			if(this.msgPopup == 1){ //不登录时也能显示短消息 2012-11-09
				return '' + 
				// '<li class="'+ ((this.headType=="normal") ? "h_info_qmenu_item alt_item" : "mini_h_qmenu_item" ) +' nav_msg_status">'+
				'<li class="h_info_qmenu_item alt_item nav_msg_status">'+
					'<div id="dropMenu2" class="f_drop_menu drop_menu_theme_1 m_d_drop_menu">'+
						'<div class="f_drop_menu_main">'+
							'<a href="http://msg.56.com/2012/" onClick="setStat(\'msgcenter_15141745\',1000);" class="f_drop_menu_main_title" target="_blank">消息<em id="hMsgNum" class="h_records_num" style="display:none">0</em><em class="f_drop_menu_main_arrow">v</em></a>'+
						'</div>'+
						'<div class="f_drop_menu_sub">'+
							'<div id="smsNotify" class="f_drop_menu_sub_ct">'+
								'<p class="m_d_loading">消息加载中...</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="msg_push_box" id="msgPushBox" style="display:none">'+
						'<div class="msg_push_box_arrow"></div>'+
						'<a id="msgPushBoxClose" href="javascript:;" onclick="this.parentNode.style.display=\'none\';this.rel=\'hidden\'" class="msg_push_box_close" title="关闭" rel="' + (this.msgPush == 0 ? 'hidden' : '') + '">X</a>'+
						'<div id="msgPushBoxCt" class="msg_push_box_ct">'+
						'</div>'+
					'</div>'+
				'</li>';
			}else{
				return '';
			}
		},

		/**
		 * vRecordHTML : 返回观看记录HTML代码
		 * @tudo 通过收集回来的 vRecord 的传值返回观看记录HTML代码
		 * @author Sonic
		 * @lastModify: sonic (2012-08-11)
		 */
		vRecordHTML : function () {
			if(this.vRecord == 1){
				// 取云观看依赖的JS
				if(typeof jQuery =="undefined"){ jLoader("http://s1.56img.com/script/lib/jquery/jquery-1.4.4.min.js", true , "jQueryLib" , "utf-8"); }
				//jLoader("http://s1.56img.com/script/ui/cloudplay/v1/cloudplay_v.1.js", true , "cloudPlayFn" , "utf-8");
				var fn = function(){ jLoader("http://s1.56img.com/script/ui/cloudplay/v1/cloudplay_v.1.js", true , "cloudPlayFn" , "utf-8"); }
				setTimeout(fn, 300);

				// 云观看设置
				var synView  = "";
				var unviewLength = (_.getCookie("quicklist") != "" && _.getCookie("quicklist").split(",").length)?_.getCookie("quicklist").split(",").length:0;
				if(unviewLength > 99){ unviewLength  = "99+"; }
				if(!usr.gIsLogin()){
					synView = '<div class="c_p_hd_extra" id="load_cloud_sync"><a class="btn_cloud_sync" title="同步到云播放" href="javascript:show_login(),setStat(\'total_2_02190104\');"><s class="cloud_icon"></s>同步到云播放</a></div>';
				}
				var cloudNumHTML = '<span id="cloudNum" class="h_records_num" '+ ((unviewLength != 0) ? "":"style=\'display:none\'" ) +'>'+unviewLength+'</span>';

				var returnHTML = [
				'<li class="h_info_qmenu_item alt_item">'+
				// '<li class="'+ ((this.headType=="normal") ? "h_info_qmenu_item alt_item" : "mini_h_qmenu_item last" ) +'">'+
					'<div id="cloudPlayDropMenu" class="f_drop_menu drop_menu_theme_1 c_p_drop_menu">'+
						'<div class="f_drop_menu_main">'+
							'<a class="f_drop_menu_main_title" href="javascript:;">我的观看'+cloudNumHTML+'<em class="f_drop_menu_main_arrow">v</em></a>'+
						'</div>'+
						'<div class="f_drop_menu_sub">'+
							'<div id="cpRecord" class="f_drop_menu_sub_ct" >' +
							   '<div class="c_p_drop_menu_hd">' +
							      '<ul class="c_p_hd_tabs">' +
									 '<li class="current" id="viewRecord"><a hidefocus="true" rel="#isViewedRecord" href="javascript:showViewRecord(),setStat(\'total_2_02190019\');" onclick="">我看过的</a></li>' +
									 '<li id="dianboRecord"><a hidefocus="true" rel="#isUnViewRecord"  href="javascript:PlaylistBar.initDianboRecordS(),showUnViewRecord(),setStat(\'total_2_02190033\');">点播单(<span class="cloud_num" id="cloud_num">'+unviewLength+'</span>)</a></li>' +
								  '</ul>' + 
									synView  +
							   '</div>' +
							   '<div class="c_p_drop_menu_bd">' +
								   '<div id="vewRecordS" class="c_p_list c_p_list_viewed"></div>' +
								   '<div id="dianboRecordS" class="c_p_list c_p_list_unview" style="display:none"><div id="cpLoading" class="c_p_loading"><div class="c_p_loading_txt">加载中...</div></div></div>' +
							   '</div>' +
							'</div>'+
						'</div>'+
					'</div>'+
				'</li>'].join("");
				return returnHTML;
			}else{
				return '';
			}
		},

		/**
		 * 返回大小页头用户登陆信息代码
		 * @return {html} [description]
		 * @author Sonic
		 * @lastModify: sonic (2013-01-24)
		 */
		loginInfoHTML : function(headType){
			// alert("loginInfoHTML");
			// 用户名信息获取
			var user_id = this.loginUserId();
			var nickname = decodeURIComponent ? decodeURIComponent(getCookie("user_nickname_js")) : user_id;
			var u = nickname ? nickname : user_id;
			if ( u.length > 8){ u = u.substring(0, 8) + '..' }

			// 未登陆 HTML 
			if (headType === "normal"){
				var unloginHtml = [
					'<li class="h_info_qmenu_item first_item my56">我的56网:</li>',
					'<li class="h_info_qmenu_item"><a href="javascript:;" onclick="weibo.connect(\'sina\',\'loginbox\');" class="rp_a"><s class="rp_tsina"></s>新浪</a></li>',
					'<li class="h_info_qmenu_item"><a href="javascript:;" onclick="weibo.connect(\'qzone\',\'loginbox\');" class="rp_a"><s class="rp_qq"></s>QQ</a></li>',
					'<li class="h_info_qmenu_item"><a href="javascript:show_login();" onclick="setStat(\'n_nav_login\',1000);">登录</a></li>',
					'<li class="h_info_qmenu_item"><a id="regLinkItem" target="_blank" href="http://user.56.com/reg/" onclick="setStat(\'n_nav_reg\',1000);">注册</a></li>'
				].join("");
			}else if(headType ==="mini"){
				var unloginHtml = [
					'<li class="h_info_qmenu_item first_item my56">我的56网:</li>',
					'<li class="h_info_qmenu_item"><a href="javascript:show_login();" onclick="setStat(\'n_nav_login\',1000);">登录</a></li>',
					'<li class="h_info_qmenu_item"><a id="regLinkItem" target="_blank" href="http://user.56.com/reg/" onclick="setStat(\'n_nav_reg\',1000);">注册</a></li>'
				].join("");				
			}


			// 大头自判断
			// var isNormalHeader = f2e_fn._id("sys_info").className;
			// fn = function(){alert(isNormalHeader)}
			// setTimeout(fn,2000);
			// var rr = rHeadType();
			// console.log(rr);
			
			// 已登录 HTML
			var loginedHtml = [
				// ((rHeadType() == "normal" || headType ==="normal" )?'<li class="h_info_qmenu_item first_item">我的56网:</li>':''),
				'<li class="h_info_qmenu_item first_item my56">我的56网:</li>',
				'<li class="h_info_qmenu_item alt_item">',
					'<div id="dropMenu4" class="f_drop_menu drop_menu_theme_1 m_i_u_drop_menu">',
						'<div class="f_drop_menu_main"><a href="http://i.56.com/u/' + user_id + '/home.html" target="_blank" class="f_drop_menu_main_title">' + u + '<em class="f_drop_menu_main_arrow">v</em></a></div>',
						'<div class="f_drop_menu_sub">',
							'<div class="f_drop_menu_sub_ct">',
								'<ul class="f_drop_menu_sub_list">',
									'<li><a href="http://i.56.com/u/' + user_id + '" target="_blank">我的空间</a></li>',
									'<li><a href="http://i.56.com/u/' + user_id + '/home.html" target="_blank">个人中心</a></li>',
									'<li class="line"><a href="http://w.56.com/my/index.php?action=Video&do=videoList" target="_blank">我的视频</a></li>',
									'<li><a href="http://feedback.56.com" target="_blank">意见反馈</a></li>',
									'<li><a href="javascript:logViewRecOut();">退出</a></li>',
									//'<li><a href="http://urs.56.com/php/logout.php">退出</a></li>',
								'</ul>',
							'</div>',
						'</div>',
					'</div>',
				'</li>'
			].join("");

			// 根据是否登录返回相应代码
			if(user_id.length){  return loginedHtml } else { return unloginHtml }
		},

		/**
		 * 返回大小页头用户信息代码
		 * @return {html} [description]
		 * @author Sonic
		 * @lastModify: sonic (2013-01-24)
		 */
		rUserStatus : function(headType){
			// 传入参数获取
			var headType = headType || "normal";
			// var part = part || null;

			// 上传视频 & 相册视频按钮 HTML 
			var shortcuts = '<ul class="h_info_shortcuts"><li><a href="http://upload.56.com/v/" class="upload" target="_blank" onclick="setStat(\'n_nav_upload\',1000);"><s class="icon_upload"></s><em>上传视频</em></a></li><li><a href="http://mv.56.com/" target="_blank" onclick="setStat(\'n_nav_mv\',1000);"><em>制作相册视频</em></a></span></li></ul>';
			
			// 小页头上传按钮区域
			var miniShortcuts = [
				'<li class="h_info_qmenu_item last">'+
					'<div id="dropMenu6" class="f_drop_menu s_c_drop_menu">'+
						'<div class="f_drop_menu_main">'+
							'<a href="http://upload.56.com/v/" onClick="setStat(\'i_nav_upload_8\', true);" title="上传视频" class="f_drop_menu_main_title" target="_blank"><s class="icon_upload"></s>上传视频<em class="f_drop_menu_main_arrow">v</em></a>'+
						'</div>'+
						'<div class="f_drop_menu_sub">'+
							'<div class="f_drop_menu_sub_ct">'+
								'<ul class="f_drop_menu_sub_list">'+
									'<li><a href="http://photo.56.com/mv/make/" onClick="setStat(\'si_nav_mv\', true);" target="_blank">制作相册视频</a></li>'+
									'<li><a href="http://upload.56.com/r/" onClick="setStat(\'adminrec_31105725\', true);" target="_blank">录制视频</a></li>'+
								'</ul>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</li>'
			].join("");

			// 大页头返回有用户信息代码
			if( headType ==="normal" ){
				var sHtml = [
					/* 用户登陆信息 & 短消息 */
					'<ul id="sys_info" class="h_info_qmenu">',
					this.loginInfoHTML(headType),
					this.msgPopupHTML(),
					'</ul>',
					/* 云观看 */
					'<ul class="h_info_qmenu">',
					this.vRecordHTML(),
					'</ul>'
				].join("");
				return sHtml;
			} 
			// 小页头返回的用户信息代码
			else if(headType ==="mini" ){
				var sHtml = [
					/* 用户登陆信息&短消息 */
					'<ul id="sys_info" class="mini_h_qmenu">',
					this.loginInfoHTML(headType),
					this.msgPopupHTML(),
					'</ul>',
					/* 云观看 & 下拉按钮 */
					'<ul class="mini_h_qmenu">',
					this.vRecordHTML(),
					miniShortcuts,
					'</ul>'
				].join("");
				return sHtml;
			}
		},

		/*loadHfBaseJs : function(){
			jLoader('http://s1.56img.com/script/fn/search/v4/search_v.1.js', true, 'searchAutoCompleteJs', 'utf-8');
			jLoader('http://s2.56img.com/script/page/common/v3/share.js', true, 'weiboShareJs', 'utf-8');
		},*/

		loadLoginBox : function () {  /* @discard by sonic 2012-08-22 */
			if (!this.loginUserId() && typeof _login == "undefined") {
				jLoader('http://s2.56img.com/script/page/common/v3/weibo.js', true, 'header_weibo', 'utf-8');
				jLoader('http://s2.56img.com/script/page/login/v5/login_2012_v.6.js', true, 'header_login', 'utf-8');
				if (typeof loaderRenrenIframe == "undefined") {
					jLoader('http://s2.56img.com/script/page/common/v3/renren_al.js?v=1216v3', true, 'header_renren_al', 'utf-8');
				}
			}
		},

		loadHeader : function () {
			if (this.auto) { 
				jLoader('http://s1.56img.com/script/fn/search/v4/search_v.1.js', true, 'searchAutoCompleteJs', 'utf-8');
				
				/*var fn = function(){ moduleSAC.initJKLoad()}
				setTimeout(fn, 1000);*/
			}
			// alert(this.hs);
			document.write(this.hs);
			/* 调用 o_utf8.js 的getViewCookie */
			if(typeof getViewCookie != "undefined" ){ setTimeout(getViewCookie,500) }
			/* 产品反馈，页头的下拉菜单功能在window.onload后再执行，低网速用户等待功能可用的时间太长，下拉内容中的“录制视频”PV严重下跌，故把f2e_fn.dropMenuHover()单独诺至HTML结构输出时马上执行。2012-09-07 */
			if(typeof f2e_fn.dropMenuHover != "undefined"){ f2e_fn.dropMenuHover(); }
			
			/* 搜索区域内容与事件填充 */
			if(this.headType == "normal"){
				f2e_fn.bindSearchEvent();
			}else if(this.headType = "mini"){
				f2e_fn.bindSearchEventMini();
			}

			// 加入收藏夹事件bind
			f2e_fn.bindAddToFavorites();
		}
	}

	/* @discard
	function rHeadType(){
		if(f2e_fn._id("sys_info")){
			var a = f2e_fn._id("sys_info");
			if(a.classNme == "h_info_qmenu"){ 
				return "normal";
			}else{
				return "mini";
			}
		}
	}*/

	// 大页头实例化
	function initHeader(){
		var _header = new __header_("normal");
		 _header.loadHeader();
		 hf_option.msgPopupHTML = _header.msgPopupHTML;		// 登录成功后会调用  h_f_v3.msgPopupHTML(); 临时拷贝一份出来
		 // hf_option.loginInfoHTML = function(){_header.loginInfoHTML("normal")};
		 hf_option.loginInfoHTML = _header.loginInfoHTML;
		 hf_option.loginUserId = _header.loginUserId;
	}
	// 小页头实例化
	function initMiniHeader(){
		var _miniHeader = new __header_("mini");
		 _miniHeader.loadHeader();
		 hf_option.msgPopupHTML = _miniHeader.msgPopupHTML;	// 登录成功后会调用  h_f_v3.msgPopupHTML(); 临时拷贝一份出来
		 hf_option.loginInfoHTML = _miniHeader.loginInfoHTML;
		 hf_option.loginUserId = _miniHeader.loginUserId;
	}



	/* 大小页脚
	 * -------------------------------------------------------------------------------------------*/
	/**
	 * 显示大页脚
	 */
	function showFooter(){
		if (typeof(___script___) == "object") { ___script___.include("foot"); }
		var html = '<div class="f_v4">' + 
			'<div class="f_search">' + 
				'<div class="f_search_in">' + 
					'<div class="h_search_main">' + 

							'<form id="fSearchForm" name="search_foot" action="http://so.56.com/index/" accept-charset="utf-8" method="GET" onsubmit="" target="_blank">' + 
								'<div class="h_search_p">' + 
									'<div id="dropMenu1" class="f_drop_menu h_search_drop">' + 
										'<div class="f_drop_menu_main">' + 
											'<a href="javascript:;" title="全部" class="f_drop_menu_main_title" hidefocus="true"><span id="fSearchOptCur">全部</span><em class="f_drop_menu_main_arrow">v</em></a>' + 
										'</div>' + 
										'<div class="f_drop_menu_sub">' + 
											'<div class="f_drop_menu_sub_ct">' + 
												'<ul class="f_drop_menu_sub_list">' + 
													'<li><a href="javascript:;" id="searchAllHandleFooter" hidefocus="true">全部</a></li>' + 
													'<li><a href="javascript:;" id="searchVideoHandleFooter" hidefocus="true">视频</a></li>' + 
													'<li><a href="javascript:;" id="searchAlbumHandleFooter" hidefocus="true">专辑</a></li>' +
												'</ul>' + 
											'</div>' + 
										'</div>' + 
									'</div>' + 
									'<div class="h_search_input">' + 
										'<input type="text" maxlength="60" id="search_foot_input" class="inp_search" value="" autocomplete="off" rel="Search_btn_footer" />' + 
										'<input type="hidden" value="all" id="Type_input_footer" />' + 
									'</div>' + 
								'</div>' + 
								'<div class="h_search_b">' + 
									'<input type="submit" onclick="" class="h_btn_search_hover" value="搜索" id="Search_btn_footer" />' + 
								'</div>' + 
							'</form>' + 

					'</div>' + 
					'<div class="f_search_extra">' + 
						'<ul class="f_search_keyword">' + 
							'<li><a href="http://top.56.com/" target="_blank">排行榜</a></li>' + 
							'<li><a href="http://so.56.com/videolist-type-new_t-week_c-_key-.html" target="_blank">最新视频</a></li>' + 
							'<li><a href="http://so.56.com/videolist-type-hot_t-week_c-_key-.html" target="_blank">最热视频</a></li>' + 
						'</ul>' + 
					'</div>' + 
				'</div>' + 
			'</div>' + 
			'<div class="f_main">' + 
				'<div class="f_link">' + 
			    	'<div class="f_link_group g1">' + 
			        	'<h4>服务</h4>' + 
			            '<ul>' + 
					       	'<li><a href="http://video.56.com" target="_blank">视频</a></li>' + 
							'<li><a href="http://video.56.com/videolist-v-album_type-_t-_c-_key-.html" target="_blank">专辑</a></li>' + 
							'<li><a href="http://kan.56.com" target="_blank">看台</a></li>' + 
					       	// '<li><a href="http://3g.56.com/info/index.html" target="_blank">手机</a></li>' + 
					       	'<li><a href="http://like.56.com" target="_blank">随心看</a></li>' + 
							'<li class="last"><a href="http://www.56.com/p98/list/" target="_blank">相册视频</a></li>' + 
			            '</ul>' + 
			            '<h4>社区</h4>' + 
			            '<ul>' + 
							//'<li><a href="http://tieba.56.com/" target="_blank">我贴</a></li>' + 
							'<li><a href="http://i.56.com/" target="_blank">空间</a></li>' + 
							'<li><a href="http://mm.56.com/" target="_blank">美女主播</a></li>' + 
			           ' </ul>' + 
			        '</div>' + 
			        '<div class="f_link_group g2">' + 
			        	'<h4>分类</h4>' + 
			            '<ul>' + 
			            	'<li><a href="http://news.56.com/" target="_blank">热点</a></li>' + 
			                '<li><a href="http://dv.56.com/" target="_blank">原创</a></li>' + 
			                '<li><a href="http://ent.56.com/" target="_blank">娱乐</a></li>' + 
			                '<li><a href="http://tv.56.com/" target="_blank">影视</a></li>' + 
			                '<li><a href="http://zy.56.com/" target="_blank">综艺</a></li>' + 
			                '<li><a href="http://2012.56.com/" target="_blank">奥运</a></li>' + 
			                '<li><a href="http://dv.56.com/making/" target="_blank">拍客</a></li>' + 
			                '<li><a href="http://fun.56.com/" target="_blank">搞笑</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-26.html" target="_blank">游戏</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-34.html" target="_blank">母婴</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-28.html" target="_blank">汽车</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-27.html" target="_blank">旅游</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-11.html" target="_blank">女性</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-14.html" target="_blank">体育</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-8.html" target="_blank">动漫</a></li>' + 
			                '<li><a href="http://video.56.com/videolist-v-_type-hot_c-10.html" target="_blank">科教</a></li>' + 
			            '</ul>' + 
			        '</div>' + 
			        '<div class="f_link_group g3">' + 
			        	'<h4>软件</h4>' + 
			            '<ul>' + 
			            	'<li><a href="http://www.56.com/ican/ican.html" target="_blank">56ican</a></li>' + 
			                '<li><a href="http://mobile.56.com/" target="_blank">手机客户端</a></li>' + 
			            '</ul>' + 
			       	'</div>' + 
			        '<div class="f_link_group g4">' + 
			        	'<h4>帮助</h4>' + 
			            '<ul>' + 
			        		'<li><a href="http://www.56.com/help/" target="_blank">帮助中心</a></li>' + 
			            	'<li><a href="http://feedback.56.com/" target="_blank">意见反馈</a></li>' + 
			            '</ul>' + 
			        '</div>' + 
			        '<div class="f_link_group g5">' + 
			        	'<h4>56.com</h4>' + 
			            '<ul>' + 
							'<li><a target="_blank" href="http://www.56.com/about/en/intro_en.html">About us</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/about/intro.html">公司简介</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/about/intro_news.html">新闻中心</a></li>' + 
							'<li class="last"><a target="_blank" href="http://www.56.com/about/intro_contactus.html">联系我们</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/about/intro_56.html">5言6语</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/about/intro_advertise.html">广告服务</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/about/intro_job.html">加入我们</a></li>' + 
							'<li class="last"><a target="_blank" href="http://www.56.com/about/intro_link.html">友情链接</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/sitemap/">站点地图</a></li>' + 
							'<li><a target="_blank" title="视频大全" href="http://video.56.com/archives/20130122.html">视频</a>|<a target="_blank" title="视频大全" href="http://video.56.com/archives/a20130122.html">专辑</a></li>'+
							'<li><a target="_blank" href="http://dev.56.com/">开放平台</a></li>' + 
							'<li><a target="_blank" href="http://www.56.com/about/intro_law.html" class="red">版权指引</a></li>' + 
			            '</ul>' + 
			        '</div>' + 
			    '</div>' + 
				'<div class="f_group_logo">' + 
					'<h4 class="f_group_logo_hd"><a href="http://www.renren-inc.com/zh/" title="人人公司" target="_blank" class="gl_rr">人人公司</a><span class="its">旗下网站</span></h4>' + 
					'<ul class="f_group_logo_list">' + 
						'<li><a href="http://www.56.com" title="56网" target="_blank" class="gl_56">56网</a></li>' + 
						'<li><a href="http://www.renren.com" title="人人网" target="_blank" class="gl_renren">人人网</a></li>' + 
						'<li><a href="http://wan.renren.com" title="人人游戏" target="_blank" class="gl_wan">人人游戏</a></li>' + 
						'<li><a href="http://www.nuomi.com" title="糯米网" target="_blank" class="gl_nuomi">团购</a></li>' + 
						'<li><a href="http://www.jiexi.com/" title="皆喜网" target="_blank" class="gl_jiexi">皆喜网</a></li>' + 
					'</ul>' + 
				'</div>' + 
			    '<div class="f_net_alerm">' + 
					'<a href="http://210.76.65.188/newwebsite/index.htm" target="_blank"><img src="http://s1.56img.com/admin/images/net_cq1.jpg" alt=""></a>' + 
					'<a href="http://210.76.65.188/netalarm/index.jsp" target="_blank"><img src="http://s2.56img.com/admin/images/net_cq2.jpg" alt=""></a>' + 
					'<a href="http://210.76.65.188/webrecord/innernet/Welcome.jsp?bano=4419003012781" target="_blank"><img src="http://s3.56img.com/admin/images/net_cq3.jpg" alt=""></a>' + 
				'</div>' + 
				'<div class="f_copyright">' + 
					'<p><span>网络视听许可证1908336</span><a target="_blank" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1767676268">中国互联网诚信联盟</a><span>粤通管BBS【2009】第175号</span><a target="_blank" href="http://www.miibeian.gov.cn/">粤ICP备05006774号-1</a><a target="_blank" href="http://www.miibeian.gov.cn/">粤ICP:粤B2-20041027</a><a class="hidden" href="http://www.56.com/w11/list.html">视频总览</a><a href="http://www.56.com/w11/alist.html" class="hidden">专辑总览</a><a href="http://www.56.com/help/sitemap.html" class="hidden">网站地图</a></p>' + 
					'<p><span>增值电信业务经营许可证B2-20090492</span><span>药品服务许可证(粤2009-0009)</span><span>节目制作经营许可证粤第735号</span><span>文网文[2010]256号</span></p>' + 
					'<p class="alt">Copyright &copy;'+(new Date().getFullYear())+' 56.com 版权所有</p>' + 
				'</div>' + 
			'</div>' + 
		'</div>'+
		'<iframe name="add_favorite" id="add_favorite" src="http://www.56.com/domain.html" marginwidth="0" marginheight="0" frameborder="0" width="0" scrolling="0" height="0"></iframe>';
		document.write(html);
		//大页脚搜索事件绑定
		// __header_.uo.bindSearchEventFoot();
		var fn = function(){f2e_fn.bindSearchEventFoot();f2e_fn.dropMenuHover("dropMenu1","h_search_drop_hover")}
		setTimeout(fn,200);
	}

	/**
	 * 显示mini页脚
	 * @param  {number} mod   1|2 普通|黑色 
	 * @creator: Sonic (2012-04-17)
	 * @lastModify: Sonic(2012-04-17)
	 */
	function showMiniFooter(mode){
		mode = mode ? mode:1;
		if (mode == 2 ) { var footerClass = 'mini_f_v4_dark';
		}else{ var footerClass = 'mini_f_v4';}
		var curYear = new Date().getFullYear();
		var miniFooterHtml = ''+
		'<div class="'+footerClass+'">'+
			'<p class="mini_f_copyright"><span>Copyright &copy;'+curYear+' 56.com 版权所有</span><a target="_blank" href="http://www.miibeian.gov.cn/">粤ICP证B220041027</a></p>'+
		'</div>'+
		'<iframe name="add_favorite" id="add_favorite" src="http://www.56.com/domain.html" marginwidth="0" marginheight="0" frameborder="0" width="0" scrolling="0" height="0"></iframe>';
		document.write(miniFooterHtml);
		// 加统计代码 from:main_play
		if(typeof(___script___) == "object"){ ___script___.include("foot");}
	}



	/* 供闭包外部使用方法
	 * -------------------------------------------------------------------------------------------*/
	return {
		showHeader : initHeader,
		showMiniHeader : initMiniHeader,
		showFooter : showFooter,
		showMiniFooter : function(mode){
			showMiniFooter(mode);
		}
	}
})();


/* !过度 重写给历史版本使用
 * -------------------------------------------------------------------------------------------*/
function __footer_(){
	moduleFooter.showFooter();
}
var a_h_b ={
	loadHeader : function(){ moduleHeader.showHeader() }
}
var h_f_v3={
	msgPopup:1
}
var hf_option={
	msgPopup:1
}
/* -------------------------------------------------------------------------------------------*/






/* 以下为前端接手后新需求及功能的整合
 * Since 2012-05-12 Starup by Sonic!
 ----------------------------------------------------------------------------------------------------------*/
/**
 * @name: f2e_fn
 * @overview: 前端开发实用函数
 * @required: null
 * @creator: Sonic (2012-05-12)
 */
var f2e_fn = (function(){

	/* getElementById */
	function _id(s){ return document.getElementById(s); };

	/* getElementsByTagName */
	function _tag(s){ return document.getElementsByTagName(s); };
	/**
	 * _class getElementsByClassName
	 * @param  {type} searchClass 要获取节点的class名称
	 * @param  {type} node        父节点之下的所有内容，也就是获取的范围，可选项 默认表示"document"
	 * @param  {type} tag         命名class的标签 可选项 默认表示“*”所有标签
	 * @return {type}             element
	 * @exp    _class{("myclass", document.getElementById("main"), "span")}
	 */
	function _class(searchClass,node,tag) {
		var classElements = new Array();
		if (node == null) node = document;
		if (tag == null) tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	};
	
	/**
	 * cLoader CSS Loader
	 * @param  {Values / Array}   url      CSS Url
	 * @param  {Function}         callback call back a function
	 */
	function cLoader(url, callback){
		var urls = url.replace(/[,]\s*$/ig,"").split(",");
		var links = [];
		for( var i = 0; i < urls.length; i++ ){
			links[i] = document.createElement("link");
			links[i].rel = "stylesheet";
			links[i].href = urls[i];
			document.getElementsByTagName("head")[0].appendChild(links[i]);
		}
		callback instanceof Function?callback():"";
	};
	
	/**
	 * @name: f2e_fn.delayHover
	 * @overview: 延迟hover
	 * @param  {object}   target            触发的事件的元素
	 * @param  {function} eventHandleOver   触发的事件
	 * @param  {function} eventHandleOut    触发的事件
	 * @param  {number}   delayTime         延迟时间 （单位：秒）
	 * @creator: Sonic (2012-05-12)
	 */
	function delayHover(target, eventHandleOver, eventHandleOut, delayTime) {
		//console.log("delayHover star")
		if (!target || typeof eventHandleOver != "function"){ return; }
		var dt = (typeof delayTime == "number" ? delayTime : 200);
		
		/* 判断是否有移出事件 */
		if( typeof eventHandleOut != "function" ){
			target.onmouseover = function(){ target.delayKeyOver = setTimeout(eventHandleOver, dt); }
			target.onmouseout = function(){ clearTimeout(target.delayKeyOver) }
		}else{ 
			target.onmouseover = function(){ 
				clearTimeout(target.delayKeyOut) 
				target.delayKeyOver = setTimeout(eventHandleOver, dt); 
			}
			target.onmouseout = function(){ 
				clearTimeout(target.delayKeyOver) 
				target.delayKeyOut = setTimeout(eventHandleOut, dt); 
			}
		}
	};

	/**
	 * @name: f2e_fn.addEvent
	 * @overview: 设置onload加载函数
	 * @required: null
	 * @creator: Sonic (2012-05-12)
	 */
	function addEvent( obj, type, fn ){
		if ( obj.attachEvent ) {
			obj['e'+type+fn] = fn;
			obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
			obj.attachEvent( 'on'+type, obj[type+fn] );
		} else {
			obj.addEventListener( type, fn, false );
		}
	};

	/**
	 * @name: f2e_fn.dropMenuHover
	 * @overview: Add a hover class to show dropMenu
	 * @required: null
	 * @creator: Sonic (2012-08-09)
	 */
	function dropMenuHover(sfID,sfClass){
		var sfIDs = sfID ? [sfID] : ["dropMenu0","dropMenu1","dropMenu2","dropMenu3","dropMenu4","dropMenu5","dropMenu6","cloudPlayDropMenu"];
		var sfClass = sfClass ? [sfClass] : ["h_search_drop_hover","drop_menu_theme_1_hover","drop_menu_theme_1_hover","drop_menu_theme_1_hover","drop_menu_theme_1_hover","drop_menu_theme_1_hover","drop_menu_theme_1_hover","drop_menu_theme_1_hover"];
		var sfHandelName = "f_drop_menu_main";
		
		for (var i=0;i<sfIDs.length;i++){
			(function(ix){
				if(_id(sfIDs[i])){
					// alert("为id=" + sfIDs[i] + " 加hover函数");
					var sfElements  = _id(sfIDs[i]);
					var sfClassName = " " + sfClass[ix];					

					/* ipad hover fixed(@已优化，有点小bug,ipad关闭层时偶尔需要点击两次) */					
					if('ontouchstart' in document){ /* 触屏设备 */
						//console.log(sfHandel.innerHTML)
						var sfHandel = _class(sfHandelName, sfElements, "div")[0];
						if(sfHandel){
							addEvent(sfHandel, "touchend", function(){ 
								(this.parentNode.className.indexOf(sfClassName) == -1 ) ? this.parentNode.className+= sfClassName : this.parentNode.className = this.parentNode.className.replace(new RegExp(sfClassName+"\\b"), "")
							})
						}
					}else{ /* 非触屏设备 修改为通过DOM 2级方式绑定事件 */
						// addEvent(sfElements, "mouseover", function(){ (this.className.indexOf(sfClassName) == -1 ) ? this.className+= sfClassName : "" })
						// addEvent(sfElements, "mouseout", function(){ this.className = this.className.replace(new RegExp(sfClassName+"\\b"), ""); })
						var ehOver = function(){ (sfElements.className.indexOf(sfClassName) == -1 ) ? sfElements.className+= sfClassName : "";if(sfIDs[ix] == "cloudPlayDropMenu"){setStat('total_2_02185957');} }
						var ehOut  = function(){ sfElements.className = sfElements.className.replace(new RegExp(sfClassName+"\\b"), ""); }
						delayHover(sfElements, ehOver, ehOut, 200);
					}
				}
			})(i)
		}
		// 弹开小黄贴回避
		popupBoxAvoid("msgPushBox",["dropMenu4","dropMenu5","cloudPlayDropMenu"]);
	};

	/**
	 * @name: f2e_fn.smsNotify
	 * @overview: 消息数提醒小黄贴
	 * @required: smsCallbackData
	 * @creator: Sonic (2012-08-08)
	 */
	function smsNotify(){
		// if(h_f_v3.msgPopup == 1 && _id("smsNotify")){
		if(_id("smsNotify")){
			//var fn2 = function(){ jLoader("http://s1.56img.com/script/ui/smsnotify/v1/smsnotify_v.2.js?v=20130105a", true , "smsNotifyFn" , "utf-8"); }
			var fn2 = function(){ jLoader("http://s1.56img.com/script/ui/smsnotify/v1/smsnotify_v.2.js?v="+new Date().valueOf(), true , "smsNotifyFn" , "utf-8"); }
			setTimeout(fn2, 10);
		}
	};

	/**
	 * @name: f2e_fn.popupBoxAvoid
	 * @overview: 小黄贴与页头下拉弹层同时出现在同一区域时的回避，“dropMenu4:用户昵称下拉” “dropMenu5:观看记录下拉” “dropMenu6:上传视频下拉”
	 * @param: {[object]} popupBoxId  [需要被隐藏的层id]
	 * @param: {[type]} dropMneuIds [下拉菜单的id集合，数组]
	 * @required: null
	 * @creator: Sonic (2012-08-08)
	 */
	function popupBoxAvoid(popupBoxId,dropMneuIds){
		//var sfIDs = ["dropMenu4","dropMenu5"];
		//popBox = popBox || "";
		var popupBoxId = _id(popupBoxId) || false;
		var dropMneuIds = dropMneuIds
		
		if(popupBoxId){
			//alert("有这个弹开层元素哦");
			for (var i=0;i<dropMneuIds.length;i++){
				if(_id(dropMneuIds[i])){
					var sfElements = _id(dropMneuIds[i]);
					addEvent(sfElements, "mouseover", function(){ popupBoxId.style.visibility = "hidden"; })
					addEvent(sfElements, "mouseout", function(){ popupBoxId.style.visibility = "visible"; })
				}
			}
		}
	};

	/**
	 * @name: f2e_fn.msgPushHidden
	 * @overview: 页面加载完调用函数队列小黄贴自动关闭
	 * @param  {Number} delayTime 自动关闭的秒数 1000 = 1秒
	 * @return {Action}           关闭消息提醒小黄贴
	 * @required: null
	 * @creator: Sonic (2012-08-09)
	 */
	function msgPushHidden(delayTime){
		// 判断到是小页头，不做隐藏操作，一直显示
		var a = _class("mini_h_v4",document,"div")[0];
		if(a){ return }

		var e = _id("msgPushBox");
		var ec = _id("msgPushBoxClose");
		var dt = (typeof delayTime == "number" ? delayTime : 5000);
		if ( e && ec ){
			var ehHidden = function(){ e.style.display="none";ec.rel="hidden";}
			setTimeout( ehHidden ,dt)
		}
	};

	/* 接口的搜索关键词临时存放点 */
	var searchApiKeyWord = "";
	/**
	 * 获取接口的搜索关键词
	 * @return {String} 
	 * @required: null
	 * @creator: Sonic (2012-12-04)
	 */
	function getSearchKeyApi(){
		if(document.location.href.indexOf("so.56") == -1){ //so.56.com页面加载
			try{
				var t = new Date().valueOf();
				/* 正式：接口正常 */
				jLoader("http://www.56.com/w20/API/indexcenter.phtml?mid=48&callback=f2e_fn.searchKeywordFill");
				/* 测试：接口无callBack 
				jLoader("http://www.56.com/w20/API/indexcenter.phtml?mid=481&callback=searchKeywordFill");*/
				/* 测试：接口报错
				jLoader(bb); */
			}catch(e){ //接口报错
				//console.log("取接口失败");
				setTimeout("searchKeywordFill('热门视频')",300)
			}
		}
	};

	/**
	 * 小头的搜索框默认关键词填充
	 * @return {Action}
	 * @required: f2e_fn.getSearchKeyApi
	 * @creator: Sonic (2012-12-04)
	 */
	function searchKeywordFill(callbackData){
		sNum = Math.floor(Math.random()*6);
		if(typeof(callbackData) == "object"){			//正常取回接口数据
			searchApiKeyWord = decodeURIComponent(callbackData.search[sNum]["title"]);
			// 大头关键词列表填充
			searchKeywordListFill(callbackData);
		}else if(typeof(callbackData) == "string"){		//取接口数据失败
			searchApiKeyWord = callbackData;
		}
	};

	/**
	 * 大头的搜索框下方关键词填充
	 * @return {Action}
	 * @required: f2e_fn.searchKeywordFill
	 * @creator: Sonic (2012-12-11)
	 */
	function searchKeywordListFill(callbackData){
		var kwTitle = callbackData.search,
			tmpData = "",
			itemNum = 4;
		for(var i=0;i<itemNum;i++){
			var a = kwTitle[i]["title"];
			tmpData += '<li><a target="_blank" onClick="setStat(\'total_1_01183528\')" href="http:\/\/so.56.com\/all\/' + a +'\/" >' + decodeURIComponent(a) + '</a></li>';	
	    	//f2e_jasonFiller.loaderKeyword()
		}
		//console.log(tmpData);
		var hsk = _id("hSearchKeyword") ? _id("hSearchKeyword") : null;
		if( hsk && hsk.innerHTML=="" ){
			document.getElementById("hSearchKeyword").innerHTML = tmpData;
		}
	};

	/**
	 * 搜索框Focus函数，入焦时自动去掉默认词
	 * @param  {Object} obj 搜索输入框元素
	 * @return {Action}      输入框失焦时的事件
	 * @creator Sonic (2013-01-16)
	 */
	function searchInputFocus(obj){
		var searchInput = obj;
		// 去词
		document.charset='utf-8';
		// searchInput.value = '';
		searchInput.value = (searchInput.value === searchApiKeyWord) ? "" : searchInput.value;
		searchInput.className='inp_search';
		
		// 更换按钮className
		/*
		searchBtn = searchInput.getAttribute("rel") || null;
		if(_id(searchBtn)){
			_id(searchBtn).className = "h_btn_search_hover";
		}*/
	};

	/**
	 * 搜索框Blur函数，失焦无内容时自动把当前默认词补上
	 * @param  {Object} obj 搜索输入框元素
	 * @return {Action}      输入框失焦时的事件
	 * @creator Sonic (2013-01-16)
	 */
	function searchInputBlur(obj){
		var searchInput = obj;
		//填默认词
		var sTitle = typeof(_oFlv_c) == "object" ? _oFlv_c.tags0 : searchApiKeyWord;
		searchInput.value = (searchInput.value == "") ? sTitle : searchInput.value;
		
		// 更换按钮className
		/*
		searchBtn = searchInput.getAttribute("rel") || null;
		if(_id(searchBtn)){
			_id(searchBtn).className = "h_btn_search";
		}*/
	};

	/**
	 * 页头页脚搜索input事件绑定与值处理。
	 * @param  {String} hdID 页头搜索输入框ID
	 * @param  {String} ftID 页脚搜索输入框ID
	 * @return {Action}      [description]
	 * @creator Sonic (2012-12-04)
	 */
	function searchInputInit(hdID,hdMiniID,ftID){
		var searchInput = _id(hdID) || null,
			searchInputMini = _id(hdMiniID) || null;
			searchInputFoot = _id(ftID) || null;
		// 默认关键词填充
		//'<input type="text" class="gray inp_search" name="key" id="Search_input" maxlength="60" autocomplete="off" value="'+(typeof(_oFlv_c) == "object" ? _oFlv_c.tags0 : f2e_fn.getSearchKeyApi())+'" onfocus="document.charset=\'utf-8\'; this.value=\'\';this.className=\'inp_search\'" onblur="searchInputBlur(this)" />'+
		if (typeof(_oFlv_c) == "object"){	//播放页小页头，<head>里有定义 _oFlv_c
			earchApiKeyWord = _oFlv_c.tags0;
			searchInput.value = searchInputFoot.value = searchApiKeyWord;
		}else{								//非播放页小页头,<head>里木有定义 _oFlv_c，通过接口取值
			getSearchKeyApi();
			var fn = function(){
				if(searchApiKeyWord !=""){
					if(searchInput){searchInput.value = searchApiKeyWord}
					if(searchInputFoot){searchInputFoot.value = searchApiKeyWord}
					if(searchInputMini){searchInputMini.value = searchApiKeyWord}
				}
			};
			setTimeout(fn,300);
		}
		// 事件绑定
		//onfocus="document.charset=\'utf-8\'; this.value=\'\';this.className=\'inp_search\'" onblur="searchInputBlur(this)"
		// id="Search_input" name="key" onPropertyChange="ajaxsearch()" oninput="ajaxsearch()" onblur="hiddensearch()" onfocus="create_prompt_list(),ajaxsearch()" onkeydown="searchkeydown(event)"
		var onpropertychangeFn = function(){ moduleSAC.ajaxsearch() }
		var oninputFn = function(){ moduleSAC.ajaxsearch() }
		var onkeydownFn = function(){ moduleSAC.searchkeydown(event) }
		var onfocusFn = function(){ searchInputFocus(this);moduleSAC.create_prompt_list()}
		var onblurFn = function(){ searchInputBlur(this);moduleSAC.hiddensearch();}

		var onfocusFn2 = function(){ searchInputFocus(this); }
		var onblurFn2 = function(){ searchInputBlur(this); }
		var isNotSoPage = (document.location.href.indexOf("so.56") == -1) ? true : false ; 	//当前页面不在so.56.com域名下才加事件
		if( isNotSoPage && searchInput){
			// addEvent(searchInput, "propertychange", onpropertychangeFn);
			addEvent(searchInput, "input", oninputFn);
			addEvent(searchInput, "keydown", onkeydownFn);
			addEvent(searchInput, "focus", onfocusFn);
			addEvent(searchInput, "blur", onblurFn);
		}
		if( isNotSoPage && searchInputFoot){
			addEvent(searchInputFoot, "focus", onfocusFn2);
			addEvent(searchInputFoot, "blur", onblurFn2);
		}
		if( isNotSoPage && searchInputMini){
			addEvent(searchInputMini, "focus", onfocusFn2);
			addEvent(searchInputMini, "blur", onblurFn2);
		}
	};

	/*--[搜索框下拉的事件]------------------------------------------------------------------------------------------------------------*/
	soFormFn = {
		isSubmit : false,
		// position : "header",

		setFormType : function (position, type, sName) {
			if (position === "header"){
				// console.log("设置header 搜索")
				var optCurId = "hSearchOptCur",
					dropMenuId = "dropMenu0",
					searchType = "Type_input";
			}else if(position === "footer"){
				// console.log("设置footer 搜索")
				var optCurId = "fSearchOptCur",
					dropMenuId = "dropMenu1",
					searchType = "Type_input_footer";
			}
			_id(optCurId).innerHTML = sName;
			_id(dropMenuId).className = _id(dropMenuId).className.replace(new RegExp(" h_search_drop_hover\\b"), "");
			_id(searchType).value = type;
		},

		searchFormSet:function(position, sType){
			if (!position || !sType) return;
			switch (sType){
				case "all":
					soFormFn.setFormType(position, "all", "全部");
					break;
				case "video":
					soFormFn.setFormType(position, "video", "视频");
					break;
				case "album":
					soFormFn.setFormType(position, "album", "专辑");
					break;				
			}
		},

		searchSubmit : function () {
			// if (soFormFn.isSubmit === false) {
				// soFormFn.isSubmit = true;
				document.charset = "utf-8";
				if(_id("Type_input")){
					var searchType = _id("Type_input").value;	// 大页头，搜索类型: all | video | ambum
					var searchForm = _id("hSearchForm") || null;
					searchForm.action = "http://so.56.com/" +searchType+ "/" + encodeURI(_id("Search_input").value) + "/";
					// alert(_id("Search_input").value);
					// soFormFn.disabledInput();
					// alert("searchSubmit"); 如果搜索时按了回车，会执行这个函数两次，暂时想不到办法解决 (2013-01-18 by sonic)
					searchForm.submit();
				}
			// }

		}, 
		searchSubmitFooter : function(){
			if(_id("Type_input_footer")){
				var searchType = _id("Type_input_footer").value;	// 大页头，搜索类型: all | video | ambum
				var searchForm = _id("fSearchForm") || null;
				searchForm.action = "http://so.56.com/" +searchType+ "/" + encodeURI(_id("search_foot_input").value) + "/";
				//this.disabledInput("footer");
			}
		},
		disabledInput : function (position) {
			if(position === "footer"){  //页脚的input
				var input = document.getElementById("fSearchForm").getElementsByTagName("input");
			}else{ 				//页头的input
				var input = document.getElementById("hSearchForm").getElementsByTagName("input");
			}
			for (var i in input) {
				if (input[i].type != 'submit') {
					input[i].disabled = 'disabled';
				}
			}
		},
		// 大头搜索事件绑定
		bindSearchEvent : function(){
			_id("searchAllHandle").onclick = function(){ soFormFn.searchFormSet("header","all") };
			_id("searchVideoHandle").onclick = function(){ soFormFn.searchFormSet("header","video") };
			_id("searchAlbumHandle").onclick = function(){ soFormFn.searchFormSet("header","album") };
			if (this.isCurrent('album')) {
				soFormFn.searchFormSet("album");
			}else{
				soFormFn.searchFormSet("all");
			}
			_id("hSearchForm").onsubmit = function(){
				soFormFn.searchSubmit();
				setStat('total_1_01175026');
			}
		},
		// 小头搜索事件绑定
		bindSearchEventMini:function(){
			// alert("bindSearchEventMini");
			_id("hSearchForm").onsubmit = function(){
				soFormFn.searchSubmit();
				setStat('title_home');
			}
		},
		// 大页脚搜索事件
		bindSearchEventFoot : function(){
			_id("searchAllHandleFooter").onclick = function(){ soFormFn.searchFormSet("footer","all") };
			_id("searchVideoHandleFooter").onclick = function(){ soFormFn.searchFormSet("footer","video") };
			_id("searchAlbumHandleFooter").onclick = function(){ soFormFn.searchFormSet("footer","album") };
			document.getElementById("fSearchForm").onsubmit = function(){
				soFormFn.searchSubmitFooter();
				setStat('total_1_01174849');
			}
		}
	}

	// 加入收藏夹
	function addToFavorites (url,title){
		var fav_url = url || "http://www.56.com";
		var fav_title = title || "56.com - 中国最大的视频分享网站";
		if(document.all && window.external) {
			window.external.AddFavorite(fav_url, fav_title);
		} else if(window.sidebar) {
			window.sidebar.addPanel(fav_title, fav_url, "");
		} else {
			alert("浏览器不支持，请手动CTRL+D加入收藏夹");
		}
	}

	// bind加入收藏夹
	function bindAddToFavorites(){
		if(_id("addToFavoritesHandle")){
			_id("addToFavoritesHandle").onclick = function(){
				addToFavorites();
			}
		}
	}

	// 初始化搜索自动完成功能
	/*function initJKLoad(){
		jLoad = new JKLoad("jLoad");
	};*/

	// 判断返回 class="current"
	function isCurrent(){
		for (var i = 0; i < arguments.length; i++) {
			if (document.location.href.indexOf(arguments[i]) == -1) {
				return "";
			}
		}
		return ' class="current"';
	};

	/*--End [搜索框下拉的事件]----------------------------------------------------------------------------------------------------------------------------*/

	/**
	 * @name: f2e_fn.onloadInit
	 * @overview: 页面加载完调用函数队列
	 * @required: null
	 * @creator: Sonic (2012-08-08)
	 */	
	function onloadInit(){
		//dropMenuHover(); /* 此功能诺至上面页头HTML加載后马上执行 2012-09-07 */
		searchInputInit("Search_input","Search_mini_input","search_foot_input");
		smsNotify();
		msgPushHidden(5000);
	};

	/**
	 * @name: f2e_fn.loginSucCallbackInit
	 * @overview: 登录成功后回调函数队列
	 * @required: null
	 * @creator: Sonic (2012-08-08)
	 */
	function loginSucCallbackInit(){
		dropMenuHover();
		smsNotify();
		msgPushHidden(5000);
		/* 登录成功后，我看过的视频同步进云观看列表里 loginSucCloudSync (/www/script/ui/cloudplay/v1/cloudplay_v.1.js) */
		if(typeof loginSucCloudSync !="undefined"){ loginSucCloudSync() }
	};
	
	/* 供闭包外部使用方法
	 * -------------------------------------------------------------------------------------------*/
	 return{
		onloadInit : onloadInit,
		loginSucCallbackInit : loginSucCallbackInit,
		// dropMenuHover : dropMenuHover,
		// initJKLoad : initJKLoad,
		isCurrent : isCurrent,
		bindSearchEvent : soFormFn.bindSearchEvent,
		bindSearchEventMini : soFormFn.bindSearchEventMini,
		bindSearchEventFoot : soFormFn.bindSearchEventFoot,
		bindAddToFavorites : bindAddToFavorites,
		searchSubmit : soFormFn.searchSubmit,

		_id : function(s){ _id(s); },
		_tag : function(s){ _tag(s); },
		_class : function(searchClass,node,tag){ _class(searchClass,node,tag); },
		searchKeywordFill : function(callbackData){ searchKeywordFill(callbackData); },
		addEvent : function(obj, type, fn){ addEvent(obj, type, fn); },
		dropMenuHover : function(sfID, sfClass){ dropMenuHover(sfID, sfClass); }
	 }

})();


f2e_fn.addEvent(window,"load", f2e_fn.onloadInit);
