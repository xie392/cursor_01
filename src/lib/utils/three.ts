import * as THREE from 'three';

/**
 * 创建粒子系统
 * @param count 粒子数量
 * @param size 粒子大小
 * @param color 粒子颜色
 * @param spread 粒子分布范围
 */
export function createParticleSystem(
  count: number = 1000,
  size: number = 0.05,
  color: string = '#ffffff',
  spread: number = 50
): THREE.Points {
  // 创建粒子几何体
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  
  // 随机分布粒子
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * spread;     // x
    positions[i + 1] = (Math.random() - 0.5) * spread; // y
    positions[i + 2] = (Math.random() - 0.5) * spread; // z
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // 创建粒子材质
  const particlesMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: generateParticleTexture(),
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  
  // 创建粒子系统
  return new THREE.Points(particlesGeometry, particlesMaterial);
}

/**
 * 生成粒子纹理
 */
function generateParticleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  
  const context = canvas.getContext('2d');
  if (!context) throw new Error('无法创建2D上下文');
  
  // 创建径向渐变
  const gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  
  return texture;
}

/**
 * 创建波浪平面
 * @param width 宽度
 * @param height 高度
 * @param widthSegments 宽度分段
 * @param heightSegments 高度分段
 * @param color 颜色
 * @param wireframe 是否显示线框
 */
export function createWavePlane(
  width: number = 20,
  height: number = 20,
  widthSegments: number = 50,
  heightSegments: number = 50,
  color: string = '#1e88e5',
  wireframe: boolean = false
): THREE.Mesh {
  // 创建平面几何体
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments
  );
  
  // 创建材质
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(color),
    side: THREE.DoubleSide,
    wireframe,
    flatShading: true
  });
  
  // 创建网格
  const plane = new THREE.Mesh(geometry, material);
  
  return plane;
}

/**
 * 为波浪平面添加动画
 * @param plane 平面网格
 * @param time 当前时间
 * @param amplitude 波浪振幅
 * @param frequency 波浪频率
 */
export function animateWavePlane(
  plane: THREE.Mesh,
  time: number,
  amplitude: number = 0.2,
  frequency: number = 0.5
): void {
  const geometry = plane.geometry as THREE.PlaneGeometry;
  const positions = geometry.attributes.position;
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    
    // 创建波浪效果
    const z = amplitude * Math.sin(x * frequency + time) * Math.sin(y * frequency + time);
    
    positions.setZ(i, z);
  }
  
  positions.needsUpdate = true;
}

/**
 * 创建3D文本
 * @param text 文本内容
 * @param options 配置选项
 * @returns THREE.Mesh 文本网格
 */
export function create3DText(
  text: string,
  options: {
    size?: number;
    height?: number;
    color?: string;
    position?: [number, number, number];
  } = {}
): THREE.Mesh {
  const {
    size = 1,
    height = 0.2,
    color = '#ffffff',
    position = [0, 0, 0]
  } = options;
  
  // 注意：在实际使用时，需要导入TextGeometry
  // 这里使用普通的BoxGeometry代替
  const textGeometry = new THREE.BoxGeometry(size * text.length, size, height);
  
  // 创建材质
  const textMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color)
  });
  
  // 创建网格
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(
    position[0],
    position[1],
    position[2]
  );
  
  return textMesh;
}

/**
 * 创建星空背景
 * @param count 星星数量
 * @returns THREE.Points 星空背景
 */
export function createStarBackground(count: number = 1000): THREE.Points {
  // 创建几何体
  const geometry = new THREE.BufferGeometry();
  
  // 创建星星位置
  const positions = new Float32Array(count * 3);
  
  // 设置每个星星的位置
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000;     // x
    positions[i + 1] = (Math.random() - 0.5) * 2000; // y
    positions[i + 2] = (Math.random() - 0.5) * 2000; // z
  }
  
  // 设置几何体属性
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // 创建材质
  const material = new THREE.PointsMaterial({
    size: 0.7,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  // 创建星空
  const stars = new THREE.Points(geometry, material);
  
  return stars;
}

/**
 * 创建渐变背景
 * @param colors 颜色数组
 * @returns THREE.Mesh 背景网格
 */
export function createGradientBackground(colors: string[] = ['#0f172a', '#1e293b']): THREE.Mesh {
  // 创建平面几何体
  const geometry = new THREE.PlaneGeometry(2, 2);
  
  // 创建着色器材质
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(colors[0]) },
      color2: { value: new THREE.Color(colors[1]) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `
  });
  
  // 创建网格
  const mesh = new THREE.Mesh(geometry, material);
  
  return mesh;
}

/**
 * 创建粒子系统
 * @param count 粒子数量
 * @returns THREE.Points 粒子系统
 */
export function initParticleSystem(count: number = 2000): THREE.Points {
  // 创建几何体
  const geometry = new THREE.BufferGeometry();
  
  // 创建粒子位置
  const positions = new Float32Array(count * 3);
  
  // 设置每个粒子的位置
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;     // x
    positions[i + 1] = (Math.random() - 0.5) * 20; // y
    positions[i + 2] = (Math.random() - 0.5) * 20; // z
  }
  
  // 设置几何体属性
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // 创建材质
  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x4f9cff,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  // 创建粒子系统
  const particles = new THREE.Points(geometry, material);
  
  return particles;
}