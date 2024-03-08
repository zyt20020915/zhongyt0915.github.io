    var deviceWidth = document.body.clientWidth ;
    var deviceHeight = window.innerHeight ;
    var fontBase = parseInt(deviceWidth / 20);
	
    console.log('AppWidth:'+ deviceWidth);
    console.log('AppHeight:'+ deviceHeight);
	console.log('fontBase:'+ fontBase + 'px');
    document.body.style.height = deviceHeight + "px" ;
	document.body.style.fontSize = fontBase + "px" ;

   //设置下面2行p元素行高与父容器的高度一致，使得文字在垂直方向居中 
        $("lessonName").style.lineHeight = deviceHeight * 0.15 + 'px' ;
        $("chapter").style.lineHeight = deviceHeight * 0.1 + 'px' ;
		$("statusInfo").style.lineHeight = deviceHeight * 0.1 + 'px' ;

  //$(66);检测下面的自定义函数
  function $(eleId){
    if (typeof eleId !== 'string'){
	   throw("$函数调用实参错误，行参必须是字符串！");
	   return 
    }
      return document.getElementById(eleId) ;
   }