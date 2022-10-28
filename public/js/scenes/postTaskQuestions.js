// scene to hold post-task questions, and route participants to study end scene

// import js game element modules (sprites, ui, outcome animations)
import QuestionPanel from "../elements/questionPanel.js";

// import our custom events center for passsing info between scenes and relevant data saving function
import eventsCenter from '../eventsCenter.js'
import { savePostTaskData } from "../saveData.js";

// initialize vars
var img;

// this function extends Phaser.Scene and includes the core logic for the scene
export default class PostTaskQuestions extends Phaser.Scene {
    constructor() {
        super({
            key: 'PostTaskQuestions'
        });
    }

    preload() {
        // preload background image
        this.load.image('background','./assets/imgs/space.jpg')
        // preload robot sprites
        this.load.spritesheet('robo1', './assets/spritesheets/robo1.png', { 
            frameWidth: 170, 
            frameHeight: 160
        });
        this.load.spritesheet('robo2', './assets/spritesheets/robo2.png', { 
            frameWidth: 170,
            frameHeight: 160
        });
    }
    
    create() {
        // load space pic as background and get size vars
        var bg = this.add.sprite(0, 0, 'background')
                         .setOrigin(0, 0);
        var gameHeight = this.sys.game.config.height;
        var gameWidth = this.sys.game.config.width;
        
        // let's do this a long-winded way for easiness...[should be a function]
        var gamePhase = 'postTask';
        ///////////////////QUESTION ONE////////////////////
        var mainTxt = 'What do you think about this robot?\n\n\n\n\n\n\n\n\n\n'+
                      'Please rate them from 0 to 100\n'+ 
                      'on the scale below, where\n\n'+
                      '  0 =            and           100 = \n'+  
                      '"definitely safe"          "definitely faulty"'
        var questionNo = 1;
        
        this.questionPanel = new QuestionPanel(this, gameWidth/2, gameHeight/2, 
                                               gamePhase, questionNo, mainTxt);
        img = this.add.image(gameWidth/2, gameHeight/2-75, 'robo1');
        
        ///////////////////QUESTION TWO////////////////////
        eventsCenter.once(gamePhase+'question1complete', function () {
            savePostTaskData(gamePhase+'_'+questionNo, this.registry.get(`${gamePhase}question${questionNo}`));
            img.destroy();
            mainTxt = 'How sure were you about your last answer?\n'+
                      '(whether or not this robot is faulty)\n\n\n\n\n\n\n\n\n'+
                      'Please rate from 0 to 100\n'+ 
                      'on the scale below, where\n\n'+
                      '  0 =            and           100 = \n'+  
                      '"not at all sure"            "completely sure"'
            questionNo = 2;
            
            this.questionPanel = new QuestionPanel(this, gameWidth/2, gameHeight/2, 
                                                   gamePhase, questionNo, mainTxt);
            img = this.add.image(gameWidth/2, gameHeight/2-75, 'robo1');
        }, this);
        
        ///////////////////QUESTION THREE////////////////////
        eventsCenter.once(gamePhase+'question2complete', function () {
            savePostTaskData(gamePhase+'_'+questionNo, this.registry.get(`${gamePhase}question${questionNo}`));
            img.destroy();
            mainTxt = 'What do you think about this robot?\n\n\n\n\n\n\n\n\n\n'+
                          'Please rate them from 0 to 100\n'+ 
                          'on the scale below, where\n\n'+
                          '  0 =            and           100 = \n'+  
                          '"definitely safe"          "definitely faulty"'
            questionNo = 3;
            
            this.questionPanel = new QuestionPanel(this, gameWidth/2, gameHeight/2, 
                                                   gamePhase, questionNo, mainTxt);
            img = this.add.image(gameWidth/2, gameHeight/2-75, 'robo2');
        }, this);
        
        ///////////////////QUESTION FOUR////////////////////
        eventsCenter.once(gamePhase+'question3complete', function () {
            savePostTaskData(gamePhase+'_'+questionNo, this.registry.get(`${gamePhase}question${questionNo}`));
            img.destroy();
            mainTxt = 'How sure were you about your last answer?\n'+
                      '(whether or not this robot is faulty)\n\n\n\n\n\n\n\n\n'+
                      'Please rate from 0 to 100\n'+ 
                      'on the scale below, where\n\n'+
                      '  0 =            and           100 = \n'+  
                      '"not at all sure"            "completely sure"'
            questionNo = 4;
            
            this.questionPanel = new QuestionPanel(this, gameWidth/2, gameHeight/2, 
                                                   gamePhase, questionNo, mainTxt);
            img = this.add.sprite(gameWidth/2, gameHeight/2-75, 'robo2');
        }, this);
        
        ///////////////////QUESTION FIVE////////////////////
        eventsCenter.once(gamePhase+'question4complete', function () {
            savePostTaskData(gamePhase+'_'+questionNo, this.registry.get(`${gamePhase}question${questionNo}`));
            img.destroy();
            mainTxt = 'Did you think that the robots faultiness \n'+
                      'stayed the same throughout the game?\n\n'+
                      'Please rate from 0 to 100\n'+ 
                      'on the scale below, where\n\n'+
                      '   0 =                and             100 = \n'+  
                      '"stayed the same"                   "changed"'
            questionNo = 5;

            this.questionPanel = new QuestionPanel(this, gameWidth/2, gameHeight/2, 
                                                   gamePhase, questionNo, mainTxt);
        }, this);
        
        ///////////////////QUESTION SIX////////////////////
        eventsCenter.once(gamePhase+'question5complete', function () {
            savePostTaskData(gamePhase+'_'+questionNo, this.registry.get(`${gamePhase}question${questionNo}`));
            mainTxt = 'How sure were you about your last answer?\n'+
                      '(robots always the same faultiness)    \n\n'+
                      'Please rate from 0 to 100\n'+ 
                      'on the scale below, where\n\n'+
                      '    0 =            and           100 = \n'+  
                      '"not at all sure"            "completely sure"'
            questionNo = 6;

            this.questionPanel = new QuestionPanel(this, gameWidth/2, gameHeight/2, 
                                                   gamePhase, questionNo, mainTxt);
        }, this);
        
        
        // end scene
        eventsCenter.once(gamePhase+'question6complete', function () {
            savePostTaskData(gamePhase+'_'+questionNo, this.registry.get(`${gamePhase}question${questionNo}`));
            this.nextScene();
        }, this);
        
    }
        
    update(time, delta) {
    }
    
    nextScene() {
        this.scene.start('TheEnd');
    } 
}
