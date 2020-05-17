document.addEventListener('DOMContentLoaded', function() {
    //'use strict';
    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const closeModal = document.getElementById('closeModal');
    const questionTitle = document.getElementById('question');
    const formAnswers = document.getElementById('formAnswers');
    let clientWidth = document.documentElement.clientWidth;
    const burgerBtn = document.getElementById('burger');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];  
    
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
        let numberQuestion = 0;
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
                answerItem.innerHTML = `                
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                      <img class="answerImg" src="${answer.url}" alt="burger">
                      <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';
            questionTitle.textContent = `${questions[indexQuestion].question}`;
            renderAnswers(indexQuestion);
        };

        prevButton.style.display = 'none';
        renderQuestions(numberQuestion);  

        nextButton.onclick =  () => {
            numberQuestion++;
            renderQuestions(numberQuestion);  
            if (numberQuestion === 0) {
                prevButton.style.display = 'none'
            } else {
                prevButton.style.display = 'inline-block'
            };
    
            if (numberQuestion === (questions.length-1)) {
                nextButton.style.display = 'none'
            } else {
                nextButton.style.display = 'inline-block'
            };           
        };
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);  
            if (numberQuestion === 0) {
                prevButton.style.display = 'none'
            } else {
                prevButton.style.display = 'inline-block'
            };
    
            if (numberQuestion === (questions.length-1)) {
                nextButton.style.display = 'none'
            } else {
                nextButton.style.display = 'inline-block'
            };          
        };  
    };
    
});

