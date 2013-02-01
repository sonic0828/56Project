 /**
 * 	@name 短消息提醒功能代码输出
 *	@Creator Sonic 2012-11-05
 *	$Author: sonic $
 *	$Date$
 */

/* 定义消息总数全局变量 (2012-08-21 modify by sonic) */
//var _smsDataNumAll = "";
var smsData = {
	/* getElementById */
	_id : function (s){ return document.getElementById(s); },

	/* 定义消息总数 */
	numAll : "",
	
	/* 定义消息接口取回的轮询时间 */
	time : null,

	/**
	 * 函数初始化执行队列
	 */
	init:function(){
		smsData.loadSmsNotifyCss();
		smsData.loadSmsNotifyApi();
	},

	/**
	 * 读取消息系统依赖CSS
	 * @return {[type]} [description]
	 */
	loadSmsNotifyApi:function(){
		var t = new Date().valueOf();
		/* 模拟数据借口JS
		jLoader('http://s1.56img.com/script/ui/smsnotify/v1/assets/callbackdata.js?='+t, true , 'MsgboxRequestForGlobal' , 'utf-8'); */
		/* 张松机器测试用
		jLoader('http://mb.56.com/notify?callback=smsData.smsCallbackData&t='+t, true , 'MsgboxRequestForGlobal' , 'utf-8');
		*/
		/* 正式接口地址 */
		jLoader('http://msg.56.com/notify?callback=smsData.smsCallbackData&t='+t, true , 'MsgboxRequestForGlobal' , 'utf-8');
		
	},

	/**
	 * 把消息提醒依赖的CSS载入当前页面
	 * @return {[type]} [description]
	 * @creator: Sonic 2012-10-10
	 */
	loadSmsNotifyCss:function(){
		if(!document.getElementById("smsNotifyCss")){
			var snCss = document.createElement('link');
			snCss.href = 'http://s1.56img.com/script/ui/smsnotify/v1/assets/smsnotify_v.2.css?v=20130117a';
			snCss.rel = 'stylesheet';
			snCss.id = 'smsNotifyCss';
			document.getElementsByTagName('head')[0].appendChild(snCss);
		}
	},

	/**
	 * 设置接口的轮询地址
	 */
	setIntervalFn:function(){
		// 数据接口链接增加时间戳，IE9下取接口数据不加时间戳会一直有缓存，直至页面主动刷新缓存才消失 2012-09-18 by sonic
		var t = new Date().valueOf();
		this.fn = setInterval(function(){
			jLoader('http://msg.56.com/notify?callback=smsData.smsCallbackData&t='+t, true , 'MsgboxRequestForGlobal' , 'utf-8');
		} , this.time *1000);
	},

	/**
	 * @name: smsCallbackData
	 * @overview: 消息数拼装并插入页面
	 * @required: null
	 * @creator: Sonic (2012-08-08)
	 */
	smsCallbackData:function(callBackData){
		try{/* Star Try */

				var adData = callBackData.gad;
				var data = callBackData.ntf;
				if(data instanceof Array){	//接口返回数据格式正常;
					var data = data;
				} else { 					//接口返回数据格式异常!!!;
					var data = [0,0,0,0,0,0,0];
				}
				
				/*console.log(data);
				console.log(adData);*/
				var fnTime = isNaN(callBackData.t) ? 900 : callBackData.t;
				
				/* 
				 * 对比从接口取回来的 轮询时间(fnTime),如果变动了，重新启动轮询
				 */
				if(fnTime && this.time != fnTime){
		 			this.time = fnTime;
		 			if( !this.time ){ 	//轮训开始
						this.setIntervalFn();
		 			}else{				//接口时间变动，重新轮训
		 				clearInterval(this.fn);
		 				this.setIntervalFn();
		 			}
				}

				/* 处理广告消息数据 2012-11-09 */
				if(adData && adData.title != undefined && adData.url != undefined && adData.color != undefined){
					var adColor = (adData.color == 1) ? "red" : "";
					//http://msg.56.com/notify?a=gad&aid=xxx
					//jLoader(\'http://msg.56.com/notify?a=gad&aid='+adData.aid+'\', true , \'gadClicked\' , \'utf-8\');
					var adDataHTML = '<li class="m_d_list_item"><p class="m_d_list_p"><a target="_blank" href="'+adData.url+'" onClick="setStat(\''+adData.key+'\',1000);jLoader(\'http://msg.56.com/notify?a=gad&aid='+adData.aid+'\', true , \'gadClicked\' , \'utf-8\');" class="m_d_list_a '+adColor+'">'+decodeURIComponent(adData.title)+'</a></p></li>';
					var adDataNum = 1;
				}else{
					var adDataHTML = '';
					var adDataNum = 0;
				}
				//console.log(adDataHTML);

				for(var i=0; i<7; i++){ // 消息接口早期上线是 4位数组，后3位如果没输出(Null),就用 0 代替
					data[i] = (data[i] == null) ? 0 : data[i]
				}

			    /* 处理消息数据:把评论数，回复数据合并起来 */
				var smsData = [
					(data[0] < 100 ? data[0] : '99+'), 
					(data[1] + data[2] < 100 ? data[1] + data[2] : '99+'), 
					(data[3] < 100 ? data[3] : '99+'),
					(data[5] < 100 ? data[5] : '99+'),
					(data[4] < 100 ? data[4] : '99+'),
					(data[6] < 100 ? data[6] : '99+')
				]
				var smsDataAll = data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6] + adDataNum;
				smsDataAll =  (smsDataAll < 100 ) ? smsDataAll : "99+";

				/* 处理消息拼接的一些固定文案 */
				var smsUserId       = usr.user_id() || "";
				var smsNotifyStatus = ["条新私信", "条新评论", "条新通知", "位新粉丝", "条节目更新", "位好友更新"];
				var smsTextStatus   = ["私信", "评论", "通知", "粉丝", "订阅", "更新"];
				var smsTextStatus2  = ["私信", "评论", "通知", "粉丝", "节目更新", "好友更新"];
				var smsLinkStatus   = ["http://msg.56.com/2012/?do=InBox", "http://w.56.com/my2/index.php?action=Video&do=otherCommentList", "http://msg.56.com/2012/?do=Sysmsg" ,"http://i.56.com/u/"+smsUserId+"/myfans/" ,"http://w.56.com/my2/index.php?action=Video&do=subMovieList" ,"http://w.56.com/my2/index.php?action=Video&do=subscribeList"];
				var smsListLi       = adDataHTML;
				var smsListA        = "";
				var smsListLiStat   = ["msgcenter_15141559", "msgcenter_15141617" ,"msgcenter_15141739" ,"msgcenter_27114100" ,"msgcenter_27114023" ,"msgcenter_27114135"];
				var smsListAStat    = ["msgcenter_15141859", "msgcenter_15141922" ,"msgcenter_15141928" ,"msgcenter_27114219" ,"msgcenter_27114151" ,"msgcenter_27114228"];

				/* 
					消息数量插入,条件如下: (2012-08-21 modify by sonic)
					1. #hMsgNum 容器存在;
					2. 消息数不为0.
				*/
				// console.log(typeof document.getElementById)
				if(document.getElementById("hMsgNum") && smsDataAll != 0 ){
					document.getElementById("hMsgNum").innerHTML = smsDataAll;
					// document.getElementById("hMsgNum").style.display = "inline";
					document.getElementById("hMsgNum").style.display = "inline-block";
				}else{
					document.getElementById("hMsgNum").style.display = "none";
				}

				/* 拼装消息Li,消息链接内容 */
				for(i=0;i<smsData.length;i++){
					if (smsData[i] != 0){
						smsListLi += '<li class="m_d_list_item"><p class="m_d_list_p"><em>'+smsData[i]+'</em>'+smsNotifyStatus[i]+'，</p><a target="_blank" href="'+smsLinkStatus[i]+'" onClick="setStat(\''+smsListLiStat[i]+'\',1000);" class="m_d_list_a">查看'+smsTextStatus[i]+'</a></li>'
					}else{
						smsListA += '<a title="查看'+smsTextStatus2[i]+'" class="m_d_list_oa" target="_blank" href="'+smsLinkStatus[i]+'" onClick="setStat(\''+smsListAStat[i]+'\',1000);">查看'+smsTextStatus2[i]+'</a>'
					}
				}

				/* 消息下拉菜单的数据填充 */
				var smsListHTML = ['',
									(smsDataAll==0?"":'<ul class="m_d_list">'),
										smsListLi,
									(smsDataAll==0?"":'</ul>'),
									'<div class="m_d_list_opt">',
										smsListA,
									'</div>'].join("");
				//console.log(smsListHTML);
				if(document.getElementById("smsNotify")){ document.getElementById("smsNotify").innerHTML = smsListHTML;}
				
				/* 小黄贴的数据填充 */
				var smsPushBoxHTML = ['',
									(smsDataAll==0?"":'<ul class="m_d_list">'),
										smsListLi,
									(smsDataAll==0?"":'</ul>')].join("");
				
				/* 
					如果新消息总数有变动时，把msgPushBoxClose的rel改写为"",下面就会开启动小黄贴 (2012-08-21 modify by sonic)
				 	this.numAll 用记装载小黄贴关闭时的消息总数的全局变量
				 	条件如下:
				    // 1. h_f_v3.msgPush 消息小黄贴是否显示的传值为1
				    2. this.numAll 这个全局变量存在
				    3. 本次轮询消息总数(smsDataAll)与上次保存在全局变量里的消息总数(this.numAll) 不等
				 */
				//console.log("this.numAll " +this.numAll);
				//console.log("smsDataAll " + smsDataAll);
				if( this.numAll && this.numAll != smsDataAll){
					//console.log("修改rel");
					document.getElementById("msgPushBoxClose").rel="";
				}

				/* 
					显示消息小黄贴的条件: 
					1. #msgPushBoxCt 容器存在;
					2. smsListLi 消息li内容不为空，也就是有消息数不为0;
					3. #msgPushBoxClose 这个小黄贴的关闭按钮没有被用户主动点击过.
				*/
				if(document.getElementById("msgPushBoxCt") && smsListLi!="" && document.getElementById("msgPushBoxClose").rel==""){ 
					document.getElementById("msgPushBoxCt").innerHTML = smsPushBoxHTML;
					document.getElementById("msgPushBox").style.display = "block";
				}else{
					document.getElementById("msgPushBox").style.display = "none";
				}

				/* 把此次轮询取得的消息总数存入全局变量 smsDataAll (2012-08-21 modify by sonic) */
				this.numAll = smsDataAll;
		}catch (e) {}/* End try */
	}/*End smsCallbackData */
}

/* 执行函数初始化 */
smsData.init();



/**--------------------------------------------------------------------------------------------------------------
 * add by sonic 2012-11-05 Starup!
 *
 * 2012-11-28 smsData.smsCallbackData 函数修改，增加判断在获取数据时，如果数据格式不对或异常，消息的显示不受接口的影响而显示成99+或者报错。
 *
 * 2013-01-09 去掉 span#hMsgNumWrap 数字不需要两层包裹标签。
 *  
 */
