const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const kingyosrc = [
    "img/demekinn.png",
    "img/demekin_p.png",
    "img/demekin_y.png",
    "img/demekinn_black.png",
    "img/demekinn_r.png",


    "img/hutukinn.png",
    "img/hutukinn_b.png",
    "img/hutukinn_p.png",
    "img/hutukinn_r.png",
    "img/hutukinn_w.png",
    "img/hutukinn_y.png"


];

let buttonflag = false;

const objKingyo = [];

const objDispPoi = [];

for (let i = 0; i < 3; i++) {
    objDispPoi.push(new Poi(i * 70, 500, 60, 100, "img/poi.png"));
}

let poi_count = 3;

let gamestato = false;

const kingyowidth = 80;
const kingyoheight = 80;

let kingyocount = 0;
const max_kingyocount = 15;

let kingyo_point = 0;

let gamemode = 0;

const bgm = new Audio('saunds/フリーBGM [金魚すくい].mp3');
bgm.preload = 'auto';
bgm.volume = 0.3;//ボリューム 50%

const buttonsaund = new Audio('saunds/パッ.mp3');
buttonsaund.preload = 'auto';
buttonsaund.volume = 0.5;//ボリューム 50%

const getsaund = new Audio('saunds/水滴3.mp3');
getsaund.preload = 'auto';
getsaund.volume = 0.5;//ボリューム 50%


const rostsaund = new Audio('saunds/クイズ不正解1.mp3');
rostsaund.preload = 'auto';
rostsaund.volume = 0.5;//ボリューム 50%

const objBack = new Back(0, 0, 1300, 600, "img/haikei.jpeg");
const objPoi = new Poi(0, 0, 120, 200, "img/poi.png");

window.addEventListener("load", setup);
window.addEventListener("keydown", keyDownEvent);

document.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX; // マウスのX座標
    var mouseY = event.clientY; // マウスのY座標

    objPoi.moveMouse(mouseX, mouseY);
});

function setup() {
    screenUpdate();

}
function screenUpdate() {

    setTimeout(screenUpdate, 16);
    if (bgm.currentTime >= 70) {
        bgm.currentTime = 0;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); //canvasのクリア
    switch (gamemode) {

        case 0:

            objBack.drawimage(ctx); //objBackの描画

            ctx.fillStyle = "#A0A0A0"; // This is a gray color
            ctx.font = "150px MaturiFont";
            ctx.fillText("金魚すくいゲーム", 60, 233);

            ctx.fillStyle = "black";
            ctx.font = "150px MaturiFont";
            ctx.fillText("金魚すくいゲーム", 50, 230);

            ctx.fillStyle = "black";
            ctx.font = "50px MaturiFont";
            ctx.fillText("50匹ほかくでクリア！", 400, 550
            );

            ctx.fillStyle = "black";
            ctx.font = "70px MaturiFont";
            ctx.fillText("spaceキーでスタート！", 300, 400);
            break

        case 1:
            objBack.drawimage(ctx); //objBackの描画
            objPoi.drawimage(ctx); //objBackの描画

            for (let i = 0; i < objDispPoi.length; i++) {
                if (objDispPoi[i] != null) {
                    objDispPoi[i].drawimage(ctx);
                }
            }

            for (let i = 0; i < objKingyo.length; i++) {
                if (objKingyo[i] != null) {
                    objKingyo[i].move(ctx);
                    objKingyo[i].drawimage(ctx);
                }
            }

            ctx.fillStyle = "black";
            ctx.font = "30px MaturiFont";
            ctx.fillText("捕まえた金魚の数: " + kingyo_point + "匹", 900, 50);
            break;


        case 2:
            objBack.drawimage(ctx); //objBackの描画

            ctx.fillStyle = "black"; // This is a gray color
            ctx.font = "80px MaturiFont";
            ctx.fillText("ゲームクリア！！", 300, 100);

            ctx.fillStyle = "black"; // This is a gray color
            ctx.fillText("なぞなぞのヒントは", 270, 220);


            ctx.font = "110px MaturiFont";
            ctx.fillText("絵具です！！", 400, 350);


            ctx.fillStyle = "black";
            ctx.font = "70px MaturiFont";
            ctx.fillText("spaceキーでタイトルへ", 300, 500);
            break;


        case 3:
            objBack.drawimage(ctx); //objBackの描画

            ctx.fillStyle = "black"; // This is a gray color
            ctx.font = "150px MaturiFont";
            ctx.fillText("ゲームオーバー", 60, 233);

            ctx.fillStyle = "black";
            ctx.font = "70px MaturiFont";
            ctx.fillText("spaceキーでタイトルへ", 300, 400);
            break;
    }
}

