import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

@Component({
  selector: 'app-stl-viewer',
  templateUrl: './stl-viewer.component.html',
  styleUrls: ['./stl-viewer.component.sass']
})
export class StlViewerComponent implements OnInit {

  @ViewChild('canvas', {static: false}) rendererContainer!: ElementRef<HTMLDivElement>;
  @Input() fileId: any;

  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000000);
    this.renderer = new THREE.WebGLRenderer({antialias: false});
  }

  ngOnInit(): void {
    this.loadStlFile(this.fileId);
    this.init();
    this.animate();
  }

  ngAfterViewInit(): void {
    if (this.rendererContainer) {
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    }
  }

  init() {
    this.scene.background = new THREE.Color(0xa0a0a0);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    this.scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 180;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.left = -120;
    directionalLight.shadow.camera.right = 120;
    this.scene.add(directionalLight);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  private loadStlFile(fileId: any) {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 0.25,
      roughness: 0.1,
      opacity: 1.0,
      transparent: true,
      transmission: 0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.25
    });

    const loader = new STLLoader();

    loader.load(
      `http://localhost:8081/file/download/${fileId}/`,
      (geometry) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        mesh.rotation.x = -Math.PI / 2;
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        this.camera.position.z = maxDimension * 2.2;
        geometry.center();
        this.scene.add(mesh);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

}
