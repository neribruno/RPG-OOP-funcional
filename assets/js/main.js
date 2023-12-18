const char = createKnight('Bruno');
const monster = createLittleMonster();

console.log(monster.life);


stage.start(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
)