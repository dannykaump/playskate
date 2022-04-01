//SKATE//
const btn = document.getElementById('btn')
const result = document.getElementById('result')
let moves = document.getElementById('moves')

//Skater Constructor//
function MakeSkater(name, stance, skill) {
    this.name = name || 'you'
    this.stance = stance || 'regular';
    this.skill = skill || 0.2
    this.landTrick = _ => Math.random() < 0.45 + this.skill ? 'stomped!' : "failed!"; // chance of landing increased by skill rating
    this.doTrick = _ => console.log(`${randomElem(tricks)} ${this.landTrick()}`)
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

//play skate -- fist to "skate" loses
function playSkate(skater1, skater2) {
    
    skater1 = new MakeSkater()
    skater2 = randomIfUndefined(skater2)

    let skate = ['s', 'k', 'a', 't', 'e'];
    let total1 = 0;
    let total2 = 0;
    let str1 = '';
    let str2 = '';
    let setting = false // determines turn of skater

    // while neither skater has "skate"
    while (total1 < 5 && total2 < 5) {
        let trick = randomElem(tricks) // select trick
        let landed1 = skater1.landTrick()
        let landed2 = skater2.landTrick()
        // if both skaters land trick //
        if (landed1 === 'stomped!' && landed2 === 'stomped!') {
            console.log(`${trick}: ${randomElem(coolWords)}! both skaters landed!`)
            moves.innerHTML = `${trick}: ${randomElem(coolWords)}! both skaters landed!`
        // if skater 1 lands trick //
        }   else if (landed1 === 'stomped!' && landed2 === 'failed!') {
                str2 += skate[total2]
                console.log(`${trick}: ${randomElem(uncoolWords)}. ${skater2.name} recieved ${str2}.`)
                moves.innerHTML = `${trick}: ${randomElem(uncoolWords)}. ${skater2.name} recieved ${str2}.`
                total2++
        // if skater 1 fails, skater 2's turn to set        
            }   else {
                    console.log(`${skater1.name} failed to land ${trick}, switching places.`)
                    moves.innerHTML = `${skater1.name} failed to land ${trick}, switching places.`
                    setting = true
        // inverse while skater 2 is setting trick
                    while (setting && total1 < 5) {
                        trick = randomElem(tricks)
                        landed1 = skater1.landTrick()
                        landed2 = skater2.landTrick()
                        if (skater2.landTrick() === 'stomped!' && skater1.landTrick() === 'stomped!') {
                            console.log(`${trick}: ${randomElem(coolWords)}! both skaters landed!`)
                            moves.innerHTML = `${trick}: ${randomElem(coolWords)}! both skaters landed!`;
                        }   else if (skater2.landTrick() === 'stomped!' && skater1.landTrick() === 'failed!') {
                                str1 += skate[total1]
                                console.log(`${trick}: ${randomElem(uncoolWords)}. ${skater1.name} recieved ${str1}.`)
                                moves.innerHTML = `${trick}: ${randomElem(uncoolWords)}. ${skater1.name} recieved ${str1}.`
                                total1++
                            }   else {
                                    console.log(`${skater2.name} failed to land ${trick}, switching places.`)
                                    moves.innerHTML = `${skater2.name} failed to land ${trick}, switching places.`
                                    setting = false
                                }                       
                    }
                }
        
    }//game over
    result.innerHTML = `${skater1.name}: ${str1} | ${skater2.name}: ${str2}`;
    return `${skater1.name}: ${str1} | ${skater2.name}: ${str2}`;
}

//play x random games
function playXTimes(x) {
    for (i = 0; i < x; i++) {
        playSkate()
    }
}



