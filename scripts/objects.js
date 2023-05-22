
export const canvasE1 = document.querySelector("canvas"), 
    canvasCtx = canvasE1.getContext("2d")

const marginBar = 10

export const mouse = {
    x: 0,
    y: 0
}


export const field = {
    w: window.innerWidth,
    h: window.innerHeight, 
    draw: function () {
        canvasCtx.fillStyle = "#286047"
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}

export const centerLine = {
    w: 15,
    h: field.h,
    draw: function () {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)
    }          

}

export const leftBar = {
    x: marginBar,
    y: 0,
    w: centerLine.w,
    h: 200,

    _move: function () {
        this.y = mouse.y - this.h / 2
    },
    draw: function () {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)

        this._move()
    }

}

export const rightBar = {
    x: field.w - centerLine.w - marginBar,
    y: 0,
    w: centerLine.w,
    h: 200,
    speed: 5,

    _move: function () {
        if (this.y + this.h / 2 < ball.y + ball.r) {
            this.y += this.speed
        } else {
            this.y -= this.speed
        }
    },
    speedUp: function () {
        this.speed += 2
    },

    draw: function () {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._move()
    }          
}

export const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    speed: 3,
    directionY: 1,
    directionX: 1,

    _calcPosition: function () {
        if (
            this.y > field.h - this.r && 
            this.directionY > 0 || 
            this.y - this.r < 0 && 
            this.directionY < 0
        ) {
            this._reverseY()
        }
        
        if (this.x > field.w - this.r - rightBar.w - marginBar) {
            if ( 
                this.y + this.r > rightBar.y && 
                this.y - this.r < rightBar.y + rightBar.h
            ) {
                this._reverseX()
            } else {
                scoreboard.increaseHuman()
                this._pointUp()
            }
        }

        if (this.x < this.r + leftBar.w + marginBar) {
            if (
                this.y + this.r > leftBar.y &&
                this.y - this.r < leftBar.y + leftBar.h
            ) {
                this._reverseX()
            } else {
                scoreboard.increaseComputer()
                this._pointUp()
            }
            
        }

    },

    _pointUp: function() {
        this._speedUp()
        rightBar.speedUp()

        this.x = field.w / 2
        this.y = field.h / 2
    },
    _reverseY: function () {
        this.directionY *= -1
    },

    _reverseX: function () {
        this.directionX *= -1
    },
    _speedUp: function () {
        this.speed += 2
    },
    _move: function () {
        this.x += this.directionX * this.speed
        this.y += this.directionY * this.speed
    },

    draw: function () {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, this.startAngle, this.endAngle * Math.PI, false)
        canvasCtx.fill()

        this._calcPosition()
        this._move()
    }
    
}

export const scoreboard = {
    human: 0,
    computer: 0,
    increaseHuman: function () {
        this.human++
    },
    
    increaseComputer: function () {
        this.computer++
    },

    draw: function () {
        canvasCtx.font = "bold 72px Arial"
        canvasCtx.textAlign = "center"
        canvasCtx.textBaseline = "top"
        canvasCtx.fillStyle = "#01341D"
        canvasCtx.fillText(this.human, (field.w - centerLine.w) / 4, 50)
        canvasCtx.fillText(this.computer, (field.w - centerLine.w) / 4 * 3, 50)
    }
}
