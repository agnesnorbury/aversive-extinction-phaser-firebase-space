// Creates, animates and moves a sprite in response to arrow keys. Call its update method from the scene's update and call its destroy method when you're done with the player.

export default class KeepCoin {
    constructor(scene, x, y, keepCoinOn) {
        this.scene = scene;

        scene.anims.create({
            key: 'coinspin',
            frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
            frameRate: 10,  // display 10 frames per second
            repeat: -1      // loop animation
        });

        this.sprite = scene.add.sprite(x, y, 'coin')
            .setScale(5)
            .setDepth(1000)
            //.setScrollFactor(0)
            .play('coinspin');
    }

    update(keepCoinOn) {
        const spinCoin = this.sprite;
        spinCoin.visible = false;   
        
        if (keepCoinOn == 1 ) {
            spinCoin.visible = true;          
            }
    }
    
    destroy() {
        this.sprite.destroy();
    }

}