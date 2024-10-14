import Update from '/config/options/update/update.vue'
import { connectToWebsocket } from '/hud/core/websocket.js'
import { players, teams} from '/hud/core/state.js'
export default {
	components: {
		Update,
	},
	

	data() {
		return {  
			initialTheme: null,
			optionValues: {},
			sections: [],
			players: null,
			teams: null,
			isActivePlayers:false,
			playerImages:[
				{id:1, url :"/hud/img/player-img/Accuracy.png"},
				{id:2, url :"/hud/img/player-img/Ariucle.png"},
				{id:3, url :"/hud/img/player-img/EFIRE.png"},
				{id:4, url :"/hud/img/player-img/ROUX.png"},
				{id:5, url :"/hud/img/player-img/Wonderzce.png"},
				{id:6, url :"/hud/img/player-img/Annihilation.png"},
				{id:7, url :"/hud/img/player-img/Dobu.png"},
				{id:8, url :"/hud/img/player-img/Kabal.png"},
				{id:9, url :"/hud/img/player-img/MIQ.png"},
				{id:10, url :"/hud/img/player-img/Zesta.png"},
				{id:11, url :"/hud/img/player-img/910.png"},
				{id:12, url :"/hud/img/player-img/Blitz.png"},
				{id:13, url :"/hud/img/player-img/Mzinho.png"},
				{id:14, url :"/hud/img/player-img/Senzu.png"},
				{id:15, url :"/hud/img/player-img/Techno.png"},
			]
		}
	},
	mounted() {
		document.addEventListener('keydown', this.onKeydown)
		this.initOptions()
		connectToWebsocket("connect");
	},

	beforeUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
	},
	methods: {

		showHide(index) {
			
		
			if (index !== 99) {

				this.optionValues['playerCameras'][index].slot = 99;
				
				// console.log("after hide : ", this.optionValues)
			}
		
		},
		getPlayers() {
			this.isActivePlayers = false;
			
			this.players = players;
			this.teams = teams;
			setTimeout(()=>{
				this.isActivePlayers = true;
			},1000)
			console.log("players :", this.players);
			console.log("teams: ",this.teams);
			

			// console.log("teams :", this.teams);
		},
		onSelectChange(e) {
			const index = e.target.selectedIndex;
			this.players = this.players.map((o, i) => {
			  if (i === index) {
				o.disabled = true;
			  } else {
				o.disabled = false;
			  }
			  return o;
			});
		  },
		async initOptions() {
			const res = await fetch('/config/options')
			const json = await res.json()
			
			const optionValues = {}
			const sections = {}

			for (const option of json) {
				if (! sections[option.section]) {
					sections[option.section] = {
						description: option.sectionDescription,
						name: option.section,
						options: [],
					}
				}
				if (option.key === "playerCameras") {
					optionValues[option.key] = option.fallback;

				} else {

					optionValues[option.key] = option.value
				}

				sections[option.section].options.push({
					...option,
					inputType: this.getInputType(option.type),
					keySegments: option.key.split('.'),
				})

				if (sections[option.section].description) {
					sections[option.section].description = option.sectionDescription
				}
			}

			this.initialTheme = optionValues.theme
			this.optionValues = optionValues
			this.sections = Object.values(sections)

			// console.log("this. option values :", this.optionValues);
			// console.log("this. sections :", this.sections);

		},

		getInputType(type) {
			switch (type) {
				case 'boolean': return 'checkbox'
				case 'color': return 'color'
				case 'number': return 'number'
				case 'text': return 'textarea'
				default: return 'text'
			}
		},

		onKeydown(e) {
			// on Ctrl+S, save changes
			if (
				e.key.toLowerCase() === 's'
				&& ! e.altKey
				&& e.ctrlKey
				&& ! e.metaKey
				&& ! e.shiftKey
			) {
				e.preventDefault()
				e.stopImmediatePropagation()
				return this.save()
			}
		},
		checkDuplicates(){
			var valueArr = this.optionValues.playerCameras.map((item)=> { return item.slot });

				return valueArr.some((item, idx)=> { 
    				return valueArr.indexOf(item) != idx 
			});
		},
		
		async save() {
			console.log("this. option values in save:", this.optionValues);
			
			if (this.optionValues.playerCameras.filter((o)=> o.slot !== null).length < 10) {
				alert("all slots must be filled!!!");
			}
			// else if(this.checkDuplicates()) {
			// 	alert("duplicate!!!");
			// }
			else {
				await fetch('/config/options', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.optionValues),
				})
				
				if (this.optionValues.theme !== this.initialTheme) {
					window.location.reload()
				}
				// close connection after get players
				// connectToWebsocket("close");
				
				alert("Success");
			}

		},

		async forceHudRefresh() {
			await fetch('/config/force-hud-refresh', { method: 'POST' })
		},

		resetValue(key) {
			this.optionValues[key] = null
		},

		resetOptions(key) {
			this.optionValues[key].map((o,i)=>{
				o.slot = null;
				
			})
			this.options.map((o, i) => {
				  o.disabled = false;
				
			  });

		}
	},
}
