class Disk {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 24
        this.vx = 0
        this.vy = 0
    }

    checkAllCollisions(){
        var disk;
        for(var i = 0; i < disksNum; i++){
          disk = disks[i];
          disk.checkCollision(i, disks);
        }
    }
    createAllDisks() {
        var disk;
        for (var i = 0; i < disksNum; i++) {
            disk = createDisk();
            disks.push(disk);
        }
    }
    manageInput(){
        if(isMouseDown && draggedDisk == null){
            var disk;
            for(var i = 0; i < disksNum; i++){
                disk = disks[i];
                if(disk.containsPoint(mouseX, mouseY)){
                    draggedDisk = disk;
                    canvas.addEventListener('mousemove', onDragDisk);
                    break;
                }
            }
      
        }
    }
    updateAllDisks() {
        var disk;
        for (var i = 0; i < disksNum; i++) {
            disk = disks[i];
            disk.update();
        }
    }
    drawAllDisks() {
        var disk;
        for (var i = 0; i < disksNum; i++) {
            disk = disks[i];
            disk.draw();
        }
    }
    
    createDisk() {
        var disk = {};
        disk.colour = generateHex(); 
        disk.radius = 20;
        disk.friction = 0.1;
        disk.x = (Math.random() * (stageWidth - (2 * disk.radius))) + disk.radius;
        disk.y = (Math.random() * (stageHeight - (2 * disk.radius))) + disk.radius;
        disk.vx = Math.random() * 40 - 20;
        disk.vy = Math.random() * 40 - 20;
        disk.checkCollision = function(i, arr){
          for(var j = i+1 ; j < arr.length; j++){
            var diskB = arr[j];
            var dx = diskB.x - this.x;
            var dy = diskB.y - this.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var minDist = this.radius + diskB.radius;
            if(dist < minDist){
              var angle = Math.atan2(dy, dx);
              var tx = this.x + Math.cos(angle) * minDist;
              var ty = this.y + Math.sin(angle) * minDist;
              var ax = (tx - diskB.x) * 0.5;
              var ay = (ty - diskB.y) * 0.5;
              diskB.vx += ax;
              diskB.vy += ay;
              this.vx -= ax;
              this.vy -= ay;
            }
          }
    
        }
        disk.containsPoint = function (x, y) {
            var dx = Math.abs(x - this.x);
            var dy = Math.abs(y - this.y);
            if(dx + dy < this.radius){
                return true
            }
        }
        disk.update = function () {
            if(this == draggedDisk){
                this.x = mouseX;
                this.y = mouseY;
                this.vx = this.vy = 0;
    
            }else{
                this.vy += gravity;
                var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                var angle = Math.atan2(this.vy, this.vx);
                if (speed > this.friction) {
                    speed -= this.friction;
                } else {
                    speed = 0;
                }
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.x += this.vx;
                this.y += this.vy;
                if (this.x - this.radius < 0) { // gone left
                    this.x = this.radius;
                    this.vx = -this.vx;
                } else if (this.x + this.radius > stageWidth) { // gone right
                    this.x = stageWidth - this.radius;
                    this.vx = -this.vx
                }
                if (this.y - this.radius < 0) { // gone up
                    this.y = this.radius;
                    this.vy = -this.vy;
                } else if (this.y + this.radius > stageHeight) { // gone down
                    this.y = stageHeight - this.radius;
                    this.vy = -this.vy;
                }
            }
    
        }
        disk.draw = function () {
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        return disk;
    }
}