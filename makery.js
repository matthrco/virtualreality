/* global AFRAME */

var currentPortalName = "#makery1";
var rotations = {"#makery1" : "0 180 0", "#makery2" : "0 70 0", "#makery3" : "0 270 0"};
var black = true;

var eventLstner = function (event) {
  var v = document.querySelector('#makery1');// + document.querySelector('#vid').getAttribute('material').src.id);
  v.play();
      
  var child = document.getElementById("p1");
  if(child !== null){
    child.parentNode.removeChild(child);        
  }
  v.ontimeupdate = function() {
      if(black){
        document.querySelector('#vid').emit('set-image-fade2');
        var portals = document.querySelectorAll('[portal]');
        for(var i = 0; i<portals.length; i++){
          portals[i].emit('set-image-fade2');
        }
        var prompts = document.querySelectorAll('[prompt]');
        for(var i = 0; i<prompts.length; i++){
          prompts[i].childNodes[0].emit('set-image-fade2');
          prompts[i].childNodes[1].emit('set-image-fade2');
        }
        black = false;
      }
  };
};

//window.addEventListener('click', eventLstner);

AFRAME.registerComponent('makery', {
  init: function () {
    var standalone = window.navigator.standalone;
    var userAgent = window.navigator.userAgent.toLowerCase();
    var safari = /safari/.test( userAgent );
    var ios = /iphone|ipod|ipad/.test( userAgent );

    if( ios ) {
      document.querySelector('#makery1').src = document.querySelector('#makery1').getElementsByTagName('source')[1].src;
      document.querySelector('#makery2').src = document.querySelector('#makery2').getElementsByTagName('source')[1].src;
      document.querySelector('#makery3').src = document.querySelector('#makery3').getElementsByTagName('source')[1].src;
      document.querySelector('#makery1_dynamic').src = document.querySelector('#makery1_dynamic').getElementsByTagName('source')[1].src;
      document.querySelector('#makery2_all').src = document.querySelector('#makery2_all').getElementsByTagName('source')[1].src;
    }
    //document.querySelector('#cursor').setAttribute('position', '0 0 -5');
    goToPortal((currentPortalName.substring(7)) - 1);
    var target1 = document.querySelector('#VRTrigger');
    target1.addEventListener('mouseenter', function (event) {
        document.querySelector('#VRText').setAttribute('visible', true);
        document.querySelector('#VRPrompt').setAttribute('visible', false);
    });
    target1.addEventListener('mouseleave', function (event) {
        document.querySelector('#VRText').setAttribute('visible', false);
        document.querySelector('#VRPrompt').setAttribute('visible', true);
    });
    var target2 = document.querySelector('#scratchTrigger');
    target2.addEventListener('mouseenter', function (event) {
        var newVid = document.querySelector('#scratch');
        newVid.play();
        document.querySelector('#scratchText').setAttribute('visible', true);
        document.querySelector('#video1').setAttribute('visible', true);
        document.querySelector('#box').setAttribute('visible', true);
        document.querySelector('#scratchPrompt').setAttribute('visible', false);
    });
    target2.addEventListener('mouseleave', function (event) {
        document.querySelector('#scratchText').setAttribute('visible', false);
        document.querySelector('#video1').setAttribute('visible', false);
        document.querySelector('#box').setAttribute('visible', false);
        document.querySelector('#scratchPrompt').setAttribute('visible', true);
    });
    var target3 = document.querySelector('#pythonTrigger');
    target3.addEventListener('mouseenter', function (event) {
        document.querySelector('#pythonText').setAttribute('visible', true);
        document.querySelector('#pythonPrompt').setAttribute('visible', false);
    });
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#pythonText').setAttribute('visible', false);
        document.querySelector('#pythonPrompt').setAttribute('visible', true);
    });
    var target3 = document.querySelector('#crumbleTrigger');
    target3.addEventListener('mouseenter', function (event) {
        var newVid = document.querySelector('#makery1_dynamic');
        newVid.play();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery1_dynamic');
        target.setAttribute('material', 'src', '#makery1_dynamic');
        document.querySelector('#crumblePrompt').setAttribute('visible', false);
        document.querySelector('#crumbleText').setAttribute('visible', true);
        document.querySelector('#box2').setAttribute('visible', true);
        document.querySelector('#crumblePrompt').setAttribute('visible', false);
    });
    target3.addEventListener('mouseleave', function (event) {
        var newVid = document.querySelector('#makery1_dynamic');
        newVid.pause();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery1');
        target.setAttribute('material', 'src', '#makery1');
        document.querySelector('#crumbleText').setAttribute('visible', false);
        document.querySelector('#box2').setAttribute('visible', false);
        document.querySelector('#crumblePrompt').setAttribute('visible', true);
    });
    var target3 = document.querySelector('#legoTrigger');
    target3.addEventListener('mouseenter', function (event) {
        var newVid = document.querySelector('#makery2_all');
        newVid.play();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery2_all');
        target.setAttribute('material', 'src', '#makery2_all');
        document.querySelector('#legoPrompt').setAttribute('visible', false);
        document.querySelector('#legoText').setAttribute('visible', true);
        document.querySelector('#box3').setAttribute('visible', true);
    });
    target3.addEventListener('mouseleave', function (event) {
        var newVid = document.querySelector('#makery2_all');
        newVid.pause();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery2');
        target.setAttribute('material', 'src', '#makery2');
        document.querySelector('#legoPrompt').setAttribute('visible', true);
        document.querySelector('#legoText').setAttribute('visible', false);
        document.querySelector('#box3').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#printerTrigger');
    target3.addEventListener('mouseenter', function (event) {
        document.querySelector('#printerPrompt').setAttribute('visible', false);
        document.querySelector('#printerText').setAttribute('visible', true);
        document.querySelector('#box4').setAttribute('visible', true);
    });
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#printerPrompt').setAttribute('visible', true);
        document.querySelector('#printerText').setAttribute('visible', false);
        document.querySelector('#box4').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#sketchTrigger');
    target3.addEventListener('mouseenter', function (event) {
        document.querySelector('#sketchPrompt').setAttribute('visible', false);
        document.querySelector('#sketchText').setAttribute('visible', true);
        document.querySelector('#box5').setAttribute('visible', true);
    });
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#sketchPrompt').setAttribute('visible', true);
        document.querySelector('#sketchText').setAttribute('visible', false);
        document.querySelector('#box5').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#ccTrigger');
    target3.addEventListener('mouseenter', function (event) {
        document.querySelector('#ccPrompt').setAttribute('visible', false);
        document.querySelector('#ccText').setAttribute('visible', true);
        document.querySelector('#box6').setAttribute('visible', true);
    });
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#ccPrompt').setAttribute('visible', true);
        document.querySelector('#ccText').setAttribute('visible', false);
        document.querySelector('#box6').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#door');
    target3.addEventListener('click', function (event) {
        window.location.href = "https://www.hants.gov.uk/librariesandarchives/library";
    });
  }
});

