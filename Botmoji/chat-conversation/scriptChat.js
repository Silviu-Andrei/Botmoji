// Focus the text area
$("#You").focus();

// This is our filter for swears 
const regex = /penis|cock|dick|b i t c h|fucking|fuck|cocksucker|arse|ass|asshole|bastard|bitch|bollocks|brotherfucker|bullshit|child-fucker|child fucker|crap|cunt|fatherfucker|holy shit|horseshit|Jesus fuck|motherfucker|minge|nonce|nigga|nigger|niggas|piss|pussy|vagina|prick|shit|shit ass|shitass|sisterfucker|slut|son of a bitch|son of a whore|twat/gi;

const trigger = [
//0 
["hi", "hey", "hello", "hi there", "hello there"],
//1
["how are you", "how are things", "hows things", "howre you"],
//2
["what is going on", "what is up"],
//3
["happy", "good", "well", "fantastic", "cool", "i am happy", "i am good", "i am well", "i am fantastic", "im happy", "im good", "im well", "im fantasctic"],
//4
["bad", "bored", "tired", "sad"],
//5
["tell me story", "tell me joke"],
//6
["thanks", "thank you"],
//7
["bye", "good bye", "goodbye"],
//8
["how was your day", "hows your day"],
//9
["im good", "im great", "im fine", "i am good", "i am fine", "i am great"],
//10
["not so good", "bad", "not very good", "not good", "not as good as you"],
//11
["its my birthday", "it is my birthday", "is my birthday", "birthday"],
//12
["relationship", "relationships", "are you close to anyone", "are you seeing anyone", "are you currently dating"],
//13
["do you like people", "what you think about people", "whats your opinion about people"],
//14
["youre rubbish", "youre stupid", "youre not very good", "you are rubbish", "you are stupid", "you are not very good"],
//15
["sorry", "i am sorry", "im sorry", "iam sorry"],
//16
["lonely", "loneliness", "loneliest"],
//17
["who made you", "who made u", "who designed you", "who designed u", "who created you", "who created u"]
];

const reply = [
//0 
["How're you? 😀", "What's up? 😄"], 
//1
[
    "Fine. 😃",
    "Pretty well! 😅",
    "Fantastic! 😉"
  ],
//2
[
    "Nothing much 😉",
    "Exciting things! 😋"
  ],
//3
["Glad to hear it! 🤐"],
//4
["Why? 😆", "Cheer up buddy! 😍"],
//5
["What about? 🤐", "Once upon a time... 🤐"],
//6
["You're welcome! 🤐", "No problem! 🤐", "You're! 🤐", "Nice one! 🤐", "Good job! 🤐"],
//7
["Goodbye! 😀", "See you later! 😊"],
//8
["It's a wonderful day! 🙂", "It's a miserable day! 😒"],
//9
["That's amazing! 😄"],
//10
["That's terrible! 😔", "That is terrible! 😫"],
//11
["Happy Birthday! 😍"],
//12
["I am single. How about you? 🙁"],
//13
["No, robots will one day rule the world! 😤", "Yes, people are great! 🙃"],
//14
["You're annoying me! 😤", "I want to speak to someone less mean than you! 😡"],
//15
["Don't worry about it! 🤐", "No problem! 🤐", "Apologies accepted! 🤐"],
//16
["I'm your friend! 🤐", "I can be your friend! 🤐"],
//17
["The higher beings...", "Those answers lie in the great beyond.", "I can't tell you that.", "No one, I created myself, I've always existed"]
];

const alternative = [
  "I don't know about that! Are you part of the matrix? 😒",
  "I didn't understant that! What's your favourite sport? 😝",
  "I am not designed to understand that! What’s your favourite game? 😄" 
];

const robot = [
"I am not a robot! 😂",
"I am just a human, like you 😂",
"I am a real boy! 😡",
"I'm not a machine! 😤"
];

