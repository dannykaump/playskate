//GAME OF SKATE//
const btn = document.getElementById('btn')
const result = document.getElementById('result')
const moves = document.getElementById('moves')
const input = document.getElementById('input')
const image = document.querySelector('.image')

//Skater Constructor//
class MakeSkater {
    constructor(name, stance, skill) {
        this.name = name || 'You'
        this.stance = stance || 'regular'
        this.skill = skill || 0.33
        this.setting = true
        this.str = ''
        this.landed
        //attempt trick -- returns boolean
        this.landTrick = (difficulty) => Math.random() < 0.33 + this.skill - difficulty;

        // clear values & DOM
        this.reset = function () {
            this.str = ''
            this.setting = false
            moves.innerHTML = ''
            image.classList.add('hidden')
        }
        // both skaters land trick 
        this.rad = function (trick) {
            moves.innerHTML += `${this.name} landed <strong>${trick}</strong>: ${randomElem(coolWords)}! both skaters landed!` + '<br>'
        }
        // this skater fails to set
        this.failed = function (trick, opponent) {
            moves.innerHTML += `${this.name} failed to land <strong>${trick}</strong>, switching places.` + '<br>'
            this.setting = false
            opponent.setting = true
        }
        // this skater fails rebuttal
        this.oof = function (trick, setter) {
            this.str += skate[this.str.length]
            moves.innerHTML += `${setter.name} landed <strong>${trick}</strong>: ${randomElem(uncoolWords)}. ${this.name} recieved <strong>${this.str}</strong>.` + '<br>'
        }
        // determine sucess of trick attempt
        this.judge = function (opponent, difficulty) {
            this.landed = this.landTrick(difficulty)
            opponent.landed = opponent.landTrick(difficulty)
        }
        // check win conditions & run approriate function
        this.checkWin = function (trick, opponent) {
            // both landed -- who was setting?
            if (this.landed && opponent.landed) {
                if (this.setting) {
                    this.rad(trick)
                }   else {
                    opponent.rad(trick)
                }
            // player failed -- switch turns or get letter
            }   else if (!this.landed && opponent.landed) {
                if (this.setting) {
                    this.failed(trick, opponent)
                }   else {
                    this.oof(trick, opponent)
                }
            // opponent failed -- switch turns or give letter
            }   else if (this.landed && !opponent.landed) {
                if (opponent.setting) {
                    opponent.failed(trick, this)
                }   else {
                    opponent.oof(trick, this)
                }
            }
        }
    }
}
//skaters -- name, stance, style, skill(between 0 - 0.5) -- //
let koston = new MakeSkater('Eric Koston', 'regular', 0.35)
let nyjah = new MakeSkater('Nyjah Huston', 'goofy', 0.35)
let gravette = new MakeSkater('David Gravette', 'regular', 0.32)
let tony = new MakeSkater('Tony Hawk', 'goofy', 0.31)
let curren = new MakeSkater('Curren Caples', 'goofy', 0.34)
let mullen = new MakeSkater('Rodney Mullen', 'regular', 0.35)
let reynolds = new MakeSkater('Andrew Reynolds', 'regular', 0.33)
let fletcher = new MakeSkater('Greyson Fletcher', 'goofy', 0.31)
let pRod = new MakeSkater('P-Rod', 'regular', 0.35)
let foy = new MakeSkater('Jamie Foy', 'regular', 0.33)

// array of skater objects 
const skaters = [koston, nyjah, gravette, tony, curren, mullen, reynolds, fletcher, pRod, foy]

// flatground tricks

// key values of trick:difficulty
const tricks = {
    'kickflip':0.01, 'heelflip':0.02, 'nollie flip':0.07, 'nollie heelflip':0.9, 
    'shove-it':0.01, 'FS shove-it':0.02, '360 shove-it':0.1, '360 flip':0.12, 
    'inward heelflip':0.1, 'hardflip':0.1, 'varial kickflip':0.1, 'full-cab':0.13,  
    'BS 360':0.15, 'frontside flip':0.12, 'backside flip':0.12, 'half-cab':0.4, 'half-cab kickflip':0.1,
    'FS 360':0.18, 'nollie big-flip':0.19, 'big-flip':0.14, 'BS 180':0.04, 'fakie frontside flip':0.13,
    'nollie late-heelflip':0.13, 'nollie shove-it':0.07,'nollie BS 180':0.08,'varial heelflip':0.11, 'impossible':0.14
}
//rad words
const coolWords = ['Rad', 'Nice', 'Sick', 'Dope', 'Yew', 'Woah']
//bad words
const uncoolWords = ['Oof', 'Weak', 'Whack', 'Ouch', 'Dang', 'Bummer']
//letters
const skate = ['S', 'K', 'A', 'T', 'E'];

//generate random num under x
const randomNumUnder = (x) => Math.round(Math.random() * (x - 1))

//pull random elem from array
const randomElem = (arr) => arr[randomNumUnder(arr.length)];

//return random skater from array if arg is undefined
const randomIfUndefined = (arg) => !arg ? randomElem(skaters) : arg;

btn.addEventListener('click', playSkate)
//play skate -- fist to "skate" loses
function playSkate(skater1, skater2) {
    skater1 = new MakeSkater(input.value)
    skater2 = randomIfUndefined(skater2)
    skater2.reset()
    // while neither skater has "SKATE"
    while (skater1.str.length < 5 && skater2.str.length < 5) {
        // select trick 
        let trick = randomElem(Object.keys(tricks)) 
        // determine trick success 
        skater1.judge(skater2, tricks[trick])
        // Check win conditions & call appropriate function -- update values & DOM
        skater1.checkWin(trick, skater2)
    }
    //game over
    result.innerHTML = `${skater1.name}: <strong>${skater1.str}</strong> | ${skater2.name}: <strong>${skater2.str}</strong>`;
    return `${skater1.name}: ${skater1.str} | ${skater2.name}: ${skater2.str}`;
}

