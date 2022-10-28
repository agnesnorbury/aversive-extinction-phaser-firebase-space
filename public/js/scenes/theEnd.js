// end scene to thank participants for their time

// import js game element modules (sprites, ui, outcome animations)
import InstructionsPanel from "../elements/instructionsPanel.js";

// import our custom events centre for passsing info between scenes and data saving function
import eventsCenter from "../eventsCenter.js";
import { saveEndData } from "../saveData.js";

var endTime;
// this function extends Phaser.Scene and includes the core logic for the scene
export default class NextStageScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'TheEnd'
        });
    }

    preload() {
        this.load.image('background','./assets/imgs/space.jpg');
        this.load.image('rocket','./assets/imgs/rocket.png');
    }
    
    create() {
        // load space pic as background
        var bg = this.add.sprite(0, 0, 'background')
                          .setOrigin(0,0);

        // initialise game vars
        var gameHeight = this.sys.game.config.height;
        var gameWidth = this.sys.game.config.width;
        endTime = Math.round(this.time.now); 
        
        // instr vars
        var titleText = 'Thank you for your time'

        ///////////////////PAGE ONE////////////////////
        var mainTxt = ("You have now completed this part of the study.\n\n\n\n\n\n\n\n\n\n\n\n" +
                      "Please press the button below to finish up and submit your data.\n");
        var buttonTxt = "finish game";
        var pageNo = 1;
        this.instructionsPanel = new InstructionsPanel(this, 
                                                       gameWidth/2, gameHeight/2,
                                                       pageNo, titleText, mainTxt, buttonTxt);
        
        // add img
        var img = this.add.image(gameWidth/2, gameHeight/2, 'rocket');

        // end scene
        eventsCenter.once('page1complete', function () {
            this.nextScene();
        }, this);
    }
    
    update(time, delta) {
    }
    
    nextScene() {
        window.location = "https://app.prolific.co/submissions/complete?cc=7BD92407";
    } 
}

// generic function to create button labels
var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 40, 20, 0x778899),
        text: scene.add.text(0, 0, text, {
            fontSize: '20px',
            fill: "#000000"
        }),
        align: 'center',
        width: 40,
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
};