# PhraseCounter (Web Page)
Java app that counts occurrences of phrases in a file.
Can filter output to phrases that occur at least a certain number of times or are at max a certain length.
Has basic Maven usage, including continuous integration with Github Actions.

v0.5.0 is a Spring Boot Rest API that takes a single file path as an argument. Prints out phrase count.
Currently deployed to Heroku at https://phrase-counter.herokuapp.com/. 

React frontend is deployed at: https://jasche7.github.io/PhraseCounter-React/.
This is its repo.

# Milestones
Current:
Can make requests to PhraseCounter API at Heroku and display the data from the response body in plain text format.
Barebones UI.

Todo:
Use React-Bootstrap to make nicer looking components.
Stress test Heroku environment to check limit on input.
Turn each Phrase into a clickable element that highlights each occurrence of the phrase in the display section.

## Project Screenshot(s)
Sample output:

<img width="1280" alt="Screen Shot 2021-04-12 at 5 11 54 PM" src="https://user-images.githubusercontent.com/25709225/114478074-53f54900-9bb2-11eb-85f4-86e11e666def.png">


## Usage
Go to https://jasche7.github.io/PhraseCounter-React/. Input your text. Optionally include the minimum number of occurrences and/or the maximum phrase length for a phrase to be displayed in the results.


## Reflection
This project was imagined as a tool for me to check text that I type for excessive repetition of certain phrases.

I prioritized learning good development practices, such as unit testing, clean code, and documentation. There is also the 
goal of familiarizing with essential software development tools such as build tools and continuous integration frameworks.
