此项目用于在线3d预览各种文件,使用threejs + occt-import-js 解析

> 已确定支持的文件格式包括: `gltf` `glb` `obj` `stl` `dae` `3ds` `stp` `igs` `iges`
> 待验证的格式: `ply` `collada` `svg` `vrml` `wrl` `pcd` `xyz` `pdb` `ktx2` `json`
> 不支持老版本 `fbx`

项目使用vite + vue3 + js + elementPlus + sass构建，为了方便转移到odoo，没有使用ts!
同时加入了eslint和prettier进行代码校验和格式化，编译器可安装相应插件搭配使用！

1. 项目使用pnpm管理，首次运行需执行以下安装命令

```js
   npm install -g pnpm
```

2. 安装依赖库

```js
   pnpm install
```

3. 运行项目

```js
   pnpm run dev
```

备注: 补充说明使用到的相关依赖

1. 潘通色模块, [选择器源码](https://github.com/anish2690/vue-color-kit), [潘通标准色库](https://www.pantoneshop.cn/home/Color/index)
