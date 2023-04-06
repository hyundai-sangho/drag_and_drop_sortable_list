let sortableList = document.querySelector('.sortable-list');
let items = document.querySelectorAll('.item');

// 로컬 스토리지에 sortableList 키 값이 있다면
if (localStorage.getItem('sortableList')) {
	// sortableList 내부 HTML 값을 = 로컬 스토리지에 저장되어 있는 sortableList 키의 값으로 대체
	sortableList.innerHTML = localStorage.getItem('sortableList');

	// sortableList 내부 값이 변경됐기 때문에 sortableList, items 변수 내부 값 재설정
	sortableList = document.querySelector('.sortable-list');
	items = document.querySelectorAll('.item');
}

// 아이템을 드래그하면 해당 아이템의 내용을 수정하고 다시 저장한다.
items.forEach((item) => {
	// 해당 아이템의 드래그를 시작하면 item의 class에 dragging 추가 (opacity: 0으로 변경)
	item.addEventListener('dragstart', () => {
		setTimeout(() => {
			item.classList.add('dragging');
		}, 0);
	});

	// 해당 아이템의 드래그가 끝나면 item의 class에 dragging 제거
	item.addEventListener('dragend', () => {
		item.classList.remove('dragging');
	});
});

const initSortableList = (e) => {
	// 드래그시 나오는 ⦸ 이벤트 발생 방지
	e.preventDefault();

	// sortableList 내부의 dragging 클래스가 붙어있는 것 저장
	let draggingItem = sortableList.querySelector('.dragging');

	// sortableList 내부의 dragging 클래스가 붙어있지 않는 것들을 배열에 저장
	let siblings = [...sortableList.querySelectorAll('.item:not(.dragging)')];

	// 드래그한 아이템의 다음 목록을 찾아서 nextSibling 변수에 저장
	let nextSibling = siblings.find((sibling) => {
		return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
	});

	// sortableList의 nextSibling 위치를 기준으로 이전에 draggingItem을 삽입
	sortableList.insertBefore(draggingItem, nextSibling);

	// 0.5초 뒤에 로컬 스토리지에 sortableList 키를 집어넣고 값으로 현재 설정된 sortableList.innerHTML의 값을 저장
	setTimeout(() => {
		localStorage.setItem('sortableList', sortableList.innerHTML);
	}, 500);
};

// sortableList의 드래그가 끝나면 initSortableList 함수 실행
sortableList.addEventListener('dragover', initSortableList);

// sortableList의 드래그가 다른 아이템 항목에 들어갈 때 발생하는 이벤트 방지(⦸ 이벤트 발생 방지)
sortableList.addEventListener('dragenter', (e) => e.preventDefault());
