import * as THREE from 'three';
import isEqual from 'lodash/isEqual';

export class MachineTravel {
    group = new THREE.Object3D();

    material = new THREE.LineBasicMaterial({ color: 0xff9900 });

    geometry = new THREE.Geometry();

    constructor(initialLimits = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 }, z: { min: 0, max: 0 } }, initialWCO = { x: 0, y: 0, z: 0 }) {
        {
            this.wco = Object.assign({}, initialWCO);
            this.axisLimits = Object.assign({}, initialLimits);

            this.geometry.dynmaic = true;

            this.geometry.vertices = [
                new THREE.Vector3(this.axisLimits.x.min, this.axisLimits.y.min, 0),
                new THREE.Vector3(this.axisLimits.x.min, this.axisLimits.y.max, 0),
                new THREE.Vector3(this.axisLimits.x.max, this.axisLimits.y.max, 0),
                new THREE.Vector3(this.axisLimits.x.max, this.axisLimits.y.min, 0),
                new THREE.Vector3(this.axisLimits.x.min, this.axisLimits.y.min, 0)
            ];

            const line = new THREE.Line(this.geometry, this.material);

            this.group.add(line);
        }
    }

    render() {
        this.geometry.vertices[0] = { x: this.axisLimits.x.min - this.wco.x, y: this.axisLimits.y.min - this.wco.y, z: 0 };
        this.geometry.vertices[1] = { x: this.axisLimits.x.min - this.wco.x, y: this.axisLimits.y.max - this.wco.y, z: 0 };
        this.geometry.vertices[2] = { x: this.axisLimits.x.max - this.wco.x, y: this.axisLimits.y.max - this.wco.y, z: 0 };
        this.geometry.vertices[3] = { x: this.axisLimits.x.max - this.wco.x, y: this.axisLimits.y.min - this.wco.y, z: 0 };
        this.geometry.vertices[4] = { x: this.axisLimits.x.min - this.wco.x, y: this.axisLimits.y.min - this.wco.y, z: 0 };

        this.geometry.verticesNeedUpdate = true;
    }

    updateWCO(wco) {
        let updateVisual = false;
        if (!isEqual(this.wco, wco)) {
            this.wco = Object.assign({}, wco);
            this.render();
            updateVisual = true;
        }
        return updateVisual;
    }

    updateTravels(axisLimits) {
        let updateVisual = false;
        if (!isEqual(this.axisLimits, axisLimits)) {
            this.axisLimits = Object.assign({}, axisLimits);
            this.render();
            updateVisual = false;
        }
        return updateVisual;
    }
}
