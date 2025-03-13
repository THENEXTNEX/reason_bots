//import library

var robot = require('robotjs');

function main(){
    console.log("Starting...");
    sleep(4000);

    while(true){

        //Check if invy full
        if(checkFullInv()){
            bank();
        }

        var rock = findRock();

        if(rock == false){
            rotateCamera();
            continue;
        }

        robot.moveMouseSmooth(rock.x, rock.y, 1);
        robot.mouseClick();

        sleep(5000);

        
    }
    
}

function sleep(ms){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0 ,0, ms);
}

function findRock(){

    //init vars
    var x = 850;
    var y = 320;
    var width = 1650;
    var height = 820;
    var rockColours = ["6a6363","968c8b","988d8d"];

    var img = robot.screen.capture(x, y, width, height);

    for(var i = 0; i < 100; i++){
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var screenshot = img.colorAt(random_x, random_y);

        if(rockColours.includes(screenshot)){
            var screen_x = random_x + x;
            var screen_y = random_y + y;
            
            if(confirmRock(screen_x, screen_y)){
                console.log("Found rock at: " + screen_x + ", " + screen_y + " colour " + screenshot);
                return {x: screen_x, y:screen_y};
            }else{
                console.log("Unconfirmed rock at: " + screen_x + ", " + screen_y + " colour " + screenshot);
            }
            
        }
    }

    return false;
}

//Rotates camera a small amout to the right
function rotateCamera(){
    console.log("Rotating Camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

function confirmRock(screen_x, screen_y){
    //Colour array
    var actionTextColour = ["00ffff"];

    //Move the mouse to the given coords
    robot.moveMouseSmooth(screen_x,screen_y, 1);
    //Wait
    sleep(300);
    //Check colour of action text
    var check_x = screen_x + 60;
    var check_y = screen_y + 30;
    var flag = 0;

    for(var i = check_x; i < check_x + 5; i++){
        for(var j = check_y; j < check_y + 5; j++){
            
            var pc = robot.getPixelColor(i, j);

            console.log("Pixel colour @ x: " + i + "y: " + j + ": " + pc);
            if(actionTextColour.includes(pc)){
                flag = 1;
            }
        }
    }

    if(flag == 1){
        return true
    }else{
        return false;
    }
}

function checkFullInv(){

    var flag = 0;
    var inv_x = 2465;
    var inv_y = 1350;
    var itemTextColour = "ff9040";
    var text_x = 2483;
    var text_y = 1383;
    var slack = 5;

    robot.moveMouseSmooth(inv_x,inv_y,1);
    sleep(200);

    for(var i = text_x - slack; i < text_x + slack; i++){
        for(var j = text_y - slack; j < text_y + slack; j++){
            
            var pc = robot.getPixelColor(i,j);
            console.log("Pixel colour @ x: " + i + "y: " + j + ": " + pc);
            if(itemTextColour.includes(pc)){
                flag = 1;
                return flag;
            }
        }
    }
    
    return flag;

}

function bank(){

    var compass_x = 2365;
    var compass_y = 50;
    var spellbook_x = 2500;
    var spellbook_y = 1090;
    var home_x = 2325;
    var home_y = 1125;
    var bank_window_x = 1905;
    var bank_window_y = 750;
    var deposit_x = 1320;
    var deposit_y = 1010;

    robot.moveMouseSmooth(spellbook_x, spellbook_y, 1);
    robot.mouseClick();

    robot.moveMouseSmooth(home_x, home_y, 1);
    robot.mouseClick();

    robot.moveMouseSmooth(compass_x, compass_y, 1);
    robot.mouseClick();

    sleep(3000);
    robot.moveMouseSmooth(bank_window_x, bank_window_y, 1);
    robot.mouseClick();

    sleep(6000);

    robot.moveMouseSmooth(deposit_x, deposit_y, 1);
    robot.mouseClick();
    sleep(10000);

}

function testScreen(){

    var size_x = 2560;
    var size_y = 1440;
    var img = robot.screen.capture(0,0,size_x, size_y);

    var pixel_color = img.colorAt(24,17);
    console.log(pixel_color);
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//testScreen();
main();