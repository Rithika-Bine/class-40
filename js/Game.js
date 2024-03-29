class Game {
    constructor() { }

    getState() {
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value", function (data) {
            gameState = data.val()
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    async start() {
        if (gameState === 0) {
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value")
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val()
                player.getCount()
            }

            form = new Form()
            form.display()
        }
        car1=createSprite(100,200)
        car1.addImage(car1_img)
        car2=createSprite(300,200)
        car2.addImage(car2_img)
        car3=createSprite(500,200)
        car3.addImage(car3_img)
        car4=createSprite(700,200)
        car4.addImage(car4_img)
        cars=[car1,car2,car3,car4]
    }

    play() {
        form.hide()

        textSize(30)
        text("Game Start", 120, 100)



        Player.getPlayerInfo()

        if (allPlayers !== undefined) {
            background(ground)
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
            
            var y = 0,x=175
            var index=0
            for (var p in allPlayers) {
                index=index+1
            x=x+200
            y=displayHeight-allPlayers[p].distance

            cars[index-1].x=x
            cars[index-1].y=y

            if(index===player.index){
                stroke(10)
                fill("red")
                ellipse(x,y,70,70)
                camera.position.x=displayWidth/2
                camera.position.y=cars[index-1].y
            }
            }
        }
        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 50
            player.update()
        }
        if(player.distance>displayHeight*5){
            gameState=2
        }
        drawSprites()
    }

    end(){
        console.log("game ended")
    }
}
