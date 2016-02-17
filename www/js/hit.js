//when a player hits the enemies

hitEnemy = function(circle, ring) {
	
		ring.kill();
		this.score = this.score + 100;
		this.sfx_hit.play();
};

missEnemy = function(ring) {
    ring.destroy();
    console.log("Miss");
    this.score = this.score -500;
    this.sfx_miss.play();
}
