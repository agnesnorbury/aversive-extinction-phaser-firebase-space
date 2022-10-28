// scene to inform participant they can now progress to the second (final) task stage. routes to second task scene (context B)

// import js game element modules (sprites, ui, outcome animations)
import InstructionsPanel from "../elements/instructionsPanel.js";

// import our custom events centre for passsing info between scenes and data saving function
import eventsCenter from "../eventsCenter.js";

// this function extends Phaser.Scene and includes the core logic for the scene
export default class NextStageScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NextStageScene2',
            autoStart: true
        });
    }

    preload() {
        this.load.image('background','./assets/imgs/space.jpg')
    }
    
    create() {
        // load space pic as background
        var bg = this.add.sprite(0, 0, 'background')
                         .setOrigin(0,0);

        // initialise game vars
        var gameHeight = this.sys.game.config.height;
        var gameWidth = this.sys.game.config.width;
        
        // instr vars
        var titleText = 'Thank you!'
        
        ///////////////////PAGE ONE////////////////////
        var mainTxt = ( "Press continue to move on to the final zone of the ship, \n" +
                      "which leads to the escape pod.\n\n");
        var buttonTxt = "continue";
        var pageNo = 1;
        this.instructionsPanel = new InstructionsPanel(this, 
                                                       gameWidth/2, gameHeight/2,
                                                       pageNo, titleText, mainTxt, buttonTxt);

        // end scene
        eventsCenter.once('page1complete', function () {
            this.nextScene();
            }, this);                 
    }
    
    update(time, delta) {
    }
    
    nextScene() {
        this.scene.start('PlatformerSceneB');
    } 
}