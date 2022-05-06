var Utils = {
    
    isOnGround : function(block, level) {

        if (block.isMoving) {
            return true;
        }

        var pos = block.position;
        var res = false;

        switch (block.state) {
            case Block.STATE_STAND:
                var t = level.getTile(pos.x, pos.z);
                if (t && t.isVisible) {
                    res = true;
                } else {
                    res = false;
                }
                break;
            case Block.STATE_CROUCH_HEIGHT:
                var t = level.getTile(pos.x-0.5, pos.z);
                var tt = level.getTile(pos.x+0.5, pos.z);
                if (t && tt && t.isVisible && tt.isVisible) {
                    res = true;
                } else {
                    res = false;
                }
                break;
            case Block.STATE_CROUCH_WIDTH:
                var t = level.getTile(pos.x, pos.z-0.5);
                var tt = level.getTile(pos.x, pos.z+0.5);
                if (t && tt && t.isVisible && tt.isVisible) {
                    res = true;
                } else {
                    res = false;
                }
                break;
        }

        return res;
    },
    
    isOnFinish : function(block, level) {
        if (block.isMoving || block.isFalling || block.state != Block.STATE_STAND) {
            return false;
        }

        var pos = block.position;
        var finish = level.finish;

        return (pos.x == finish.x && pos.z == finish.y);

    },
    
    getTileOfBlock : function(block, level) {
        var res = [];
        if (block.isMoving) {
            return res;
        }
        var pos = block.position;
        switch (block.state) {
            case Block.STATE_STAND:
                var t = level.getTile(pos.x, pos.z);
                if (t) {
                    res.push(t);
                }
                break;
            case Block.STATE_CROUCH_HEIGHT:
                var t = level.getTile(pos.x-0.5, pos.z);
                var tt = level.getTile(pos.x+0.5, pos.z);
                if (t) {
                    res.push(t);
                }
                if (tt){
                    res.push(tt);
                }
                break;
            case Block.STATE_CROUCH_WIDTH:
                var t = level.getTile(pos.x, pos.z-0.5);
                var tt = level.getTile(pos.x, pos.z+0.5);
                if (t) {
                    res.push(t);
                }
                if (tt){
                    res.push(tt);
                }
                break;
        }

        return res;
    }

};