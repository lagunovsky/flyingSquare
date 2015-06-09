/*!
 * flying-square
 * 
 * 
 * @author [object Object]
 * @version 1.0.0
 * Copyright 2015.
 */
var Game={Socket:io("localhost:3000"),Players:[],Player:{}};Game.Boot={init:function(){this.game.stage.backgroundColor="#e2e2e2",this.input.maxPointers=1,this.stage.disableVisibilityChange=!0},preload:function(){this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.scale.setScreenSize(!0),this.load.image("progressBar","/gfx/progress_bar.png")},create:function(){this.physics.startSystem(Phaser.Physics.ARCADE),this.state.start("Preloader")}},Game.Menu={create:function(){this.music=this.add.audio("menu-music",.5,!0),this.music.play(),this.keySpacebar=this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);var t=this.add.text(this.world.centerX,0,"FlyingSquare!",{font:"Squada One",fontSize:100,fill:"#333"});t.anchor.setTo(.5,.5);var e=this.add.tween(t);e.to({y:this.world.centerY-200},1e3).easing(Phaser.Easing.Bounce.Out).start();var a=this.add.text(this.world.centerX,0,"Players:",{font:"Squada One",fontSize:30,fill:"#333"});a.anchor.setTo(.5,.5);var i=this.add.tween(a);i.to({y:this.world.centerY-80},1e3).easing(Phaser.Easing.Bounce.Out).start();var r=this.add.text(this.world.centerX,this.world.centerY+100,"PRESS SPACEBAR TO BEGIN",{font:"Squada One",fontSize:40,fill:"#333"});r.angle=(2+5*Math.random())*(Math.random()>.5?1:-1),r.anchor.setTo(.5,.5);var s=this.add.tween(r);s.to({angle:-r.angle},200+200*Math.random(),Phaser.Easing.Linear.None,!0,0,1e3,!0);var o=this.add.emitter(this.world.centerX,this.world.height+20,100);o.makeParticles(this.cache.getBitmapData("square")),o.maxParticleScale=1.2,o.minParticleScale=.2,o.setYSpeed(-100,-100),o.setXSpeed(-30,30),o.gravity=0,o.width=this.world.width,o.minRotation=0,o.maxRotation=45,o.flow(25e3,500),this.keySpacebar.onDown.addOnce(function(){},this)},update:function(){}},Game.Play={create:function(){this.tick=0,this.gameMusic=this.add.audio("background-music",.5,!0),this.explosion=this.add.audio("explosion",1,!1),this.keySpacebar=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),this.keySpacebar.onDown.add(this.startGame,this),this.readyToPlay=!1,this.hasStarted=!1,this.dead=!1,this.speed=-500,this.speedInterval=200,this.speedGain=-50,this.speedMin=-5e3,this.variance=0,this.varianceInterval=200,this.varianceGain=5,this.varianceMax=150,this.blockSize=20,this.createBlockSets(),this.scoreStyle={font:"40px Squada One",fill:"#fff",align:"center"},this.textScore=game.add.text(game.width/2,game.height/2-320,"SCORE: 0",this.scoreStyle),this.textScore.anchor.set(.5,.5),this.game.device.localStorage&&(localStorage.bestScoreCurvy?this.bestScore=localStorage.bestScoreCurvy:(localStorage.bestScoreCurvy=0,this.bestScore=0),this.textBest=game.add.text(game.width/2,game.height/2+340,"BEST: "+this.bestScore,this.scoreStyle),this.textBest.anchor.set(.5,.5)),this.readyToPlay=!0,this.emitterDark=game.add.emitter(0,0,1e3),this.emitterDark.makeParticles(game.cache.getBitmapData("square")),this.emitterDark.minParticleScale=.1,this.emitterDark.maxParticleScale=.5,this.emitterDark.setYSpeed(-15,15),this.emitterDark.setXSpeed(-15,15),this.emitterDark.gravity=-10,this.hero=new Game.Copter({},this)},update:function(){var t=this;this.hasStarted&&(this.tick%this.speedInterval!==0||this.dead?this.dead&&(this.speed*=.99):this.speed>this.speedMin&&(this.speed+=this.speedGain),this.tick%this.varianceInterval===0&&this.variance<this.varianceMax&&(this.variance+=this.varianceGain,this.blockSets[0].tracer.yVariance=this.variance,this.blockSets[0].tracer.hVariance=this.variance),this.blockSets.forEach(function(t){t.update()}),this.textScore.setText("SCORE: "+this.tick),this.game.device.localStorage&&this.textBest.setText("BEST: "+Math.max(this.tick,this.bestScore)),t.emitterDark.forEachAlive(function(e){e.alpha=e.lifespan/t.emitterDark.lifespan}),this.dead||this.tick++)},shutdown:function(){this.blockSets[0].blockGroup.destroy(),this.blockSets[0].blockGroup=null,this.blockSets.length=0,this.blockSets=null,this.hero.destroy(),this.hero=null},startGame:function(){!this.hasStarted&&this.readyToPlay&&(this.hasStarted=!0,this.gameMusic.play(),this.hero.body.allowGravity=!0)},createBlockSets:function(){this.blockSets=[];this.blockSets.push(new Game.Blocks({},this))},gameover:function(){var t=this;this.dead||(this.dead=!0,this.explosion.play(),this.gameMusic.stop(),this.tick>this.bestScore&&(localStorage.bestScoreCurvy=this.tick),game.time.events.add(1.5*Phaser.Timer.SECOND,function(){game.state.start("Play")},t))}},Game.Preloader={preload:function(){var t=this.add.text(this.world.centerX,this.world.centerY,"LOADING...",{font:"Squada One",fontSize:200,fill:"#333"});t.anchor.setTo(.5,.5),this.load.audio("menu-music",["/audio/menu.mp3","/audio/menu.ogg"]),this.load.audio("background-music",["/audio/background.mp3","/audio/background.ogg"]),this.load.audio("explosion",["/audio/explosion.mp3","/audio/explosion.ogg"]);var e=this.add.bitmapData(20,20);e.context.fillStyle="#333",e.context.fillRect(0,0,20,20),this.cache.addBitmapData("square",e);var a=this.add.bitmapData(1,1);a.context.fillStyle="#444",a.context.fillRect(0,0,1,1),this.cache.addBitmapData("block",a);var i=this.add.bitmapData(1,1);i.context.fillStyle="#959595",i.context.fillRect(0,0,1,1),this.cache.addBitmapData("block2",i);var r=this.add.bitmapData(1,1);r.context.fillStyle="#262525",r.context.fillRect(0,0,1,1),this.cache.addBitmapData("block3",r);var s=this.add.bitmapData(32,32);s.context.fillStyle="#111",s.context.fillRect(0,0,32,32),this.cache.addBitmapData("hero",s)},create:function(){this.time.events.add(.5*Phaser.Timer.SECOND,function(){this.state.start("Menu")},this)},update:function(){}},Game.Blocks=function(t,e){var a=this;a.state=e,a.blockGroup=game.add.group(),a.blockGroup.enableBody=!0,a.blockGroup.createMultiple(300,game.cache.getBitmapData("block")),a.tick=0,a.tracer={y:game.height/2-300,yMin:150,yMax:game.height-100,yVariance:a.state.variance,h:500,hMin:300,hMax:700,hVariance:a.state.variance},a.fillScreen(0,!0)},Game.Blocks.prototype.update=function(){var t=this,e=100,a=0;t.blockGroup.forEachAlive(function(i){t.state.hasStarted&&(i.body.velocity.x=t.state.speed),e=Math.min(e,i.body.x+t.state.blockSize),a=Math.max(a,i.body.x+t.state.blockSize)}),t.blockGroup.forEachAlive(function(t){t.x+t.body.width<0&&t.kill()}),t.fillScreen(a,!1)},Game.Blocks.prototype.updateTracer=function(){var t=this;if(t.tracer.y+=Phaser.Utils.Rand(-t.tracer.yVariance,t.tracer.yVariance),t.tracer.y=Math.min(Math.max(t.tracer.yMin,t.tracer.y),t.tracer.yMax),t.tracer.h+=Phaser.Utils.Rand(-t.tracer.hVariance,t.tracer.hVariance),t.tracer.h=Math.min(Math.max(t.tracer.hMin,t.tracer.h),t.tracer.hMax),t.tracer.y+t.tracer.h>t.tracer.yMax){var e=(t.tracer.y+t.tracer.h-t.tracer.yMax)/2;t.tracer.y-=e,t.tracer.h-=e}},Game.Blocks.prototype.fillScreen=function(t,e){var a=this;if(e||a.state.hasStarted)for(;t<game.width+a.state.blockSize-a.state.speed;){a.updateTracer(),a.tick++;var i,r,s,o;i=0,r=a.tracer.y,s=r+a.tracer.h,o=game.height-s,newBlockTop=a.createOne(t,i,a.state.blockSize,r),newBlockBot=a.createOne(t,s,a.state.blockSize,o),e||(newBlockTop.body.velocity.x=a.state.speed,newBlockBot.body.velocity.x=a.state.speed),t+=a.state.blockSize}},Game.Blocks.prototype.createOne=function(t,e,a,i){var r=this;if(r.blockGroup.countDead())var s=r.blockGroup.getFirstDead();else var s=r.blockGroup.create(t,e,game.cache.getBitmapData("block"));return s.reset(t,e),s.body.allowGravity=!1,s.body.immovable=!0,s.scale.x=a+10,s.scale.y=i+10,s},Game.Copter=function(t,e){var a=this;a.state=e,Phaser.Sprite.call(a,game,200,game.height/2,game.cache.getBitmapData("hero")),a.anchor.setTo(.5,.5),game.physics.arcade.enableBody(a),a.body.allowGravity=!1,a.body.width=32,a.body.height=32,a.body.gravity.y=1e3,game.add.existing(a)},Game.Copter.prototype=Object.create(Phaser.Sprite.prototype),Game.Copter.prototype.constructor=Game.Copter,Game.Copter.prototype.update=function(){var t=this;t.state.hasStarted&&!this.state.dead&&(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)&&(this.body.velocity.y-=35),this.body.velocity.y<=-300&&(this.body.velocity.y=-300),t.angle=this.body.velocity.y/6-10),game.physics.arcade.collide(t,t.state.blockSets[0].blockGroup,t.die,null,this)},Game.Copter.prototype.die=function(){var t=this;this.state.dead||(t.state.emitterDark.x=this.x,t.state.emitterDark.y=this.y,t.state.emitterDark.start(!0,2e3,null,100),t.state.emitterDark.forEachAlive(function(e){e.body.velocity.x+=t.state.speed/2}),this.alpha=0,this.state.gameover())},Phaser.Utils.Rand=function(t,e){return game.rnd.integerInRange(1e3*t,1e3*e)/1e3},Game.Socket.on("playerConnected",function(t){Game.Player=t,console.log(t)}),Game.Socket.on("getAllPlayers",function(t){Game.Players=t,console.log(Game.Players)});var innerWidth=window.innerWidth,innerHeight=window.innerHeight,gameRatio=innerWidth/innerHeight,game=new Phaser.Game(Math.ceil(800*gameRatio),800,Phaser.AUTO,"gameContainer");game.global={},game.state.add("Boot",Game.Boot),game.state.add("Preloader",Game.Preloader),game.state.add("Menu",Game.Menu),game.state.add("Play",Game.Play),game.state.start("Boot");
//# sourceMappingURL=app.js.map