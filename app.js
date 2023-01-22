const cols = document.querySelectorAll('.col')

//меняем цвета нажатие на пробел
document.addEventListener('keydown', (event) => {
    //устраняем баг: принажатии на пробел иконки сбрасываются; отменяем дефолтное поведение
    event.preventDefault()

    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

//добавляем кликабельность на замки
document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if ( type === 'lock') {
        const node =
            event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
        // меняем иконки при нажатии
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copia') {
        copyToClickboard(event.target.textContent)
    } //функция копирования номера цвета при нажатии на него
})


function generateRandomColor() {
    //RGB палирта состоит из этих символов
    const hexCodes = '0123456789ABCDEF'
    // будущий цвет попадет сюда
    let color = ''
    for (let i = 0; i<6; i++){
        color +=hexCodes[Math.floor(Math.random()* hexCodes.length)]
    }
    return '#' + color
}

//функция копирования номера цвета при нажатии на него
function copyToClickboard(text){
    return navigator.clipboard.writeText(text)
}

function setRandomColors() {
    const colors =  []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = chroma.random() // вместо generateRandomColor()

        //закрепляем цвет, чтобы не менялся
        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        colors.push(color)

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    });

    updateColorsHash(colors)
}

function setTextColor (text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'

}

function updateColorsHash (colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
    }).join('-')

}

function getColorsFromHash(){
    if (document.location.hash.length > 1) {
        return document.location.hash //эта строчка вернет список всех цветов в хэше без # и -
            .substring(1)
            .split('-')
            .map(color => '#' + color) //добавляем для каждого метода #
    }
    return []
}
setRandomColors()