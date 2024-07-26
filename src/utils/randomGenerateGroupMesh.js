
import { Group, MeshBasicMaterial,Mesh, Vector3 } from "three"

const getRandomColor = () => {
    // 生成一个随机的十六进制颜色值
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export const randomGenerateGroupMesh = (geometry) => {
  const group = new Group();
  const speed = 0.3;  

  for(let i = 0; i < 20; i++){
      const material = new MeshBasicMaterial({ color: getRandomColor() } );
        const octahedron = new Mesh( geometry, material );
        octahedron.position.set( (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 200 );
        octahedron.rotation.x = Math.random() * Math.PI;
        octahedron.rotation.y = Math.random() * Math.PI;
        // 存储随机的运动方向
        octahedron.userData.direction = new Vector3(  
          (Math.random() - 0.5) * 2 * speed,  
          (Math.random() - 0.5) * 2 * speed,  
          (Math.random() - 0.5) * 2 * speed  
      ); 
        group.add(octahedron)
      }
      return group
}

export const randomMove = (scene) => {  
  const moveRange = 50;  
      scene.children.forEach(child => {
        if (child.constructor.name == "Group") {
          child.children.forEach(mesh => {
           const direction = mesh.userData.direction
       // 记录当前速度和方向  
             // 检查边界  
       if (Math.abs(mesh.position.x) > moveRange) {  
           direction.x = -direction.x; // 反转x轴方向  
       }  
       if (Math.abs(mesh.position.y) > moveRange) {  
           direction.y = -direction.y; // 反转y轴方向  
       }  
       if (Math.abs(mesh.position.z) > moveRange) {  
           direction.z = -direction.z; // 反转z轴方向  
       }  
       // 更新网格位置  
       mesh.position.add(direction);  
          })
        }
      })
   }  
