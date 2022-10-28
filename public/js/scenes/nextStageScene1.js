// scene to inform participant they have finished the first stage of the task. routes to mid-task questions scene

// import js game element modules (sprites, ui, outcome animations)
import InstructionsPanel from "../elements/instructionsPanel.js";

// import our custom events centre for passsing info between scenes and data saving function
import eventsCenter from "../eventsCenter.js";

// this function extends Phaser.Scene and includes the core logic for the scene
export default class NextStageScene1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NextStageScene1'
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
        var titleText = 'Well done!'
        
        ///////////////////PAGE ONE////////////////////
        var mainTxt = ("You made it to the loading bay!\n\n" +
                                   
                      "Before you move on to this next (and final) zone of\n" +
                      "the ship, please answer a few short questions.\n\n"+

                      "Press continue whenever you\'re ready.\n\n");
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
        this.scene.start('MidTaskQuestions');
    } 
}
