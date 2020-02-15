var cardsArray = [
  {
    name: "Stars",
    img:
      "https://cdn1.iconfinder.com/data/icons/social-media-set/30/Metacafe-512.png"
  },
  {
    name: "Tong",
    img:
      "https://cdn4.iconfinder.com/data/icons/smileys-for-fun/128/smiley__10-512.png"
  },
  {
    name: "Glasess",
    img:
      " https://cdn4.iconfinder.com/data/icons/smileys-for-fun/128/smiley__12-512.png"
  },
  {
    name: "Phone Wings",
    img:
      " https://cdn4.iconfinder.com/data/icons/business-and-marketing-21/32/business_marketing_advertising_Responsive_Marketing-512.png"
  },
  {
    name: "Heart",
    img:
      "https://cdn4.iconfinder.com/data/icons/free-valentine-s-emoji/64/heart-emoji-emotion-funny-happy-smile-512.png"
  },
  {
    name: "Youtube",
    img:
      " https://cdn0.iconfinder.com/data/icons/social-rounded/72/Youtube-512.png"
  },
  {
    name: "WD",
    img:
      " https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/webdiscover-512.png"
  },
  {
    name: "t",
    img:
      " https://cdn0.iconfinder.com/data/icons/social-rounded/72/Tumblr-512.png"
  },
  {
    name: "Icecream",
    img:
      "https://cdn2.iconfinder.com/data/icons/sweet-icons/128/cream_funny.png "
  },
  {
    name: "Pumpkin",
    img:
      "https://cdn4.iconfinder.com/data/icons/desktop-halloween/256/Pumpkin.png "
  },
  {
    name: "Stars 2",
    img:
      "https://cdn1.iconfinder.com/data/icons/social-media-set-2/118/Metacafe-512.png "
  },
  {
    name: "Emoticon",
    img: "https://cdn4.iconfinder.com/data/icons/fat-face/100/Laugh-512.png "
  }
];

// Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function() {
  return 0.5 - Math.random();
})

// Grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
var grid = document.createElement('section');
// Give section element a class of grid.
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
  // create a div element and assign to variable card
  var card = document.createElement('div');
  // Apply a card class to that div
  card.classList.add('card');
  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = gameGrid[i].name;

  // Create front of card
  var front = document.createElement('div');
  front.classList.add('front');

  // Create back of card
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

  // Append card to grid
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';
// Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

// Add match CSS
var match = function() {
  var selected = document.querySelectorAll('.selected');
  // loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
};

// Reset guesses after two attempts
var resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
};


// Add event listener to grid
grid.addEventListener('click', function(event) {
  // Declare variable to target our clicked item
  var clicked = event.target;
  // Do not allow the grid section itself to be selected;
  // only select divs inside the grid
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  // We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++;

    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    // If both guesses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      // And the firstGuess matches secondGuess
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});