export const Config = {
  hero: {
    maxHealth: 100,
    hitDamage: 50,
    experienceToNextLevel: 150,
  },
  enemy: {
    maxHealth: 30,
    hitDamage: 15,
    experienceGiven: 50,
  },
  boss: {
    maxHealth: 130,
    hitDamage: 70,
    experienceGiven: 100,
  },
};

const HERO = "Hero";
const ENEMY = "Enemy";
const BOSS = "Boss";

let turn = 0;
let winner = "";

export default class GamePlay {
  static fillHealthIfLife(character) {
    if (character.health <= 0 && character.lifes > 0) {
      const newHealth = (character.maxHealth * 70) / 100;
      character.gainHealth(newHealth);
      character.loseLife();
    }
    this.checkIfCharacterHasLifesAndHealthOrDie(character);
  }

  static winner(attacker, receiver) {
    if (attacker.health <= 0 && receiver.constructor.name === HERO) {
      attacker.die();
      switch (attacker.constructor.name) {
        case ENEMY:
          receiver.gainExperience(Config.enemy.experienceGiven, attacker.level);
          break;
        case BOSS:
          receiver.gainLife();
          receiver.gainExperience(Config.boss.experienceGiven, attacker.level);
          break;
        case HERO:
          receiver.gainExperience(attacker.experience / 2);
          break;
      }
      receiver.experienceToNextLevel() <= receiver.experience
        ? receiver.levelUp()
        : null;
      winner = receiver.constructor.name;
    } else if (receiver.constructor.name === HERO && receiver.health <= 0) {
      this.fillHealthIfLife(receiver);
      winner = attacker.constructor.name;
    }

    if (receiver.health <= 0 && attacker.constructor.name === HERO) {
      receiver.die();
      switch (receiver.constructor.name) {
        case ENEMY:
          attacker.gainExperience(Config.enemy.experienceGiven, receiver.level);
          break;
        case BOSS:
          attacker.gainLife();
          attacker.gainExperience(Config.boss.experienceGiven, receiver.level);
          break;
        case HERO:
          attacker.gainExperience(receiver.experience / 2);
          break;
      }

      attacker.experienceToNextLevel() <= attacker.experience
        ? attacker.levelUp()
        : null;
      winner = attacker.constructor.name;
    } else if (attacker.constructor.name === HERO && attacker.health <= 0) {
      this.fillHealthIfLife(attacker);
      winner = receiver.constructor.name;
    }
  }

  static checkIfCharacterHasLifesAndHealthOrDie(character) {
    character.health <= 0 && character.lifes === 0 ? character.die() : null;
  }

  static fight(firstCharacter, secondCharacter) {
    const isFirstCharacterHero = firstCharacter.constructor.name === HERO;
    const isSecondCharacterHero = secondCharacter.constructor.name === HERO;

    const attacker = turn === 0 ? firstCharacter : secondCharacter;
    const receiver = turn === 0 ? secondCharacter : firstCharacter;

    this.checkIfCharacterHasLifesAndHealthOrDie(attacker);
    this.checkIfCharacterHasLifesAndHealthOrDie(receiver);

    while (attacker.health > 0 && receiver.health > 0) {
      if (isFirstCharacterHero || isSecondCharacterHero) {
        turn === 0 ? attacker.attack(receiver) : receiver.attack(attacker);
        turn = turn === 0 ? 1 : 0;
      }
      this.winner(attacker, receiver);
    }
  }
}
