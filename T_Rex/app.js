document.addEventListener('DOMContentLoaded', () => {
    const dino =  document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    const body = document.querySelector('.body');
    let isJumping = false;
    let gravity = 0.91;
    let isGameOver = false;

    function control(e) {
        if(e.keyCode === 32){ //the space 
            if(!isJumping){ //to avoid doble jump
                isJumping = true;
                jump();
            }
        }
    }

    document.addEventListener('keyup',control);
    let position = 0;

    function jump(){
        let count = 0;
        let timerId = setInterval(function () {
        // setInterval executes the function every ms period of time specified, in this case jump() every 20ms.
        if (count === 15){
            clearInterval(timerId); //To stop the up functionality
            //console.log('down');
            let downTimerId = setInterval(function (){
                if(count === 0){
                    clearInterval(downTimerId);
                    isJumping = false;
                }
                position -= 5;
                count --;
                position *= gravity;
                dino.style.bottom = position + 'px';
            },20);
        }//In order to bring the dino down after the jump
        //console.log('up')
        count ++;
        position += 30; //30px
        position *= gravity;
        dino.style.bottom = position + 'px';
        //adding 30 px; to the bottom property in style of the class dino
        //console.log(dino.style.bottom);
        },20);
    }

    function generateObstacle(){
        let max = 5000; //ms
        let min = 1000; //ms
        let randomTime = Math.random() * (max - min) + min; //generates random time (min-max) for next obstacle
        let obstaclePosition = 2000; //start dist from dino in rems 
        const obstacle = document.createElement('div'); //It creates a div and add a class 'obstacle' to it.
        if(!isGameOver) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle); //passing the obstacle to the div.grid in the html
        obstacle.style.left = obstaclePosition + 'rem'; //moving the obstacle to the right

        let timerId = setInterval(function () {
            if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
                clearInterval(timerId);
                alert.innerHTML = 'Game Over';
                isGameOver = true;
                //remove all children when game over
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild);
                };
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        },20);

        if(!isGameOver) setTimeout(generateObstacle, randomTime);//calls the function (first arg) when time (second arg) has passed if the game is not over} 
    }
    generateObstacle();
})