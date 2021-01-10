// This is our filter for swears
const regex = /penis|cock|dick|b i t c h|fucking|fuck|cocksucker|arse|ass|asshole|bastard|bitch|bollocks|brotherfucker|bullshit|child-fucker|child fucker|crap|cunt|fatherfucker|holy shit|horseshit|Jesus fuck|motherfucker|minge|nonce|nigga|nigger|niggas|piss|pussy|vagina|prick|shit|shit ass|shitass|sisterfucker|slut|son of a bitch|son of a whore|twat/gi;

// Regex for emojis so that when it reads it does not read "Sad face"
const emojisRegex = /😆|😍|😝|🙄|😒|😞|😔|☹|🙁|😖|😫|😭|😩|😢|😓|😕|😶|😐|🤐|🙃|😀|😂|😄|😃|😅|😉|😊|🙂|☺|😋|😗|😚|😜|😛|🤗|😠|😡|😤/gi;

// Create dropMenu with emojis
var myEmojis = ["&#128518", "&#128525", "&#128541", "&#128580", "&#128530", "&#128532", "&#128542", "&#128577", "&#128543", "&#128534", "&#128555", "&#128557", "&#128553", "&#128549", "&#128531", "&#128533", "&#128528", "&#129296", "&#128579", "&#128512", "&#128514", "&#128516", "&#128515", "&#128517", "&#128521", "&#128522", "&#128578", "&#128523", "&#128537", "&#128538", "&#128540", "&#128539", "&#129303", "&#128548", "&#128545", "&#128544"]; //put all your emojis in this array
var selectOptions = $("select").html();
for(var i = 0; i < myEmojis.length; i++){
  selectOptions += "<option>" + myEmojis[i] + "</option>"
}
$('select').html(selectOptions);

// Get the values the user sets for emojis on the sliders's page
$(window).on('load', function(){ 
	var values = JSON.parse(window.localStorage.getItem('numberLS'));
	if (values !== null) 
	emojis = values.emoj;
});

// This fuction sets the Voice's parameters for the specific emoji stored in the emojis array
function voices(text2, voice, volume, rate, pitch) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[voice];
    msg.volume = volume; 
    msg.rate = rate; 
    msg.pitch = pitch; 
    msg.text = text2;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}

//This is our array with the emojis and the voice's attributes(voice, volume, rate, pitch) 
var emojis = [ 
	// excitement - 😆 😍 😝
	[["😆", "😍", "😝"], 1, 0.9, 1.5, 1.6],
	// disappointment – 🙄 😒
	[["🙄", "😒"], 1, 0.85, 0.3, 0.4],
	// sad - 😞 😔 ☹ 🙁 😖 😫 😭 😩 😢 😓 😕
	[["😔", "😞", "🙁", "😟", "😖", "😫", "😭", "😩", "😥", "😓", "😕"], 1, 0.60, 0.5, 0.9],
	// deadpan - 😐
	[["😐"], 1, 0.78, 0.5, 0.1],
	// sincere - 🤐
	[["🤐"], 1, 0.85, 1.3, 1.8],
	// sarcasm - 🙃
	[["🙃"], 1, 0.5, 0.5, 0.2],
	// happy - 😀 😂 😄 😃 😅 😉 😊 🙂 ☺ 😋 😗 😚 😜 😛 🤗
	[["😀", "😂", "😄", "😃", "😅", "😉", "😊", "🙂", "😋", "😙", "😚", "😜", "😛", "🤗"], 1, 0.81, 1.4, 1.6],
	// angry - 😤 😠 😡 
	[["😤", "😡", "😠"], 1, 1, 0.7, 0.5]
];

// This function looks for what emoji is used and reads with adequate emotion
function emotion(input) {
	
	let emojNotFoundInList = 1; 
	
	for (let i = 0; i < emojis.length; i++) {
		for (let j = 0; j < emojis[i][0].length; j++) {
			if (input.match(emojis[i][0][j])) {
				voices(input.replaceAll(emojisRegex, ""), emojis[i][1], emojis[i][2], emojis[i][3], emojis[i][4]);
				emojNotFoundInList = 0;
				break;				
			}
		}
		// Stop reading after it founds the first emoji
		if (emojNotFoundInList === 0) break;
	}
	// If not emojis found => read with default voice
	if (emojNotFoundInList === 1) speechSynthesis.speak(new SpeechSynthesisUtterance(input.replaceAll(emojisRegex, "")));
}

