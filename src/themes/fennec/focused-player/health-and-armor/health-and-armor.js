import Digits from "/hud/digits/digits.vue";
import Armor from "/hud/focused-player/health-and-armor/armor/armor.vue";
import Health from "/hud/focused-player/health-and-armor/health/health.vue";
import { teamColorClass } from "/hud/helpers/team-color-class.js";

export default {
  components: {
    Armor,
    Digits,
    Health,
  },

  computed: {
    player() {
      return this.$players.focused;
    },

    colorClass() {
      return teamColorClass(this.player.team);
    },
  },
};
