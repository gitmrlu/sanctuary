
//globally shared variable
var ll_EWS_use=0;
var fourth_EWS_use=0;

var ll_EWS_capacity=40;
var fourth_EWS_capacity=40;

var ll_EWS_status=0;
var ll_EWS_label=0;

var fourth_EWS_status=0;
var fourth_EWS_label=0;

var ll_EWS_full=0;
var fourth_EWS_full=0;

//Application Window Component Constructor
function ApplicationWindow(){
	
	Ti.include("ajaxrequest.js");
	
	HEIGHT = Ti.Platform.displayCaps.platformHeight,
	WIDTH = Ti.Platform.displayCaps.platformWidth;
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	//construct UI
	/*Sizes to Be manipulated*/
	ll_EWS_full = WIDTH*.55;
	fourth_EWS_full = HEIGHT/8;
	
	ll_EWS_boxSize = ll_EWS_full * (ll_EWS_use/ll_EWS_capacity);
	fourth_EWS_boxSize = fourth_EWS_full * (fourth_EWS_use/fourth_EWS_capacity);

	/*Lower Level*/
	var lowerLevel = Ti.UI.createView({ backgroundImage:'/images/ll_plan.jpg' });
	
	ll_EWS_status = Ti.UI.createView({
		backgroundColor: 'red',
		opacity: 0.75,
		width: ll_EWS_boxSize,
		height: HEIGHT/10,
		bottom: HEIGHT/70,
		left: WIDTH/31
	});
	lowerLevel.add(ll_EWS_status);

	var ll_EWS = Ti.UI.createView({
		borderColor: "black",
		borderWidth: 5,
		width: ll_EWS_full,
		height: HEIGHT/10,
		bottom: HEIGHT/70,
		left: WIDTH/31
	});
	lowerLevel.add(ll_EWS);
	
	ll_EWS_label = Ti.UI.createLabel({
	  color: 'white',
	  font: { fontSize:15 },
	  text: ll_EWS_use + "/" + ll_EWS_capacity + "\nIn Use",
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  bottom: HEIGHT/70,
	  left: WIDTH/31,
	  width: WIDTH*.275, height: HEIGHT/10
	});
	lowerLevel.add(ll_EWS_label);
	
	var ll_title = Ti.UI.createLabel({
		color: 'blue',
	  font: { fontSize:25, style:'strong' },
	  text: 'LL',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  bottom: HEIGHT/2,
	  left: 0,
	  width: WIDTH/9, WIDTH: HEIGHT/9,
	  backgroundColor: 'green',
	  opacity: .5
	});
	lowerLevel.add(ll_title);
	
	var refresh1 = Ti.UI.createLabel({
		color: 'white',
	  font: { fontSize:25, style:'strong' },
	  text: '\u21BB',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  top: HEIGHT/2,
	  left: 0,
	  width: WIDTH/6, height: WIDTH/9,
	  backgroundColor: 'orange',
	  opacity: .7
	});
	lowerLevel.add(refresh1);
	
	/*FOURTH FLOOR*/
	var fourthFloor = Ti.UI.createView({ backgroundImage:'/images/4th_plan.jpg' });
	
	var fourth_EWS_bottom = HEIGHT/3.4;
	
	fourth_EWS_status = Ti.UI.createView({
		backgroundColor: 'red',
		opacity: 0.75,
		width: WIDTH/5.4,
		height: fourth_EWS_boxSize,
		bottom: fourth_EWS_bottom,
		left: WIDTH/2.325
	});
	

	
	
	fourthFloor.add(fourth_EWS_status);

	fourth_EWS_label = Ti.UI.createLabel({
			color: 'white',
		  font: { fontSize:15 },
		  text: fourth_EWS_use + "/" + fourth_EWS_capacity + "\nIn Use",
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  bottom: fourth_EWS_bottom,
		  left: WIDTH/2.325,
		  width: WIDTH/5.4,
		height: HEIGHT/8
	});
	fourthFloor.add(fourth_EWS_label);
	
	var fourth_EWS = Ti.UI.createView({
		borderColor: "black",
		borderWidth: 5,
		width: WIDTH/5.4,
		height: fourth_EWS_full,
		bottom: fourth_EWS_bottom,
		left: WIDTH/2.325
	});
	fourthFloor.add(fourth_EWS);
	
	var fourth_title = Ti.UI.createLabel({
			color: 'blue',
		  font: { fontSize:25, style:'strong'},
		  text: '4th',
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  bottom: HEIGHT/2,
		  left: 0,
		  width: WIDTH/9, height: WIDTH/9,
		  backgroundColor: 'green',
		  opacity: .5
	});
	fourthFloor.add(fourth_title);
	
	var refresh2 = Ti.UI.createLabel({
		color: 'white',
	  font: { fontSize:25, style:'strong' },
	  text: '\u21BB',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  top: HEIGHT/2,
	  left: 0,
	  width: WIDTH/6, height: WIDTH/9,
	  backgroundColor: 'orange',
	  opacity: .7
	});
	fourthFloor.add(refresh2);
	
	//adding update button
	refresh1.addEventListener('touchend', function(e){
		update();
		alert("updated!");
	});
	
	refresh2.addEventListener('touchend', function(e){
		update();
		alert("updated!");
	});
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[lowerLevel,fourthFloor],
	  showPagingControl:true
	});
	self.add(scrollableView);
	
	//call update 
	update();
	
	return self;
}


//update function make ajax request and run callback function to update data when data is available 
function update(){
		getTasks(function(tasks){
			//update the ll,fourth_EWS_use data
			ll_EWS_use = tasks[0];
			ll_EWS_capacity = tasks[1];
			fourth_EWS_use = tasks[2];
			fourth_EWS_capacity = tasks[3];
			
			//update new attributes in corresponding view
			var tmp1 = (ll_EWS_use/ll_EWS_capacity)*ll_EWS_full;
			var tmp2 = (fourth_EWS_use/fourth_EWS_capacity)*fourth_EWS_full;
			ll_EWS_status.updateLayout({width:tmp1});
			ll_EWS_label.updateLayout({text: ll_EWS_use + "/" + ll_EWS_capacity + "\nIn Use"});
			fourth_EWS_status.updateLayout({height:tmp2});
			fourth_EWS_label.updateLayout({text: fourth_EWS_use + "/" + fourth_EWS_capacity + "\nIn Use"});
		});
}
//make constructor function the public component interface
module.exports = ApplicationWindow;