import { positionClass } from "/hud/helpers/position-class.js";

export default {
  props: ["position", "player"],

  computed: {
    positionClass,

    iconUrl() {
      const activeWeapon = this.player.weapons.find(
        (weapon) => weapon.isActive
      );
      const defaultWeapon = this.player.weapons[0];

      return `/hud/img/weapons/${
        activeWeapon?.unprefixedName || defaultWeapon?.unprefixedName
      }.svg`;
    },
  },
};
