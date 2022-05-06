Preloader = function(rootFolder, scene, game) {

    this.rootFolder = rootFolder;
    this.scene = scene;
    this.game = game;
    this.progress = 0;
    this.fileToLoad = [];
    this.fileLoaded = [];
    this.fileLoadedSuccess = 0;
    this.fileLoadedError = 0;
    this.isLoading = false;
};

Preloader.prototype = {
    
    add : function(key, name, path) {
        this.fileToLoad.push({key:key, name:name, path:path});
    },

    start : function() {
        this.isLoading = true;
        this.fileLoadedSuccess = 0;

        if (this.fileToLoad.length == 0) {
            this.isLoading = false;
            this.notify();
        } else {
            for (var i=0; i<this.fileToLoad.length; i++) {
                this.loadFile(this.fileToLoad[i]);
            }
        }
    },

    update : function() {
        this.progress = (this.fileLoadedSuccess + this.fileLoadedError) / (this.fileToLoad.length) * 100;
        document.getElementById("loadingValue").innerHTML = this.progress+"%";
    },

    isFinished : function() {
        return (this.fileLoadedError + this.fileLoadedSuccess === this.fileToLoad.length);
    },
    
    onSuccess : function(key, newMeshes, particlesSystem, skeletons){
        // Increment the number of file loaded successfully
        this.fileLoadedSuccess ++;
        // Update progress and loading text
        this.update();
        // Set all meshes invisible
        newMeshes.forEach(function(m) {
            m.isVisible = false;
        });
        // Save the link key -> data model
        this.register(key, newMeshes, particlesSystem, skeletons);
        // If loading finish, notify the game
        if (this.isFinished()) {
            this.isLoading = false;
            this.notify();
        }
    },
    
    register : function(key, newMeshes, particlesSystem, skeletons) {
        var entry = {
            meshes : newMeshes,
            particlesSystems:particlesSystem,
            skeletons : skeletons
        };
        this.fileLoaded[key] = entry;
    },
    
    onError : function(name, path) {
        this.fileLoadedError ++;
        console.warn("Impossible to load the mesh "+name+" from the file "+path);
    },

    loadFile : function(file) {
        var _this = this;
        BABYLON.SceneLoader.ImportMesh(
            file.name,
            this.rootFolder,
            file.path,
            this.scene,
            function(newMeshes, particlesSystem, skeletons) {
                _this.onSuccess(file.key, newMeshes, particlesSystem, skeletons);
            },
            null,
            function() {
                _this.onError(file.name, file.path)
            });
    },
    
    notify : function() {
        this.game.notify(this.fileLoaded);
    }

};