AFRAME.registerComponent("bowling-balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var  ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");

        ball.setAttribute("scale", { x: 3, y: 3,  z: 3});

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y-1.2,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        //Task 1 set the ball as the dynamic entity and mass value will be 10
        ball.setAttribute("dynamic-body",{shape:"sphere",mass:1} )
        ball.addEventListener("collide",this.removeBall)

        //Task 2 add the collide event listener to the ball

        scene.appendChild(ball);
      }
    });
  },
  removeBall: function (e) {
    
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("pin")) {
      
      // Task 3 impulse and point vector
     var impulse = new CANNON.Vec3(0,1,-15);
     // var impulse = new CANNON.Vector3(0,1,-15);
     //var impulse = new CANNON.Vec2(0,1,-15);
     //var impulse = new Cannon.Vec3(0,1,-15);

      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyForce(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.removeBall);

      //remove the ball  from the scene
      var scene = document.querySelector("#scene");
      // Task 4 remove the ball from the scene 
      scene.removeChild(element)



    }
  },
});