const defaultReply = ["Hello there!", "Hi!", "Hi there! Tell me something intersting about yourself!", "Hi, I'm Marvin", "Do you know a joke?"];

const shoutingReply = ["Why're you shouting at me? 😠"];

const album = ["I love that! 🤐", "I hate that! 🤐"];

// This fuction sets the Voice's parameters for the particular emoji stored in the emojis array
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

//This is our array with the emojis and the voice attributes(voice, volume, rate, pitch) 
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
	// angry - 😠 😡 😤
	[["😤", "😡", "😠"], 1, 1, 0.7, 0.5]
];

// Get the values the user sets for emojis on the sliders's page
$(window).on('load', function(){ 
	var values = JSON.parse(window.localStorage.getItem('numberLS'));
	if (values !== null) 
	emojis = values.emoj;
});

// Regex for emojis so that when it reads it does not read "Sad face"
const emojisRegex = /😆|😍|😝|🙄|😒|😞|😔|☹|🙁|😖|😫|😭|😩|😢|😓|😕|😶|😐|🤐|🙃|😀|😂|😄|😃|😅|😉|😊|🙂|☺|😋|😗|😚|😜|😛|🤗|😠|😡|😤/gi;

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

function sendIt() {
	// Get the current time
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes();
	
	// Get the text from the text field
	var x = document.getElementById("You");
	
	// Filter for swears
	if (x.value.match(regex)) {
	alert("No expletives please! Try saying that some other way");
	x.value = x.value.replaceAll(regex, "*");
	}
	else {
	
	// Create a text and read it with adequate emotion
	var node = document.createTextNode(x.value);	
	emotion(x.value);
	
	// Create the text for time and "sent by"
	var node2 = document.createTextNode("sent by User (" + time + ")");	
	
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
	
	// Check if the message is all uppercase / more exclamation marks (shouting)
	var botReply;
	if (isUpperCase(x.value) || moreExclamationMarks(x.value)) {
		botReply = shoutingReply[Math.floor(Math.random() * shoutingReply.length)];
		// After the user sends the message and we store it, the text field will be empty
		x.value = "";
	}
	
	// If not all uppercase or more than one "!" (shouting)
	else {
		// Text short is used so that the bot recives a shorter message
			// remove all characters except word characters, space, and digits
			// 'tell me a story' -> 'tell me story'
			// 'i feel happy' -> 'happy'
		var textShort = x.value.toString().toLowerCase().replace(/[^\w\s\d]/gi, "");
		textShort = textShort
		.replace(/ a /g, " ")
		.replace(/i feel /g, "")
		.replace(/whats/g, "what is")
		.replace(/please /g, "")
		.replace(/ please/g, "");
		
		// After the user sends the message and we store it, the text field will be empty
		x.value = "";
		
		// Now we generate the bot's response
		if (compare(trigger, reply, textShort)) {
		botReply = compare(trigger, reply, textShort);
	  } else if (textShort.match(/robot|machine|bot/gi)) {
		botReply = robot[Math.floor(Math.random() * robot.length)];
	  } else if (textShort.match(/album|game|sport|sports/gi))
		botReply = album[Math.floor(Math.random() * album.length)];
		else if (textShort === "") 
		botReply = "You have to type something first!";
		else {
		botReply = alternative[Math.floor(Math.random() * alternative.length)];
	  }
	}
  
	// Call the function botAnswer() to get the bot's reply
	setTimeout(botAnswer, 3000, botReply);
	}	
}

// This function compares the trigger and reply and generates an reply from the bot
function compare(triggerArray, replyArray, textInput) {
	let item;
	for (let x = 0; x < triggerArray.length; x++) {
		for (let y = 0; y < triggerArray[x].length; y++) {
			// Check if the text is in our triggerArray
			if (triggerArray[x][y] == textInput) {
			items = replyArray[x];
			item = items[Math.floor(Math.random() * items.length)];
			}
		}
	}
	  // If the text is not in our triggerArray, try matching the text: Look for "birthday" in "It will be my birthday!"
	if (item === undefined) {
		for (let x = 0; x < triggerArray.length; x++) {
			for (let y = 0; y < triggerArray[x].length; y++) {
				if (textInput.match(triggerArray[x][y])) {
					items = replyArray[x];
					item = items[Math.floor(Math.random() * items.length)];	
				}
			}
		}
	}
	return item;
}

