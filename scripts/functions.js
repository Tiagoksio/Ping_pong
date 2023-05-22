import {canvasE1, canvasCtx, field , mouse, centerLine , leftBar , rightBar , ball , scoreboard} from './objects.js'

export function setup() {
    canvasE1.width = canvasCtx.width = window.innerWidth
    canvasE1.height = canvasCtx.height = window.innerHeight            
}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

export function draw() {
    field.draw()
    scoreboard.draw()
    centerLine.draw()
    leftBar.draw()            
    rightBar.draw()
    ball.draw()
}

export function main() {
    animateFrame(main)
    draw()
}

canvasE1.addEventListener("mousemove", function (e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
})