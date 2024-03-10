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

//------touch events register and handel----------

 const chapterDom = $('chapter') ;
 const bookPageDom = $('bookPage') ;
       chapterDom.addEventListener("touchstart",handleStart);
	   chapterDom.addEventListener("touchend",handleEnd);
       chapterDom.addEventListener("touchmove",handleMove);
	   bookPageDom.addEventListener("touchstart",handleStart);
	   bookPageDom.addEventListener("touchend",handleEnd);
       bookPageDom.addEventListener("touchmove",handleMove);
      //---APP开发期间，暂时将底部状态栏设为可无限增加高度的滚动渲染模式。
      $("statusInfo").style.display = "inline" ;
      $("statusInfo").style.overflow = "scroll" ;
	
	 function handleStart(e){
	  touchModel.target = e.touches[0].target ;
	  e.preventDefault();
	  const output = $("statusInfo");
	  const touches = e.touches ;
	  output.textContent = '开始摸时，共有'+touches.length + '个点的数据。';
	  output.textContent +=  " Touch" + touches[0].identifier +"begin: "  ;

	  //在touch事件发生时用touchMode.time记录开始时刻
      touchModel.time = new Date() - 1 ;
	  touchModel.ongoingXY = [] ;
	  
		 } //function  handleStart

     function handleEnd(e){
	  e.preventDefault();
	  const output = $("statusInfo");
	  const touches = e.changedTouches ;
	  output.textContent += '结束摸时，有'+touches.length + '个点的数据。';
	  output.textContent += "touch" + touches[0].identifier  + "End! " ;
	 //在touch事件结束时用用当前时刻减touchMode.time，记录触摸移动发生的时间
      touchModel.time = new Date() - touchModel.time;

	  touchModel.respondTouch() ;
	 } //function  handleEnd

     function handleMove(e){
	  e.preventDefault();
	  const output = $("statusInfo");
	  const touches = e.changedTouches ;
	   
	  for(let i =0 ;i<touches.length;i++){
		  let x = parseInt(touches[i].pageX);
		  let y = parseInt(touches[i].pageY);
	   output.textContent +=  ' (x:' + x +','+'y:'+ y + ') ' ;
	  }
	 //在移动时把触屏捕捉的坐标点记录下来 
	 let x = touches[0].pageX , y = touches[0].pageY ;
         x = parseInt(x) ;
		 y =  parseInt(y) ;
	 touchModel.pushXY(x,y);
	 } //function  handleMove

  //----建立模型响应和处理touch事件产生的数据
 const chapters = ['第1章 Introduction','第2章 Number Systems','第3章 Data Storage','第4章 Computer Organization','第5章 Computer Networks and Internet','第6章 Operating Systems','第7章  Software Engineering','第8章  OOP Programming'] ;
 const books = ['CS.jpg' , 'CSS.jpg' , 'CT.jpg' , 'GRE.jpg' , 'Git.jpg' , 'NinjaJS.jpg' , 'STEM.jpg' , 'UML.jpg' , 'bitCoin.jpg' , 'canvas.jpg' , 'cssAnimation.jpg' , 'gitForTeams.jpg' , 'internet.jpg' , 'javaScript.jpg' , 'learnCSS.jpg' , 'linuxCMD.jpg' , 'logic.jpg' , 'nutrition.jpg' , 'webProgramming.jpg' ] ;
 var touchModel = {
   target: null ,
   ongoingXY : [] ,
   deltaX : 0 ,
   deltaY : 0 ,
   time : 0 ,
   pushXY : function (x,y){
	 let xy = {x,y} ;
     this.ongoingXY.push(xy);
   },
   chapterNo : 0 ,
   bookNo : 0 ,
   respondTouch : function(){
    this.deltaX = this.ongoingXY[this.ongoingXY.length-1].x - this.ongoingXY[0].x ;
	this.deltaY = this.ongoingXY[this.ongoingXY.length-1].y - this.ongoingXY[0].y ;
    if (Math.abs(this.deltaX) > deviceWidth / 10) {
		//console.log("有效滑动");
		//console.log(this.target) ;

        if (this.target == $('chapter') ){ //touch target is chapters
		
    		if (this.deltaX > 0){
              this.nextChapter();
		    }else{
		      this.preChapter() ;
		    }
		 }
		if (this.target == $('bookPage') ){ //touch target is books
		    if (this.deltaX > 0){
              this.nextBook();
		    }else{
		      this.preBook() ;
		    }
		}
    }
	
   },
   preChapter : function (){
     if (this.chapterNo ===0)  {
		 this.chapterNo = chapters.length -1 ;
     }else{
	     this.chapterNo -- ;
	 }
	 $("chapter").textContent = chapters[this.chapterNo];
   },
   nextChapter :function (){
      if (this.chapterNo === chapters.length -1)  {
		 this.chapterNo = 0 ;
     }else{
	     this.chapterNo ++ ;
	 }
	 $("chapter").textContent = chapters[this.chapterNo];
   },
   preBook : function(){
      books
     if (this.bookNo ===0)  {
		 this.bookNo = books.length -1 ;
     }else{
	     this.bookNo -- ;
	 }
	 $("bookPage").src = 'lesson/' + books[this.bookNo];
   },
   nextBook :function (){
      if (this.bookNo === books.length -1)  {
		 this.bookNo = 0 ;
     }else{
	     this.bookNo ++ ;
	 }
	  $("bookPage").src = 'lesson/' + books[this.bookNo];
   },
 } ;


  //$(66);检测下面的自定义函数
  function $(eleId){
    if (typeof eleId !== 'string'){
	   throw("$函数调用实参错误，行参必须是字符串！");
	   return 
    }
      return document.getElementById(eleId) ;
   }