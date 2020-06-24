
function camera_settings(){
    cam_dx = cam_dx + (mouseX-pmouseX)*0.5;
    cam_dz = map(mouseY, 0, height, 45, -20);

    let cam_tx = deer_posx + view_dist*sin(radians(cam_dx));
    let cam_ty = deer_posy + view_dist*cos(radians(cam_dx));
    let cam_tz = -view_dist*sin(radians(cam_dz));


    if(mode == 'first person'){
        perspective(PI/3.0);
        camera(deer_posx, deer_posy, -150, cam_tx, cam_ty, cam_tz-100, 0, 0, 1);
    }
    else if(mode=='third person'){
        ortho(-width / 2, width / 2, height / 2, -height / 2, -500, 1000);
        camera(-100+deer_posx, -100+deer_posy, -200, 150+deer_posx, 150+deer_posy, 50, 0, 0, -1);    
        // orbitControl();
    }

}

function skybox(){

    noLights();
    ambientLight(100);
    push();
    translate(deer_posx, deer_posy, 0);

    push();
    translate(1000, 0, -200);
    rotateY(PI/2);
    rotateZ(PI/2);
    texture(sky[3]);
    plane(2000);
    pop();

    push();
    translate(-1000, 0, -200);
    rotateY(PI/2);
    rotateZ(PI/2);
    texture(sky[4]);
    plane(2000);
    pop();

    push();
    translate(0, 1000, -200);
    rotateX(PI/2);
    texture(sky[1]);
    plane(2000);
    pop();

    push();
    translate(0, -1000, -200);
    rotateX(PI/2);
    texture(sky[2]);
    plane(2000);
    pop();

    push();
    translate(0, 0, -1200);
    rotateZ(-PI/2);
    texture(sky[0]);
    plane(2000);
    pop();

    push();
    translate(0, 0, 800);
    texture(sky[5]);
    plane(2000);
    pop();

    pop();


}

function keyPressed(){
    if(key == '1'){
        mode = 'first person';
    }
    else if (key == '2'){
        mode = 'third person';
    }
}

function setUI(){
    title = createDiv('This Garden is Yours');
    title.position(10, 10);
    title.style('font-size', '24px');

    desc = createDiv('Computer Graphics, 2020 Finals');
    desc.position(10, 35);
    desc.style('font-size', '15px');
}