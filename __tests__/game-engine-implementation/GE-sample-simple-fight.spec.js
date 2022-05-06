const { describe, test, expect } = global;
import GamePlay, {
  Config,
} from "../../src/game-engine-implementation/GamePlay";
import Hero from "../../src/game-engine-implementation/Hero";
import Enemy from "../../src/game-engine-implementation/Enemy";
import Boss from "../../src/game-engine-implementation/Boss";

describe("GE-sample-simple-fight", function () {
  test("If hero will take damage and defeat the enemy", () => {
    const hero = new Hero(2);
    const enemy = new Enemy(4);

    GamePlay.fight(hero, enemy);
    expect(hero.health).toBe(140);
    expect(enemy.health).toBe(-80);
  });

  test("If hero will take damage and defeat another hero", () => {
    const hero = new Hero(2);
    const hero2 = new Hero(4);

    GamePlay.fight(hero, hero2);
    expect(hero.health).toBe(-120);
    expect(hero2.health).toBe(100);
  });

  test("If hero will take damage and defeat the boss", () => {
    const hero = new Hero(2);
    const boss = new Boss(4);

    GamePlay.fight(hero, boss);
    expect(hero.health).toBe(-80);
    expect(boss.health).toBe(320);
  });
});
