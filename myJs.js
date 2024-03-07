  	var deviceWidth = document.body.clientWidth ;
    var deviceHeight = window.innerHeight ;
    var fontBase = parseInt(deviceWidth / 20);
	
    console.log('AppWidth:'+ deviceWidth);
    console.log('AppHeight:'+ deviceHeight);
	console.log('fontBase:'+ fontBase + 'px');
    document.body.style.height = deviceHeight + "px" ;
	document.body.style.fontSize = fontBase + "px" ;

	var lessonNameDom = document.getElementById("lessonName") ;
	var footerInfoDom = document.getElementById("footerInfo") ;
	    lessonNameDom.style.lineHeight = deviceHeight * 0.15 + 'px' ;
        footerInfoDom.style.lineHeight = deviceHeight * 0.1 + 'px' ;