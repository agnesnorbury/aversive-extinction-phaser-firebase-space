// task end scene to inform participants they have finished the task, and route them to the post-task questions

// import js game element modules (sprites, ui, outcome animations)
import InstructionsPanel from "../elements/instructionsPanel.js";

// import our custom events centre for passsing info between scenes and data saving function
import eventsCenter from "../eventsCenter.js";

// this function extends Phaser.Scene and includes the core logic for the scene
export default class TaskEndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TaskEndScene'
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
        var titleText = 'Congratulations!'
        
        ///////////////////PAGE ONE////////////////////
        var mainTxt = ("You managed to transport enough coins to get you back home!\n\n" +

                      "Thank you for playing.\n\n" +

                      "We will now ask you to answer a few short questions about \n" +
                      "the game.\n\n" +

                      "Press next to answer the questions and finish up the game.\n\n" );
        var buttonTxt = "next";
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
        this.scene.start('PostTaskQuestions');
    } 
}