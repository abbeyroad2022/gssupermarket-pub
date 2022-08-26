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

	// card toggle select
	document.querySelectorAll('.is-select .card-area').forEach(toggle => {
		toggle.addEventListener('click', (e) => {
			e.preventDefault()
			if (!toggle.parentNode.classList.contains('is-delete')) {
				toggle.parentNode.classList.toggle('is-active')
			}
		})
	})

	// card drag
	document.querySelectorAll('.is-drag .card-box').forEach(cardBox => {
		let start_x, end_x;
		cardBox.addEventListener('touchstart', touch_start);
		cardBox.addEventListener('touchend', touch_end);
		function touch_start(e) {
			start_x = e.touches[0].pageX
		}
		function touch_end(e) {
			end_x = e.changedTouches[0].pageX;
			if (cardBox.classList.contains('is-active')) {
				const xPos = start_x - end_x;
				if (xPos > 80) {
					cardBox.classList.add('is-delete')
				} else if (xPos < -80) {
					cardBox.classList.remove('is-delete')
				}
			}
		}
	})
	
	// btn info more
	const cardList = document.querySelectorAll('.card-list .card');
	for(var i = 0; i < cardList.length; i++){
		const btnInfo = cardList[i].querySelector('.btn-info');
		const btnLocation = cardList[i].querySelector('.btn-location');
		const appConnection = cardList[i].querySelector('.app-connection');
		const btnTmap = cardList[i].querySelector('.btn-tmap');
		const btnKakaoNavi = cardList[i].querySelector('.btn-kakaonavi');
		if (btnInfo !== null) {
			btnInfo.addEventListener('click', function(e){
				e.preventDefault();
				const parentElement = this.parentElement.parentElement.parentElement.parentElement;
				if (parentElement.classList.contains('is-info-more')) {
					parentElement.classList.remove('is-info-more');
				} else {
					for(var j = 0; j < cardList.length; j++){
						cardList[j].classList.remove('is-info-more');
					}
					parentElement.classList.add('is-info-more');
				}
			});
		}
		if (appConnection !== null) {
			btnLocation.addEventListener('click', function(e){
				e.preventDefault();
				const parentElement = this.parentElement.parentElement.parentElement.parentElement;
				if (parentElement.classList.contains('is-location-more')) {
					parentElement.classList.remove('is-location-more');
				} else {
					for(var j = 0; j < cardList.length; j++){
						cardList[j].classList.remove('is-location-more');
					}
					parentElement.classList.add('is-location-more');
				}
			});
			btnTmap.addEventListener('click', function(e){
				e.preventDefault();
				const parentElement = this.parentElement.parentElement.parentElement.parentElement;
				parentElement.classList.remove('is-location-more');
			});
			btnKakaoNavi.addEventListener('click', function(e){
				e.preventDefault();
				const parentElement = this.parentElement.parentElement.parentElement.parentElement;
				parentElement.classList.remove('is-location-more');
			});
		}
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