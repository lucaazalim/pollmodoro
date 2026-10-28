import {
	BackSide,
	BufferAttribute,
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	DoubleSide,
	Group,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	ShaderMaterial,
	SphereGeometry,
	TorusGeometry,
	TubeGeometry,
	Vector3,
	WebGLRenderer,
	type Material
} from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

export interface TomatoMascot {
	setHovered(hovered: boolean): void;
	setReducedMotion(reducedMotion: boolean): void;
	cheer(): void;
	dispose(): void;
}

interface Options {
	reducedMotion: boolean;
	/** Draws a single frame at rest and keeps it, for taking a picture of it. */
	still?: boolean;
	onReady: () => void;
	onLost: () => void;
}

// Radii of the body: a tomato is a bit wider than it is tall.
const A = 1.12;
const B = 0.9;
const C = 1.04;
const DIMPLE = 0.1;
const LEAF_COUNT = 5;
/** Where the eyes rest when nothing has its attention: straight ahead, a touch down. */
const REST_GAZE_Y = -0.1;
const FIRST_LEAF = -Math.PI / 2 + Math.PI / 5;

// Flat colors, each with the darker tone used on its shaded side, like the original drawing.
const COLORS = {
	body: '#f0402f',
	bodyShade: '#c92a1f',
	highlight: '#ff8a72',
	leaf: '#43b243',
	leafShade: '#2c8a33',
	stem: '#3a9f3c',
	stemShade: '#287a2d',
	eye: '#161010',
	mouth: '#1d1313',
	tongue: '#e8473a',
	blush: '#ff7f91',
	outline: '#1d1313'
};

/** Everything the animation can move. Rebuilt from the defaults every frame. */
interface Pose {
	y: number;
	squash: number;
	yaw: number;
	pitch: number;
	roll: number;
	spin: number;
	gazeX: number;
	gazeY: number;
	happy: number;
	/** Both eyes always open and close together. */
	blink: number;
	eyeScale: number;
	/** Squeezes the eyes shut into > < shapes. */
	squint: number;
	mouthWidth: number;
	mouthOpen: number;
	mouthSmile: number;
	mouthRound: number;
	blush: number;
	leafLift: number;
	wave: number;
	propeller: number;
}

