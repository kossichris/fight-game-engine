import Character from "./Character";
import { Config } from "./GamePlay";

export default class Boss extends Character {
  constructor(level) {
    super(level);
    this.maxHealth = this.level * Config.boss.maxHealth;
    this.hitDamage = this.level * Config.boss.hitDamage;
    this.health = this.maxHealth;
  }
}
