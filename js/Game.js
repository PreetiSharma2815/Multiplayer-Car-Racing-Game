class Game {

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {

      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);

    cars = [car1,car2,car3,car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {

      background(rgb(65,65,65));
      //image(trackplus,0,0,displayWidth,displayHeight);

      image(track,0,-displayHeight * 6,displayWidth,displayHeight * 7);

      //image(trackplus,0,-displayHeight * 7,displayWidth,displayHeight * 7);



      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y = 0;

      for (var plr in allPlayers) {

        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;

        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        allPlayers[plr].x = allPlayers[plr].x + x

        cars[index - 1].x = allPlayers[plr].x;
        cars[index - 1].y = y;

        console.log("car at",cars[index - 1].x,cars[index - 1].y)
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(cars[index - 1].x,cars[index - 1].y,60,60);

          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }

      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      //if (player.x > 0) {
      player.x -= 10
      player.update();
      //}

    }
    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      //if (player.x < width){
      player.x += 10
      player.update();
      //}
    }

    if (player.distance > 5200) {
      gameState = 2;
      player.rank += 1
      Player.updateCarsAtEnd(player.rank)
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    console.log(player.rank);
    console.log("window",displayWidth / 2,displayHeight / 2)
    //image(trackplus,0,0,displayWidth,displayHeight);

    image(track,0,-displayHeight * 6,displayWidth,displayHeight * 7);

    //image(trackplus,0,-displayHeight * 7,displayWidth,displayHeight * 7);
    if (frameCount % 50 === 0) {
      var rank = createSprite(Math.round(random(200,displayWidth),displayHeight/2 - 5000,50,50))
      rank.velocityY = -7
      rank.scale=0.3
      if (player.rank === 1) {
        // image(rank1,displayWidth/2,rankY,150,150);
        // rankY = rankY - 2
        rank.addImage(rank1)
        console.log("in")
      }
      else if (player.rank === 2) {
        // image(rank2,displayWidth/2,rankY,150,150);
        // rankY = rankY - 2
        rank.addImage(rank2)
      }
      else if (player.rank === 3) {
        // image(rank3,displayWidth/2,rankY,150,150);
        // rankY = rankY - 2
        rank.addImage(rank3)
      }
    }

    drawSprites();

  }
}
