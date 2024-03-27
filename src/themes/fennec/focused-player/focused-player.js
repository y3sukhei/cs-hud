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
			playerCameras:[]
		
		}
	},
	beforeMount() {
		this.$opts['playerCameras'].map((o,i)=>{
			if(o.slot !== null){

				this.playerCameras[o.slot-1] = o;
			}
		})
	
		// this.playerCameras = this.$opts['playerCameras'].sort(({slot:a}, {slot:b}) => a-b);
		console.log("player Cameras :",this.playerCameras);
	
	},

	mounted() {
		this.setOverlayBottomImageUrl()
		
		// if (! this.$round.isFreezetime && this.$players.focused.observerSlot == this.playerCameras[this.$players.focused.observerSlot-1].slot) {
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
			if (!this.$round.isFreezetime && this.$players.focused && this.playerCameras.length > 0) {
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
