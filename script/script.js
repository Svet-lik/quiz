// обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const closeModal = document.getElementById('closeModal');
    const questionTitle = document.getElementById('question');
    const formAnswers = document.getElementById('formAnswers');
    let clientWidth = document.documentElement.clientWidth;
    const burgerBtn = document.getElementById('burger');
    const modalDialog = document.querySelector('.modal-dialog');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const sendButton = document.getElementById('send');
    const modalTitle = document.querySelector('.modal-title');

// объект, содержащий вопросы и ответы
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
    
// анимация появления модального окна
    let count = -100;
    modalDialog.style.top = '-100%';

    const animateModal = ( ) => { 
        modalDialog.style.top = count + '%';
        count ++;  
        
        if (count < 0) {
            requestAnimationFrame(animateModal);
        } else {
            count = -100;
        }
    };

// появление бургера
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

    // обработчик событий открытия/закрытия модального окна
    burgerBtn.addEventListener('click', () => {
        requestAnimationFrame(animateModal);
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    });
    
    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);
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

// функция запуска тестирования
    const playTest = () => {
        const finalAnswers =[];
        //переменная с номером вопроса
        let numberQuestion = 0;
        // функция рендеринга ответов
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `                
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                      <img class="answerImg" src="${answer.url}" alt="burger">
                      <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            })
        };
        
        // функция рендеринга вопросов + ответов
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';
            switch (true) {
                case (numberQuestion >= 0 && numberQuestion < questions.length):
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);

                    nextButton.classList.remove('d-none');
                    prevButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;
                case (numberQuestion === 0):
                    prevButton.classList.add('d-none');
                    break;
                case (numberQuestion === questions.length):
                    nextButton.classList.add('d-none');
                    prevButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    modalTitle.textContent = 'Наш менеджер свяжется с вами через 5 минут';
                    questionTitle.textContent = '';

                    formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Введите ваш номер телефона</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                    `
                    break;
                case (numberQuestion === questions.length+1):
                    sendButton.classList.add('d-none');
                    formAnswers.textContent = 'Спасибо за пройденный тест!'; 
                    break;
            };      
        };
       

        //запуск функции рендеринга
        renderQuestions(numberQuestion);  

        const checkAnswers = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            
            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion < questions.length) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                };
                if (numberQuestion === questions.length) {obj['Номер телефона'] = input.value;};
            });
            finalAnswers.push(obj);          
            
        }

        // обработка событий кнопок prev и next
        nextButton.onclick =  () => {
            checkAnswers();
            numberQuestion++;
            renderQuestions(numberQuestion);             
        };
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);           
        };  
        sendButton.onclick = () => {
            checkAnswers();
            numberQuestion++;
            renderQuestions(numberQuestion);    
            setTimeout(() => { 
                modalBlock.classList.remove('d-block'); 
            }, 2000);
            console.log(finalAnswers);                   
        }; 
    };
    
});

