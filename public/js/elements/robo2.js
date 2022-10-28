// Creates, animates and moves a sprite in response to arrow keys. Call its update method from the scene's update and call its destroy method when you're done with the player.

export default class Robot2 {
    constructor(scene, x, y, robo2On, stopPoint) {
    this.scene = scene;
    
    // Create animations for the robot (from sprite sheet frames)
    const anims=scene.anims;
    // walk:
    anims.create({
        key: 'robo2move',
        frames: anims.generateFrameNumbers('robo2', { start: 10, end: 16 }),
        frameRate: 10,  // display 10 frames per second
        repeat: -1      // loop animation
    });
    // idle/waiting:
    anims.create({
        key: 'robo2wait',
        frames: anims.generateFrameNumbers('robo2', { start: 0, end: 9 }),
        frameRate: 10,  // display 10 frames per second
        repeat: -1      // loop animation
    });
    // carry coin (walking):
    anims.create({
        key: 'robo2coinCarry',
        frames: anims.generateFrameNumbers('robo2', { start: 17, end: 25 }),
        frameRate: 10,  // display 10 frames per second
        repeat: -1      // loop animation
    });
    // carry coin (idle):
    anims.create({
        key: 'robo2coinIdle',
        frames: [ {key: 'robo2', frame: 25} ],
        frameRate: 10,  // display 10 frames per second
    }); 
        
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, 'robo2', 0)
      .setScale(0.7)
      .setCollideWorldBounds(true)  // prevent running off edges
      .setBounce(0.1);              // bounce values range [0,1]
          
    }
        
    update(robo2On, stopPoint) {
        const roboSprite2 = this.sprite;
        const roboVelocity = 100;
        roboSprite2.visible = false;                // default is invisible
        
        //update sprite:                            // turn visibility on
        if (robo2On == 1) {
        roboSprite2.visible = true;
            if (roboSprite2.x > stopPoint ) {       // if still to R of this point, move L
                roboSprite2.setVelocityX(-roboVelocity);   
                roboSprite2.setVelocityY(800);      // fall more heavily than player
                roboSprite2.anims.play('robo2move', true);
                roboSprite2.flipX=true;             // mirror flip running frames R -> L
                }
            else {                                  // when reached desired point, stop
                roboSprite2.setVelocityX(0);         
                roboSprite2.anims.play('robo2wait', true);
                roboSprite2.flipX=true;             // mirror flip to face R
                }
        }
        
        if (robo2On == 2) {                         // for keep coin outcome:
            roboSprite2.visible = true;
            roboSprite2.setVelocityX(0);                   // keep still
            roboSprite2.anims.play('robo2coinIdle', true); // show carrying coins
            roboSprite2.flipX=true;
        }
        
        if (robo2On == 3) {                         // for keep coin trial end:
            roboSprite2.visible = true;
            roboSprite2.setVelocityX(roboVelocity*4);       // move off fast to the R
            roboSprite2.anims.play('robo2coinCarry', true); // show carrying coins
            roboSprite2.flipX=false;                        // face R
        }
                
        if (robo2On == 4) {                         // for catch trial trial end:
            roboSprite2.visible = true;
            roboSprite2.setVelocityX(roboVelocity*4);       // move off fast to the R
            roboSprite2.anims.play('robo2move', true);      // not carrying coins
            roboSprite2.flipX=false;                        // face R 
        }
        
        if (robo2On == 5) {                         // for lose coin outcome:
            roboSprite2.visible = true;
            //roboSprite2.setTint(0xff0000);                // turn red and don't move  
            roboSprite2.flipX=true; 
        }
    }
    
    destroy() {
        this.sprite.destroy();
    }

}