interface Action {
	duration: number;
	/** `t` goes from 0 to 1 over the action's duration. */
	apply(t: number, pose: Pose): void;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const smoothstep = (edge0: number, edge1: number, x: number) => {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const bell = (t: number) => Math.sin(Math.PI * clamp(t, 0, 1));
/** Rises over `rise`, holds, then falls over the last `fall` of the action. */
const envelope = (t: number, rise: number, fall: number) =>
	smoothstep(0, rise, t) * (1 - smoothstep(1 - fall, 1, t));
const damp = (current: number, target: number, lambda: number, dt: number) =>
	target + (current - target) * Math.exp(-lambda * dt);
const random = (min: number, max: number) => min + Math.random() * (max - min);

// Face features sit on the ellipsoid, so they are placed by their (u, v) position on the front.
const Z_AXIS = new Vector3(0, 0, 1);
const scratch = new Vector3();

function surfacePoint(u: number, v: number, lift: number, out: Vector3) {
	const depth = Math.sqrt(Math.max(1 - (u / A) ** 2 - (v / B) ** 2, 0));
	return out.set(u, v, C * depth + lift);
}

function surfaceNormal(u: number, v: number, out: Vector3) {
	surfacePoint(u, v, 0, out);
	return out.set(out.x / (A * A), out.y / (B * B), out.z / (C * C)).normalize();
}

/** Height of the top of the body at horizontal distance `r` from the center. */
function surfaceHeight(r: number, radius: number) {
	return B * Math.sqrt(Math.max(1 - (r / radius) ** 2, 0)) - DIMPLE * Math.exp(-(r * r) / 0.09);
}

function createBodyGeometry() {
	let geometry: BufferGeometry = new SphereGeometry(1, 72, 48);
	geometry.deleteAttribute('normal');
	geometry.deleteAttribute('uv');
	geometry = mergeVertices(geometry);

	const position = geometry.getAttribute('position');
	const v = new Vector3();
	// The grooves line up with the leaves, which rest in them.
	const groovePhase = -FIRST_LEAF;
	for (let i = 0; i < position.count; i++) {
		v.fromBufferAttribute(position, i);
		const y2 = v.y * v.y;
		const strength = 4 * y2 * (1 - y2) * (v.y > 0 ? 1 : 0.5);
		const ridge = -Math.cos(LEAF_COUNT * (Math.atan2(v.z, v.x) - groovePhase));
		v.multiplyScalar(1 + 0.035 * strength * ridge);
		v.set(v.x * A, v.y * B, v.z * C);
		if (v.y > 0) v.y -= DIMPLE * Math.exp(-(v.x * v.x + v.z * v.z) / 0.09);
		position.setXYZ(i, v.x, v.y, v.z);
	}
	geometry.computeVertexNormals();
	return geometry;
}

/** A sepal that hugs the top of the body, pointing along +x from its root. */
function createLeafGeometry(direction: number, length: number, width: number) {
	const radius = 1 / Math.sqrt((Math.cos(direction) / A) ** 2 + (Math.sin(direction) / C) ** 2);
	const root = 0.05;
	const height = (r: number) =>
		surfaceHeight(r, radius) + 0.06 + 0.1 * clamp((r - root) / length, 0, 1) ** 4;
	const rootHeight = height(root);

	let geometry: BufferGeometry = new SphereGeometry(1, 24, 12);
	geometry.deleteAttribute('normal');
	geometry.deleteAttribute('uv');
	geometry = mergeVertices(geometry);

	const position = geometry.getAttribute('position');
	const v = new Vector3();
	for (let i = 0; i < position.count; i++) {
		v.fromBufferAttribute(position, i);
		const s = (v.x + 1) / 2;
		const r = root + s * length;
		const slope = (height(r + 0.01) - height(r - 0.01)) / 0.02;
		const normalLength = Math.hypot(1, slope);
		const lateral = v.z * width * (1 - 0.65 * s);
		// Cup the leaf a little along its midrib.
		const thickness = v.y * 0.035 + 1.2 * lateral * lateral;
		position.setXYZ(
			i,
			r - (slope / normalLength) * thickness - root,
			height(r) + thickness / normalLength - rootHeight,
			lateral
		);
	}
	geometry.computeVertexNormals();
	return { geometry, root, rootHeight };
}

/** The same shape drawn again from behind with an outline material, which grows it into a line. */
function createOutline(geometry: BufferGeometry, material: Material) {
	return new Mesh(geometry, material);
}

/**
 * A flat shape wrapped onto the front of the body.
 *
 * A `fan` is drawn around its center, which only works for small convex shapes. A `strip` fills
 * the space between two edges: the first half of the points runs left to right along one edge
 * and the second half runs back along the other, column by column. That handles a smiling mouth,
 * whose center can fall outside of it, and its rows keep the shape on the curved surface so the
 * body can't show through.
 */
function createDecal(pointCount: number, material: Material, layout: 'fan' | 'strip' = 'fan') {
	const columns = pointCount / 2;
	const vertexCount = layout === 'fan' ? pointCount + 1 : columns * (STRIP_ROWS + 1);
	const geometry = new BufferGeometry();
	const positions = new Float32Array(vertexCount * 3);
	const normals = new Float32Array(vertexCount * 3);
	const index: number[] = [];
	if (layout === 'fan') {
		for (let i = 0; i < pointCount; i++) index.push(0, i + 1, ((i + 1) % pointCount) + 1);
	} else {
		const vertex = (column: number, row: number) => column * (STRIP_ROWS + 1) + row;
		for (let i = 0; i < columns - 1; i++) {
			for (let j = 0; j < STRIP_ROWS; j++) {
				const a = vertex(i, j);
				const b = vertex(i, j + 1);
				const c = vertex(i + 1, j);
				const d = vertex(i + 1, j + 1);
				index.push(a, b, c, c, b, d);
			}
		}
	}
	geometry.setIndex(index);
	geometry.setAttribute('position', new BufferAttribute(positions, 3));
	geometry.setAttribute('normal', new BufferAttribute(normals, 3));
	const mesh = new Mesh(geometry, material);
	mesh.frustumCulled = false;

	const write = (vertex: number, u: number, v: number, lift: number) => {
		surfacePoint(u, v, lift, scratch).toArray(positions, vertex * 3);
		surfaceNormal(u, v, scratch).toArray(normals, vertex * 3);
	};

	/** `points` holds x, y pairs relative to (u, v). */
	const update = (points: number[], u: number, v: number, lift: number) => {
		if (layout === 'strip') {
			for (let i = 0; i < columns; i++) {
				const top = i * 2;
				const bottom = (pointCount - 1 - i) * 2;
				for (let j = 0; j <= STRIP_ROWS; j++) {
					const t = j / STRIP_ROWS;
					write(
						i * (STRIP_ROWS + 1) + j,
						u + lerp(points[top], points[bottom], t),
						v + lerp(points[top + 1], points[bottom + 1], t),
						lift
					);
				}
			}
			geometry.attributes.position.needsUpdate = true;
			geometry.attributes.normal.needsUpdate = true;
			return;
		}

		let cx = 0;
		let cy = 0;
		for (let i = 0; i < pointCount; i++) {
			cx += points[i * 2];
			cy += points[i * 2 + 1];
		}
		write(0, u + cx / pointCount, v + cy / pointCount, lift);
		for (let i = 0; i < pointCount; i++) {
			write(i + 1, u + points[i * 2], v + points[i * 2 + 1], lift);
		}
		geometry.attributes.position.needsUpdate = true;
		geometry.attributes.normal.needsUpdate = true;
	};

	return { mesh, update };
}

const CEL_VERTEX = /* glsl */ `
	varying vec3 vNormal;

	void main() {
		vNormal = normalize(normalMatrix * normal);
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

// The light is fixed to the viewer's upper right, so the shading reads like a drawing however the
// tomato turns. There is a single hard step between the two tones and no highlights.
const CEL_FRAGMENT = /* glsl */ `
	uniform vec3 base;
	uniform vec3 shade;
	varying vec3 vNormal;

	void main() {
		float light = dot(normalize(vNormal), normalize(vec3(0.5, 0.75, 0.55)));
		float edge = fwidth(light);
		gl_FragColor = vec4(mix(shade, base, smoothstep(0.1 - edge, 0.1 + edge, light)), 1.0);
		#include <colorspace_fragment>
	}
`;

// The outline is pushed out sideways on screen only, never toward or away from the viewer, so it is
// an even line around the shape. Pushing it out in 3D made it poke out from under the leaves, which
// lie close to the body, as thick dark wedges.
const OUTLINE_VERTEX = /* glsl */ `
	uniform float thickness;

	void main() {
		vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		vec3 viewNormal = normalize(normalMatrix * normal);
		clip.xy += viewNormal.xy * thickness * clip.w;
		gl_Position = clip;
	}
`;

const OUTLINE_FRAGMENT = /* glsl */ `
	uniform vec3 color;

	void main() {
		gl_FragColor = vec4(color, 1.0);
		#include <colorspace_fragment>
	}
`;

/** `thickness` is a share of the canvas height, so the line scales with the mascot. */
function outlineMaterial(thickness: number) {
	return new ShaderMaterial({
		uniforms: { color: { value: new Color(COLORS.outline) }, thickness: { value: thickness } },
		vertexShader: OUTLINE_VERTEX,
		fragmentShader: OUTLINE_FRAGMENT,
		side: BackSide
	});
}

function celMaterial(base: string, shade: string) {
	return new ShaderMaterial({
		uniforms: { base: { value: new Color(base) }, shade: { value: new Color(shade) } },
		vertexShader: CEL_VERTEX,
		fragmentShader: CEL_FRAGMENT
	});
}

/** A flat color painted on the body. Higher layers win over lower ones. */
function decalMaterial(color: string, layer: number, transparent = false) {
	return new MeshBasicMaterial({
		color,
		side: DoubleSide,
		transparent,
		depthWrite: !transparent,
		polygonOffset: true,
		polygonOffsetFactor: -layer,
		polygonOffsetUnits: -layer * 4
	});
}

function ellipseOutline(radiusX: number, radiusY: number, angle: number, steps: number) {
	const points: number[] = [];
	for (let i = 0; i < steps; i++) {
		const theta = (i / steps) * Math.PI * 2;
		const x = Math.cos(theta) * radiusX;
		const y = Math.sin(theta) * radiusY;
		points.push(
			x * Math.cos(angle) - y * Math.sin(angle),
			x * Math.sin(angle) + y * Math.cos(angle)
		);
	}
	return points;
}

const MOUTH_STEPS = 14;
const STRIP_ROWS = 4;
const TONGUE_STEPS = 10;
const ELLIPSE_STEPS = 20;

function mouthEdges(width: number, open: number, smile: number, round: number) {
	const top = (t: number) =>
		smile * 0.25 * width * t * t + round * open * 0.8 * Math.sqrt(Math.max(1 - t * t, 0));
	const bottom = (t: number) =>
		smile * 0.25 * width * t * t - open * Math.sqrt(Math.max(1 - t * t, 0));
	return { top, bottom };
}

function mouthOutline(width: number, open: number, smile: number, round: number, out: number[]) {
	const { top, bottom } = mouthEdges(width, open, smile, round);
	out.length = 0;
	for (let i = 0; i < MOUTH_STEPS; i++) {
		const t = -Math.cos((Math.PI * i) / (MOUTH_STEPS - 1));
		out.push(t * width, top(t));
	}
	for (let i = 0; i < MOUTH_STEPS; i++) {
		const t = Math.cos((Math.PI * i) / (MOUTH_STEPS - 1));
		out.push(t * width, bottom(t));
	}
	return out;
}

function tongueOutline(width: number, open: number, smile: number, round: number, out: number[]) {
	const { top, bottom } = mouthEdges(width, open, smile, round);
	const span = 0.62;
	out.length = 0;
	for (let i = 0; i < TONGUE_STEPS; i++) {
		const t = -span * Math.cos((Math.PI * i) / (TONGUE_STEPS - 1));
		out.push(t * width, lerp(top(t), bottom(t), 0.9));
	}
	for (let i = 0; i < TONGUE_STEPS; i++) {
		const t = span * Math.cos((Math.PI * i) / (TONGUE_STEPS - 1));
		const bump = 0.5 * Math.sqrt(Math.max(1 - (t / span) ** 2, 0));
		out.push(t * width, lerp(top(t), bottom(t), 0.9 - bump));
	}
	return out;
}

// --- Actions -------------------------------------------------------------------------------------

const hop: Action = {
	duration: 1,
	apply(t, pose) {
		if (t < 0.22) {
			pose.squash -= 0.16 * smoothstep(0, 0.22, t);
		} else if (t < 0.72) {
			const air = (t - 0.22) / 0.5;
			pose.y += 0.6 * 4 * air * (1 - air);
			pose.squash += 0.12 * Math.abs(1 - 2 * air);
		} else {
			pose.squash -= 0.16 * bell((t - 0.72) / 0.28);
		}
		pose.happy = Math.max(pose.happy, bell((t - 0.15) / 0.75));
	}
};

const spin: Action = {
	duration: 1.2,
	apply(t, pose) {
		pose.spin += easeInOut(t) * Math.PI * 2;
		pose.y += 0.3 * bell(t);
		pose.squash += 0.06 * bell(t * 2);
		pose.happy = Math.max(pose.happy, bell(t));
		pose.mouthOpen += 0.06 * bell(t);
	}
};

/** A quick, content smile with both eyes closed. */
const beam: Action = {
	duration: 1,
	apply(t, pose) {
		const amount = envelope(t, 0.2, 0.3);
		pose.happy = Math.max(pose.happy, amount);
		pose.roll -= 0.1 * amount;
		pose.mouthSmile += 0.4 * amount;
		pose.mouthWidth += 0.03 * amount;
		pose.blush += 0.3 * amount;
	}
};

const lookAround: Action = {
	duration: 2.8,
	apply(t, pose) {
		const target =
			-0.9 * smoothstep(0.05, 0.2, t) +
			1.8 * smoothstep(0.45, 0.62, t) -
			0.9 * smoothstep(0.82, 1, t);
		const weight = envelope(t, 0.05, 0.15);
		pose.gazeX = lerp(pose.gazeX, target, weight);
		pose.gazeY = lerp(pose.gazeY, 0.1, weight);
		pose.mouthOpen -= 0.06 * weight;
		pose.mouthRound += 0.5 * weight;
		pose.mouthWidth -= 0.08 * weight;
	}
};

const curious: Action = {
	duration: 2,
	apply(t, pose) {
		const amount = envelope(t, 0.2, 0.25);
		pose.roll += 0.3 * amount;
		pose.gazeX = lerp(pose.gazeX, 0.35, amount);
		pose.eyeScale += 0.18 * amount;
		pose.mouthRound += amount;
		pose.mouthWidth -= 0.12 * amount;
		pose.mouthOpen -= 0.07 * amount;
		pose.leafLift += 0.3 * amount;
	}
};

/** The leaves become a propeller and the tomato takes off for a moment. */
const helicopter: Action = {
	duration: 2.6,
	apply(t, pose) {
		const power = envelope(t, 0.22, 0.25);
		const flight = smoothstep(0.18, 0.42, t) * (1 - smoothstep(0.68, 0.9, t));
		pose.propeller = 30 * power;
		pose.leafLift += 0.55 * power;
		pose.y += 0.5 * flight + 0.03 * Math.sin(t * 40) * flight;
		pose.roll += 0.05 * Math.sin(t * 13) * flight;
		pose.gazeY = lerp(pose.gazeY, 0.7, power);
		pose.mouthRound += power;
		pose.mouthWidth -= 0.1 * power;
		pose.mouthOpen -= 0.04 * power;
		pose.squash -= 0.14 * bell((t - 0.86) / 0.14);
	}
};

/** Shakes like a kitchen timer going off. It is a pomodoro, after all. */
const ring: Action = {
	duration: 1.6,
	apply(t, pose) {
		const amount = envelope(t, 0.08, 0.2);
		pose.roll += Math.sin(t * Math.PI * 34) * 0.14 * amount;
		pose.y += Math.abs(Math.sin(t * Math.PI * 17)) * 0.05 * amount;
		pose.squint = amount;
		pose.mouthOpen += 0.08 * amount;
		pose.mouthRound += 0.7 * amount;
		pose.mouthWidth -= 0.06 * amount;
		pose.blush += 0.3 * amount;
	}
};

const yawn: Action = {
	duration: 2.8,
	apply(t, pose) {
		const amount = envelope(t, 0.4, 0.3);
		pose.mouthOpen += 0.1 * amount;
		pose.mouthRound += amount;
		pose.mouthSmile -= amount;
		pose.mouthWidth -= 0.02 * amount;
		pose.blink = Math.max(pose.blink, 0.9 * amount);
		pose.squash += 0.08 * amount;
		pose.pitch -= 0.18 * amount;
		pose.leafLift += 0.4 * amount;
	}
};

/** Waves hello with one of its leaves. */
const wave: Action = {
	duration: 1.8,
	apply(t, pose) {
		const amount = envelope(t, 0.15, 0.2);
		pose.wave = amount * (1.1 + 0.4 * Math.sin(t * Math.PI * 7));
		pose.roll -= 0.1 * amount;
		pose.happy = Math.max(pose.happy, amount);
		pose.mouthOpen += 0.04 * amount;
	}
};

const giggle: Action = {
	duration: 1.4,
	apply(t, pose) {
		const amount = envelope(t, 0.08, 0.25);
		pose.roll += Math.sin(t * Math.PI * 16) * 0.12 * amount;
		pose.y += Math.abs(Math.sin(t * Math.PI * 9)) * 0.14 * amount;
		pose.squash += Math.sin(t * Math.PI * 18) * 0.05 * amount;
		pose.happy = Math.max(pose.happy, amount);
		pose.mouthOpen += 0.08 * amount;
		pose.mouthWidth += 0.05 * amount;
		pose.blush += 0.4 * amount;
	}
};

const IDLE_ACTIONS: [Action, number][] = [
	[hop, 3],
	[lookAround, 3],
	[beam, 2],
	[curious, 2],
	[spin, 2],
	[helicopter, 2],
	[ring, 2],
	[yawn, 1.5],
	[wave, 2]
];

function pickIdleAction(previous: Action | undefined) {
	const options = IDLE_ACTIONS.filter(([action]) => action !== previous);
	let roll = Math.random() * options.reduce((sum, [, weight]) => sum + weight, 0);
	for (const [action, weight] of options) {
		roll -= weight;
		if (roll <= 0) return action;
	}
	return options[0][0];
}

// --- Scene ---------------------------------------------------------------------------------------

export function createTomatoMascot(canvas: HTMLCanvasElement, options: Options): TomatoMascot {
	let reducedMotion = options.reducedMotion;

	const renderer = new WebGLRenderer({
		canvas,
		alpha: true,
		antialias: true,
		preserveDrawingBuffer: options.still
	});

	// A canvas on the page follows its CSS size. A detached one keeps its own width and height.
	function resize() {
		if (!canvas.clientWidth || !canvas.clientHeight) return;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
	}
	resize();
	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(canvas);

	const scene = new Scene();

	const camera = new PerspectiveCamera(25, 1, 0.1, 50);
	camera.position.set(0, 3, 10.9);
	camera.lookAt(0, 0.15, 0);

	const bodyOutline = outlineMaterial(0.024);
	const partOutline = outlineMaterial(0.015);
	const bodyMaterial = celMaterial(COLORS.body, COLORS.bodyShade);
	const leafMaterial = celMaterial(COLORS.leaf, COLORS.leafShade);
	const stemMaterial = celMaterial(COLORS.stem, COLORS.stemShade);
	const eyeMaterial = new MeshBasicMaterial({ color: COLORS.eye });
	const shineMaterial = new MeshBasicMaterial({ color: '#ffffff' });
	const highlightMaterial = decalMaterial(COLORS.highlight, 1);
	const blushMaterial = decalMaterial(COLORS.blush, 1, true);
	const mouthMaterial = decalMaterial(COLORS.mouth, 2);
	const tongueMaterial = decalMaterial(COLORS.tongue, 3);

	// root moves the tomato around, squash stretches it from its bottom and head turns it.
	const root = new Group();
	const squash = new Group();
	squash.position.y = -B;
	const head = new Group();
	head.position.y = B;
	head.rotation.order = 'YXZ';
	root.add(squash);
	squash.add(head);
	scene.add(root);

	const bodyGeometry = createBodyGeometry();
	head.add(new Mesh(bodyGeometry, bodyMaterial), createOutline(bodyGeometry, bodyOutline));

	// The calyx: a curly stem and five leaves that can lift, wave and spin.
	const calyx = new Group();
	head.add(calyx);
	const topHeight = surfaceHeight(0, 1);
	const stemCurve = new CatmullRomCurve3([
		new Vector3(0, topHeight - 0.05, 0),
		new Vector3(0, topHeight + 0.12, 0),
		new Vector3(0.05, topHeight + 0.24, 0.02),
		new Vector3(0.14, topHeight + 0.29, 0.03)
	]);
	const stemGeometry = new TubeGeometry(stemCurve, 16, 0.055, 10, false);
	const stemTipGeometry = new SphereGeometry(0.055, 12, 8);
	const stemTip = new Group();
	stemTip.position.copy(stemCurve.getPoint(1));
	stemTip.add(new Mesh(stemTipGeometry, stemMaterial), createOutline(stemTipGeometry, partOutline));
	calyx.add(
		new Mesh(stemGeometry, stemMaterial),
		createOutline(stemGeometry, partOutline),
		stemTip
	);

	const leaves: Group[] = [];
	for (let i = 0; i < LEAF_COUNT; i++) {
		const direction = FIRST_LEAF + (i * Math.PI * 2) / LEAF_COUNT;
		const length = 0.7 + (i % 2) * 0.08;
		const leaf = createLeafGeometry(direction, length, 0.21);
		const turn = new Group();
		turn.rotation.y = direction;
		const pivot = new Group();
		pivot.position.set(leaf.root, leaf.rootHeight, 0);
		pivot.add(new Mesh(leaf.geometry, leafMaterial), createOutline(leaf.geometry, partOutline));
		turn.add(pivot);
		calyx.add(turn);
		leaves.push(pivot);
	}

	// The face.
	const sphere = new SphereGeometry(1, 24, 16);
	const happyArc = new TorusGeometry(0.11, 0.032, 8, 24, Math.PI);
	const eyes = [-1, 1].map((side) => {
		const holder = new Group();
		const open = new Group();
		const ball = new Mesh(sphere, eyeMaterial);
		ball.scale.set(0.16, 0.2, 0.075);
		const shine = new Mesh(sphere, shineMaterial);
		shine.scale.setScalar(0.045);
		shine.position.set(0.045, 0.065, 0.06);
		const sparkle = new Mesh(sphere, shineMaterial);
		sparkle.scale.setScalar(0.018);
		sparkle.position.set(-0.045, -0.07, 0.055);
		open.add(ball, shine, sparkle);
		const happy = new Mesh(happyArc, eyeMaterial);
		happy.position.set(0, -0.05, 0.01);
		holder.add(open, happy);
		head.add(holder);
		return { side, holder, open, happy };
	});

	const mouth = createDecal(MOUTH_STEPS * 2, mouthMaterial, 'strip');
	const tongue = createDecal(TONGUE_STEPS * 2, tongueMaterial, 'strip');
	head.add(mouth.mesh, tongue.mesh);

	const blushOutline = ellipseOutline(0.13, 0.075, 0, ELLIPSE_STEPS);
	for (const side of [-1, 1]) {
		const blush = createDecal(ELLIPSE_STEPS, blushMaterial);
		blush.update(blushOutline, side * 0.64, -0.1, 0.004);
		head.add(blush.mesh);
	}

	// A painted shine on the upper right, like the one in the drawing.
	for (const [u, v, radiusX, radiusY, angle] of [
		[0.6, 0.4, 0.15, 0.065, -0.75],
		[0.82, 0.12, 0.05, 0.04, 0]
	]) {
		const shine = createDecal(ELLIPSE_STEPS, highlightMaterial);
		shine.update(ellipseOutline(radiusX, radiusY, angle, ELLIPSE_STEPS), u, v, 0.004);
		head.add(shine.mesh);
	}

	// --- State -----------------------------------------------------------------------------------

	const pose = {} as Pose;
	const gaze = { x: 0, y: REST_GAZE_Y, targetX: 0, targetY: REST_GAZE_Y };
	const wobble = { value: 0, velocity: 0 };
	let time = 0;
	let hovered = false;
	let happiness = 0;
	let tickle = 0;
	let calyxAngle = 0;
	let nextBlink = random(1.5, 4);
	let blinkStart = -1;
	let doubleBlink = false;
	let action: Action | undefined;
	let previousAction: Action | undefined;
	let actionStart = 0;
	let nextIdleAction = 2.5;
	let greeted = false;
	const outline: number[] = [];

	function play(next: Action) {
		action = next;
		previousAction = next;
		actionStart = time;
	}

	function resetPose() {
		pose.y = 0;
		pose.squash = 0;
		pose.yaw = 0;
		pose.pitch = 0;
		pose.roll = 0;
		pose.spin = 0;
		pose.gazeX = gaze.x;
		pose.gazeY = gaze.y;
		pose.happy = happiness;
		pose.blink = 0;
		pose.eyeScale = 1;
		pose.squint = 0;
		pose.mouthWidth = 0.26 + 0.05 * happiness;
		pose.mouthOpen = 0.17 + 0.05 * happiness;
		pose.mouthSmile = 1;
		pose.mouthRound = 0;
		pose.blush = 0.35 + 0.55 * happiness;
		pose.leafLift = 0.3 * happiness;
		pose.wave = 0;
		pose.propeller = 0;
	}

	function update(dt: number) {
		time += dt;
		resetPose();

		happiness = damp(happiness, hovered ? 1 : 0, 8, dt);
		tickle = damp(tickle, 0, 4, dt);

		if (!reducedMotion) {
			gaze.x = damp(gaze.x, gaze.targetX, 6, dt);
			gaze.y = damp(gaze.y, gaze.targetY, 6, dt);

			pose.squash += Math.sin(time * 2.4) * 0.012;
			pose.y += Math.sin(time * 1.2) * 0.02;

			if (hovered && tickle > 320 && action !== giggle) {
				tickle = 0;
				play(giggle);
			}
			if (!action && !hovered && time >= nextIdleAction) {
				play(greeted ? pickIdleAction(previousAction) : wave);
				greeted = true;
			}
		}

		// Blinks happen with or without reduced motion: they are tiny and make it feel alive.
		if (time >= nextBlink) {
			blinkStart = time;
			nextBlink = time + (doubleBlink ? 0.22 : random(2.2, 5.5));
			doubleBlink = !doubleBlink && Math.random() < 0.2;
		}
		pose.blink = blinkStart >= 0 ? bell((time - blinkStart) / 0.16) : 0;

		if (action) {
			const t = (time - actionStart) / action.duration;
			if (t >= 1) {
				action = undefined;
				nextIdleAction = time + random(4, 9);
			} else {
				action.apply(t, pose);
			}
		}

		// Squash and stretch spring for the boing when hovered or clicked.
		wobble.velocity += (-180 * wobble.value - 9 * wobble.velocity) * dt;
		wobble.value += wobble.velocity * dt;
		pose.squash += wobble.value;

		apply(dt);
	}

	function apply(dt: number) {
		root.position.y = pose.y;
		const stretch = Math.max(1 + pose.squash, 0.5);
		squash.scale.set(1 / Math.sqrt(stretch), stretch, 1 / Math.sqrt(stretch));
		head.rotation.set(
			pose.pitch - pose.gazeY * 0.3,
			pose.yaw + pose.spin + pose.gazeX * 0.5,
			pose.roll
		);

		const squint = clamp(pose.squint, 0, 1);
		const happyEyes = Math.max(smoothstep(0.35, 0.75, pose.happy), squint);
		for (const eye of eyes) {
			const u = eye.side * 0.38 + pose.gazeX * 0.05;
			const v = 0.1 + pose.gazeY * 0.04;
			surfacePoint(u, v, 0.005, eye.holder.position);
			eye.holder.quaternion.setFromUnitVectors(Z_AXIS, surfaceNormal(u, v, scratch));
			const open = (1 - happyEyes) * pose.eyeScale;
			eye.open.scale.set(open, open * Math.max(1 - pose.blink, 0.08), open);
			eye.open.visible = open > 0.01;
			eye.happy.scale.setScalar(happyEyes);
			eye.happy.rotation.z = (eye.side * squint * Math.PI) / 2;
			eye.happy.position.set(eye.side * squint * 0.05, -0.05 * (1 - squint), 0.01);
			eye.happy.visible = happyEyes > 0.01;
		}

		const width = Math.max(pose.mouthWidth, 0.06);
		const open = Math.max(pose.mouthOpen, 0.03);
		const smile = clamp(pose.mouthSmile, 0, 1.6);
		const round = clamp(pose.mouthRound, 0, 1);
		mouth.update(mouthOutline(width, open, smile, round, outline), 0, -0.16, 0.006);
		tongue.mesh.visible = open > 0.07;
		if (tongue.mesh.visible) {
			tongue.update(tongueOutline(width, open, smile, round, outline), 0, -0.16, 0.008);
		}
		blushMaterial.opacity = clamp(pose.blush, 0, 1) * 0.75;

		if (pose.propeller > 0.5) {
			calyxAngle += pose.propeller * dt;
		} else {
			const step = (Math.PI * 2) / LEAF_COUNT;
			calyxAngle = damp(calyxAngle, Math.round(calyxAngle / step) * step, 6, dt);
		}
		calyx.rotation.y = calyxAngle;
		leaves.forEach((leaf, i) => {
			leaf.rotation.z = pose.leafLift * (0.8 + 0.1 * (i % 3)) + (i === 0 ? pose.wave : 0);
		});
	}

	// --- Loop and events -------------------------------------------------------------------------

	let frame = 0;
	let last = performance.now();
	let ready = false;

	function render(now: number) {
		frame = requestAnimationFrame(render);
		const dt = Math.min((now - last) / 1000, 0.05);
		last = now;
		update(dt);
		renderer.render(scene, camera);
		if (!ready) {
			ready = true;
			options.onReady();
		}
	}

	if (options.still) {
		update(0);
		renderer.render(scene, camera);
	} else {
		frame = requestAnimationFrame(render);
	}

	// It only pays attention to a cursor that comes close: fully within `near`, fading out by `far`,
	// and looking straight ahead beyond that. Both grow with the mascot.
	function onPointerMove(event: PointerEvent) {
		const rect = canvas.getBoundingClientRect();
		const near = rect.width * 0.75;
		const far = rect.width * 2;
		const offsetX = event.clientX - (rect.left + rect.width / 2);
		const offsetY = event.clientY - (rect.top + rect.height / 2);
		const attention = 1 - smoothstep(near, far, Math.hypot(offsetX, offsetY));
		gaze.targetX = clamp(offsetX / near, -1, 1) * attention;
		gaze.targetY = lerp(REST_GAZE_Y, clamp(-offsetY / near, -1, 0.5), attention);
		if (hovered) tickle += Math.abs(event.movementX) + Math.abs(event.movementY);
	}

	function onPointerLeavePage() {
		gaze.targetX = 0;
		gaze.targetY = REST_GAZE_Y;
	}

	function onContextLost(event: Event) {
		event.preventDefault();
		cancelAnimationFrame(frame);
		options.onLost();
	}

	window.addEventListener('pointermove', onPointerMove, { passive: true });
	document.documentElement.addEventListener('pointerleave', onPointerLeavePage);
	canvas.addEventListener('webglcontextlost', onContextLost);

	return {
		setHovered(value) {
			if (value === hovered) return;
			hovered = value;
			if (reducedMotion) return;
			if (hovered) {
				wobble.velocity -= 2;
			} else {
				if (!action && Math.random() < 0.4) play(beam);
				nextIdleAction = Math.max(nextIdleAction, time + 3);
			}
		},
		setReducedMotion(value) {
			reducedMotion = value;
			if (value) action = undefined;
		},
		cheer() {
			if (reducedMotion) return;
			wobble.velocity -= 1.5;
			play(spin);
		},
		dispose() {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			window.removeEventListener('pointermove', onPointerMove);
			document.documentElement.removeEventListener('pointerleave', onPointerLeavePage);
			canvas.removeEventListener('webglcontextlost', onContextLost);
			scene.traverse((object) => {
				if (object instanceof Mesh) object.geometry.dispose();
			});
			for (const material of [
				bodyOutline,
				partOutline,
				bodyMaterial,
				leafMaterial,
				stemMaterial,
				eyeMaterial,
				shineMaterial,
				highlightMaterial,
				blushMaterial,
				mouthMaterial,
				tongueMaterial
			]) {
				material.dispose();
			}
			renderer.dispose();
		}
	};
}

/**
 * Takes a picture of the tomato at rest, framed like the live canvas. `static/mascot.png`, shown
 * until the 3D mascot loads, comes from here. To redo it after changing the mascot, run this in the
 * browser console with the dev server up and save the file it opens:
 *
 *     const { renderTomatoPng } = await import('/src/lib/mascot/tomato.ts');
 *     open(URL.createObjectURL(await renderTomatoPng(240)));
 */
export function renderTomatoPng(size: number): Promise<Blob> {
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	const mascot = createTomatoMascot(canvas, {
		reducedMotion: true,
		still: true,
		onReady: () => {},
		onLost: () => {}
	});
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			mascot.dispose();
			if (blob) resolve(blob);
			else reject(new Error('Could not draw the mascot.'));
		}, 'image/png');
	});
}