function newkingyo() {

    console.log(1);

    setTimeout(newkingyo, 1 + kingyocount * 1000 / 40);

    if (kingyocount < max_kingyocount) {

        kingyocount++;

        let randomSrc = getRandomInt(0, kingyosrc.length);

        let randomX = getRandomInt(0, canvas.width - kingyowidth);
        let randomY = getRandomInt(0, canvas.height - kingyoheight);

        let j = nullCheck(objKingyo);
        //console.log(j);


        if (j != false) {
            objKingyo[j] = new Kingyo(randomX, randomY, kingyowidth, kingyoheight, kingyosrc[randomSrc]);
        }
        else {
            objKingyo.push(new Kingyo(randomX, randomY, kingyowidth, kingyoheight, kingyosrc[randomSrc]));
        }



        //  setTimeout(newkingyo, 1000 + kingyocount * 1000 / 50);
        // console.log(kingyosrc[randomSrc]);
    }


}

function randomkingyo_angle() {

    for (let i = 0; i < objKingyo.length; i++) {

        if (objKingyo[i] != null) {
            setTimeout(objKingyo[i].kingyo_randome_angle(), getRandomInt(1, 4) * 1000);
        }

    }
    setTimeout(randomkingyo_angle, 4000);


}


function keyDownEvent(event) {
    let key = event.code; //押されたキーボードを取得
    //console.log(key);
    let beforkingyocount;

    if (key == "Space") {

        if (gamemode == 0) {
            buttonsaund.currentTime = 0;
            buttonsaund.play();

            for (let i = 0; i < objKingyo.length; i++) {

                objKingyo[i] = null;

            }
            if (gamestato == false) {
                newkingyo();
                randomkingyo_angle();
                gamestato = true;
                bgm.currentTime = 0;
                bgm.play();
            }
            gamemode = 1;

            for (let i = 0; i < 3; i++) {
                objDispPoi[i].invisible = true;
            }
            poi_count = 3;

            kingyocount = 0;


            kingyo_point = 0;



        }
        else if (gamemode == 1) {
            beforkingyocount = kingyocount;
            for (let i = 0; i < objKingyo.length; i++) {

                if (objKingyo[i] != null) {
                    if (objPoi.overlap(objKingyo[i]) == true) {

                        getsaund.currentTime = 0;
                        getsaund.play();

                        kingyo_point++;
                        kingyocount--;
                        objKingyo[i] = null;
                        if (kingyo_point >= 50) {
                            gamemode = 2;
                            buttonflag = false;
                            setTimeout(buttonflagclear, 1000);
                        }

                        break;
                    }
                }
            }

            if (beforkingyocount == kingyocount) {
                objDispPoi[poi_count - 1].invisible = false;
                poi_count--;
                rostsaund.currentTime = 0;
                rostsaund.play();

                if (poi_count == 0) {
                    gamemode = 3;
                    buttonflag = false;
                    setTimeout(buttonflagclear, 1000);
                }
            }
        }

        else if ((gamemode == 3 || gamemode == 2) && buttonflag == true) {

            gamemode = 0;
            buttonsaund.currentTime = 0;
            buttonsaund.play();

        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function nullCheck(array) {
    // if (!Array.isArray(array)) {
    //     return false;
    // }
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

function buttonflagclear() {
    buttonflag = true;

}