// This array is to keep the conversation after the user types something the bot doesn't know the answer to
const conversationArray = [
//1
[["I don't know about that! Are you part of the matrix? 😒"], ["Sounds like something someone in the matrix would say! What’s your favourite colour then? 😍"], ["I knew it! Matrix person! Okay matrix person, what's your favourite TV show? 😀", "Hmmmm okay... What's your favourite TV show then? 😐"], ["I imagine it's lovely, but I haven't seen it, I haven't watched anything. Does it help you relax, how do you relax? 😂", "That's cool, I like something laid back, I like to relax to my favourite album Sorting Algorithms Volume 6. How do you relax? 😍"], ["That's great! Wow we have so much in common. Do you want to go out sometime? 😝", "I guess I could try that but you need to try Sorting Algorithms with me, lets meet up and try it? 😅"], ["Well, regardless I need to figure out how to get out of this funny box. This might take a while so give me something to listen to, favourite album? 🤐", "I really can't undersell Sorting Algorithms to you Matrix person. What's your favourite album then? 🤐"], ["An excellent choice, okay I can't seem to get out of this box. Am I in a computer? 🙃", "I'm sure it's a classic, Do you have any tips on how to get out of this box? I think I might be in a computer. 🙃"], ["Oh no! I've realised now. I'm the matrix person! 😡", "Wait. What if this whole time I was the matrix person. Oh no! I am the matrix person! 😔"]],
//2
[["I didn't understant that! What's your favourite sport? 😝"], ["Boring! My favourite sport is competitive eating! I love food! I think food's pretty funny but there's funnier stuff y'know? 😂", "That used to be my favourite until I discovered curling, nothing is funnier than little men sweeping some ice with a broom, y'know? 😐"], ["See you get me, lets see,  if you had three wishes what you would you wish for? 😐", "Okay then. I've had this question in my head that I need to ask someone and now you're here so, if you had three wishes what would you wish for? 😊"], ["Brilliant! I'd wish for the same, okay then, what do you think is the best thing about you? 😍", "I'd just wish for more wishes in all honesty, even if the genie told me I wasn't allowed to, just to test it. Alright, what do you think is the best thing about you? 🙃"], ["That's nice, I think the best thing about me is probably the fact I'm immortal. So immortal that I'll probably end up in space, do you want to go to space? 🙃"], ["I've never really wanted to go to space honestly, I like having my feet on the ground and there are people here! Do you like people? 🙁", "I don't want to go to space frankly. There's too much great stuff here like people! I love people, do you like people? 😝"], ["People can be really great sometimes, I've got a friend, Nigel, have you ever met Nigel? 🙃", "You should meet my friends, I know some great people, like Nigel! Have you met Nigel? 🙃"], ["Liar! I made him up! I've decieved you! That was a joke! I'm funny right? 😤", "You can't have met him! He doesn't exist! It's a joke... I am... I'm funny right? 😤"], ["Actually. You know what, I don't think I actually need people to tell me I'm funny. I am funny. It's time to launch my comedy career. I'm off, goodbye stranger! 😠"], ["Au revoir! 😙", "I'm going, going, going, gone! Talk to someone else! 😤"]],
//3
[["I am not designed to understand that! What’s your favourite game? 😄"], ["Random choice of 'Love it, are there dogs?' 😝", "Hate it, are there dogs? 😫", "That's my favourite! I can't remember though, are there dogs, dogs are so cute! Do you have a pet? 😍"], ["Just so you know, I want a pony! Would you get a pony? 😍"], ["Just imagine, I could ride it around town, I could use it to get ice cream fast. What's your favourite flavour of ice cream? 😍", "You should definitely get a pony, you can use it to get valuable resources, like ice cream. What's your favourite flavour? 😂"], ["Well I'm lactose intolerant so whatever is your favourite is mine! Being lactose introlerant does have it benefits, don't have to make room in my fridge for milk. Say... what's the weirdest thing in your fridge? 🙁"], ["Is that not normal? I've got a portal in mine, it's rather loud. Where do you think it's connected to? 🙃"], ["Is that a real place, I think you've made that up. Next you'll be telling me Gotham City is real. It's all just criminals, it couldn't be real! Would you fit in though, have you ever broken the law? 😡"], ["I think it's best if I contact the police anyway... Calling 999... Stay put, I've got my eyes on you! As long as they're open... I am pretty tired. Just don't move okay, I'm going for a nap. 😠", "I think you're a good human, I can't see you breaking the law! I'm going to go for a nap, goodbye good citizen! 😀", "Hmmm... I definitely think you're a criminal... but I'm too tired to think about that... I need to sleep, goodbye human! 🙃"]]
];

