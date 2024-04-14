import Digits from "/hud/digits/digits.vue";
import Armor from "/hud/focused-player/health-and-armor/armor/armor.vue";
import Health from "/hud/focused-player/health-and-armor/health/health.vue";
import { teamColorClass } from "/hud/helpers/team-color-class.js";

export default {
  components: {
    Digits,
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
    weapon() {
      if (this.player?.primary?.isActive) return this.player.primary;
      if (this.player?.secondary?.isActive) return this.player.secondary;
    },
    personName(){}
  },
};
