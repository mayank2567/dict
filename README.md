#
# Command Line Dictionary Tool

Create a command line dictionary tool using wordnik (http://wordnik.com) api.

Check Wordnik API here -   [http://developer.wordnik.com/docs](http://developer.wordnik.com/docs)

**Requirements**

The command line tool should have following functions -

The output should be nicely formatted on console, and show all relevant information.

**1. Word Definitions**

 Display definitions of a word.

 ./dict def &lt;word&gt;

**2. Word Synonyms**

 Display synonyms of a word.

 ./dict syn &lt;word&gt;

**3. Word Antonyms**

 Display antonyms of a word

 ./dic ant &lt;word&gt;

**4. Word Examples**

 Display examples of a word

 ./dict ex &lt;word&gt;

**5. Word Full Dict**

 Display all above details for a word

 ./dict &lt;word&gt; or ./dict dict &lt;word&gt;

**6. Word of the Day Full Dict**

 Display all above details of word of the day

 ./dict

**7. Word Game**

 ./dict play

 The program should display a definition, synonym, or antonym

 And ask the user to enter the word

 If correct word is entered, program should tell that the word is correct

 \* Other(not displayed) Synonyms of the word should be accepted as correct answer.

 If incorrect word is entered, program should ask for

  - 1. try again

   Lets user enter word again

  - 2. hint

   Display a hint, and let user enter word again

   Hint can be

Display the word randomly jumbled (cat -&gt; atc)

OR Display another definition of the word

OR Display another antonym of the word

OR Display another synonym of the word

  -3 quit

   Display the word, its full dict, and quit

**Areas of Focus**

 - Code quality

 - Code reuse

 - Code structure

 - Use of high level language features

