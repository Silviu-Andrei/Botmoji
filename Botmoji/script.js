// Focus the text area
$("#You").focus();

//This is our array with the emojis and the voice attributes(voice, volume, rate, pitch) 
var emojs = [ 
	// excitement - 😆 😍 😝
	[["😆", "😍", "😝"], 1, 0.9, 1.5, 1.6],
	// disappointment – 🙄 😒
	[["🙄", "😒"], 1, 0.85, 0.3, 0.4],
	// sad - 😞 😔 ☹ 🙁 😖 😫 😭 😩 😢 😓 😕
	[["😔", "😞", "🙁", "😟", "😖", "😫", "😭", "😩", "😥", "😓", "😕"], 1, 0.60, 0.5, 0.9],
	// deadpan - 😶 😐
	[["😐"], 1, 0.78, 0.5, 0.1],
	// sincere - 🤐
	[["🤐"], 1, 0.85, 1.3, 1.8],
	// sarcasm - 🙃
	[["🙃"], 1, 0.5, 0.5, 0.2],
	// happy - 😀 😂 😄 😃 😅 😉 😊 🙂 ☺ 😋 😗 😚 😜 😛 🤗
	[["😀", "😂", "😄", "😃", "😅", "😉", "😊", "🙂", "😋", "😙", "😚", "😜", "😛", "🤗"], 1, 0.81, 1.4, 1.6],
	// angry - 😠 😡 😤
	[["😤", "😡", "😠"], 1, 1, 0.7, 0.5]
];

// The second array is used to reset preset(s)
const emojs2 = [ 
	// excitement - 😆 😍 😝
	[["😆", "😍", "😝"], 1, 0.9, 1.5, 1.6],
	// disappointment – 🙄 😒
	[["🙄", "😒"], 1, 0.85, 0.3, 0.4],
	// sad - 😞 😔 ☹ 🙁 😖 😫 😭 😩 😢 😓 😕
	[["😔", "😞", "🙁", "😟", "😖", "😫", "😭", "😩", "😥", "😓", "😕"], 1, 0.60, 0.5, 0.9],
	// deadpan - 😶 😐
	[["😐"], 1, 0.78, 0.5, 0.1],
	// sincere - 🤐
	[["🤐"], 1, 0.85, 1.3, 1.8],
	// sarcasm - 🙃
	[["🙃"], 1, 0.5, 0.5, 0.2],
	// happy - 😀 😂 😄 😃 😅 😉 😊 🙂 ☺ 😋 😗 😚 😜 😛 🤗
	[["😀", "😂", "😄", "😃", "😅", "😉", "😊", "🙂", "😋", "😙", "😚", "😜", "😛", "🤗"], 1, 0.81, 1.4, 1.6],
	// angry - 😠 😡 😤
	[["😤", "😡", "😠"], 1, 1, 0.7, 0.5]
];

var pitch = document.querySelector('#pitch'), pitchValue = document.querySelector('.pitch-value');

var rate = document.querySelector('#rate'), rateValue = document.querySelector('.rate-value');

var volume = document.querySelector('#volume'), volumeValue = document.querySelector('.volume-value');

var voiceIndex = document.getElementById("mySelect"), emojIndex = document.getElementById("mySelectEmoj");

var inputTxt = document.querySelector('.txt');

// Reset emoji
function resetPreset() {
	var x = emojIndex.value;
	emojs[x] = emojs2[x];
	voiceIndex.value = emojs[x][1];
	volume.value = emojs[x][2];
	rate.value = emojs[x][3];
	pitch.value = emojs[x][4];
	volumeValue.textContent = emojs[x][2];
	rateValue.textContent = emojs[x][3];
	pitchValue.textContent = emojs[x][4];

	event.preventDefault();
	inputTxt.blur();
}

// Reset all emojis
function resetAllPresets() {
	emojs = emojs2;
	var x = emojIndex.value;
	emojs[x] = emojs2[x];
	voiceIndex.value = emojs[x][1];
	volume.value = emojs[x][2];
	rate.value = emojs[x][3];
	pitch.value = emojs[x][4];
	volumeValue.textContent = emojs[x][2];
	rateValue.textContent = emojs[x][3];
	pitchValue.textContent = emojs[x][4];
	
	event.preventDefault();
	inputTxt.blur();
}

