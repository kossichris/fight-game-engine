import Character from "./Character";
import { Config } from "./GamePlay";

export default class Hero extends Character {
  experience;
  lifes;

  constructor(level, experience = 0, lifes = 2) {
    super(level);
    this.experience = experience;
    this.lifes = lifes;
    this.maxHealth = this.level * Config.hero.maxHealth;
    this.hitDamage = this.level * Config.hero.hitDamage;
    this.health = this.maxHealth;
  }

  gainHealth(health) {
    this.health += health;
  }

  gainLife() {
    this.lifes++;
  }

  loseLife() {
    if (this.lifes > 0) {
      this.lifes--;
    }
  }

  gainExperience(experienceGiven, opponentLevel = 1) {
    if (experienceGiven > 0) {
      this.experience += experienceGiven * opponentLevel;
    }
  }

  experienceToNextLevel() {
    return Config.hero.experienceToNextLevel * this.level;
  }

  levelUp() {
    this.level++;
    this.maxHealth = this.level * Config.hero.maxHealth;
    this.hitDamage = this.level * Config.hero.hitDamage;
  }
}
