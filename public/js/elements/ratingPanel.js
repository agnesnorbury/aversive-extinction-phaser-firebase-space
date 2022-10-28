// import our custom events centre for passsing info between scenes
import eventsCenter from '../eventsCenter.js'

// initialize colour vars
var backgrCol; var titleCol; var buttonCol; var sliderCol;

// make popup dialog box with instructions and number bar for ratings
export default class RatingPanel {
    constructor(scene, x, y, trialType, context) {
    this.scene = scene;
        
    var titleTxt; var mainTxt; var buttonTxt;
        
    if ( trialType == 4 || trialType == 5 ) {   // for catch trials
        titleTxt = 'Quick test!';
        mainTxt = ' If you are paying attention to this message, \n'+
                  'set the slider all the way to the right!\n\n'+
                  'Press the button to enter your answer.';
        buttonTxt = 'enter answer';
        backgrCol = 0xbab3a2;
        titleCol = 0x878274;
        buttonCol = 0x6a4f4b;
        sliderCol = 0x875b87;
    }
    else {                                  // for all other trials
        titleTxt = 'Make prediction!';
        mainTxt = '  Click and drag the slider below to predict  \n'+
                  '  how likely you think it is that this robot  \n'+
                  'will lose your coins!\n\n'+
                  'Press the button to enter your answer.';
        buttonTxt= 'enter prediction';
        backgrCol = 0xf57f17;
        titleCol = 0xbc5100;
        buttonCol = 0x6a4f4b;
        sliderCol = 0xFFD700;
    }

    var mainPanel = createMainPanel(scene, titleTxt, mainTxt, buttonTxt, context)
        .setPosition(x,y)
        .layout()
        //.drawBounds(scene.add.graphics(), 0xff0000) //for debugging only
        //.setScrollFactor(0);   //fix on screen [problematic with scrolling world] 
        .popUp(500); 
    }
    
}

////////////////////functions for making in-scene graphics//////////////////////////
///////////main panel////////////
var createMainPanel = function (scene, titleTxt, mainTxt, buttonTxt, context) {
    // create global registry var to pass rating output between scenes
    scene.registry.set('rating', []);
    // create components
    var dialog = createDialog(scene, titleTxt, mainTxt, buttonTxt);
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
            // only allow answer to be entered once ppt has interacted with slider
            dialog
                .once('button.click', function (button, groupName, index) {
                    let rating = Math.round(slider.getValue(0, 100));   // get final slider value
                    scene.registry.set('rating', rating);               // set final value as global var
                    dialog.scaleDownDestroy(100);                       // destroy ratings panel components
                    slider.scaleDownDestroy(100);                       // destroy ratings panel components
                    console.log('ratingComplete'+context)
                    eventsCenter.emit('ratingComplete'+context);        // emit completion event
                }, this)
                .on('button.over', function (button, groupName, index) {
                    button.getElement('background').setStrokeStyle(2, 0xffffff); // when hover
                })
                .on('button.out', function (button, groupName, index) {
                    button.getElement('background').setStrokeStyle();
                });
        });
    
    return mainPanel;
};

///////////popup dialog box//////
var createDialog = function (scene, titleTxt, mainTxt, buttonTxt) {
    var textbox = scene.rexUI.add.dialog({
    background: scene.rexUI.add.roundRectangle(0, 0, 400, 400, 20, backgrCol),
    
    title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, titleCol),
        text: scene.add.text(0, 0, titleTxt, {
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
        content: 20,
        action: 20,
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

/////////button labels////////////////////////////
var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 40, 20, buttonCol),
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

////////number bar//////////////////////////////////
var createNumberBar = function (scene) {
    var numberBar = scene.rexUI.add.numberBar({ 
        width: 520,                 // fixed width
        orientation: 'horizontal',

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, backgrCol),
        //icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, sliderCol),
        text: scene.rexUI.add.BBCodeText(0, 0, 'lose\ncoins', {halign: 'center'}),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x7b8185),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, sliderCol),
            input: 'click',
        },

//        text: scene.rexUI.add.BBCodeText(0, 0, '', {
//            fontSize: '20px', fixedWidth: 50, fixedHeight: 45,
//            valign: 'center', halign: 'center'
//        }),       
        icon: scene.rexUI.add.BBCodeText(0, 0, 'keep\ncoins', {halign: 'center'}),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10,
            slider: 10,
        },

        valuechangeCallback: function (value, oldValue, numberBar) {
            //numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));
            return value;
        },
        
    })
    .setValue(50, 0, 100)
    .layout();
    
    return numberBar;
};