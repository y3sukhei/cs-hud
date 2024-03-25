import FocusedPlayerAmmo from '/hud/focused-player/ammo/ammo.vue'
import FocusedPlayerHealthAndArmor from '/hud/focused-player/health-and-armor/health-and-armor.vue'
import FocusedPlayerNameAndStats from '/hud/focused-player/name-and-stats/name-and-stats.vue'

export default {
	components: {
		FocusedPlayerAmmo,
		FocusedPlayerHealthAndArmor,
		FocusedPlayerNameAndStats,
	},

	data() {
		return {
			overlayBottomImageUrl: null,
		
			cameras: {
				1:"10.136.28.191",
				2:"10.136.28.192",
				3:"10.136.28.193",
				4:"10.136.28.194",
				5:"10.136.28.195",
				6:"10.136.28.196",
				7:"10.136.28.197",
				8:"10.136.28.198",
				9:"10.136.28.199",
				0:"10.136.28.190",		
		 }
		}
	},

	mounted() {
		this.setOverlayBottomImageUrl()
		console.log("cameras 1 :", this.cameras[1]);
		// if (! this.$round.isFreezetime && this.$players.focused) {
		// 	this.showPanel("p"+this.$players.focused.observerSlot);
		// }
	},

	computed: {		
		isActive() {

			return ! this.$round.isFreezetime && this.$players.focused
		
		},	
	},
	watch :{
		isActive() {
			if (!this.$round.isFreezetime && this.$players.focused) {

				this.showPanel("p"+this.$players.focused?.observerSlot);
			}
			else {
				 this.hidePanel()
			}
		},
	},
	methods: {
		showPanel : function (id) {
			
			var elements = document.getElementsByClassName("iframe");
			for (let i = 0; i < elements.length; i++) {
			  elements[i].style.display = "none";
			}
			document.getElementById(id).style.display = "block";
		  },

		  hidePanel : function () {
			var elements = document.getElementsByClassName("iframe");
			for (let i = 0; i < elements.length; i++) {
			  elements[i].style.display = "none";
			}
			// document.getElementById(id).style.display = "block";
		  },
		async setOverlayBottomImageUrl() {
			let fetchResponse = await fetch('/hud/overlay-images/focused-player-bottom.webp').catch(() => null)

			if (! fetchResponse?.ok) {
				fetchResponse = await fetch('/hud/overlay-images/focused-player-bottom.png').catch(() => null)
			}

			if (! fetchResponse?.ok) {
				fetchResponse = await fetch('/hud/overlay-images/focused-player-bottom.gif').catch(() => null)
			}

			if (! fetchResponse?.ok) return

			const blob = await fetchResponse.blob()
			this.overlayBottomImageUrl = URL.createObjectURL(blob)
		},
	},
}
