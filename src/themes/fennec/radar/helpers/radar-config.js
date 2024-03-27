export function radarConfig() {
  return this.$radars[this.$map.name] || this.$radars[this.$map.sanitizedName];
}
