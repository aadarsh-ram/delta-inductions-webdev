let delayInMilliseconds = 100;
let playerScore = 0;
let playerTurn = 0;
let flag = 0;
let level=1;
let currPattern = [];
let userPattern = [];
var eleCurrPat = [];
var elements = Array.from(document.getElementsByTagName('button'));
elements.splice(0, 1);
shuffle(elements);

function blink(tile){
    tile.classList.add('blink');
}

function blinkEnd(tile){
    tile.classList.remove('blink');
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function tile4() {
    levelnew(1);
    elements.map( button => {
        button.addEventListener('click', (e) => {
            console.log("im here");
            userPattern.push(button.name)
        });
    });
}

function levelnew(level) {
    currPattern=[];
    userPattern=[];
    eleCurrPat=[];
    tileglow(level);
    m=setInterval(() => {
        console.log('userpat', userPattern)
        console.log('currpat', currPattern)
        if(userPattern.length>=1){
            if(userPattern.length==currPattern.length){
                userPattern.sort()
                currPattern.sort()
                if(JSON.stringify(currPattern)==JSON.stringify(userPattern)){
                    playerScore+=currPattern.length;
                    level+=1;
                    clearInterval(m)
                    levelnew(level);
                }
                else{
                    alert("Game Over");
                    clearInterval(m)
                    level=1
                }
            }
        }
    }, 1000);
}

function glow(level) {
  eleCurrPat = [];
  var temp = 0;
  while (temp < level) {
      eleCurrPat.push(elements[temp]);
      temp += 1;
  }
  console.log('elecurrpat', eleCurrPat);
  if (currPattern.length < temp) {
    for (var i=0, len = temp; i<len; i++) {
        blink(eleCurrPat[i]);
        console.log(eleCurrPat[i]);
        configTimeout(eleCurrPat[i]);
        currPattern.push(eleCurrPat[i].name);
        console.log('i pushed pa'); 
    }
  }
}

function configTimeout(tile) {
    setTimeout(function() {
        blinkEnd(tile);
    },1000);
}

function tileglow(i) {
    let a = setInterval(() => {
        glow(i);
    }, 1000);
    setTimeout(function(){
        clearInterval(a)
    },i*1000);
    return null;
}

const myElement = document.getElementById("start");
myElement.onclick = function() {tile4()};
