//ScrollView Component Constructor
function ScrollView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollableView();
	
	var view1 = Ti.UI.createView({ backgroundColor:'#123' });
	var view2 = Ti.UI.createView({ backgroundColor:'#246' });
	var view3 = Ti.UI.createView({ backgroundColor:'#48b' });
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[view1,view2,view3],
	  showPagingControl:true
	});
	
	return self;
}

module.exports = ScrollView;
