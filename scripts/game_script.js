	let dialogueIndex = 0;
	let cachedDialogue = [];
	let isTyping = false;
	let typingTimeouts = [];
   function meetVic() {

		fetch("intro.json")
			.then(response => response.json())
			.then(data => {
				cachedDialogue = data.introduction;
				introDialogue();
				
				window.addEventListener("keydown", advanceDialogue);
				window.addEventListener("click", advanceDialogue);					
			});
		

   }
   
	function introDialogue() {

		const currElement =
			document.getElementById("vic-dialogue");
		const p = document.createElement("p");
		if (currElement.lastChild) {
			currElement.lastChild.textContent = currElement.lastChild.textContent.substr(0,currElement.lastChild.textContent.length - 1);
			currElement.lastChild.style.color = "#808080"
		}
		currElement.appendChild(p);
		if (dialogueIndex < cachedDialogue.length) {

			const currentLine =
				cachedDialogue[dialogueIndex].text;

			typeOut(currentLine, 50, currElement.lastChild);

			dialogueIndex++;

		} else {

			window.removeEventListener("keydown", advanceDialogue);
			window.removeEventListener("click", advanceDialogue);

		}

	}

	function advanceDialogue() {
		
		if (isTyping) {
			skipTyping();
		} else {
			introDialogue();
		}

	}	

	function typeOut(textInput, period, outputArea) {
		// Created 11/06/2026
		// This function takes a string (textInput), then after waiting a number of milliseconds (period),
		// fills the variable currText with a substring of textInput from between indices 0 and charIndex.
		// The content of outputArea (which is an HTML element) is filled with currText.
		// The effect should be the illusion of typing out the contents of textInput, one character
		// at a time.

		isTyping = true;

		outputArea.textContent = "";

		typingTimeouts = [];

		for (let charIndex = 0;
			 charIndex < textInput.length;
			 charIndex++) {

			let timeoutID = setTimeout(() => {

				outputArea.innerHTML =
					textInput.substr(0, charIndex + 1) + '<span class="blink">_</span>';
				
				if (charIndex === textInput.length - 1) {
					isTyping = false;	
				}

			}, charIndex * period);

			typingTimeouts.push(timeoutID);
			
		}
	}

	function skipTyping() {

		typingTimeouts.forEach(clearTimeout);

		const currentLine =
			cachedDialogue[dialogueIndex - 1].text;

		document.getElementById("vic-dialogue").lastChild.textContent = currentLine;

		isTyping = false;

	}	
	function dialogueFinished() {
		console.log("Vic has finished talking now.");
	}
	
	function showSection(section_id) {
		document.getElementById(section_id).style.display = 'block';
	}
	
	function hideSection(section_id) {
		document.getElementById(section_id).style.display = 'none';
	}