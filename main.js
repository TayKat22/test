
var game = new Phaser.Game(960, 640, Phaser.AUTO, '');
	var counter = 0;
	var sound;
	var wolfHowl;
	var gong;

var MainMenu = function(game){}; //creating MainMenu and passing the game to it

MainMenu.prototype = {
	init: function(){
		
	},

	preload: function(){
		console.log('MainMenu: preload'); //for debugging

		// preload assets
		game.load.image('bg', 'assets/img/72x72-color/bg.png');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('controls', 'assets/img/controls.png');
		game.load.image('playerShipBlue', 'assets/img/player ship blue.png');
		game.load.image('playerShip', 'assets/img/player ship.png');
		game.load.image('player', 'assets/img/player.png');


	},
	create: function(){
		console.log('MainMenu: create');

		game.stage.backgroundColor = "#4E465B";
		var title = game.add.text(10, 20,'Starry Night');
		var instructions = game.add.text(10, 50, 'Press Spacebar to continue');

		//controls
		var controls = game.add.image(450,350, 'controls');
		var left = game.add.text(425,390 ,'Move Left');
		var right = game.add.text(630, 390, 'Move Right');
		var up = game.add.text(560,340 , 'Jump!');
		var space = game.add.text(520, 530, 'Also Jump!');

	},
	update: function() {
		//how to go to new game state
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		
			game.state.start('Play');
		}
	}
}

var Play = function(game){};

Play.prototype = {

	init: function(){
		
	},

	preload: function(){
		console.log('Play: preload');

	},
	create: function(){

		

		//game physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//background
		//https://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
		var background = game.add.tileSprite( 0, 
    	    this.game.height - this.game.cache.getImage('bg').height, 
        	this.game.width, 
	        this.game.cache.getImage('bg').height, 
	        'bg'
    	);

	  	background.autoScroll(-200,0); //make background scroll

		//player settings
		player = game.add.sprite(32,game.world.height - 150, 'player');
		game.physics.arcade.enable(player); //enabled physics

		playerShipBlue = game. add.sprite(32, game.world.height - 250, 'playerShipBlue');
		game.physics.arcade.enable(playerShipBlue);
		playerShip = game.add.sprite(32,game.world.height - 350, 'playerShip');
		game.physics.arcade.enable(playerShip);


		//physics properties
		player.body.collideWorldBounds = true;
		playerShip.body.collideWorldBounds = true;
		playerShipBlue.body.collideWorldBounds = true;

		//makes player input possible
		cursors = game.input.keyboard.createCursorKeys();

		

		this.scoreText = game.add.text(16,16,'Score: 0', {fontSize: '32px', fill: '#ffffff'}); //create scoretext



	},

	update: function(){
		
		//if player hits platform wont go through
	

		//resets velocity
		player.body.velocity.x = 0;
		playerShip.body.velocity.x = 0;
		playerShipBlue.body.velocity.x = 0;

		//controlling player and animations
		if(cursors.left.isDown)
		{
			//move to the left
			player.body.velocity.x = -300;
			playerShip.body.velocity.x = -300;
			playerShipBlue.body.velocity.x = -300;

			player.body.velocity.y = 0;
			playerShip.body.velocity.y = 0;
			playerShipBlue.body.velocity.y = 0;
		}
		else if (cursors.right.isDown)
		{
			//move to the right
			player.body.velocity.x = 300;
			playerShip.body.velocity.x = 300;
			playerShipBlue.body.velocity.x = 300;

			player.body.velocity.y = 0;
			playerShip.body.velocity.y = 0;
			playerShipBlue.body.velocity.y = 0;
		
		}else if(cursors.up.isDown)
		{
			player.body.velocity.y = -300;
			playerShip.body.velocity.y = -300;
			playerShipBlue.body.velocity.y = -300;

			player.body.velocity.x = 0;
			playerShip.body.velocity.x = 0;
			playerShipBlue.body.velocity.x = 0;

		}else if(cursors.down.isDown){
			player.body.velocity.y = 300;
			playerShip.body.velocity.y = 300;
			playerShipBlue.body.velocity.y = 300;

			player.body.velocity.x = 0;
			playerShip.body.velocity.x = 0;
			playerShipBlue.body.velocity.x = 0;

		}else{
			player.body.velocity.x = 0;
			playerShip.body.velocity.x = 0;
			playerShipBlue.body.velocity.x = 0;

			player.body.velocity.y = 0;
			playerShip.body.velocity.y = 0;
			playerShipBlue.body.velocity.y = 0;
		}

	
		
		//make sure nothing is hitting anything
	
		

	}
}




var GameOver = function(game){};

GameOver.prototype = {
	init: function(score){
		this.state = 'GameOver';
		this.score = score;
		
	},
	preload: function(){
		console.log('GameOver: preload');
	},
	create: function(){
		sound.stop();
		console.log('GameOver: create');
		var title = game.add.text(10, 20, 'Game Over');
		this.scoreText = game.add.text(10,50, 'Score: '+ this.score);
		var instructions = game.add.text(10, 80,'Press Spacebar to retry');
	},
	update: function(){
		//loop back to main when Spacebar is pressed
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
		}
	}
}

game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');