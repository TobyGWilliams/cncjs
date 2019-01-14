import * as THREE from 'three';
import isEqual from 'lodash/isEqual';

const createGeometry = ({ x, y, z }) => {
    const xLength = x.max - x.min;
    const yLength = y.max - y.min;
    const zLength = z.max - z.min;

    if (xLength || yLength || zLength) {
        const box = new THREE.BoxGeometry(xLength || 0.0001, yLength || 0.0001, zLength || 0.0001);
        const geometry = new THREE.EdgesGeometry(box);
        const material = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            linewidth: 2
        });
        const output = new THREE.LineSegments(geometry, material);
        output.position.set(
            (x.max + x.min) / 2,
            (y.max + y.min) / 2,
            (z.max + z.min) / 2
        );
        return output;
    }
    return null;
};

export class MachineTravel {
    constructor(
        initialLimits = {
            x: { min: 0, max: 0 },
            y: { min: 0, max: 0 },
            z: { min: 0, max: 0 }
        },
        initialWCO = { x: 0, y: 0, z: 0 }
    ) {
        this.wco = Object.assign({}, initialWCO);
        this.axisLimits = Object.assign({}, initialLimits);

        this.group = new THREE.Object3D();
        this.group.name = 'Machine Travel';

        this.wireframe = createGeometry(this.axisLimits);

        if (this.wireframe) {
            this.group.add(this.wireframe);
        }
    }

    updatePosition() {
        const { x, y, z } = this.wco;
        this.group.position.set(-x, -y, -z);
    }

    update3DObjects() {
        this.group.remove(this.wireframe);
        this.wireframe = createGeometry(this.axisLimits, this.wco);
        if (this.wireframe) {
            this.group.add(this.wireframe);
        }
    }

    updateWCO(wco) {
        let updateVisual = false;
        if (wco && !isEqual(this.wco, wco)) {
            this.wco = Object.assign({}, wco);
            this.updatePosition();
            updateVisual = true;
        }
        return updateVisual;
    }

    updateTravels(axisLimits) {
        let updateVisual = false;
        if (!isEqual(this.axisLimits, axisLimits)) {
            this.axisLimits = Object.assign({}, axisLimits);
            this.update3DObjects();
            updateVisual = true;
        }
        return updateVisual;
    }
}
