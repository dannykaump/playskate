//SKATE//
const btn = document.getElementById('btn')
const result = document.getElementById('result')
let moves = document.getElementById('moves')

//Skater Constructor//
function MakeSkater(name, stance, skill) {

    this.name = name || 'you'
    this.stance = stance || 'regular';
    this.skill = skill || 0.3
    this.setting = true
    this.str = ''
    this.total = 0
    
    this.landTrick = _ => Math.random() < 0.45 + this.skill ? true : false; // chance of landing increased by skill rating

    this.doTrick = _ => console.log(`${randomElem(tricks)} ${this.landTrick()}`)
    
    // both skaters land trick //
    this.rad = function (trick) {
        console.log(`${trick}: ${randomElem(coolWords)}! both skaters landed!`)
        moves.innerHTML = `${trick}: ${randomElem(coolWords)}! both skaters landed!`
    }
    // this skater fails set
    this.failed = function(trick) {
        console.log(`${this.name} failed to land ${trick}, switching places.`)
        moves.innerHTML = `${this.name} failed to land ${trick}, switching places.`
        this.setting = false
    }
    // this skater fails rebuttal
    this.oof = function(trick) {
        this.str += skate[this.total]
        console.log(`${trick}: ${randomElem(uncoolWords)}. ${this.name} recieved ${this.str}.`)
        moves.innerHTML = `${trick}: ${randomElem(uncoolWords)}. ${this.name} recieved ${this.str}.`
        this.total++
    }
}

//skaters -- name, stance, style, skill(between 0 - 0.5) -- //
let koston = new MakeSkater('Eric Koston', 'regular', 0.35)
let nyjah = new MakeSkater('Nyjah Huston', 'goofy', 0.35)
let gravette = new MakeSkater('David Gravette', 'regular', 0.32)
let tony = new MakeSkater('Tony Hawk', 'goofy', 0.31)
let curren = new MakeSkater('Curren Caples', 'goofy', 0.34)
let mullen = new MakeSkater('Rodney Mullen', 'regular', 0.35)

// array of skaters 
let skaters = [koston, nyjah, gravette, tony, curren, mullen, new MakeSkater('Andrew Reynolds')]

// array of tricks
let tricks = [
    'kickflip', 'heelflip', 'nollie flip', 'nollie heelflip', 
    'shove-it', 'FS shove-it', '360 shove-it', '360 flip', 
    'inward heelflip', 'hardflip', 'varial kickflip', 'full-cab',  
    'BS 360', 'frontside flip', 'backside flip', 'half-cab', 'half-cab kickflip',
    'FS 360', 'nollie big-flip', 'big-flip', 'BS 180', 'fakie frontside flip',
    'nollie late-heelflip', 'nollie shove-it', 'frontside flip', 'nollie BS 180',
    'varial hardflip', 'varial heelflip', 'straight-up backflip'
]

//rad words
let coolWords = ['Rad', 'Nice', 'Sick', 'Dope', 'Rad',]
//bad words
let uncoolWords = ['Oof', 'Weak', 'Whack', 'Ouch', 'Dang']


//generate random num under x
const randomNumUnder = (x) => Math.round(Math.random() * (x - 1))

//pull random elem from array
const randomElem = (arr) => arr[randomNumUnder(arr.length)];

//return random skater from array if arg is undefined
const randomIfUndefined = (arg) => !arg ? randomElem(skaters) : arg;

btn.addEventListener('click', playSkate)

let skate = ['s', 'k', 'a', 't', 'e'];

let randomSkater = randomElem(skaters);
//play skate -- fist to "skate" loses
function playSkate(skater1, skater2) {
    skater1 = new MakeSkater()
    skater2 = randomIfUndefined(skater2)  
    // while neither skater has "skate"
    while (skater1.total < 5 && skater2.total < 5) {
        let trick = randomElem(tricks) // select trick
        // determine success
        let landed1 = skater1.landTrick();
        let landed2 = skater2.landTrick();
        // if both skaters land trick //
        if (landed1 && landed2) {
            skater1.rad(trick)
        // if skater 1 fails to set, skater 2's turn to set        
        }   else if (skater1.setting && !landed1) {
            skater1.failed(trick)
            skater2.setting = true
            // if skater 1 lands trick & is setting //
            }   else if (skater1.setting && landed1 && !landed2) {
                    skater2.oof(trick)
            // if skater 2 lands trick & is setting
                }   else if (skater2.setting && !landed2) {
                        skater2.failed(trick)
                        skater1.setting = true
                    }   else {
                            skater1.oof(trick)
                        }   
    }//game over
    result.innerHTML = `${skater1.name}: ${skater1.str} | ${skater2.name}: ${skater2.str}`;
    return `${skater1.name}: ${skater1.str} | ${skater2.name}: ${skater2.str}`;
}

//play x random games
function playXTimes(x) {
    for (i = 0; i < x; i++) {
        playSkate()
    }
}



