let level = 1;
let currPattern = [];
let userPattern = [];
var elements = Array.from(document.getElementsByTagName('button'));
elements.splice(0, 1);

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const myElement = document.getElementById("start");

myElement.addEventListener('click', () => {
    tileClicks();
    currPattern = shuffle(elements);
    blink();
});

function tileClicks() {
    var tiles = Array.from(document.getElementsByTagName('button'));
    tiles.splice(0, 1);
    for (var i=0, len = tiles.length; i< len; i++) {
        tiles[i].addEventListener("click", function() {
            console.log(this);
            if (!checkClicks(this)) {
                alert("Game over! \nScore: "+(level-1));
                window.location.reload();
                return;
            }
        })
    }
}

function checkClicks(id) {
    if (userPattern.includes(id)) {
        userPattern = userPattern.filter(function (value) {
            return value != id;
        });
        console.log(userPattern);
        checkGameOver();
        return true;
    }
    return false;
}

function checkGameOver() {
    if (userPattern.length === 0) {
        level = level + 1;
        blink();
        return;
    }
    if (level === 16) {
        alert("You won!");
        window.location.reload();
    }
    return;
}

async function blink() {
    for (var i = 0; i < level; i++) {
        var selection = currPattern[i];
        console.log("HI " + level + "  " + selection);
        selection.classList.add("blinkup");
        selection.classList.remove("blinkdown");
        await sleep(1000);
        selection.classList.remove("blinkup");
        selection.classList.add("blinkdown");
        userPattern.push(selection);
    }
    console.log(userPattern);
}