import Update from '/config/options/update/update.vue'

export default {
	components: {
		Update,
	},
	

	data() {
		return {
			options : [
				{ text: 'One', value: 'A' },
				{ text: 'Two', value: 'B' },
				{ text: 'Three', value: 'C' }
			  ],  
			selected : 'A',
			initialTheme: null,
			optionValues: {},
			sections: [],
			players: [],
			cameras: [
				{ slot:1,url:"http://localhost:8889/mystream1/?controls=0" },
				{ slot:2,url:"http://localhost:8889/mystream2/?controls=0" },
				{ slot:3,url:"http://localhost:8889/mystream3/?controls=0" },
				{ slot:4,url:"http://localhost:8889/mystream4/?controls=0" },
				{ slot:5,url:"http://localhost:8889/mystream5/?controls=0" },
				{ slot:6,url:"http://localhost:8889/mystream6/?controls=0" },
				{ slot:7,url:"http://localhost:8889/mystream7/?controls=0" },
				{ slot:8,url:"http://localhost:8889/mystream8/?controls=0" },
				{ slot:9,url:"http://localhost:8889/mystream9/?controls=0" },
				{ slot:0,url:"http://localhost:8889/mystream0/?controls=0" },
		    ]
		}
	},
	mounted() {
		document.addEventListener('keydown', this.onKeydown)
		this.initOptions()	
	},

	beforeUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
	},

	methods: {
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

				optionValues[option.key] = option.value

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
			await fetch('/config/options', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.optionValues),
			})

			if (this.optionValues.theme !== this.initialTheme) {
				window.location.reload()
			}
		},

		async forceHudRefresh() {
			await fetch('/config/force-hud-refresh', { method: 'POST' })
		},

		resetValue(key) {
			this.optionValues[key] = null
		},
	},
}
