// import task-version relevant info and functions
import { allowDevices } from "./versionInfo.js";

// import js modules that hold the game/experiment scenes
import InstructionsScene from "./scenes/instructionsScene.js";
import PlatformerSceneA from "./scenes/platformerSceneA.js";
import NextStageScene1 from "./scenes/nextStageScene1.js";
import MidTaskQuestions from "./scenes/midTaskQuestions.js";
import NextStageScene2 from "./scenes/nextStageScene2.js";
import PlatformerSceneB from "./scenes/platformerSceneB.js";
import TaskEndScene from "./scenes/taskEndScene.js";
import PostTaskQuestions from "./scenes/postTaskQuestions.js";
import TheEnd from "./scenes/theEnd.js";

// create the phaser game, based on the following config
const config = {
    type: Phaser.AUTO,           //how will this be rendered? webGL if available, otherwise canvas
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',       //add light-weight physics to world
        arcade: {
            gravity: { y: 500 }, //need some gravity for a side-scrolling platformer
            debug: false         //turn on to help debug game physics
        }
    },
    parent: 'game-container',    //ID of the DOM element to add the canvas to
    dom: {
        createContainer: true    //to allow text input DOM element
    },
    backgroundColor: "#222222",
    scene: [InstructionsScene, 
            PlatformerSceneA, 
            NextStageScene1,
            MidTaskQuestions,
            NextStageScene2,
            PlatformerSceneB, 
            TaskEndScene,
            PostTaskQuestions,
            TheEnd
            ], 
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: rexuiplugin, //load the UI plugins here for all scenes
            mapping: 'rexUI'
        }]
    }
};

// wrap game creation in a function so that it isn't created until consent completed
export function runTask() {
    // create new phaser game configured as above
    var game = new Phaser.Game(config);  

    // if desired, allow game window to resize to fit available space 
    function resizeApp () {
        // Width-height-ratio of game resolution
        let game_ratio = 800 / 600;
        
        // Make div full height of browser and keep the ratio of game resolution
        let div = document.getElementById('game-container');
        div.style.width  = (window.innerHeight * game_ratio) + 'px';
        div.style.height = window.innerHeight + 'px';
        
        // Check if device DPI messes up the width-height-ratio
        let canvas  = document.getElementsByTagName('canvas')[0];
        let dpi_w   = parseInt(div.style.width) / canvas.width;
        let dpi_h   = parseInt(div.style.height) / canvas.height;       
        let height  = window.innerHeight * (dpi_w / dpi_h);
        let width   = height * game_ratio;
        
        // Scale canvas 
        canvas.style.width  = width + 'px';
        canvas.style.height = height + 'px';
    };
    window.addEventListener('resize', resizeApp);
};

// if desired, block access to game on phones/tablets
if ( allowDevices == false ) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
       alert("Sorry, this game does not work on mobile devices!");
    }
}

