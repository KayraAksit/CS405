/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    MatrixMult(A, B) {
        var C = [];
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                var v = 0;
                for (var k = 0; k < 4; ++k) {
                    v += A[j + 4 * k] * B[k + 4 * i];
                }
                C.push(v);
            }
        }
        return C;
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
                
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;

        //Upper Matrices are coming from parent 
        transformedMvp = this.MatrixMult(transformedMvp ,this.trs.getTransformationMatrix())
        transformedModelView = this.MatrixMult(transformedModelView ,this.trs.getTransformationMatrix())
        transformedNormals = this.MatrixMult(transformedNormals ,this.trs.getTransformationMatrix())
        transformedModel = this.MatrixMult(transformedModel ,this.trs.getTransformationMatrix())
        


        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
            this.children.forEach(child => {
                child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel)
            });
        }


        
    }

    

}