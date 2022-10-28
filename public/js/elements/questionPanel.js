// import our custom events centre for passsing info between scenes
import eventsCenter from '../eventsCenter.js'

// make popup dialog box with instructions and number bar for ratings
export default class QuestionPanel {
    constructor(scene, x, y, gamePhase, questionNo, mainTxt) {
    this.scene = scene;
    
    var buttonTxt = 'enter answer';    

    var mainPanel = createMainPanel(scene, gamePhase, questionNo, mainTxt, buttonTxt)
        .setPosition(x,y)
        .layout()
        //.drawBounds(scene.add.graphics(), 0xff0000)   // for debugging only
        .popUp(500); 
    }
    
}

////////////////////functions for making in-scene graphics//////////////////////////
///////////main panel////////////
var createMainPanel = function (scene, gamePhase, questionNo, mainTxt, buttonTxt) {
    // create global registry var to pass rating output between scenes
    scene.registry.set(gamePhase+'question'+questionNo, []);
    // create components
    var dialog = createDialog(scene, gamePhase, questionNo, mainTxt, buttonTxt);
    var slider = createNumberBar(scene);
    var mainPanel = scene.rexUI.add.fixWidthSizer({
        orientation: 'x'    // vertical stacking
        }).add(
            dialog,         // child
            0,              // proportion
            'center',       // align
            0,              // paddingConfig
            false,          // expand
        )
        .add(
            slider,         // child
            0,              // proportion
            'center',       // align
            0,              // paddingConfig
            true,           // expand
        )
    .layout();
    
   slider
        .on('valuechange', function () {
            dialog
                .once('button.click', function (button, groupName, index) {
                    let answer = Math.round(slider.getValue(0, 100));                // get final slider value
                    scene.registry.set(gamePhase+'question'+questionNo, answer);
                    dialog.scaleDownDestroy(100);                                    // destroy ratings panel components
                    slider.scaleDownDestroy(100);                                    // destroy ratings panel components
                    eventsCenter.emit(gamePhase+'question'+questionNo+'complete');   // emit completion event
                }, this)
                .on('button.over', function (button, groupName, index) {
                    button.getElement('background').setStrokeStyle(2, 0xffffff);     // when hover
                })
                .on('button.out', function (button, groupName, index) {
                    button.getElement('background').setStrokeStyle();
                });
       });
    
    return mainPanel;
};

////////popup dialog box/////////
var createDialog = function (scene, gamePhase, questionNo, mainTxt, buttonTxt) {
    var textbox = scene.rexUI.add.dialog({
    background: scene.rexUI.add.roundRectangle(0, 0, 400, 400, 20, 0x2F4F4F),
    
    title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x000000),
        text: scene.add.text(0, 0, 'Question '+questionNo, {
            fontSize: '24px'
            }),
        align: 'center',
        space: {
            left: 15,
            right: 15,
            top: 10,
            bottom: 10
        }
    }),

    content: scene.add.text(0, 0, mainTxt, {
        fontSize: '18px',
        align: 'center'
    }),

    actions: [
        createLabel(scene, buttonTxt)
    ],

    space: {
        title: 25,
        content: 40,
        action: 40,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
    },
        
    align: {
        actions: 'center',
    },

    expand: {
        content: false, 
    }
    })
    .layout();
    
    return textbox;
};

///////////////button labels/////////////////////
var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 40, 20, 0x000000),
        text: scene.add.text(0, 0, text, {
            fontSize: '20px'
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

/////////////number bar//////////////////////////
var createNumberBar = function (scene) {
    var numberBar = scene.rexUI.add.numberBar({ 
        width: 520,                 // fixed width
        orientation: 'horizontal',

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x2F4F4F),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xa752ba),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x7b8185),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xa752ba),
            input: 'click',
        },

        text: scene.rexUI.add.BBCodeText(0, 0, '', {
            fontSize: '20px', fixedWidth: 50, fixedHeight: 45,
            valign: 'center', halign: 'center'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10,
            slider: 10,
        },

        valuechangeCallback: function (value, oldValue, numberBar) {
            numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));
            return value;
        },
        
    })
    .setValue(50, 0, 100)
    .layout();
    
    return numberBar;
};