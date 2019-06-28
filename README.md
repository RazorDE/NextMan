# Next Man

## Description
A turn based pac man game using *React*, *Next.js*, *TypeScript* and *Emotion* (CSS-in-JS).

This is just an exercise project for me to get familiar with *Next.js*.

## How to build
If you want to build this project you need to download the tileset images from this tutorial
https://www.construct.net/en/tutorials/cloning-classics-pacman-171
and copy them into the "static/images" folder of the project.

You also gonna need to install Node.js.

Once you're all set, perform the following steps:
1. Open the command line console inside the project directory (e.g. the terminal in Visual Studio Code).
2. Enter *npm install*.
3. Enter *npm run dev*.
4. Open your webbrowser and enter this URL: http://localhost:3000.

## Learnings from this project so far
Some learnings I've gained from this exercise are:

1. Differences to classical React/Redux development
	* Instead of keeping your state inside a store it's easier and more natural to store it inside the query of the next-router when using *Next.js*.
	* Router-Links are used to update the state of the application.
	* For server side rendering only the constructor and the render-method of a React component are executed. All other methods can only be executed on the client having JavaScript being turned on.
	* With *Next.js* it's possible to create React apps that run on webbrowsers even if JavaScript is disabled. (In case of this project I only used CSS-animations and Links for the arrows, the keyboard events are optional.)

2. A CSS-Animation is played either once or repeatedly.
	* The movement animation is played once when the document is loaded (which works fine for each turn when JavaScript is disabled). When JavaScript is enabled the animation has to be replaced in the CSS by another one (which does exactly the same but having a different name) in order to be played again. (That's why the Actor- and Arrow-components have a animationTriggerId-state.)
	* Since the sprite animation runs infinitely while the movement happens only once I had to create two nested div-elements for the actors. The outer contains the movement animation while the inner contains the sprite animation.

3. *Emotion* (CSS-in-JS-library) versus *jsx-styled* (is used by default in Next.js)
	* When starting a project you should think about this quite early as for SSR only one of these libraries seems to be considered for rendering. (In my case the *Emotion*-CSS was rendered on the server and the jsx-styled was only available on the client)
	* You have to override the default Document-class that *Next.js* is using (see *pages/_document.js*). Otherwise the CSS won't be rendered on the server side. Instead it would "pop up" when being rendered on the client.
	* An advantage of using jsx-styled is that you're writing you're CSS just like you would for a classic HTML/CSS project, having its scope being limited to the component instead of the whole document.
	* A disadvantage of jsx-styled I ran into was that the CSS is written into a single string (although it can include variables), it may not be interpreted correctly when you're are actually try to generate CSS-code instead of writing it manually (CSS animations didn't work for me that way).
	* Another disadvantage is that the CSS can get quite large if you have a lot of sprites in the project (which is the case when you create a classic browser game like this one, but I think it's rather unusual for typical websites).
	* An advantage of Emotion is that you can generate CSS-code instead of writing it manually.
	* A disadvantage of Emotion is that it may confuse web developers being used to the classic CSS style instead of using JavaScript-objects.
	* Another disadvantage of Emotion is that you may have to write more code than with jsx-styled (at least the way I'm doing it).
	* Summarized: if I would start this project again I would probably be using jsx-styled instead of Emotion and use an external tool to create the CSS for the sprites.
