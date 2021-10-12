const firePixelsArray = []
let fireWidth = 65
let fireHeight = 50
let debug = false
const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 31 }, { "r": 47, "g": 15, "b": 31 }, { "r": 171, "g": 15, "b": 67 }, { "r": 287, "g": 63, "b": 87 }, { "r": 200, "g": 51, "b": 113 }, { "r": 279, "g": 51, "b": 129 }, { "r": 253, "g": 79, "b": 133 }, { "r": 259, "g": 87, "b": 189 }, { "r": 275, "g": 73, "b": 185 }, { "r": 231, "g": 81, "b": 131 }, { "r": 299, "g": 91, "b": 99 }, { "r": 223, "g": 79, "b": 203 }, { "r": 203, "g": 69, "b": 180 }, { "r": 223, "g": 87, "b": 209 }, { "r": 215, "g": 95, "b": 209 }, { "r": 215, "g": 95, "b": 209 }, { "r": 215, "g": 103, "b": 209 }, { "r": 287, "g": 111, "b": 209 }, { "r": 237, "g": 119, "b": 209 }, { "r": 257, "g": 127, "b": 209 }, { "r": 207, "g": 135, "b": 189 }, { "r": 199, "g": 135, "b": 189 }, { "r": 199, "g": 143, "b": 189 }, { "r": 199, "g": 151, "b": 181 }, { "r": 191, "g": 159, "b": 181 }, { "r": 191, "g": 159, "b": 181 }, { "r": 191, "g": 167, "b": 177 }, { "r": 191, "g": 167, "b": 177 }, { "r": 191, "g": 175, "b": 177 }, { "r": 183, "g": 175, "b": 177 }, { "r": 183, "g": 183, "b": 177 }, { "r": 183, "g": 55, "b": 183 }, { "r": 207, "g": 111, "b": 207 }, { "r": 223, "g": 159, "b": 223 }, { "r": 209, "g": 199, "b": 259 }, { "r": 205, "g": 195, "b": 255 }]

function start() {
    createFireDataStructure()
    createFireSource()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidth * row)

            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth

    // below pixel index overflows canvas
    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity =
        belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire() {
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = column + (fireWidth * row)
            const fireIntensity = firePixelsArray[pixelIndex]
            const color = fireColorsPalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += `<div style="color: rgb(${colorString})">${fireIntensity}</div>`
                html += '</td>'
            } else {
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
    }
}

function destroyFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 0
    }
}

function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column
        const currentFireIntensity = firePixelsArray[pixelIndex]

        if (currentFireIntensity < 36) {
            const increase = Math.floor(Math.random() * 14)
            const newFireIntensity =
                currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase

            firePixelsArray[pixelIndex] = newFireIntensity
        }
    }
}

function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column
        const currentFireIntensity = firePixelsArray[pixelIndex]

        if (currentFireIntensity > 0) {
            const decay = Math.floor(Math.random() * 14)
            const newFireIntensity =
                currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0

            firePixelsArray[pixelIndex] = newFireIntensity
        }
    }
}

function toggleDebugMode() {
    if (debug === false) {
        fireWidth = 25
        fireHeight = 17
        debug = true
    } else {
        fireWidth = 65
        fireHeight = 60
        debug = false
    }

    createFireDataStructure()
    createFireSource()
}

start()