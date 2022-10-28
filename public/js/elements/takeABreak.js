// import our custom events centre for passsing info between scenes
import eventsCenter from "../eventsCenter.js";

// make popup dialog box with instructions and number bar for ratings
export default class BreakPanel {
    constructor(scene, x, y) {
    this.scene = scene;
        
    var titleTxtB = 'You can take a break!'; 
    var mainTxtB = 'If you like, take a break now.\n\n Press the continue button below \nwhen you\'re ready to go back to the game.'; 
    var buttonTxtB = 'continue';     
        
    var askBreakPanel = createBreakPanel(scene, titleTxtB, mainTxtB, buttonTxtB)
        .setPosition(x, y)
        .layout()
        //.drawBounds(scene.add.graphics(), 0xff0000) // for debugging only
        //.setScrollFactor(0);                        // fix on screen [problematic with scrolling world] 
        //.popUp(500)
        .once('button.click', function (button) {
            eventsCenter.emit('breakover');         // emit completion event
            askBreakPanel.scaleDownDestroy(100);    // destroy panel
        }, this)
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(2, 0xffffff); // when hover
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle();
        });
    }
}

///////////popup dialog box//////
var createBreakPanel = function (scene, titleTxtB, mainTxtB, buttonTxtB) {
    var textboxB = scene.rexUI.add.dialog({
    background: scene.rexUI.add.roundRectangle(0, 0, 400, 400, 20, 0x2e2d33),
    
    title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x79759c),
        text: scene.add.text(0, 0, titleTxtB, {
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

    content: scene.add.text(0, 0, mainTxtB, {
        fontSize: '18px',
        align: 'center'
    }),

    actions: [
        createLabelB(scene, buttonTxtB)
    ],

    space: {
        title: 40,
        content: 120,
        action: 80,
        left: 80,
        right: 80,
        top: 40,
        bottom: 40,
    },
        
    align: {
        actions: 'center',
    },

    expand: {
        content: false, 
    }
    })
    .layout();
    
    return textboxB;
};

/////////button labels////////////////////////////
var createLabelB = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 40, 20, 0x79759c),
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