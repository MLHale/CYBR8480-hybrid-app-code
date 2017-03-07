import Ember from 'ember';

export default Ember.Component.extend({
  x: 0,
  y: 0,
  z: 0,
  accelHistory: [],
  on: true,
  startLogging: function(){
    //begin logging accelerometer data once the component launches

    var component = this;
    this.updateAccelData(component);

  }.on('init'),
  updateAccelData: function(component){
    Ember.run.later(function(){
      //wrapper to preserve binding satistfaction
      try {
        //invoke cordova accelerometer Plugin and get accelerometer data
        navigator.accelerometer.getCurrentAcceleration(function (acceleration) {//success callback
            //console.log('acceleration setvars called');
            component.set('x', acceleration.x);
            component.set('y', acceleration.y);
            component.set('z', acceleration.z);

            //update history, maintain 50 points max
            var history=component.get('accelHistory');
            if(history.length === 150){
              history.shiftObject();//shift an x off
              history.shiftObject();//shift a y off
              history.shiftObject();//shift a z off
            }
            var t = Date.now();
            var newXPoint = {time: t, label: 'x', value: acceleration.x};
            var newYPoint = {time: t, label: 'y', value: acceleration.y};
            var newZPoint = {time: t, label: 'z', value: acceleration.z};
            history.addObjects([newXPoint, newYPoint, newZPoint]);
            //console.log("accel vals: x: "+ acceleration.x+ " y: "+acceleration.y+" z: "+acceleration.z+" t: "+ Date.now());
        }, function (error) {//error callback
            console.log('error: ' + error);
        });
      }
      catch(err){
        console.log('error: '+err);
      }
      if(component.get('on')){
        //keep running
        component.updateAccelData(component); //recurse
      }

    }, 100);//run ever 100ms
  }
});