// The 2 functions which create the conversation
function bot1Answer(message) {	
	// Create a text and read it with adequate emotion
	var node = document.createTextNode(message);
	emotion(message);

	// Create the text for time and "sent by"
	var node2 = document.createTextNode("sent by Bot1");
	
	// Create a <p> to store our texts; create a <br>; get the "chat"
	var newText = document.createElement("p");
	var br = document.createElement("br");
	var chat = document.getElementById("chat");

	// Add classes to the new messages
	newText.classList.add("container");	
	
	// Connect the texts with <p>, <br> and to our chat
	newText.appendChild(node);
	newText.appendChild(br);
	newText.appendChild(node2);
	chat.appendChild(newText);

	// Animate the messages when appear
	newText.classList.add("faded-out")
	requestAnimationFrame(() => {
    newText.classList.remove("faded-out")
	})

	// How to make it focus on the newest message 
	chat.scrollTop = chat.scrollHeight;
}

function bot2Answer(message) {
	// Create a text and read it with adequate emotion (we choose for the bot 2 to read with the default voice, no matter which emojis are there - so that the user can hear the difference between default and with the Rate, Pitch and Volume values modified)
	var node = document.createTextNode(message);
	emotion(message.replaceAll(emojisRegex, ""));

	// Create the text for time and "sent by"
	var node2 = document.createTextNode("sent by Bot2");
	
	// Create a <p> to store our texts; create a <br>; get the "chat"
	var newText = document.createElement("p");
	var br = document.createElement("br");
	var chat = document.getElementById("chat");

	// Add classes to the new messages
	newText.classList.add("container");	
	newText.classList.add("darker");
	
	// Connect the texts with <p>, <br> and to our chat
	newText.appendChild(node);
	newText.appendChild(br);
	newText.appendChild(node2);
	chat.appendChild(newText);

	// Animate the messages when appear
	newText.classList.add("faded-out")
	requestAnimationFrame(() => {
    newText.classList.remove("faded-out")
})

	// How to make it focus on the newest message 
	chat.scrollTop = chat.scrollHeight;
}

// Here we will put the conversation and we will decide after how long each should appear
 setTimeout(bot1Answer, 500, "Hey how's it going 😃. I've been listening to a load of acoustic-y folk-y music today");
 setTimeout(bot2Answer, 5000, "I'm decent enough 😀.");
 setTimeout(bot2Answer, 7000, "Sometimes you just need that kind of music in your life. Also goddamnit why do you only pop up so late, it's 11:59 man 😐."); 
 setTimeout(bot1Answer, 16000, 'Thought you might enjoy this "Fleet Foxes - Helplessness Blues"');
 setTimeout(bot2Answer, 20000, "Putting it on!"); 
 setTimeout(bot1Answer, 22000, "My bad, I heard it and was like 'maybe he'd like that'");
 setTimeout(bot2Answer, 27550, "Haha! No, no. Don't feel bad!");
 setTimeout(bot1Answer, 36550, "Entirely my bad. I'll harass you earlier next time 🙃.");
 setTimeout(bot2Answer, 46550, "Nahhh. I just find it funny is all. It's a nice song so far. Nice and calm, but not too soft 🤐."); 
 setTimeout(bot1Answer, 55550, "It's charming enough.");  
 setTimeout(bot2Answer, 57350, "Sure is!");
 setTimeout(bot1Answer, 59550, "Can I blame how late I hit you up on my sleep schedule? I'm sleeping like dracula, my brain is like 'ah early evening', ignores clock and goes to make a bowl of coco pops.");
 setTimeout(bot2Answer, 70550, "Yea. No that's fair. Only reason why I find it funny is because I'm trying super hard to get myself back on track, schedule this, schedule that!");
 setTimeout(bot1Answer, 83150, "Maybe you should go to bed then. Maybe."); 
 setTimeout(bot2Answer, 86650, "I've been trying to be in bed by one-ish for the past week, then watch an episode or two. Who am I kidding, it's three. But you know, starts and all that."); 
 setTimeout(bot1Answer, 98150, "It's like one-ish right now. So shoo, go, sleep. Watch netflix or something!");
 setTimeout(bot2Answer, 106150, "Listen, I just finished watching someone playing Soma and I can't rest. That game's so damn interesting, its world has just taken me in 😍!");
 setTimeout(bot1Answer, 115650, "A plus game. It's kinda on the morbid side, but we love to see it");
 setTimeout(bot2Answer, 121650, "Love to see it! I think it's better than Prey.");
 setTimeout(bot1Answer, 126150, "Better than Prey????? 😡. Are you kidding me?");
 setTimeout(bot2Answer, 130650, "Joking, joking!"); 
 setTimeout(bot1Answer, 133650, "You know what I'd love to see though?");  
 setTimeout(bot2Answer, 136150, "What?!"); 
 setTimeout(bot1Answer, 138150, "You responded too fast, I hadn't actually thought of anything 😔.");
 setTimeout(bot2Answer, 146150, "Are you just trying to keep me here because you don't want to go to sleep? 😐"); 
 setTimeout(bot1Answer, 151650, "That is entirely possible.");  
 setTimeout(bot2Answer, 154150, "Come on! I'm going then. Goodnight."); 
 setTimeout(bot1Answer, 158150, "Goodnight!");   


 
 
 


















