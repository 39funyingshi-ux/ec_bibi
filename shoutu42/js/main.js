$(function() {
    
    $(".lazyload").lazyload({
		effect: "fadeIn",
		threshold: 200,
		failure_limit: 0,
		skip_invisible: false
	});
    

    $('a').on('click touchend', function(e) {  
        return true;
    });

    //资源tab按钮滑动
    new Swiper('.resource-box-nav', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true
    });
    
    new Swiper('.type-nav', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true
    });
    
    //鼠标划过资源tab按钮切换
    $('.resource-box-nav .tab-nav').click(function () {
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.resource-box .rb-item').eq($(this).parent().index()).fadeIn(500).siblings().hide();
    });
    
    //搜索框
    $("#searchbutton").click(function(){
        var kw = $.trim($(".search-input").val());
        if(!kw){
            alert("请输入搜索词");
            return false;
        }else if(kw.length<2){
		    alert("请输入2个字以上的关键词");
		    return false;
		}
    })
    
    //滚动展示返回顶部按钮
    $(window).scroll(function(){
    	if ($(window).scrollTop()>100){
    		$(".float-box").fadeIn();
    	}else{
    		$(".float-box").fadeOut();
    	}
    });
    
    //返回顶部
    $("#goTop").click(function(){
    	$('body,html').animate({scrollTop:0},500);
    	return false;
    });
    
    
    
		$(".tab-tit-box>a").on("touch click", function() {
			var num = $(this).index();
			$(this).attr('class', 'active').siblings('a').removeClass("active");
			$(this).parents(".card-wrap").find(".new-up-list").eq(num).show().siblings('.new-up-list').hide();
			$(window).trigger("scroll");
		})
		
		//换一换
        $('.switch-button').on("touch click",function() {
            if($(this).attr("disabled")){return false;}
            var item_list = $(this).parent(".more").siblings(".new-up-list").children("li");
            var mark = $(this).attr("data-mark"); //初始0
            var markMax = Math.ceil(item_list.length/6) - 1;
            console.log(markMax);
            ++mark;
            if (mark > markMax) {
                mark = 0;
            }
            $(this).attr("data-mark",mark);
            item_list.hide();
            for (var i = 0; i < 6; ++i) {
                item_list.eq(mark * 6 + i).css('display', 'block');
            }
            $(window).trigger("scroll");
        })
        
        //展开热搜
        $('.openall-button').on("touch click",function(e){
            if($(this).attr("data-openall") == "1"){
                $(this).attr("data-openall","0");
                $(this).parents(".card-wrap").find(".new-up-list .item").slice(6).hide();
                $(this).children("span").text("展开热搜").siblings(".fa").attr("class","fa fa-fw fa-angle-double-down");
                
                var parentTop = $(this).parents(".new-hot-up").next().offset().top;
                $('html,body').scrollTop(parentTop-250,500);
            }else{
                $(this).attr("data-openall","1");
                $(this).parents(".card-wrap").find(".new-up-list .item").show();
                $(this).children("span").text("收起热搜").siblings(".fa").attr("class","fa fa-fw fa-angle-double-up");
            }
            $(window).trigger("scroll"); 
        })
    
	$(".stui-nav li a").each(function() {
			if(this.href==document.location.toString().split("#")[0]){$(this).parent("li").addClass("active");return false;}
		});
    
});