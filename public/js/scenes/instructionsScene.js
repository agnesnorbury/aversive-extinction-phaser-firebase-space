// scene to inform participants of task instructions. routes to first task stage scene (context A)

// import js game element modules (sprites, ui, outcome animations)
import InstructionsPanel from "../elements/instructionsPanel.js";

// import our custom events centre for passsing info between scenes and data saving function
import eventsCenter from "../eventsCenter.js";
import { saveStartData } from "../saveData.js";

// initialize global start time var
var startTime;

// this function extends Phaser.Scene and includes the core logic for the scene
export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'InstructionsScene',
            autoStart: true
        });
    }

    preload() {
        // space background
        this.load.image('background','./assets/imgs/space.jpg')
    }
    
    create() {
        // load space pic as background
        var bg = this.add.sprite(0, 0, 'background')
                         .setOrigin(0,0);

        // initialise game vars
        var gameHeight = this.sys.game.config.height;
        var gameWidth = this.sys.game.config.width;
        startTime = Math.round(this.time.now); 
        
        // instr vars
        var titleText = 'Welcome to the game!'

        ///////////////////PAGE ONE////////////////////
        var mainTxt = ("You are stranded on a spaceship, and need to reach your escape\n" +
                      "pod with enough space coins to power your journey back to Earth.\n\n" +

                      "On your way, you will encounter [color=#d0f4f7]different kinds of robot[/color], who\n" +
                      "you will need to [color=#d0f4f7]help you transport your coins[/color].\n\n" +

                      "Unfortunately, [color=#d0f4f7]some of the robots are faulty[/color], meaning there is\n" +
                      "a chance they will drop and lose some of your precious coins!\n\n" +

                      "As you travel through different parts of the ship,\n" +
                      "[color=#d0f4f7]your job is to predict how likely you think\n" +
                      "each robot is to lose some of your coins.[/color]\n\n" +

                      "You can move about the ship [b]using the arrow keys[/b] on your keyboard.\n\n" +
                      "Move [b]right[/b] to explore the ship!\n\n");
        var buttonTxt = "start game!";
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
        saveStartData(startTime);           
        this.scene.start('PlatformerSceneA');
    } 
}