// Select emojis from dropmenu and show their values on sliders's values
function mySelectEmojs() {
	var x = emojIndex.value; 
	//this is so that the value default is shown first
	voiceIndex.value = emojs[x][1];
	volume.value = emojs[x][2];
	rate.value = emojs[x][3];
	pitch.value = emojs[x][4];
	volumeValue.textContent = volume.value;	
	rateValue.textContent = rate.value;	
	pitchValue.textContent = pitch.value;
}	

// Apply changes button
function emojChanges() {
	var x = emojIndex.value; 
	emojs[x][2] = volume.value;
	emojs[x][4] = pitch.value;
	emojs[x][3] = rate.value;
	emojs[x][1] = voiceIndex.value;
	event.preventDefault();
	inputTxt.blur();
}

// This is our filter for swears
const regex = /penis|cock|dick|b i t c h|fucking|fuck|cocksucker|arse|ass|asshole|bastard|bitch|bollocks|brotherfucker|bullshit|child-fucker|child fucker|crap|cunt|fatherfucker|holy shit|horseshit|Jesus fuck|motherfucker|minge|nonce|nigga|nigger|niggas|piss|pussy|vagina|prick|shit|shit ass|shitass|sisterfucker|slut|son of a bitch|son of a whore|twat/gi;

// The play button
var play = document.getElementById("play");

// The reading function
var synth = window.speechSynthesis, voiceSelected; 
function speak(){
	// If the textarea is not empty
    if (inputTxt.value !== '') {
		// Filter for swears
		if (inputTxt.value.match(regex)) {
			alert("No expletives please! Try saying that some other way");
			inputTxt.value = inputTxt.value.replaceAll(regex, "*");
			event.preventDefault();
		}
		
		else {

			var utterThis = new SpeechSynthesisUtterance(inputTxt.value); 
			
			// Read with the values from sliders
			var voices = window.speechSynthesis.getVoices();
			voiceSelected = voiceIndex.value;
			utterThis.voice = voices[voiceSelected];
			utterThis.pitch = pitch.value;
			utterThis.rate = rate.value;
			utterThis.volume = volume.value;
			utterThis.lang = 'en-US';
			synth.speak(utterThis);
			
			// Disable the play button when it reads
			play.disabled = true;
				
			// When it has finished reading
			utterThis.onend = function (event) {
				console.log('SpeechSynthesisUtterance.onend');
				play.disabled = false;
			}
			
			// Prevent from default
			event.preventDefault();
			inputTxt.blur();
		}
	}
	
	// If the textarea is empty, do nothing
	else {
		event.preventDefault();
		inputTxt.blur();;
	}
}

// Update the values shown with the values from sliders when changing
pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

volume.onchange = function() {
  volumeValue.textContent = volume.value;
}

// Export values from this page to the chat pages
// Firstly, create an object that we are going to give our values. 
var values = {
	emoj: "",
};

// Secondly, when the user presses the button to go to the chat page, the object takes the selected values and passes them to the chat page in the browser's cookies 
function changes() {
	values.emoj = emojs;
	window.localStorage.setItem('numberLS', JSON.stringify(values));
}

$(window).on('load', function(){ 
// Take the values back from browser's cookies and use them so that when the user comes back from the chat page, still has the selected presets, not ours.
	var values = JSON.parse(window.localStorage.getItem('numberLS'));
	if (values !== null) {
	emojs = values.emoj;
	window.localStorage.removeItem('numberLS'); 
	}

// Set the sliders and their shown values to default.
	var emojsIndexValue = emojIndex.value;
	voiceIndex.value = emojs[emojsIndexValue][1];
	volume.value = emojs[emojsIndexValue][2];
	rate.value = emojs[emojsIndexValue][3];
	pitch.value = emojs[emojsIndexValue][4];
	volumeValue.textContent = emojs[emojsIndexValue][2];
	rateValue.textContent = emojs[emojsIndexValue][3];
	pitchValue.textContent = emojs[emojsIndexValue][4];
});