AFRAME.registerComponent('portal', {
  schema: {
    target: {type: 'selector'},
    src: {type: 'string'},
    position: {type: 'string'},
    rotation: {type: 'string'}
  },
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    var data = this.data;
    var element = this.el;
    element.setAttribute('position', data.position);
    element.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 0.5
    });
    element.setAttribute('material', {
      shader: 'flat', 
      color: '#000',
      opacity: 0.7,
      side: 'front',
      src: '#portalTexture',
      transparent: true,
      depthTest: true
    });
    this.setupFadeAnimation();
    element.addEventListener('mousedown', function (event) {
      element.setAttribute('material', {
        opacity: 0.7,
        side: 'front',
        src: '#portalTexture',
        depthTest: true
      });
    });
    element.addEventListener('mouseup', function (event) {
      element.setAttribute('material', {
        opacity: 1,
        side: 'front',
        src: '#portalTexture',
        depthTest: true
      });
    });
    element.addEventListener('mouseenter', function (event) {
      element.setAttribute('material', {
        opacity: 1,
        side: 'front',
        src: '#portalTexture',
        depthTest: true
      });
    });
    element.addEventListener('mouseleave', function (event) {
      element.setAttribute('material', {
        opacity: 0.7,
        src: '#portalTexture',
        side: 'front',
        depthTest: true
      });
    });
    element.addEventListener('click', function (event) {
      // Fade out image.
      //var newVid = document.querySelector(data.src);
      //newVid.play();
      var sceneEl = document.querySelector('a-scene');
      data.target.emit('set-image-fade');
      var portals = document.querySelectorAll('[portal]');
      for(var i = 0; i<portals.length; i++){
        portals[i].emit('set-image-fade');
      }
      var prompts = document.querySelectorAll('[prompt]');
        for(var i = 0; i<prompts.length; i++){
          prompts[i].childNodes[0].emit('set-image-fade');
          prompts[i].childNodes[1].emit('set-image-fade');
        }
      black = true;
      
      setTimeout(function () {
        document.querySelector(data.src).ontimeupdate = function() {
            if(black){
              data.target.emit('set-image-fade2');
              var portals = document.querySelectorAll('[portal]');
              for(var i = 0; i<portals.length; i++){
                portals[i].emit('set-image-fade2');
              }
              var prompts = document.querySelectorAll('[prompt]');
              for(var i = 0; i<prompts.length; i++){
                prompts[i].childNodes[0].emit('set-image-fade2');
                prompts[i].childNodes[1].emit('set-image-fade2');
              }
              black = false;
            }
        };
        data.target.setAttribute('rotation', rotations[data.src]);
        if(currentPortalName === '#makery1'){
          var newVid = document.querySelector('#makery1_dynamic');
          newVid.pause();
        }
        if(currentPortalName === '#makery2'){
          var newVid = document.querySelector('#makery2_all');
          newVid.pause();
        }
        if(currentPortalName === '#makery3'){
          var newVid = document.querySelector('#scratch');
          newVid.pause();
        }
        document.querySelector(currentPortalName).pause();
        currentPortalName = data.src;
        document.querySelector(currentPortalName).play();
        
        data.target.setAttribute('material', 'src: '+data.src);
        data.target.setAttribute('material', 'src', data.src);
        data.target.setAttribute('position', data.position);
        //portals[activePortal].classList.add("link");
        sceneEl.querySelector(currentPortalName).setAttribute('visible', true);
        var secondCameraEl = document.querySelector("#camera");
        secondCameraEl.setAttribute('position', data.position);
        secondCameraEl.setAttribute('rotation', data.rotation);
        goToPortal((data.src.substring(7)) - 1);
      }, 300);
    });
  },
  
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.

    // Create animation.
    this.el.setAttribute('animation__fadetoblack', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'normal',
      dur: 300,
      from: '#FFF',
      to: '#000'
    });
    
    this.el.setAttribute('animation__fadefromblack', {
      property: 'material.color',
      startEvents: 'set-image-fade2',
      dir: 'normal',
      dur: 1000,
      from: '#000',
      to: '#FFF'
    });
    
    
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;
    
    targetEl.setAttribute('animation__fadetoblack', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'normal',
      dur: 300,
      from: '#FFF',
      to: '#000'
    });
    
    targetEl.setAttribute('animation__fadefromblack', {
      property: 'material.color',
      startEvents: 'set-image-fade2',
      dir: 'normal',
      dur: 1000,
      from: '#000',
      to: '#FFF'
    });
  }
});

