define(function(){
	var pageControl = {};
	var index2Page = [{pageId:'functionsPage',icon:"url('img/ganyi.png')",icon_focus:"url('img/ganyi_focus.png')",img:'ganyi_img'},
					  {pageId:'statusPage',icon:"url('img/zhuangtai.png')",icon_focus:"url('img/zhuangtai_focus.png')",img:'status_img'},
					  {pageId:'interactionPage',icon:"url('img/hudong.png')",icon_focus:"url('img/hudong_focus.png')",img:'interaction_img'},
					  {pageId:'marketPage',icon:"url('img/shangcheng.png')",icon_focus:"url('img/shangcheng_focus.png')",img:'market_img'},
					  {pageId:'appionmentPage',icon:"url('img/ganyi.png')",icon_focus:"url('img/ganyi_focus.png')"}];

	var index2Moudle = [{moudle:'maincontrol'},{moudle:'status'},{moudle:'interaction'},{moudle:'market'},{moudle:'appiontment'}];

 	pageControl['currentPageIndex'] = '0';

 	pageControl['switchPage'] = function(index){
 		if(this.currentPageIndex === index){
			return;
		}
		$('#'+index2Page[this.currentPageIndex].pageId).hide();
		$('#'+index2Page[this.currentPageIndex].img).css('backgroundImage',index2Page[this.currentPageIndex].icon);
		$('#'+index2Page[index].pageId).show();
		$('#'+index2Page[index].img).css('backgroundImage',index2Page[index].icon_focus);
		this.currentPageIndex = index;
		require([index2Moudle[index].moudle],function(currentMoudle){
			currentMoudle.init();
		});
 	}

	return pageControl;
});
