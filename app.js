const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')

const humanExpressions = [
    { img:'./img/drink.jpg',text: 'Estou com sede' },
    { img:'./img/food.jpg',text: 'Estou com fome' },
    { img:'./img/tired.jpg',text: 'Estou cansado' },
    { img:'./img/hurt.jpg',text: 'Estou machucado' },
    { img:'./img/happy.jpg',text: 'Estou feliz' },
    { img:'./img/angry.jpg',text: 'Estou com raiva' },
    { img:'./img/sad.jpg',text: 'Estou triste' },
    { img:'./img/scared.jpg',text: 'Estou assustado' },
    { img:'./img/outside.jpg',text: 'Quero ir lá fora' },
    { img:'./img/home.jpg',text: 'Quero ir pra casa' },
    { img:'./img/school.jpg',text: 'Quero ir pra escola' },
    { img:'./img/grandma.jpg',text: 'Quero ver a vó' },
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text => {
    utterance.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

const setVoice = event => {

    /*const selectedVoice = voices.find(voice => voice.name === event.target.value) */
    const selectedVoice = voices.find(voice => {
        return voice.name === event.target.value
    })
    utterance.voice = selectedVoice
}

const addExpressionBoxesIntoDOM = () => {
    main.innerHTML = humanExpressions.map(({ img,text }) => `
        <div class="expression-box" data-js="${text}">
            <img src="${img}" alt="${text}" data-js="${text}">
            <p class="info" data-js="${text}">${text}</p>
        </div>
    `).join('')
}

addExpressionBoxesIntoDOM()

const setStyeOfClickedDiv = dataValue => {
    const div = document.querySelector(`[data-js="${dataValue}"]`)
        div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
}

main.addEventListener('click', event => {
    const clickedElement = event.target

    const clickedElementTextMustBeSpoken = clickedElement.tagName === 'IMG' 
        || clickedElement.tagName === 'P'

    if (clickedElementTextMustBeSpoken){
        setTextMessage(clickedElement.dataset.js)
        speakText()
        setStyeOfClickedDiv(clickedElement.dataset.js)
    }
})

/*

const createExpressionBox = ({ img,text }) => {
    const div = document.createElement('div')

    div.classList.add('expression-box')
    div.innerHTML = `
        <img src="${img}" alt="${text}">
        <p class="info">${text}</p>

    `

    div.addEventListener('click', () => {
        setTextMessage(text)
        speakText()

        div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
    })

    main.appendChild(div)
}

humanExpressions.forEach(createExpressionBox)

*/

let voices = []

speechSynthesis.addEventListener('voiceschanged',() => {
    voices = speechSynthesis.getVoices()
    const goolgleVoice = voices.find(voice => 
        voice.name === 'Google português do Brasil')
    const microsoftVoice = voices.find(voice => 
        voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)')
    

    voices.forEach(({name,lang}) => {
        const option = document.createElement('option')

        option.value = name

            
        if (goolgleVoice && option.value === goolgleVoice.name){
            utterance.voice = goolgleVoice
            option.selected = true
        }else if(microsoftVoice && option.value === microsoftVoice.name){
            utterance.voice = microsoftVoice
            option.selected = true
        }

        option.textContent = `${lang} | ${name}`
        selectElement.appendChild(option)
    })
})

buttonInsertText.addEventListener('click',() => {
    divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click',() => {
    divTextBox.classList.remove('show')
})
 

selectElement.addEventListener('change', setVoice)

buttonReadText.addEventListener('click',() => {
    setTextMessage(textArea.value)
    speakText()
})