AFRAME.registerComponent('prompt', {
  schema: {
    position: {type: 'string'}
  },
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    var data = this.data;
    var element = this.el;
    var bottom = document.createElement('a-entity');
    var top = document.createElement('a-entity');
    var animation = document.createElement('a-animation');
    bottom.setAttribute('geometry', {
      primitive: 'cone',
      radiusTop: 0.2,
      radiusBottom: 0,
      height: 0.2,
      segmentsRadial: 3
    });
    bottom.setAttribute('material', {
      color: 'green'
    });
    
    top.setAttribute('position', "0 0.2 0");
    top.setAttribute('geometry', {
      primitive: 'cylinder',
      radius: 0.05,
      height: 0.2
    });
    top.setAttribute('material', {
      color: 'green'
    });
    animation.setAttribute('attribute', 'position');
    animation.setAttribute('from', data.position);
    var location = element.getAttribute('position');
    animation.setAttribute('to', location["x"] + " " + (location["y"] + 0.3) + " " + location["z"]);
    animation.setAttribute('dur', "800");
    animation.setAttribute('direction', "alternate");
    animation.setAttribute('repeat', "indefinite");
    element.appendChild(bottom);
    element.appendChild(top);
    element.appendChild(animation);
    top.setAttribute('animation__fadetoblack', {
      property: 'material.opacity',
      startEvents: 'set-image-fade',
      dir: 'normal',
      dur: 300,
      from: '#008000',
      to: '#000'
    });
    bottom.setAttribute('animation__fadetoblack', {
      property: 'material.opacity',
      startEvents: 'set-image-fade',
      dir: 'normal',
      dur: 300,
      from: '#008000',
      to: '#000'
    });
    top.setAttribute('animation__fadefromblack', {
      property: 'material.opacity',
      startEvents: 'set-image-fade2',
      dir: 'normal',
      dur: 1000,
      from: '#000',
      to: '#008000'
    });
    bottom.setAttribute('animation__fadefromblack', {
      property: 'material.opacity',
      startEvents: 'set-image-fade2',
      dir: 'normal',
      dur: 1000,
      from: '#000',
      to: '#008000'
    });
  }
});