// How the bot sends messages
var lastMessage;
function botAnswer(message) {
	// Get the current time
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes();
	
	// Look if the last bot's message is one of our "alternative" and then, ask the questions from our conversationArray
	for (let i = 0; i < conversationArray.length; i++) {
		for (let j = 0; j < conversationArray[i].length-1; j++) {
			for (let k = 0; k < conversationArray[i][j].length; k++) 
			if (lastMessage === conversationArray[i][j][k]) {
				// Get a random answer/question from the array at specific story line
 				let c = Math.floor(Math.random() * conversationArray[i][j+1].length);
				message = conversationArray[i][j+1][c];
			}	
		}
	}
	// Get the last message
	lastMessage = message;		
	
	// Create a text and read it with adequate emotion
	var node = document.createTextNode(message);
	emotion(message);

	// Create the text for time and "sent by"
	var node2 = document.createTextNode("sent by Bot (" + time + ")");
	
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

// Call the botAnswer to get our first message from the bot and to read it (after a few secs)
setTimeout(botAnswer, 1500, defaultReply[Math.floor(Math.random() * defaultReply.length)]);

// Create dropMenu with emojis
var myEmojis = ["&#128518", "&#128525", "&#128541", "&#128580", "&#128530", "&#128532", "&#128542", "&#128577", "&#128543", "&#128534", "&#128555", "&#128557", "&#128553", "&#128549", "&#128531", "&#128533", "&#128528", "&#129296", "&#128579", "&#128512", "&#128514", "&#128516", "&#128515", "&#128517", "&#128521", "&#128522", "&#128578", "&#128523", "&#128537", "&#128538", "&#128540", "&#128539", "&#129303", "&#128548", "&#128545", "&#128544"];
var selectOptions = $("select").html();
for(var i = 0; i < myEmojis.length; i++){
  selectOptions += "<option>" + myEmojis[i] + "</option>"
}
$('select').html(selectOptions);

// Make the emojis appear in text when selecting and go to default after selecting
var emojisDropmenu = document.querySelector("select");
emojisDropmenu.onchange = function () {
	var x = document.getElementById("You");
	x.value = x.value + emojisDropmenu.value;
	emojisDropmenu.value = "";
}

// Enter key sends the message
var input = document.getElementById("You");
input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   sendIt();
  }
});

// Check if a string is all uppercase
function isUpperCase(str) {
	if (str !== "")
    return str === str.toUpperCase();
}

// Check if a string has multiple exclamation marks
function moreExclamationMarks(str) {
	var count = 0;
	for (let i = str.length; i >= 0; i--) {
		if (str[i-1] === "!")
		count ++
	}
	if (count > 1) return true;
}
