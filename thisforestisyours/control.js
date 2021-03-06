

function moveDeer(option){
    if(keyIsPressed){

        if(option == 'first person'){
            if(key == 'w' || key == 'W'){
                deer_posx += move_dist*sin(radians(cam_dx));
                deer_posy += move_dist*cos(radians(cam_dx));
            }
            else if(key == 's' || key == 'S'){
                deer_posx -= move_dist*sin(radians(cam_dx));
                deer_posy -= move_dist*cos(radians(cam_dx));
            }
            else if(key == 'a' || key == 'A'){
                deer_posx -= move_dist*cos(radians(cam_dx));
                deer_posy -= move_dist*-sin(radians(cam_dx));
                if(deer_neck_rotate > -30) deer_neck_rotate -=1;
            }
            else if(key == 'd' || key == 'D'){
                deer_posx += move_dist*cos(radians(cam_dx));
                deer_posy += move_dist*-sin(radians(cam_dx));
                if(deer_neck_rotate < 30) deer_neck_rotate +=1;
            }
        }
        else if(option== 'third person'){
            if(key == 'w' || key == 'W'){
                deer_posx += move_dist;
                deer_rotate = -PI/2;
            }
            else if(key == 's' || key == 'S'){
                deer_posx -= move_dist;
                deer_rotate = PI/2;
            }
            else if(key == 'a' || key == 'A'){
                deer_posy -= move_dist;
                deer_rotate = PI;
            }
            else if(key == 'd' || key == 'D'){
                deer_posy += move_dist;
                deer_rotate = 0;
            }
        }
        deer_movement+=0.1;
        stepGrid(deer_posx, deer_posy);

        if(!walk_sound.isPlaying()){
            walk_sound.setVolume(0.15);
            walk_sound.loop();
        }
    }
    else {
        if(walk_sound.isPlaying()){
            walk_sound.stop();
        }
    }
}


function stepGrid(x, y){

    for(let i=0; i<grid_max; i++){
        if( x < i*grid_size-grid_max*grid_size/2+grid_size/2 && x >= (i-1)*grid_size-grid_max*grid_size/2+grid_size/2 ){
            posx = i;
            break;
        }
    }

    for(let j=0; j<grid_max; j++){
        if( y < j*grid_size-grid_max*grid_size/2+grid_size/2 && y >= (j-1)*grid_size-grid_max*grid_size/2+grid_size/2 ){
            posy = j;
            break;
        }
    }

    if(posx && posy && grid[posx][posy] !=1  ) {
        if(grid[posx][posy]==0){
            for(let j=0; j<3; j++)
                grasses.push(new grass(posx, posy));
            if(random(0, 10) > 4){
                trees.push(new tree(posx, posy));
            }
            for(let j=0; j<2; j++){
                flowers.push(new flower(posx, posy));
            }
        }
        grid[posx][posy] = 1;
    }

}

function growElems(){
    
    for(let i=0; i<grasses.length; i++){
        grasses[i].grow(grid[grasses[i].ix][grasses[i].iy]);
    }

    for(let i=0; i<trees.length; i++){
        trees[i].grow(grid[trees[i].ix][trees[i].iy]);
    }

    for(let i=0; i<flowers.length; i++){
        flowers[i].grow(grid[flowers[i].ix][flowers[i].iy]);
    }

}


function blow(){


    if(mic_vol > 0.001 && !mouseIsPressed){
        offset = mic_vol;
    }
    else if(mouseIsPressed){
        offset += 0.001;
        if(flute == false){
            let i = random(0, 3);
            flute_sound[int(i)].setVolume(0.3);
            flute_sound[int(i)].play();
        }
    }

    for(let i=0; i<flowers.length; i++){
        if(flowers[i].x >= deer_posx-200 && flowers[i].x <= deer_posx+200 &&
            flowers[i].y >= deer_posy-200 && flowers[i].y <= deer_posy+200){
                if(offset > 0.001) flowers[i].offset = offset*dist(flowers[i].x, flowers[i].y, deer_posx, deer_posy)/20;
        }
        else {
            flowers[i].offset = 0;
        }
    }

    for(let i=0; i<grasses.length; i++){
        if(grasses[i].x >= deer_posx-200 && grasses[i].x <= deer_posx+200 &&
            grasses[i].y >= deer_posy-200 && grasses[i].y <= deer_posy+200){
                if(offset > 0.001) grasses[i].offset = offset*dist(grasses[i].x, grasses[i].y, deer_posx, deer_posy)/20;
        }
        else {
            grasses[i].offset = 0;
        }
    }

    for(let i=0; i<trees.length; i++){
        if(trees[i].x >= deer_posx-200 && trees[i].x <= deer_posx+200 &&
            trees[i].y >= deer_posy-200 && trees[i].y <= deer_posy+200){
                if(offset > 0.001) trees[i].offset = offset*dist(grasses[i].x, grasses[i].y, deer_posx, deer_posy)/20;
        }
        else {
            trees[i].offset = 0;
        }
    }

}