// criando personagem padrão

const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}


//factory 

const createKnight = (name) => {
    return {
        defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 15,
        defense: 8
    }
}

const createMage = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 25,
        defense: 4
    }
}


const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Goblin',
        life: 70,
        maxLife: 70,
        attack: 7,
        defense: 4

    }
}

const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Gnoll',
        life: 120,
        maxLife: 120,
        attack: 15,
        defense: 6

    }
}

// cenário

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.fighter1El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

        this.update();
    },

    update() {
        //fighter 1
        this.fighter1El.querySelector('.char-name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`
        
        //fighter 2
        this.fighter2El.querySelector('.monster-name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    },

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <=0) {
            log.addMessage(`Jogo Encerrado`);
            return;
        }

        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2). toFixed(2);
        
        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        } else {
            log.addMessage(`${attacked.name} se Defendeu`);
        }


        this.update();
    }
}

const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    },
    render(){
        const logEL = document.querySelector('.log');
        logEL.innerHTML = '';

        for(let i in this.list) {
            logEL.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}