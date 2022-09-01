"use strict";

document.addEventListener("DOMContentLoaded", () => {
	console.log("loadding page")

	// tab
	const tabList = document.querySelectorAll('.tab-list li');
	for(var i = 0; i < tabList.length; i++){
		tabList[i].querySelector('.tab').addEventListener('click', function(e){
			e.preventDefault();
			for(var j = 0; j < tabList.length; j++){
				tabList[j].classList.remove('is-active');
			}
			this.parentNode.classList.add('is-active');
		});
	}

	// sort
	const sortList = document.querySelectorAll('.sort-list li');
	for(var i = 0; i < sortList.length; i++){
		sortList[i].querySelector('.sort').addEventListener('click', function(e){
			e.preventDefault();
			for(var j = 0; j < sortList.length; j++){
				sortList[j].classList.remove('is-active');
			}
			this.parentNode.classList.add('is-active');
		});
	}

	// card list control
	const content = document.querySelector('.content'),
		cardList = document.querySelector('.card-list');

	if (cardList !== null) {
		cardList.addEventListener('click', function(e) {
			//console.log(e.target, e.target.parentNode);
			// card toggle select
			if (content.classList.contains('is-select') && e.target.className === 'card-area' && !e.target.parentNode.classList.contains('is-delete')) {
				e.target.parentNode.classList.toggle('is-active');
			}
			// card drag
			if (content.classList.contains('is-drag') && e.target.className === 'card-area') {
				let start_x, end_x;
				e.target.addEventListener('touchstart', touch_start);
				e.target.addEventListener('touchend', touch_end);
				function touch_start(pos) {
					start_x = pos.touches[0].pageX;
				}
				function touch_end(pos) {
					end_x = pos.changedTouches[0].pageX;
					if (e.target.parentNode.classList.contains('is-active')) {
						const xPos = start_x - end_x;
						if (xPos > 80) {
							e.target.parentNode.classList.add('is-delete')
						} else if (xPos < -80) {
							e.target.parentNode.classList.remove('is-delete')
						}
					}
				}
			}
			// popup
			if (e.target.classList.contains('popup-open')) {
				const popId = e.target.dataset.popup;
				const elPop = document.querySelector('#' + popId);
				elPop.classList.add('is-active');
			}
			const elCardAll = document.querySelectorAll('.card-list .card');
			const parentNode = e.target.parentNode.parentNode.parentNode.parentNode;
			// btn info
			if (e.target.className === 'btn btn-info') {
				if (parentNode.classList.contains('is-info-more')) {
					parentNode.classList.remove('is-info-more');
				} else {
					for(var j = 0; j < elCardAll.length; j++){
						elCardAll[j].classList.remove('is-info-more');
					}
					parentNode.classList.add('is-info-more');
				}
			}
			// btn location
			if (e.target.className === 'btn btn-location') {
				if (parentNode.classList.contains('is-location-more')) {
					parentNode.classList.remove('is-location-more');
				} else {
					for(var j = 0; j < elCardAll.length; j++){
						elCardAll[j].classList.remove('is-location-more');
					}
					parentNode.classList.add('is-location-more');
				}
			}
			if (e.target.className === 'btn btn-tmap' || e.target.className === 'btn btn-kakaonavi') {
				parentNode.classList.remove('is-location-more');
			}
		});
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
		const elPop = document.querySelector('#' + popId);
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
			elInput.addEventListener('input', function(e){
				e.preventDefault();
				return elInput.value.length > 0 ? btnReset.classList.add('show') : btnReset.classList.remove('show');
			});
		}
		if (btnReset !== null) {
			btnReset.addEventListener('click', function(){
				elInput.value = '';
				btnReset.classList.remove('show');
			});
		}
	})

	// 기타 사유 입력
	const reasonEtc = document.querySelector('.reason-etc');
	const reasonEtcInput = document.querySelector('.reason-etc-input');
	if (reasonEtc !== null) {
		document.querySelectorAll('.choice-group input').forEach(choice => {
			choice.addEventListener('click', function(){
				const isChecked = reasonEtc.checked;
				return isChecked === true ? reasonEtcInput.classList.add('show') : reasonEtcInput.classList.remove('show');
			})
		})
	}

	// 사진 업로드
	const uploadItem = document.querySelector('.upload-item'),
		btnDeliveryComplete = document.querySelector('.btn-delivery-complete');
	if (uploadItem !== null) {
		const inputPhoto = uploadItem.querySelector('.input-photo-upload'), 
			btnPhoto = uploadItem.querySelector('.btn-photo-upload'),
			uploadResult = uploadItem.querySelector('.upload-result'),
			btnReset = uploadResult.querySelector('.btn-reset'),
			photoName = uploadItem.querySelector(".upload-photo-name"),
			photoImg = uploadItem.querySelector(".upload-photo-img");
		btnReset.addEventListener('click', function(e) {
			inputPhoto.value = '';
			// if (photoImg !== null) {
			// 	photoImg.src = ''; 
			// }
			photoName.innerHTML = '';
			uploadItem.classList.remove('is-upload');
			btnDeliveryComplete.disabled = true;
		});  
		btnPhoto.addEventListener('click', function(e) {
			inputPhoto.focus();
			return false;
		});  
		inputPhoto.addEventListener('change', function(e) {
			const fileUrl = this.value;
			const fileName = fileUrl.split('/').pop().split('\\').pop();
			// if (photoImg !== null) {
			// 	photoImg.src = fileUrl; 
			// }
			photoName.innerHTML = fileName; 
			uploadItem.classList.add('is-upload');
			btnDeliveryComplete.disabled = false;
		});
	}
});