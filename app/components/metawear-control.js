import Ember from 'ember';

export default Ember.Component.extend({
	metawearConnected: false,
	macAddressOfBoard: '',
	MWaccelHistory: [],
	updateAccelData: function(component, result){
		component.set('x', result.x);
		component.set('y', result.y);
		component.set('z', result.z);

		//update history, maintain 50 points max
		var history=component.get('MWaccelHistory');
		if(history.length === 150){
			history.shiftObject();//shift an x off
			history.shiftObject();//shift a y off
			history.shiftObject();//shift a z off
		}
		var t = Date.now();
		var newXPoint = {time: t, label: 'x', value: result.x};
		var newYPoint = {time: t, label: 'y', value: result.y};
		var newZPoint = {time: t, label: 'z', value: result.z};
		history.addObjects([newXPoint, newYPoint, newZPoint]);
	},
	actions: {
		accelON: function(){
			var component = this;
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('attempting to start accelerometer on: ' + this.get('macAddressOfBoard'));
					metawear.mwdevice.startAccelerometer(
						function(result){ //success
							this.get('updateAccelData')(component,result);
						}, function(error){//fail
							console.log(error);
						}
					);
				}
				catch(err){
					console.log('error: '+err);
				}
			}, 100);//run after 100ms
		},
		accelOFF: function(){
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('attempting to stop accelerometer on: ' + this.get('macAddressOfBoard'));
					metawear.mwdevice.stopAccelerometer();
				}
				catch(err){
					console.log('error: '+err);
				}
			}, 100);//run after 100ms
		},
		connect: function(){
			var component = this;
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('attempting to connect to: ' + component.get('macAddressOfBoard'));
					metawear.mwdevice.connect(macAddressOfBoard,
						function(){//success
							console.log('connected');
							component.set('metawearConnected', true);
						}, function(error){//failure
							console.log('connection failed' +error);
						});
				}
				catch(err){
					console.log('error: '+err);
				}

			}, 100);//run after 100ms
		},
		disconnect: function(){
			var component = this;
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('Disconnecting from: ' + component.get('macAddressOfBoard'));
					metawear.mwdevice.disconnect();
					component.set('metawearConnected', false);
				}
				catch(err){
					console.log('error: '+err);
				}

			}, 100);//run after 100ms
		},
		playLED: function(){

			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('Turning on Blue Light: ' + component.get('macAddressOfBoard'));
					metawear.mwdevice.playLED({channel:"BLUE",
						riseTime: 750, pulseDuration: 2000,
						repeatCount: -1, highTime: 500,
						fallTime: 750, lowIntensity: 0,
						highIntensity: 31});
				}
				catch(err){
					console.log('error: '+err);
				}

			}, 100);//run after 100ms
		},
		stopLED: function(){
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('Shutting off Blue Light: ' + component.get('macAddressOfBoard'));
					metawear.mwdevice.stopLED();
				}
				catch(err){
					console.log('error: '+err);
				}

			}, 100);//run after 100ms
		}
	}
});
