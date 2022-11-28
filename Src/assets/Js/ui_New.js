// Tab
const tabCase = [
	'tab',
	'sort',
]
for (let i = 0; i < tabCase.length; i+=1) {
	// console.log(tabCase[i]);
	document.querySelectorAll(`.${tabCase[i]}-list`).forEach(tabList => {
		const tabItem = tabList.querySelectorAll(`.${tabCase[i]}-item`);
		tabList.addEventListener('click', ev => {
			if (ev.target.className === tabCase[i]) {
				for (let j = 0; j < tabItem.length; j+=1) {
					tabItem[j].classList.remove('is-active');
				}
				ev.target.parentNode.classList.add('is-active');
			}
		})
	})
}

// card list control
const content = document.querySelector('.content');
const cardList = document.querySelector('.card-list');
if (cardList !== null) {
	cardList.addEventListener('click', (ev) => {
		if (content.classList.contains('is-select') && ev.target.className === 'card-area' && !ev.target.parentNode.classList.contains('is-delete')) {
			ev.target.parentNode.classList.toggle('is-active');
		}
		// popup
		if (ev.target.classList.contains('popup-open')) {
			const popId = ev.target.dataset.popup;
			const elPop = document.querySelector(`#${popId}`);
			elPop.classList.add('is-active');
		}
		const elCardAll = document.querySelectorAll('.card-list .card');
		const parentNode = ev.target.parentNode.parentNode.parentNode.parentNode;
		// btn info, location
		const btnCase = [
			'info',
			'location',
		]
		for (let i = 0; i < btnCase.length; i+=1) {
			// console.log(btnCase[i]);
			if (ev.target.className === `btn btn-${btnCase[i]}`) {
				if (parentNode.classList.contains(`is-${btnCase[i]}-more`)) {
					parentNode.classList.remove(`is-${btnCase[i]}-more`);
				} else {
					for(let j = 0; j < elCardAll.length; j+=1){
						elCardAll[j].classList.remove(`is-${btnCase[i]}-more`);
					}
					parentNode.classList.add(`is-${btnCase[i]}-more`);
				}
			}
		}
		if (ev.target.className === 'btn btn-tmap' || ev.target.className === 'btn btn-kakaonavi') {
			parentNode.classList.remove('is-location-more');
		}
	});
	// card drag
	let START_X;
	let END_X;
	cardList.addEventListener('touchstart', (ev) => {
		if (content.classList.contains('is-drag') && ev.target.parentNode.classList.contains('is-active') && ev.target.className === 'card-area') {
			START_X = ev.touches[0].pageX;
		}
	})
	cardList.addEventListener('touchend', (ev) => {
		if (content.classList.contains('is-drag') && ev.target.parentNode.classList.contains('is-active') && ev.target.className === 'card-area') {
			END_X = ev.changedTouches[0].pageX;
			const xPos = START_X - END_X;
			if (xPos > 80) {
				ev.target.parentNode.classList.add('is-delete')
			} else if (xPos < -80) {
				ev.target.parentNode.classList.remove('is-delete')
			}
		}
	})
}

// toast close
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toastClose');
if (toast !== null) {
	toastClose.addEventListener('click', () => {
		toast.classList.remove('is_active')
	})
}

// popup
document.querySelectorAll('.popup-open').forEach(popOpen => {
	const popId = popOpen.dataset.popup;
	const elPop = document.querySelector(`#${popId}`);
	if (elPop !== null) {
		popOpen.addEventListener('click', () => {
			elPop.classList.add('is-active');
		})
		elPop.querySelectorAll('.popup-close').forEach(popClose => {
			popClose.addEventListener('click', () => {
				elPop.classList.remove('is-active');
			});
		})
	}
})

// input reset
document.querySelectorAll('.field-item .control').forEach(control => {
	const elInput = control.querySelector('.input');
	const btnReset = control.querySelector('.btn-reset');
	if (elInput !== null) {
		elInput.addEventListener('input', (ev) => {
			ev.preventDefault();
			return elInput.value.length > 0 ? btnReset.classList.add('show') : btnReset.classList.remove('show');
		});
	}
	if (btnReset !== null) {
		btnReset.addEventListener('click', () => {
			elInput.value = '';
			btnReset.classList.remove('show');
		});
	}
})

// 기타 사유 입력 (동적 요소 이벤트)
const reasonControl = document.querySelector('.reason-control');
if (reasonControl !== null) {
	reasonControl.addEventListener('click', (ev) => {
		const elInput = reasonControl.querySelector('.input');
		const btnReset = reasonControl.querySelector('.btn-reset');
		const reasonEtcInput = reasonControl.querySelector('.reason-etc-input');
		// console.log(e.target);
		if (ev.target.classList.contains('reason-etc') && ev.target.checked === true || ev.target.classList.contains('input') || ev.target.classList.contains('btn')) {
			reasonEtcInput.classList.add('show');
		} else {
			reasonEtcInput.classList.remove('show')
		}
		if (ev.target.classList.contains('btn')) {
			elInput.value = '';
			btnReset.classList.remove('show');
		}
	});
	reasonControl.addEventListener('input', () => {
		const elInput = reasonControl.querySelector('.input');
		const btnReset = reasonControl.querySelector('.btn-reset');
		// console.log(elInput.value.length );
		return elInput.value.length > 0 ? btnReset.classList.add('show') : btnReset.classList.remove('show');
	});
}

// 사진 업로드
const uploadItem = document.querySelector('.upload-item');
const btnDeliveryComplete = document.querySelector('.btn-delivery-complete');
if (uploadItem !== null) {
	const inputPhoto = uploadItem.querySelector('.input-photo-upload');
	const btnPhoto = uploadItem.querySelector('.btn-photo-upload');
	const uploadResult = uploadItem.querySelector('.upload-result');
	const btnReset = uploadResult.querySelector('.btn-reset');
	const photoName = uploadItem.querySelector(".upload-photo-name");
	btnReset.addEventListener('click', () => {
		inputPhoto.value = '';
		photoName.innerHTML = '';
		uploadItem.classList.remove('is-upload');
		btnDeliveryComplete.disabled = true;
	});
	btnPhoto.addEventListener('click', () => {
		inputPhoto.focus();
		return false;
	});
	inputPhoto.addEventListener('change', () => {
		const fileUrl = this.value;
		photoName.innerHTML = fileUrl.split('/').pop().split('\\').pop();
		uploadItem.classList.add('is-upload');
		btnDeliveryComplete.disabled = false;
	});
}