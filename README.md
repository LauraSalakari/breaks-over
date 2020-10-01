# Break's Over!

## Description

Break's Over is a small but hectic game where your task is to fulfil as many snack order's as possible before the commercial break ends. Collect all the ingredients for the order and send it off to score points, but beware that mistakes will cost you points!

## MVP (DOM - CANVAS)

### CANVAS

- character can move around freely on canvas and collides with obstacles appropriately
- character can pick up, carry and deposit items
- interacting with the assigned spots brings up the correct ingredient and puts it into the player's inventory
- character can send off fulfilled orders
- correctly assembled orders add points, wrong orders subtract points
- order cards have randomised ingredients
- timer starts and ends the round

### DOM

- order cards are DOM elements

## Backlog

- whole screen looks like an old-fashioned TV, with buttons as menu buttons, screen as the kitchen area and side as orders or scoreboard
- increasing difficulty (less ingredients in easier orders and more on difficult ones)
- extra steps to fulfil orders (e.g corn gets microvawed to make popcorn)
- scoreboard
- sound
- ability to remove items already deposited
- receive pizza delivery for bonus points
- two-player mode

# Data Structure

## main.js

- buildSplashScene(){}
- buildGameScene(){}
- buildGameOverScene(){}
- UI event listeners

## game.js

- startGame(){}
- drawPlayer(){}
- spawnIngredients(){}
- createOrder(){}
- fulfilOrder(){}
- drawDropoff(){}
- drawCards(){}
- drawCanvas(){}
- updateCanvas(){}
- updateScore(){}
- setTimer(){}
- updateTimer(){}
- clearCanvas(){}
- updateScore(){}
- gameOver(){}
- playSound(){}
- gameplay event listeners

## player.js

- Player() {this.x, this.y, this.inventory}
- movement(){}
- itemInteract()

## order.js

- Order(){this.ingredients, this.scoreValue}
- draftIngredients(){}

## ingredient.js

- Ingredient(){this.name, this.Image, this.spawnPoint[, this.cookingMethod]}

## dropoff.js

- Dropoff(){this.x, this.y, this.content, this.imageY, this.imageX}
- clearDropoff(){}

# States and States Transitions

- splashScene
  - transition to: on first load, on main menu button click
- gameScene
  - transition to: on play
- gameOverScene
  - transition to: on time over, on give up

# Tasks

- general - art assets
- general - base HTML & CSS
- main - buildDOM
- main - buildSplashScene
- main - buildGameScene
- main - buildGameOverScene
- main - addEventListener
- game - startGame
- game - gameOver
- game - drawCanvas
- game - updateCanvas
- game - clearCanvas
- player - movement
- game - playerCollisions
- ingredient - drawIngredient
- game - itemInteract
- player - pickupItem
- player - showInventory
- player - depositItem
- game - createOrder
- order - drawCard
- game - fulfilOrder
- order - clearCard
- game - updateScore

# Links

## Trello

[Trello board!](https://trello.com/b/XfQw0ZQ0/breaks-over)

## Git

[Github Repository](https://github.com/LauraSalakari/breaks-over)

[Github Pages](https://laurasalakari.github.io/breaks-over/)

## Slides
