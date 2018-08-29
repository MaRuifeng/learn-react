# Learning React - _tic-tac-toe_

This is the react.js web app showcasing a simple tic-tac-toe board game from the official tutorial of [react documentation](https://reactjs.org/tutorial/tutorial.html). It's being listed here as a record of my react learning journey and also to address the further enhancement questions listed in the [wrapping-up](https://reactjs.org/tutorial/tutorial.html#wrapping-up) section.

* Display the location for each move in the format (col, row) in the move history list - found by taking quotient and remainder by 3 from the index of the square array
* Bold the currently selected item in the move list - supported by conditionally applying a CSS class `selected-move` that is determined by a new `selectedMove` state attribute of the `Game` component
* Rewrite the `Board` component to use two loops to make the squares instead of hardcoding them - implemented with a 2-D array of `Square` component
* Add a toggle button that lets you sort the moves in either ascending or descending order - implemented with an additional state attribute `ascending` added to the `Game` component
* When someone wins, highlight the three squares that caused the win - implemented with a `winningCells` array defined in the `Game` component, which further determines whether a square is a winning cell when rendering it
* When no one wins, display a message about the result being a draw - implemented by checking whether `winner` is null and current step is the last move

## Local environment setup pre-requisites

Follow instructions on the official documentation site to make sure `Node.js` is properly installed.

## Run the app

Run `npm start` in the project directory and the app will be available at port 3000 on localhost.

## Available scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Author
Ruifeng Ma <mrfflyer@gmail.com> <ruifeng.ma@thoughtworks.com>
