document.addEventListener('DOMContentLoaded', () => {
	let isBurgerActive = false
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
		const callPopupBtnSend = callPopup.querySelector('.call-popup__btn')
		const input = callPopup.querySelector('input[name="phone"]')
		const checkbox = callPopup.querySelector('input[name="checkbox"]')

		let keyCode
		let isValidPhone
		const mask = event => {
			if (event.keyCode) {
				keyCode = event.keyCode
			}

			event.target.classList.remove('invalid')
			let pos = event.target.selectionStart
			if (pos < 3) {
				event.preventDefault()
			}

			let mask = '+7 (___) ___ __ __'
			let i = 0
			let def = mask.replace(/\D/g, '')
			let val = event.target.value.replace(/\D/g, '')
			let new_value = mask.replace(/[_\d]/g, a => {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			})

			i = new_value.indexOf('_')
			if (i != -1) {
				if (i < 4) {
					i = 3
				}

				new_value = new_value.slice(0, i)
			}

			let reg = mask
				.substr(0, event.target.value.length)
				.replace(/_+/g, a => {
					return '\\d{1,' + a.length + '}'
				})
				.replace(/[+()]/g, '\\$&')
			reg = new RegExp('^' + reg + '$')

			if (
				!reg.test(event.target.value) ||
				event.target.value.length < 4 ||
				(keyCode > 47 && keyCode < 58)
			) {
				event.target.value = new_value
			}

			if (event.type == 'blur' && event.target.value.length < 4) {
				event.target.value = ''
			}

			if (event.target.value.length === event.target.maxLength) {
				isValidPhone = true
			} else {
				isValidPhone = false
			}
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

		callPopupBtnSend.addEventListener('click', e => {
			if (!checkbox.checked) {
				return
			}

			if (!isValidPhone) {
				input.classList.add('invalid')
				return
			}

			callPopup.classList.add('done')
		})

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

		input.addEventListener('input', mask, false)
		input.addEventListener('focus', mask, false)
		input.addEventListener('blur', mask, false)
		input.addEventListener('keydown', mask, false)

		checkbox.addEventListener('change', () => checkActiveCheckbox())
		checkActiveCheckbox()
	}

	const burgerMenu = () => {
		const nav = document.querySelector('#mobileNav')
		const menu = document.querySelector('#mobileMenu')
		const btn = document.querySelector('#burger')

		btn.addEventListener('click', e => {
			if (
				!nav.classList.contains('active') &&
				!menu.classList.contains('active')
			) {
				nav.classList.add('active')
				menu.classList.add('active')
				isBurgerActive = true

				return
			}

			nav.classList.remove('active')
			menu.classList.remove('active')
			isBurgerActive = false
		})
	}

	const stickyNavbar = () => {
		const nav = document.querySelector('#mobileNav')
		const page = document.querySelector('.page-wrapper')
		const sticky = nav.offsetTop + nav.offsetHeight / 2

		const toggleStickyNavbar = () => {
			if (isBurgerActive) {
				page.style.marginTop = `0`
				nav.classList.remove('fixed')
				return
			}

			if (window.pageYOffset >= sticky) {
				const positionNav = window.getComputedStyle(nav).position
				if (positionNav != 'absolute' && positionNav != 'fixed') {
					page.style.marginTop = `${nav.offsetHeight}px`
				}

				nav.classList.add('fixed')
			} else {
				page.style.marginTop = `0`
				nav.classList.remove('fixed')
			}
		}

		toggleStickyNavbar()
		window.addEventListener('scroll', toggleStickyNavbar)
	}

	mapPopup()
	callPopup()
	burgerMenu()
	stickyNavbar()
})
