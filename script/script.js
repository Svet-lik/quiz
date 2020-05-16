document.addEventListener('DOMContentLoaded', function() {
    //'use strict';
    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
   // const modalWrap = document.querySelector('.modal');
    const closeModal = document.getElementById('closeModal');
    const questionTitle = document.getElementById('question');
    const formAnswers = document.getElementById('formAnswers');
    let clientWidth = document.documentElement.clientWidth;
    const burgerBtn = document.getElementById('burger');
    
    if (clientWidth<768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    };

    window.addEventListener('resize', function() {
        clientWidth = document.documentElement.clientWidth;
        if (clientWidth<768) {
            burgerBtn.style.display = 'flex';
        } else {
            burgerBtn.style.display = 'none';
        }
    });

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    });

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        if (
            !event.target.closest('.modal-dialog') && 
            !event.target.closest('.btnOpenModal')&&
            !event.target.closest('.burger')
        ){
            modalBlock.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    });

    const playTest = () => {
        let answerImgSrc = './image/burger.png';
        let answerSpanText = 'Стандарт';
        const renderQuestions = () => {
            questionTitle.textContent = 'Какого цвета бургер вы хотите?';
            formAnswers.innerHTML = `
                <div class="answers-item d-flex flex-column">
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                    <label for="answerItem1" class="d-flex flex-column justify-content-between">
                      <img class="answerImg" src=${answerImgSrc} alt="burger">
                      <span>${answerSpanText}</span>
                    </label>
                </div>
                `;
        };
        renderQuestions();
    };
});

