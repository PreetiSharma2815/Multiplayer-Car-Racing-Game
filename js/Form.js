class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Multiplayer Car Racing Game");
    this.title.position(displayWidth - 830, 0);
    
    this.input.position(displayWidth/2 - 100 , displayHeight/2 - 200);
    this.button.position(displayWidth/2 + 30, displayHeight/2-150);
    this.reset.position(displayWidth-100,20);

    this.input.size(200, 20); 
    let col = color(25, 23, 200, 100);
    let col2 = color(25, 200, 200, 100);
    this.title.style('color', color(253,248,210, 200));  
    
    this.input.style('background-color', color(253,248,210, 50));    
    this.button.style('background-color', col);
    this.reset.style('background-color', col2);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();

      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);

      this.greeting.html("Hello " + player.name +" !")
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

    this.reset.mousePressed(()=>{     
        player.updateCount(0);
        game.update(0);
        Player.updateCarsAtEnd(0)
        window.location.reload()
      
    });

  }
}
