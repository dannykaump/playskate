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
        this.landTrick = _ => Math.random() < 0.4 + this.skill // chance of landing increased by skill rating  

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
        this.judge = function (opponent) {
            this.landed = this.landTrick()
            opponent.landed = opponent.landTrick()
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
const tricks = [
    'kickflip', 'heelflip', 'nollie-flip', 'nollie-heelflip', 
    'shove-it', 'FS shove-it', '360 shove-it', '360 flip',
    'inward-heelflip', 'hardflip', 'varial-kickflip', 'full-cab',  
    'BS 360', 'frontside-flip', 'backside-flip', 'half-cab', 'half-cab kickflip',
    'FS 360', 'nollie big-flip', 'big-flip', 'BS 180', 'fakie frontside flip',
    'nollie late-heelflip', 'nollie shove-it', 'frontside flip', 'nollie BS 180',
    '360 hardflip', 'varial-heelflip', 'impossible', 'big-spin',
]
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
    // create new skater & assign skater2
    skater1 = new MakeSkater(input.value)
    skater2 = randomIfUndefined(skater2)
    // clear values & DOM
    skater2.reset()
    // while neither skater has "SKATE"
    while (skater1.str.length < 5 && skater2.str.length < 5) {
        // select trick 
        let trick = randomElem(tricks) 
        // determine trick success 
        skater1.judge(skater2)
        // Check win conditions & call appropriate function -- update values & DOM
        skater1.checkWin(trick, skater2)
    }
    //game over
    result.innerHTML = `${skater1.name}: <strong>${skater1.str}</strong> | ${skater2.name}: <strong>${skater2.str}</strong>`;
    return `${skater1.name}: ${skater1.str} | ${skater2.name}: ${skater2.str}`;
}

