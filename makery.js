/* global AFRAME */

var currentPortalName = "#makery1";
var rotations = {"#makery1" : "0 180 0", "#makery2" : "0 70 0", "#makery3" : "0 270 0"};

AFRAME.registerComponent('makery', {
  init: function () {
    goToPortal((currentPortalName.substring(7)) - 1);
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
      src: '#portalTexture',
      side: 'front',
      transparent: true,
      depthTest: true
    });
    //this.setupFadeAnimation();
    element.addEventListener('mousedown', function (event) {
      element.setAttribute('material', {
        opacity: 0.7,
        src: '#portalTexture',
        side: 'front',
        depthTest: true
      });
    });
    element.addEventListener('mouseup', function (event) {
      element.setAttribute('material', {
        opacity: 1,
        src: '#portalTexture',
        side: 'front',
        depthTest: true
      });
    });
    element.addEventListener('mouseenter', function (event) {
      element.setAttribute('material', {
        opacity: 1,
        src: '#portalTexture',
        side: 'front',
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
      var newVid = document.querySelector(data.src);
      newVid.play();
      var sceneEl = document.querySelector('a-scene');
      data.target.setAttribute('material', 'src: ');
      data.target.setAttribute('rotation', rotations[data.src]);
      //document.querySelector(currentPortalName).pause();
      currentPortalName = data.src;
      data.target.setAttribute('material', 'src: '+data.src);
      data.target.setAttribute('material', 'src', data.src);
      data.target.setAttribute('position', data.position);
      //portals[activePortal].classList.add("link");
      sceneEl.querySelector(currentPortalName).setAttribute('visible', true);
      var secondCameraEl = document.querySelector("#camera");
      secondCameraEl.setAttribute('position', data.position);
      secondCameraEl.setAttribute('rotation', data.rotation);
      goToPortal((data.src.substring(7)) - 1);
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
    sceneEl.querySelector(currentPortalName).setAttribute('visible', true);
    document.querySelector('#pos1').classList.remove("link");
    document.querySelector('#pos2').classList.remove("link");
    document.querySelector('#pos3').classList.remove("link");
    var box = document.querySelector("#cover");
    box.setAttribute('position', "-0.162 -1.655 0.018");
    box.setAttribute('rotation', "0 90 0");
    box.setAttribute('scale', "5.370 0 2.56");
    box.setAttribute('material', {
      src: '#floorTexture1'
    });
    light.setAttribute('intensity', 1.3);
  }else if(portal === 1){
    document.querySelector('#pos1').classList.remove("link");
    document.querySelector('#pos2').classList.remove("link");
    document.querySelector('#pos3').classList.remove("link");
    var box = document.querySelector("#cover");
    box.setAttribute('position', "-5.134 -1.655 2.179");
    box.setAttribute('rotation', "-3.037 -25.78 2.922");
    box.setAttribute('scale', "5.370 0 2.56");
    box.setAttribute('material', {
      src: '#floorTexture2'
    });
    light.setAttribute('intensity', 1);    
  }else if(portal === 2){
    var newVid = document.querySelector("#scratch");
    newVid.play();
    document.querySelector('#pos1').classList.add("link");
    document.querySelector('#pos2').classList.add("link");
    document.querySelector('#pos3').classList.add("link");
    var box = document.querySelector("#cover");
    box.setAttribute('position', "-5.138 -1.655 -2.029");
    box.setAttribute('rotation', "0 177 0");
    box.setAttribute('scale', "3.91 0 1.99");
    box.setAttribute('material', {
      src: '#floorTexture3'
    });
    light.setAttribute('intensity', 1);    
  }
  //portals[portal].classList.remove("link");
  sceneEl.querySelector(currentPortalName).setAttribute('visible', false);
  sceneEl.querySelector('[raycaster]').components.raycaster.refreshObjects();
}
