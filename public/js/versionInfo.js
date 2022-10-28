// set up variables describing this specific task version

// task version
var version = "av-ext-1";			    		// experiment version (used to create data collection in firestore)
var infoSheet = "../assets/participant-information-sheet-220311_amendment_accepted_220518.pdf";  
var briefStudyDescr = "For this particular study, we will ask you play two games, and also "+
					  "to answer some questions about your feelings, mood, and personal circumstances.";

// are we debugging, or running for real?
var debugging = true;							// !!set to "false" for real exp!!

// time and payment info for this task version
var approxTime = 20;   			 				// approx time to complete this version of the experiment (minutes)
var hourlyRate = 7.5;							// 7.50 hourly rate (GBP)
var baseEarn = ((approxTime/60)*hourlyRate);   
var approxTimeTask = 14;                        // approx time to complete each task    
let allowDevices = false;                		// allow participants to access this task on mobile devices?

export { version, infoSheet, briefStudyDescr, debugging, approxTime, hourlyRate, baseEarn, approxTimeTask, allowDevices };