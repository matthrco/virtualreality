/* global AFRAME */

var currentPortalName = "#makery1";
var rotations = {"#makery1" : "0 180 0", "#makery2" : "0 70 0", "#makery3" : "0 270 0"};
var black = false;

AFRAME.registerComponent('makery', {
  init: function () {
    goToPortal((currentPortalName.substring(7)) - 1);
    var target1 = document.querySelector('#pos1');
    target1.addEventListener('mouseleave', function (event) {
        document.querySelector('#VRText').setAttribute('visible', false);
        document.querySelector('#prompt3').setAttribute('visible', true);
    });
    var target2 = document.querySelector('#pos2');
    target2.addEventListener('mouseleave', function (event) {
        document.querySelector('#scratchText').setAttribute('visible', false);
        document.querySelector('#video1').setAttribute('visible', false);
        document.querySelector('#box').setAttribute('visible', false);
        document.querySelector('#prompt1').setAttribute('visible', true);
    });
    var target3 = document.querySelector('#pos3');
    target3.addEventListener('mouseenter', function (event) {
        document.querySelector('#pythonText').setAttribute('visible', true);
        document.querySelector('#prompt2').setAttribute('visible', false);
    });
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#pythonText').setAttribute('visible', false);
        document.querySelector('#prompt2').setAttribute('visible', true);
    });
    var target3 = document.querySelector('#pos4');
    target3.addEventListener('mouseenter', function (event) {
        var newVid = document.querySelector('#makery1_dynamic');
        newVid.play();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery1_dynamic');
        target.setAttribute('material', 'src', '#makery1_dynamic');
        document.querySelector('#prompt4').setAttribute('visible', false);
    });
    target3.addEventListener('mouseleave', function (event) {
        var newVid = document.querySelector('#makery1_dynamic');
        newVid.pause();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery1');
        target.setAttribute('material', 'src', '#makery1');
        document.querySelector('#crumbleText').setAttribute('visible', false);
        document.querySelector('#box2').setAttribute('visible', false);
        document.querySelector('#prompt4').setAttribute('visible', true);
    });
    var target3 = document.querySelector('#pos5');
    target3.addEventListener('mouseenter', function (event) {
        var newVid = document.querySelector('#makery2_all');
        newVid.play();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery2_all');
        target.setAttribute('material', 'src', '#makery2_all');
        document.querySelector('#prompt5').setAttribute('visible', false);
    });
    target3.addEventListener('mouseleave', function (event) {
        var newVid = document.querySelector('#makery2_all');
        newVid.pause();
        var target = document.querySelector('#vid');
        target.setAttribute('material', 'src: #makery2');
        target.setAttribute('material', 'src', '#makery2');
        document.querySelector('#prompt5').setAttribute('visible', true);
        document.querySelector('#legoText').setAttribute('visible', false);
        document.querySelector('#box3').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#pos6');
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#prompt6').setAttribute('visible', true);
        document.querySelector('#printerText').setAttribute('visible', false);
        document.querySelector('#box4').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#pos7');
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#prompt7').setAttribute('visible', true);
        document.querySelector('#sketchText').setAttribute('visible', false);
        document.querySelector('#box5').setAttribute('visible', false);
    });
    var target3 = document.querySelector('#pos8');
    target3.addEventListener('mouseleave', function (event) {
        document.querySelector('#prompt8').setAttribute('visible', true);
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
      color: '#FFFFFF',
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
      black = true;
      
      setTimeout(function () {
        document.querySelector(data.src).ontimeupdate = function() {
            if(black){
              data.target.emit('set-image-fade2');
              var portals = document.querySelectorAll('[portal]');
              for(var i = 0; i<portals.length; i++){
                portals[i].emit('set-image-fade2');
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
      dur: 500,
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
      dur: 500,
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
    
    element.appendChild(bottom);
    element.appendChild(top);
  }
});


function goToPortal(portal){
  var sceneEl = document.querySelector('a-scene');
  var light = document.querySelector('[light]');
  if(portal === 0){
    var sceneEl = document.querySelector('a-scene');
    var target = document.querySelector('#vid');
    target.setAttribute('material', 'src: ');
    target.setAttribute('rotation', rotations[currentPortalName]);
    target.setAttribute('material', 'src: '+currentPortalName);
    target.setAttribute('material', 'src', currentPortalName);
    //portals[activePortal].classList.add("link");
    //var newVid = document.querySelector("#makery1_dynamic");
    //newVid.play();
    sceneEl.querySelector(currentPortalName).setAttribute('visible', true);
    document.querySelector('#pos1').classList.remove("link");
    document.querySelector('#pos2').classList.remove("link");
    document.querySelector('#pos3').classList.remove("link");
    document.querySelector('#pos4').classList.add("link");
    document.querySelector('#pos5').classList.remove("link");
    document.querySelector('#pos6').classList.remove("link");
    document.querySelector('#pos7').classList.remove("link");
    document.querySelector('#pos8').classList.remove("link");
    document.querySelector('#door').classList.remove("link");
    document.querySelector('#prompt1').setAttribute('visible', false);
    document.querySelector('#prompt2').setAttribute('visible', false);
    document.querySelector('#prompt3').setAttribute('visible', false);
    document.querySelector('#prompt4').setAttribute('visible', true);
    document.querySelector('#prompt5').setAttribute('visible', false);
    document.querySelector('#prompt6').setAttribute('visible', false);
    document.querySelector('#prompt7').setAttribute('visible', false);
    document.querySelector('#prompt8').setAttribute('visible', false);
    light.setAttribute('intensity', 1.3);
  }else if(portal === 1){
    //var newVid = document.querySelector("#makery2_all");
    //newVid.play();
    document.querySelector('#pos1').classList.remove("link");
    document.querySelector('#pos2').classList.remove("link");
    document.querySelector('#pos3').classList.remove("link");
    document.querySelector('#pos4').classList.remove("link");
    document.querySelector('#pos5').classList.add("link");
    document.querySelector('#pos6').classList.add("link");
    document.querySelector('#pos7').classList.add("link");
    document.querySelector('#pos8').classList.add("link");
    document.querySelector('#door').classList.add("link");
    document.querySelector('#door').setAttribute('position', '-8.893 -0.410 -6.694');
    document.querySelector('#door').setAttribute('rotation', '0 -48.014 0');
    document.querySelector('#door').setAttribute('scale', '0.510 3.778 4.265');
    document.querySelector('#prompt1').setAttribute('visible', false);
    document.querySelector('#prompt2').setAttribute('visible', false);
    document.querySelector('#prompt3').setAttribute('visible', false);
    document.querySelector('#prompt4').setAttribute('visible', false);
    document.querySelector('#prompt5').setAttribute('visible', true);
    document.querySelector('#prompt6').setAttribute('visible', true);
    document.querySelector('#prompt7').setAttribute('visible', true);
    document.querySelector('#prompt8').setAttribute('visible', true);
    light.setAttribute('intensity', 1);    
  }else if(portal === 2){
    var newVid = document.querySelector("#scratch");
    newVid.play();
    document.querySelector('#pos1').classList.add("link");
    document.querySelector('#pos2').classList.add("link");
    document.querySelector('#pos3').classList.add("link");
    document.querySelector('#pos4').classList.remove("link");
    document.querySelector('#pos5').classList.remove("link");
    document.querySelector('#pos6').classList.remove("link");
    document.querySelector('#pos7').classList.remove("link");
    document.querySelector('#pos8').classList.remove("link");
    document.querySelector('#door').classList.add("link");
    document.querySelector('#door').setAttribute('position', '-9.642 -0.320 -2.986');
    document.querySelector('#door').setAttribute('rotation', '0 0 0');
    document.querySelector('#door').setAttribute('scale', '0.510 3.291 4.265');
    document.querySelector('#prompt1').setAttribute('visible', true);
    document.querySelector('#prompt2').setAttribute('visible', true);
    document.querySelector('#prompt3').setAttribute('visible', true);
    document.querySelector('#prompt4').setAttribute('visible', false);
    document.querySelector('#prompt5').setAttribute('visible', false);
    document.querySelector('#prompt6').setAttribute('visible', false);
    document.querySelector('#prompt7').setAttribute('visible', false);
    document.querySelector('#prompt8').setAttribute('visible', false);
    light.setAttribute('intensity', 1);    
  }
  //portals[portal].classList.remove("link");
  sceneEl.querySelector(currentPortalName).setAttribute('visible', false);
  sceneEl.querySelector('[raycaster]').components.raycaster.refreshObjects();
}
