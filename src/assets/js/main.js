document.addEventListener('DOMContentLoaded', () => {
	const mapPopup = () => {
		const btnMap = document.querySelector('#mapBtn')
		const closeBtnMap = document.querySelector('#mapCloseBtn')
		const map = document.querySelector('#map')

		btnMap.addEventListener('click', e => {
			e.preventDefault()

			map.classList.add('active')
			map.parentNode.style.position = 'static'
		})

		closeBtnMap.addEventListener('click', e => {
			e.preventDefault()

			map.classList.remove('active')
			map.parentNode.style.position = 'relative'
		})
	}

	const callPopup = () => {
		const callPopupBtn = document.querySelector('#callPopupBtn')
		const callPopupCloseBtn = document.querySelector('#callPopupCloseBtn')
		const callPopup = document.querySelector('#callPopup')
		const input = callPopup.querySelector('input[name="phone"]')
		const checkbox = callPopup.querySelector('input[name="checkbox"]')

		let keyCode
		function mask(event) {
			if (event.keyCode) {
				keyCode = event.keyCode
			}

			let pos = this.selectionStart
			if (pos < 3) {
				event.preventDefault()
			}

			let mask = '+7 (___) ___ __ __'
			let i = 0
			let def = mask.replace(/\D/g, '')
			let val = this.value.replace(/\D/g, '')
			let new_value = mask.replace(/[_\d]/g, a => {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			})
			console.log(def)
			console.log(val)
			console.log(new_value)

			i = new_value.indexOf('_')
			if (i != -1) {
				if (i < 4) {
					i = 3
				}

				new_value = new_value.slice(0, i)
			}

			let reg = mask
				.substr(0, this.value.length)
				.replace(/_+/g, function (a) {
					return '\\d{1,' + a.length + '}'
				})
				.replace(/[+()]/g, '\\$&')
			reg = new RegExp('^' + reg + '$')

			if (
				!reg.test(this.value) ||
				this.value.length < 4 ||
				(keyCode > 47 && keyCode < 58)
			)
				this.value = new_value
			if (event.type == 'blur' && this.value.length < 4) this.value = ''
		}

		const closePopup = () => {
			callPopup.classList.remove('active')
			document.body.classList.remove('overflow-hidden')
		}

		const checkActiveCheckbox = () => {
			if (!checkbox.checked) {
				input.disabled = true
				return
			}

			input.disabled = undefined
		}

		callPopupBtn.addEventListener('click', e => {
			e.preventDefault()

			callPopup.classList.add('active')
			document.body.classList.add('overflow-hidden')
		})

		callPopupCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			closePopup()
		})

		document.addEventListener('click', e => {
			const form = callPopup.querySelector('.call-popup__form')

			if (
				e.target !== form &&
				!form.contains(e.target) &&
				e.target !== callPopupBtn
			) {
				closePopup()
			}
		})

		input.addEventListener('change', mask, false)
		input.addEventListener('focus', mask, false)
		input.addEventListener('blur', mask, false)
		input.addEventListener('keydown', mask, false)

		checkbox.addEventListener('change', () => checkActiveCheckbox())
		checkActiveCheckbox()
	}

	mapPopup()
	callPopup()
})
