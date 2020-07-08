var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

var textArray = [
  "What do you call an alligator wearing a vest?|An Investigator",
  "What do you call a fake noodle?|An Impasta",
  "Why shouldn't you write with a broken pencil?|Because it's pointless",
  "Why couldn't the pirate finish the alphabet?|He kept getting lost a C",
  "What's brown and sticky?|A stick",
  "What starts with an E, ends with an E and has one letter in it?|An Envelope",
  "What has four wheels, and flies?|A Garbage truck",
  "What do you call a pig that knows Karate?|Pork Chop",
  "Why did the scarecrow get promoted?|He was out standing in his field.",
  "I have a step ladder|I never knew my real ladder.",
  "What kind of shoes do ninjas wear?|Sneakers"
];

var speedForward = 100, 
    speedWait = 1000, 
    speedBetweenLines = 1000, 
    speedBackspace = 25; 

typeWriter("output", textArray);
function typeWriter(id, ar) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), 
      eParagraph = element.children("p"); 

  if (!isBackspacing) {
  
    if (i < aString.length) {
    
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
    
      } else {
   
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
   
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
    }
 
  } else {
 
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
  
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
  
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; 
      setTimeout(function(){ typeWriter(id, ar); }, 50);
    }
  }
}