function goToPortal(portal){
  var sceneEl = document.querySelector('a-scene');
  var light = document.querySelector('[light]');
  //document.querySelector('#cursor').setAttribute('scale', '5 5 5');
  if(portal === 0){
    var sceneEl = document.querySelector('a-scene');
    var target = document.querySelector('#vid');
    target.setAttribute('material', 'src: ');
    target.setAttribute('rotation', rotations[currentPortalName]);
    target.setAttribute('material', 'src: '+currentPortalName);
    target.setAttribute('material', 'src', currentPortalName);
    //portals[activePortal].classList.add("link");
    sceneEl.querySelector(currentPortalName).setAttribute('visible', true);
    document.querySelector('#VRTrigger').classList.remove("link");
    document.querySelector('#scratchTrigger').classList.remove("link");
    document.querySelector('#pythonTrigger').classList.remove("link");
    document.querySelector('#crumbleTrigger').classList.add("link");
    document.querySelector('#legoTrigger').classList.remove("link");
    document.querySelector('#printerTrigger').classList.remove("link");
    document.querySelector('#sketchTrigger').classList.remove("link");
    document.querySelector('#ccTrigger').classList.remove("link");
    document.querySelector('#door').classList.remove("link");
    document.querySelector('#scratchPrompt').setAttribute('visible', false);
    document.querySelector('#pythonPrompt').setAttribute('visible', false);
    document.querySelector('#VRPrompt').setAttribute('visible', false);
    document.querySelector('#crumblePrompt').setAttribute('visible', true);
    document.querySelector('#legoPrompt').setAttribute('visible', false);
    document.querySelector('#printerPrompt').setAttribute('visible', false);
    document.querySelector('#sketchPrompt').setAttribute('visible', false);
    document.querySelector('#ccPrompt').setAttribute('visible', false);
    light.setAttribute('intensity', 1.3);
  }else if(portal === 1){
    document.querySelector('#VRTrigger').classList.remove("link");
    document.querySelector('#scratchTrigger').classList.remove("link");
    document.querySelector('#pythonTrigger').classList.remove("link");
    document.querySelector('#crumbleTrigger').classList.remove("link");
    document.querySelector('#legoTrigger').classList.add("link");
    document.querySelector('#printerTrigger').classList.add("link");
    document.querySelector('#sketchTrigger').classList.add("link");
    document.querySelector('#ccTrigger').classList.add("link");
    document.querySelector('#door').classList.add("link");
    document.querySelector('#door').setAttribute('position', '-8.893 -0.410 -6.694');
    document.querySelector('#door').setAttribute('rotation', '0 -48.014 0');
    document.querySelector('#door').setAttribute('scale', '0.510 3.778 4.265');
    document.querySelector('#scratchPrompt').setAttribute('visible', false);
    document.querySelector('#pythonPrompt').setAttribute('visible', false);
    document.querySelector('#VRPrompt').setAttribute('visible', false);
    document.querySelector('#crumblePrompt').setAttribute('visible', false);
    document.querySelector('#legoPrompt').setAttribute('visible', true);
    document.querySelector('#printerPrompt').setAttribute('visible', true);
    document.querySelector('#sketchPrompt').setAttribute('visible', true);
    document.querySelector('#ccPrompt').setAttribute('visible', true);
    light.setAttribute('intensity', 1);    
  }else if(portal === 2){
    document.querySelector('#VRTrigger').classList.add("link");
    document.querySelector('#scratchTrigger').classList.add("link");
    document.querySelector('#pythonTrigger').classList.add("link");
    document.querySelector('#crumbleTrigger').classList.remove("link");
    document.querySelector('#legoTrigger').classList.remove("link");
    document.querySelector('#printerTrigger').classList.remove("link");
    document.querySelector('#sketchTrigger').classList.remove("link");
    document.querySelector('#ccTrigger').classList.remove("link");
    document.querySelector('#door').classList.add("link");
    document.querySelector('#door').setAttribute('position', '-9.642 -0.320 -2.986');
    document.querySelector('#door').setAttribute('rotation', '0 0 0');
    document.querySelector('#door').setAttribute('scale', '0.510 3.291 4.265');
    document.querySelector('#scratchPrompt').setAttribute('visible', true);
    document.querySelector('#pythonPrompt').setAttribute('visible', true);
    document.querySelector('#VRPrompt').setAttribute('visible', true);
    document.querySelector('#crumblePrompt').setAttribute('visible', false);
    document.querySelector('#legoPrompt').setAttribute('visible', false);
    document.querySelector('#printerPrompt').setAttribute('visible', false);
    document.querySelector('#sketchPrompt').setAttribute('visible', false);
    document.querySelector('#ccPrompt').setAttribute('visible', false);
    light.setAttribute('intensity', 1);    
  }
  //portals[portal].classList.remove("link");
  sceneEl.querySelector(currentPortalName).setAttribute('visible', false);
  sceneEl.querySelector('[raycaster]').components.raycaster.refreshObjects();
}
