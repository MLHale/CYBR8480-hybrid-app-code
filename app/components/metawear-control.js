import Ember from 'ember';

export default Ember.Component.extend({
	metawearConnected: false,
	macAddressOfBoard: '',
	actions: {
		connect: function(){
			var component = this;
			Ember.run.later(function(){
				//wrapper to preserve binding satistfaction
				try {
				//invoke metawear connection
					console.log('attempting to connect to: ' + this.get('macAddressOfBoard'));
					mbientlab.mwdevice.connect(macAddressOfBoard,
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
					console.log('Disconnecting from: ' + this.get('macAddressOfBoard'));
					mbientlab.mwdevice.disconnect();
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
					console.log('Turning on Blue Light: ' + this.get('macAddressOfBoard'));
					mbientlab.mwdevice.playLED({channel:"BLUE",
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
					console.log('Shutting off Blue Light: ' + this.get('macAddressOfBoard'));
					mbientlab.mwdevice.stopLED();
				}
				catch(err){
					console.log('error: '+err);
				}

			}, 100);//run after 100ms
		}
	}
});
