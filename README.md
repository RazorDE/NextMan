# Next Man

## Description
A turn based pac man game using *React*, *Next.js*, *TypeScript* and *styled-jsx* (CSS-in-JS).
This project loads some images from the website: https://www.construct.net/en/tutorials/cloning-classics-pacman-171
and is just an exercise project for me to get familiar with *Next.js*.

## How to build
If you want to build this project you need to have *Node.js* installed.

Once *Node.js* is installed, perform the following steps:
1. Open the command line console inside the project directory (e.g. the terminal in Visual Studio Code).
2. Enter *npm install*.
3. Enter *npm run dev*.
4. Open your webbrowser and enter this URL: http://localhost:3000.

## Learnings from this project so far
1. Differences to classic React/Redux development
	* Instead of keeping your state inside a store it's easier and more natural to store it inside the query of the next-router when using *Next.js*.
	* Router-Links are used to update the state of the application.
	* For server side rendering only the constructor and the render-method of a React component are executed. All other methods can only be executed on the client having JavaScript being turned on.
	* With *Next.js* it's possible to create React apps that run on webbrowsers even if JavaScript is disabled. (In case of this project I only used CSS-animations and Links for the arrows, the keyboard events are optional.)

2. A CSS-Animation is played either once or repeatedly.
	* The movement animation is played once when the document is loaded (which works fine for each turn when JavaScript is disabled). When JavaScript is enabled the animation has to be replaced in the CSS by another one (which does exactly the same but having a different name) in order to be played again. (That's why the Actor- and Arrow-components have a animationTriggerId-state.)
	* Since the sprite animation runs infinitely while the movement happens only once I had to create two nested div-elements for the actors. The outer contains the movement animation while the inner contains the sprite animation.

3. *Emotion* (CSS-in-JS-library) versus *styled-jsx* (is used by default in Next.js)
	* When starting a project you should think about this quite early as for SSR only one of these libraries seems to be considered for rendering. (When using *Emotion*-CSS the *styled-jsx*-CSS was only rendered on the client)
	* You have to override the default Document-class that *Next.js* is using. Otherwise the CSS won't be rendered on the server side. Instead it would "pop up" when being rendered on the client.
	* An advantage of using *styled-jsx* is that you're writing you're CSS just like you would for a classic HTML/CSS project, having its scope being limited to the component instead of the whole document.
	* A disadvantage of *styled-jsx* I ran into was that the CSS is written into a single string (although it can include variables), it may not be interpreted correctly when you're are actually try to generate CSS-code instead of writing it manually (CSS animations didn't work for me that way).
	* An advantage of *Emotion* is that you can generate CSS-code instead of writing it manually.
	* A disadvantage of *Emotion* is that it may confuse web developers being used to the classic CSS style instead of using JavaScript-objects.
	* Another disadvantage of *Emotion* is that you may have to write more code than with *styled-jsx* (at least the way I'm doing it).
	* Summarized: I decided to rewrite the CSS using *styled-jsx* instead of *Emotion* since this seems to be more straightforward.
