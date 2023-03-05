const wrapper = document.querySelector('.wrapper')
const btn = document.querySelector('.form button')
const qrText = document.querySelector('.form input')
const qrIMG = document.querySelector('.qr-code img')
const downloadBtn = document.querySelector('.download-btn')
const foreground = document.querySelector('.foreground')
const background = document.querySelector('.background')
const sizes = document.querySelector('.sizes')
const formats = document.querySelector('.format')

foreground.addEventListener('input', darkColor)
background.addEventListener('input', lightColor)
sizes.addEventListener('change', changeSize)
formats.addEventListener('change', changeFormat)

let colorLight = '9DC08B'
let colorDark = '000'
let size = 500
let format = 'png'
function darkColor(e) {
    colorDark = e.target.value;
    colorDark = colorDark.slice(1)
    generateQR();
}
function lightColor(e) {
    colorLight = e.target.value;
    colorLight = colorLight.slice(1)
    generateQR();
}
function changeSize(e) {
    size = e.target.value;
    generateQR();
}
function changeFormat(e) {
    format = e.target.value;
    generateQR();
}



function generateQR() {
    let qrVal = qrText.value
    let qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${qrVal}&color=${colorDark}&bgcolor=${colorLight}&format=${format}`

    qrIMG.src = qrLink
    btn.innerText = 'Generating QR Code...'
    downloadBtn.href = qrLink

    if (qrVal)
        qrIMG.addEventListener('load', () => {
            wrapper.classList.add('active')
            btn.innerText = 'Generate QR Code'
        })
    else
        return
}

btn.addEventListener('click', () => {
    generateQR();
})
qrText.addEventListener('keyup', (hit) => {

    if (!qrText.value) {
        wrapper.classList.remove('active')
    }
    else {
        if (hit.key == "Enter")
            generateQR()
    }
})

