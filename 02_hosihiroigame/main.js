const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");




const starsrc = [
    "img/star_1.png",
    "img/star_2.png",
    "img/star_3.png"

];

const redstarsrc = [
    "img/red_star_1.png",
    "img/red_star_2.png",
    "img/red_star_3.png"

];
let gamestato = false;

let gamemode = 0;

const maxpoint = 35;

let point = 0;
const objBack = new Back(0, 0, 1300, 600, "img/haikei.jpg");
const objKago = new Kago(0, 500, 150, 70, "img/kago.png");

const objStar = [];
const objRedStar = [];

const bgm = new Audio('saunds/【フリーBGM】星の紛れ_だぁだ(hosinomagire_daada) - from YouTube.mp3');
bgm.preload = 'auto';
bgm.volume = 0.3;//ボリューム 50%


const getsaund = new Audio('saunds/きらーん2.mp3');
getsaund.preload = 'auto';
getsaund.volume = 0.3;//ボリューム 50%

const lostsaund = new Audio('saunds/ボヨン.mp3');
lostsaund.preload = 'auto';
lostsaund.volume = 0.3;//ボリューム 50%


window.addEventListener("load", setup);
window.addEventListener("keydown", keyDownEvent);

document.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX; // マウスのX座標

    objKago.moveMouse_X(mouseX);
});

function setup() {
    screenUpdate();

}
function screenUpdate() {

    setTimeout(screenUpdate, 16);

    if (bgm.currentTime >= 150) {
        bgm.currentTime = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); //canvasのクリア

    switch (gamemode) {

        case 0:

            objBack.drawimage(ctx);

            ctx.fillStyle = "#BBBB00"; // This is a gray color
            ctx.font = "150px hosifont";
            ctx.fillText("星拾いゲーム", 180, 200);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "150px hosifont";
            ctx.fillText("星拾いゲーム", 170, 200);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "50px hosifont";
            ctx.fillText(maxpoint + "個の星を拾ったらクリア！", 300, 450
            );

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "50px hosifont";
            ctx.fillText("赤い星を拾ってしまうと5個の星を落としてしまうよ！", 50, 510
            );

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "70px hosifont";
            ctx.fillText("spaceキーでスタート！", 270, 350);



            break;

        case 1:
            objBack.drawimage(ctx);
            objKago.drawimage(ctx);

            for (let i = 0; i < objStar.length; i++) {
                if (objStar[i] != null) {
                    objStar[i].move(ctx);
                    objStar[i].drawimage(ctx);

                    if (objStar[i].overlap(objKago)) {
                        objStar[i] = null;
                        point += 1;

                        getsaund.currentTime = 0;
                        getsaund.play();

                        if (point >= maxpoint) {
                            gamemode = 2;
                        }
                        console.log(point);
                    }

                    if (objStar.checkunder == true) {
                        objStar[i] = null;
                    }
                }
            }

            for (let i = 0; i < objRedStar.length; i++) {
                if (objRedStar[i] != null) {
                    objRedStar[i].move(ctx);
                    objRedStar[i].drawimage(ctx);

                    if (objRedStar[i].overlap(objKago)) {
                        objRedStar[i] = null;
                        if (point > 5) {
                            point -= 5;
                            lostsaund.currentTime = 0;
                            lostsaund.play();
                        }
                        //console.log(point);
                    }

                    if (objRedStar.checkunder == true) {
                        objRedStar[i] = null;
                    }
                }
            }

            ctx.fillStyle = "#FFFF00";
            ctx.font = "30px hosifont";
            ctx.fillText("拾った星の数: " + point + "個", 1000, 50);
            break;

        case 2:
            objBack.drawimage(ctx); //objBackの描画

            ctx.fillStyle = "FFFFFF"; // This is a gray color
            ctx.font = "80px hosifont";
            ctx.fillText("ゲームクリア！！", 300, 100);

            ctx.fillStyle = "FFFFFF"; // This is a gray color
            ctx.fillText("なぞなぞのヒントは", 270, 220);


            ctx.font = "110px hosifont";
            ctx.fillText("f@yh@nです！！！", 200, 350);


            ctx.fillStyle = "FFFFFF";
            ctx.font = "70px hosifont";
            ctx.fillText("spaceキーでタイトルへ", 300, 500);
            break;
    }

}

function newStar() {
    setTimeout(newStar, getRandomInt(10, 20) * 20);

    let randomSrc = getRandomInt(0, starsrc.length);

    let starsize = getRandomInt(3, 5) * 20;

    let randomX = getRandomInt(0, canvas.width - starsize);

    let j = nullCheck(objStar);


    if (j != false) {
        objStar[j] = new Star(randomX, -100, starsize, starsize, starsrc[randomSrc]);
    }
    else {
        objStar.push(new Star(randomX, -100, starsize, starsize, starsrc[randomSrc]));
    }
    // console.log(objStar[j]);

}


function newRedStar() {
    setTimeout(newRedStar, getRandomInt(10, 20) * 100);

    let randomSrc = getRandomInt(0, redstarsrc.length);

    let starsize = getRandomInt(3, 5) * 20;

    let randomX = getRandomInt(0, canvas.width - starsize);

    let j = nullCheck(objRedStar);


    if (j != false) {
        objRedStar[j] = new Star(randomX, -100, starsize, starsize, redstarsrc[randomSrc]);
    }
    else {
        objRedStar.push(new Star(randomX, -100, starsize, starsize, redstarsrc[randomSrc]));
    }
    // console.log(objStar[j]);

}


function keyDownEvent(event) {
    let key = event.code; //押されたキーボードを取得
    //console.log(key);
    let beforkingyocount;

    if (key == "Space") {

        switch (gamemode) {
            case 0:
                gamemode = 1;



                if (gamestato == false) {
                    newStar();
                    newRedStar();
                    gamestato = true;
                    bgm.currentTime = 0;
                    bgm.play();
                }

                point = 0;

                for (let i = 0; i < objStar.length; i++) {
                    objStar[i] = null;
                }

                for (let i = 0; i < objRedStar.length; i++) {
                    objRedStar[i] = null;
                }
                break;

            case 2:
                gamemode = 0;

                break;
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function nullCheck(array) {

    let i;
    //console.log(array.length);
    // 配列内の要素を順番に確認し、最初に見つかったnullの要素を返す
    if (array.length == 0) {
        return 0;
    }
    for (i = 1; i < array.length; i++) {
        // console.log(array[i + 1]);
        if (array[i] == null || array[i] == undefined) {
            // console.log(i);
            return i; // 最初に見つかったnullの要素を返す
        }
    }

    // nullが見つからなかった場合はfalseを返す
    return i + 1;

}