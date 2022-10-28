// Creates, animates and moves a sprite in response to arrow keys. Call its update method from the scene's update and call its destroy method when you're done with the player.

export default class Player {
    constructor(scene, x, y) {
    this.scene = scene;
    
    // Create animations for the player (from sprite sheet frames)
    const anims=scene.anims;
    // run right:
    anims.create({
        key: 'run',
        frames: anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 10,              // display 10 frames per second
        repeat: -1                  // loop animation
    });
    // idle/waiting:
    anims.create({
        key: 'wait',
        frames: [ {key: 'player', frame: 0}],
        frameRate: 20
    });
    // jump:
    anims.create({
        key: 'jump',
        frames: [ {key: 'player', frame: 6}],
        frameRate: 10,
        repeat: -1
    });
        
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, 'player', 0)
      .setCollideWorldBounds(true)  // prevent running off edges
      .setBounce(0.4);              // bounce values range [0,1]
      //.setDrag(1000, 0)
      //.setMaxVelocity(300, 400);
         
    // Track the arrow keys
    var { LEFT, RIGHT, UP} = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP
    });    
    }
        
    update() {
        const sprite = this.sprite;
        const cursors = this.keys;
        const velocity = 300;
        // update sprite according keyboard input:
        // for running left/right:
        if (cursors.left.isDown) {
            sprite.setVelocityX(-velocity);  // negative horizontal velocity -> move L
            sprite.anims.play('run', true);
            sprite.flipX=true;               // mirror flip right running frames
            }
        else if (cursors.right.isDown) {
            sprite.setVelocityX(velocity);   // positive horizontal velocity -> move R
            sprite.anims.play('run', true);
            sprite.flipX=false; 
            }
        else {
            sprite.setVelocityX(0);          // 0 horizontal velocity -> still
            sprite.anims.play('wait');
            }
        // for jumping:
        if (cursors.up.isDown && sprite.body.onFloor()) {
            sprite.anims.play('jump', true);
            sprite.setVelocityY(-650);       // negative vertical velocity -> move up 
            }
    }
    
    destroy() {
        this.sprite.destroy();
    }

}