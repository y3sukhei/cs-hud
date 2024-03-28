import Update from '/config/options/update/update.vue'
import { connectToWebsocket } from '/hud/core/websocket.js'
import { players } from '/hud/core/state.js'
export default {
	components: {
		Update,
	},
	

	data() {
		return {
			options : [
				{ text: 'Slot 1', value: 1, disabled: false },
				{ text: 'Slot 2', value: 2, disabled: false },
				{ text: 'Slot 3', value: 3, disabled: false },
				{ text: 'Slot 4', value: 4, disabled: false },
				{ text: 'Slot 5', value: 5, disabled: false },
				{ text: 'Slot 6', value: 6, disabled: false },
				{ text: 'Slot 7', value: 7, disabled: false },
				{ text: 'Slot 8', value: 8, disabled: false },
				{ text: 'Slot 9', value: 9, disabled: false },
				{ text: 'Slot 10', value: 10, disabled: false },
			  ],  
			initialTheme: null,
			optionValues: {},
			sections: [],
			players: null,
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
		// closeConnection() {

		// 	connectToWebsocket("close");
		
		// },
		getPlayers() {
			this.players = players;
			
			console.log("players :", this.players);
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

			console.log("this. option values :", this.optionValues);
			console.log("this. sections :", this.sections);

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
		async save() {
			
			if (this.optionValues.playerCameras.filter((o)=> o.slot !== null).length < 10) {
				alert("all slots must be filled!!!")
			}

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
				
				connectToWebsocket("close");
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
