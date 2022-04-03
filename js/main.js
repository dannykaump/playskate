//GAME OF SKATE//
const btn = document.getElementById('btn')
const result = document.getElementById('result')
const moves = document.getElementById('moves')
const input = document.getElementById('input')
const image = document.querySelector('.image')

//skaters -- name, stance, style, skill(between 0 - 0.5) -- //
let koston = new MakeSkater('Eric Koston', 'regular', 0.35)
let nyjah = new MakeSkater('Nyjah Huston', 'goofy', 0.35)
let gravette = new MakeSkater('David Gravette', 'regular', 0.32)
let tony = new MakeSkater('Tony Hawk', 'goofy', 0.31)
let curren = new MakeSkater('Curren Caples', 'goofy', 0.34)
let mullen = new MakeSkater('Rodney Mullen', 'regular', 0.35)
let reynolds = new MakeSkater('Andrew Reynolds', 'regular', 0.33)

// array of skaters 
const skaters = [koston, nyjah, gravette, tony, curren, mullen, reynolds]

// array of tricks
const tricks = [
    'kickflip', 'heelflip', 'nollie flip', 'nollie heelflip', 
    'shove-it', 'FS shove-it', '360 shove-it', '360 flip', 
    'inward heelflip', 'hardflip', 'varial kickflip', 'full-cab',  
    'BS 360', 'frontside flip', 'backside flip', 'half-cab', 'half-cab kickflip',
    'FS 360', 'nollie big-flip', 'big-flip', 'BS 180', 'fakie frontside flip',
    'nollie late-heelflip', 'nollie shove-it', 'frontside flip', 'nollie BS 180',
    'varial hardflip', 'varial heelflip', 'impossible'
]
//rad words
const coolWords = ['Rad', 'Nice', 'Sick', 'Dope', 'Rad',]
//bad words
const uncoolWords = ['Oof', 'Weak', 'Whack', 'Ouch', 'Dang']
//letters array
const skate = ['s', 'k', 'a', 't', 'e'];

//generate random num under x
const randomNumUnder = (x) => Math.round(Math.random() * (x - 1))

//pull random elem from array
const randomElem = (arr) => arr[randomNumUnder(arr.length)];

//return random skater from array if arg is undefined
const randomIfUndefined = (arg) => !arg ? randomElem(skaters) : arg;

btn.addEventListener('click', playSkate)

//Skater Constructor//
function MakeSkater(name, stance, skill) {
    this.name = name || 'you'
    this.stance = stance || 'regular';
    this.skill = skill || 0.3
    this.setting = true
    this.str = ''
    this.total = 0

    //attempt trick -- returns boolean//
    this.landTrick = _ => Math.random() < 0.4 + this.skill; // chance of landing increased by skill rating  

    // reset total and str
    this.reset = function() {
        this.total = 0
        this.str = ''
        this.setting = false
        moves.innerHTML = ''
        image.classList.add('hidden')
    }
    // both skaters land trick //
    this.rad = function (trick) {
        console.log(`${trick}: ${randomElem(coolWords)}! both skaters landed!`)
        moves.innerHTML += `${this.name} landed <strong>${trick}</strong>: ${randomElem(coolWords)}! both skaters landed!` + '<br>'
    }
    // this skater fails set
    this.failed = function(trick, newSetter) {
        console.log(`${this.name} failed to land ${trick}, switching places.`)
        moves.innerHTML += `${this.name} failed to land <strong>${trick}</strong>, switching places.` + '<br>'
        this.setting = false
        newSetter.setting = true
    }
    // this skater fails rebuttal
    this.oof = function(trick, setter) {
        this.str += skate[this.total]
        console.log(`${trick}: ${randomElem(uncoolWords)}. ${this.name} recieved ${this.str}.`)
        moves.innerHTML += `${setter.name} landed <strong>${trick}</strong>: ${randomElem(uncoolWords)}. ${this.name} recieved <strong>${this.str}</strong>.` + '<br>'
        this.total++
    }
}
//play skate -- fist to "skate" loses
function playSkate(skater1, skater2) {
    skater1 = new MakeSkater(input.value)
    skater2 = randomIfUndefined(skater2) 
    skater2.reset()
    // while neither skater has "skate"
    while (skater1.total < 5 && skater2.total < 5) {
        // select trick 
        let trick = randomElem(tricks) 
        // determine success 
        let landed1 = skater1.landTrick();
        let landed2 = skater2.landTrick();
        // if both skaters land trick 
        if (landed1 && landed2) {
            if (skater1.setting) {
                skater1.rad(trick)
            }   else {
                    skater2.rad(trick)
            }
        // if skater 1 fails to set, skater 2's turn to set      
        }   else if (skater1.setting && !landed1) {
                skater1.failed(trick, skater2)
        // if skater 1 lands trick & is setting 
        }   else if (skater1.setting && landed1 && !landed2) {
                skater2.oof(trick, skater1)
        // if skater 2 lands trick & is setting 
        }   else if (skater2.setting && !landed2) {
                skater2.failed(trick, skater1)
        }   else {
                skater1.oof(trick, skater2)
            }   
    }//game over
    result.innerHTML = `${skater1.name}: <strong>${skater1.str}</strong> | ${skater2.name}: <strong>${skater2.str}</strong>`;
    return `${skater1.name}: ${skater1.str} | ${skater2.name}: ${skater2.str}`;
}

//play x random games
function playXTimes(x) {
    for (i = 0; i < x; i++) {
        playSkate()
    }
}



