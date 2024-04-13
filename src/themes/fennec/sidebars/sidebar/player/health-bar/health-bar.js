import { positionClass } from "/hud/helpers/position-class.js";
import { teamColorClass } from "/hud/helpers/team-color-class.js";

export default {
  props: ["position", "player"],

  data() {
    return {
      damageTakenTimeout: null,
      healthBeforeDamageTaken: this.player.health,
    };
  },

  beforeUnmount() {
    this.clearDamageTakenTimeout();
  },

  computed: {
    positionClass,

    colorClass() {
      return teamColorClass(this.player.team);
    },
    shadow() {
      if (this.player.isFocused) {
        return "none";
      } else {
        return "200px 10px 400px 200px rgba(0,0,0,0.3) inset";
      }
    },
  },

  methods: {
    clearDamageTakenTimeout() {
      if (this.damageTakenTimeout) clearTimeout(this.damageTakenTimeout);
    },
  },

  watch: {
    player(now, previously) {
      if (now.health === previously.health) return;

      this.clearDamageTakenTimeout();

      this.damageTakenTimeout = setTimeout(() => {
        this.healthBeforeDamageTaken = this.player.health;
      }, 2500);
    },
  },
};
