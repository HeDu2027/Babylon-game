Tile = function(i, j, type, scene, game) {

    BABYLON.Mesh.call(this, "tile", scene);

    if (game && Tile.isSwitch(type)) {
        var b = game.assets['switch'].meshes[0].clone();
        b.parent = this;
        b.isVisible = true;
    } else if (game && type == Tile.TYPE.FINISH) {
        var b = game.assets['ender'].meshes[0].clone();
        b.parent = this;
        b.isVisible = true;
    } else if (game && Tile.isTeleporter(type)) {
        var b = game.assets['teleporter'].meshes[0].clone();
        b.parent = this;
        b.isVisible = true;
    } else if (game) {
        var b = game.assets['tile'].meshes[0].clone();
        b.parent = this;
        b.isVisible = true;
    } else {

        // Creates a box (yes, our ship will be a box)
        var vd = BABYLON.VertexData.CreateBox(0.9);
        // Apply the box shape to our mesh
        vd.applyToMesh(this, false);

        this.scaling.y = 0.1;


        var mat = new BABYLON.StandardMaterial("ground", scene);
        var t = new BABYLON.Texture("img/ground3.jpg", scene);
        mat.diffuseTexture = t;
        mat.specularColor = BABYLON.Color3.Black();
        this.material = mat;

    }
    this.position.x = i;
    this.position.y = -50;
    this.position.z = j;

    this.type = type;
    this.scene = scene;
    this.game = game;
};
Tile.prototype = Object.create(BABYLON.Mesh.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.display = function() {
    var end = this.position.clone(),
        start = this.position.clone();

    end.y = 0;

    // Create the Animation object
    var display = new BABYLON.Animation(
        "bounce",
        "position",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Animations keys
    var keys = [{
        frame: 0,
        value: start
    },{
        frame: 100,
        value: end
    }];

    display.setKeys(keys);

    this.animations.push(display);

    // Run the animation !
    this.scene.beginAnimation(this, 0, 100, false, 2);
};

Tile.TYPE = {
    NOTHING : 0,
    NORMAL : 1,
    START : 2,
    FINISH : 3
};

Tile.prototype.action = function(player) {};

Tile.isSwitch = function(type) {
    return (type>=10 && type < 20)
};

Tile.isTeleporter = function(type) {
    return (type >= 20);
};

Tile.prototype.setVisible = function(b) {
    this.isVisible = b;
    var childs = this.getChildren();

    childs.forEach(function(c) {
        c.isVisible = b;
    })
};
