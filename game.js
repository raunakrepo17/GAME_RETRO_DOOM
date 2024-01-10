const canvas = document.querySelector('canvas')
const scores = document.querySelector('#scores')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Background {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw() {
        if(!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y) 
    }
    update() {
        this.draw()
    }
}

const background = new Background({
      position: {
           x: 0,
           y: 0
      },
      imageSrc: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/6bf83e1e-c778-45cd-9bd3-4ffc0d4638e4_scaled.jpg'
})

class Player {
    constructor() {   
        this.position = {
            x: canvas.width,
            y: canvas.height
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.opacity = 1
const image = new Image()
image.src = 'https://static.vecteezy.com/system/resources/previews/015/242/306/original/aircraft-or-airplane-on-top-view-png.png'
image.onload = () => {
    const scale = 0.07
    this.image = image
    this.width = image.width * scale
    this.height = image.height * scale
    this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 30
    }
}

    }
    draw() {
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, 100, this.height)
       
        c.globalAlpha = this.opacity
       
        
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

update() {
    if(this.image){
        this.draw()
        this.position.x += this.velocity.x 
    }
    
}
   
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position 
        this.velocity = velocity

        this.radius = 3
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class InvaderProjectile {
    constructor({position, velocity}) {
        this.position = position 
        this.velocity = velocity

        this.width = 3
        this.height = 10
    }
    draw(){
       c.fillStyle = 'white'
       c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Invader {
    constructor({position}) {   
        this.position = {
            x: canvas.width,
            y: canvas.height
        }
        this.velocity = {
            x: 0,
            y: 0
        }
const image = new Image()
image.src = 'https://art.pixilart.com/307e71bc2e6114c.png'
image.onload = () => {
    const scale = 0.04
    this.image = image
    this.width = image.width * scale
    this.height = image.height * scale
    this.position = {
        x: position.x,
        y: position.y
    }
}

    }
    draw() {
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, 100, this.height)
       
       
        
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

update({velocity}) {
    if(this.image){
        this.draw()
        this.position.x += velocity.x 
        this.position.y += velocity.y

    }
    
}
   shoot(invaderProjectiles) {
       invaderProjectiles.push(new InvaderProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height
          },
          velocity: {
            x: 0,
            y: 6
          }
       }))
   }
}

class Grids {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 3,
            y: 0
        }
        this.invaders = []

        const coloumns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = coloumns * 40

        for (let x = 0; x < coloumns; x++) {
        for (let y = 0; y < rows; y++) {
            this.invaders.push(new Invader({position: {
                x: x * 40,
                y: y * 20
            }}))
        }}
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if(this.position.x + this.width >= canvas.width || this.position.x <= 0) {
                 this.velocity.x = -this.velocity.x
                 this.velocity.y = 20
        }

    }
}

const invaderProjectiles = []
const projectiles = [] 
const grids = [new Grids()]
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

let score = 0 

const player = new Player({
        x: 200,
        y: 200
}) 

let frames = 0 
let game = {
      over: false,
      active: false
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, innerWidth, innerHeight)

    c.save()
    c.scale(2,1.40)
    background.update()
    c.restore()
    player.update()

    invaderProjectiles.forEach((invaderProjectile, index) => {

        if(invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
               invaderProjectiles.splice(index, 1)
                }, 0)
              
        }
         else{
            invaderProjectile.update()}
        if(invaderProjectile.position.y + invaderProjectile.height >= player.position.y && 
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width) {
                player.opacity = 0
                game.over = true
            }
    })

    projectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
            projectiles.splice(index, 1)
            }, 0)
          
        }
        else {
        projectile.update()
            }
       
    })

     grids.forEach((grid) => {
        grid.update()

        if(frames % 100 === 0 && grid.invaders.length > 0) {

            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }
        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity})

            projectiles.forEach((projectile, j) => {
               if(projectile.position.y - projectile.radius <= invader.position.y + invader.height && 
                projectile.position.x + projectile.radius >= invader.position.x &&
                projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                projectile.position.y + projectile.radius >= invader.position.y) {

                 setTimeout(() => {
                    const invaderFound = grid.invaders.find((invader2) => invader2 === invader)

                    const projectileFound = projectiles.find((projectile2) => projectile2 === projectile)
                    if(invaderFound && projectileFound) {
                        score += 100
                        scores.innerHTML = score
                     grid.invaders.splice(i, 1)
                     projectiles.splice(j, 1)
                    }
                 }, 0)
               }
            })
        })
     })

   if(keys.d.pressed && player.position.x + player.width <= canvas.width) {
    player.velocity.x = 7
   }
   else if(keys.a.pressed && player.position.x >= 0 ) {
    player.velocity.x = -7
   }
   else {
    player.velocity.x = 0
   }
   if(frames % 1000 === 0) {
     grids.push(new Grids())
   }

   frames++
}
animate()

addEventListener('keydown', ({key}) => {
    switch(key){
        case 'd':
        keys.d.pressed = true
        break
        case 'a':
        keys.a.pressed= true
        break
        case ' ':
        projectiles.push(new Projectile ({
            position: {
               x: player.position.x + player.width / 2,
               y: player.position.y
            },
            velocity: {
                x: 0,
                y: -10
            }
        }))
        break
    }
})

addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
    }
})