const BTN_START = document.getElementById('btnEmpezar');
const BTN_LIGHTBLUE = document.getElementById('celeste');
const BTN_VIOLET = document.getElementById('violeta');
const BTN_ORANGE = document.getElementById('naranja');
const BTN_GREEN = document.getElementById('verde');
const LAST_LEVEL = 10;

class Game {
    constructor() {
        this.init = this.init.bind(this)
        this.init()
        this.generateSequence()
        setTimeout(this.nextLevel, 500)
    }

    init() {
        this.toggleBTN_START()
        this.level = 1
        this.nextLevel = this.nextLevel.bind(this);
        this.colors = { //Secuencia de números generadas
            lightblue: BTN_LIGHTBLUE,
            violet: BTN_VIOLET,
            orange: BTN_ORANGE,
            green: BTN_GREEN
        }
        this.chooseColor = this.chooseColor.bind(this)
    }

    toggleBTN_START() {
        if (BTN_START.classList.contains('hide')) {
            BTN_START.classList.remove('hide')
        } else {
            BTN_START.classList.add('hide')
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.subLevel = 0
        this.illuminateSequence()
        this.addEventClicks()
    }

    numberToColor(num) {
        switch(num) {
            case 0:
                return 'lightblue';
            case 1:
                return 'violet';
            case 2:
                return 'orange';
            case 3:
                return 'green';
        }
    }
    
    colorToNumber(color) {
        switch(color) {
            case 'lightblue':
                return 0;
            case 'violet':
                return 1;
            case 'orange':
                return 2;
            case 'green':
                return 3;
        }
    }

    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.numberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
        
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => this.colorOff(color), 350)
    }

    colorOff(color) {
        this.colors[color].classList.remove('light');
    }

    addEventClicks() {
        this.colors.lightblue.addEventListener('click', this.chooseColor) //Cada uno de los colocores posee el evento y click y qué hace el navegador cuando se le indica
        this.colors.violet.addEventListener('click', this.chooseColor)
        this.colors.orange.addEventListener('click', this.chooseColor)
        this.colors.green.addEventListener('click', this.chooseColor)
    }

    removeClickEvents() {
        this.colors.lightblue.removeEventListener('click', this.chooseColor)
        this.colors.violet.removeEventListener('click', this.chooseColor)
        this.colors.orange.removeEventListener('click', this.chooseColor)
        this.colors.green.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.colorToNumber(colorName)
        this.illuminateColor(colorName)
        if (colorNumber === this.sequence[this.subLevel]) {
            this.subLevel++
            if (this.subLevel === this.level) {
                this.level++
                this.removeClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.wonGame()
                } else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            this.lostGame()
        }
    }

    wonGame() {
        swal('Práctico', 'Ganaste!', 'success')
            .then(this.init)
    }

   lostGame() {
    swal('Práctico', 'Lo lamentamos, perdiste :(', 'error')
    .then(() =>{
        this.removeClickEvents();
        this.init();
        })
   }

}

function startGame() {
    window.game = new Game();
}
