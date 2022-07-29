document.addEventListener("DOMContentLoaded", () => {
	console.log("loadding page")

	// toggle button
	document.querySelectorAll('.btn_scrap, .btn_interest').forEach(toggle => {
		toggle.addEventListener('click', (e) => {
			e.preventDefault()
			toggle.classList.toggle('is_active')
		})
	})

	// toast close
	const toast = document.getElementById('toast');
	const toastClose = document.getElementById('toastClose');
	if (toast !== null) {
		toastClose.addEventListener('click', () => {
			toast.classList.remove('is_active')
		})
	}

	// bottom sheet
	const bottomSheet = document.getElementById('bottomSheet');
	const bottomSheetOpen = document.getElementById('bottomSheetOpen');
	const bottomSheetClose = document.getElementById('bottomSheetClose');
	if (bottomSheet !== null) {
		bottomSheetOpen.addEventListener('click', () => {
			bottomSheet.classList.add('is_active')
		})
		bottomSheetClose.addEventListener('click', () => {
			bottomSheet.classList.remove('is_active')
		})
	}

	// modal popup
	const modalPop = document.getElementById('modalPop');
	//const modalPopOpen = document.getElementById('modalPopOpen');
	const modalPopClose = document.getElementById('modalPopClose');
	if (modalPop !== null) {
		// modalPopOpen.addEventListener('click', () => {
		// 	modalPop.classList.add('is_active')
		// })
		modalPopClose.addEventListener('click', () => {
			modalPop.classList.remove('is_active')
		})
	}
});