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

## game.js

- playGame(){}
- playerCollision(){}
- itemInteract(){}
- createOrder(){}
- fulfilOrder(){}
- drawCanvas(){}
- gameOver(){}

## player.js

- Player() {this.x, this.y, this.inventory}
- movement(){}
- showInventory(){}
- pickupItem(){}
- depositItem(){}

## order.js

- Order(){this.ingredients, this.scoreValue}
- drawCard(){}
- removeCard(){}

## ingredient.js
- Ingredient(){this.name, this.Image, this.spawnPoint[, this.cookingMethod]}
- drawIngredient(){}
[- cook(){}]

# States and States Transitions
- 




