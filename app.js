const cards = document.querySelectorAll(".card")

function shuffleCards() {
	cards.forEach(card => {
		const randomPos = Math.trunc(Math.random() * 12);
		card.style.order = randomPos;
	})
}

shuffleCards();

cards.forEach(card => card.addEventListener('click', (e) => {
	flipCard(e);
}))

let cardsPicked = [];

function flipCard(e) {
	if (cardsPicked.length === 2) return;
	if (e.target.children[0].classList.contains('active')) return;

	e.target.children[0].classList.add('active');

	saveCard(e.target.children[0], e.target.getAttribute('data-attr'));
}


function saveCard(el, value) {
	if (el === cardsPicked[0]?.el) return;

	cardsPicked.push({ el, value });
	if (cardsPicked.length === 2) {
		updateAttempts();
		checkMatch();
	}
}

function checkMatch() {
	if (cardsPicked[0].value === cardsPicked[1].value) {
		cardsPicked = [];
		checkWin();
	} else {
		setTimeout(() => {
			cardsPicked[0].el.classList.remove('active');
			cardsPicked[1].el.classList.remove('active');
			cardsPicked = [];
		}, 1500);
	}
}

function checkWin() {
    const allCardsFlipped = Array.from(cards).every(card => 
        card.children[0].classList.contains('active')
    );
    if (allCardsFlipped) {
		toggleWin();
    }
}

let attempts = 0;
const score = document.querySelector('.score');

function updateAttempts() {
	attempts++;
	score.textContent = `Number of attempts: ${attempts}`;
}

const advice = document.querySelector('.advice');

function toggleWin() {
	advice.textContent = `Appuyez sur espace pour commencer une nouvelle partie.`;
	score.textContent = `Félicitations ! Vous avez gagné en ${attempts} essais.`;
	document.addEventListener('keydown', handleSpaceBar);
}

function handleSpaceBar(e) {
	if (e.key === ' ') {
		resetGame();
		document.removeEventListener('keydown', handleSpaceBar);
	}
}

function resetGame() {
	attempts = 0;
	score.textContent = `Number of attempts: ${attempts}`;
	advice.textContent = `Try to win with the least number of attempts.`;
	cards.forEach(card => {
		card.children[0].classList.remove('active');
	})
	shuffleCards();
}