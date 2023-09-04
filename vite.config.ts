import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import legacy from '@vitejs/plugin-legacy'

export default ({ mode }: ConfigEnv) => {
  const isDev = mode === 'development'
  const env = loadEnv(mode, __dirname)
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin({
        include: ['src/**/*.{vue,js,ts,jsx,tsx}']
      }),
      // 按需自动引入components下的组件、naive-ui的组件、icons中的图标;
      Components({
        resolvers: [
          /**
           * 已安装@iconify-json/ion、@iconify-json/ep图标集的图标，打包时按需引入
           * 如需使用其他图标集请去https://icon-sets.iconify.design/，搜索相关图标集自行安装,安装之后无需其他配置，直接使用即可
           * egg: 安装mdi图标集 pnpm add @iconify-json/mdi -D
           * cus为自定义图标集，路径/src/assets/icons
           * 引入方式 <{prefix}{collection}{icon} /> （prefix是前缀ccollection是集合名称icon是图标名称）
           * eg：template中自动导入自定义图标 <ICusReturn />
           * eg：template中自动导入ion中图标 <IIonAccessibility />
           * eg: ts文件中需手动导入 import IIonAccessibility from '~icons/ion/accessibility'
           */
          IconsResolver({
            customCollections: ['ion']
          })
        ]
      }),
      legacy({
        targets: 'defaults, chrome >= 78',
        modernPolyfills: true
      })
    ],
    esbuild: {
      drop: isDev ? [] : ['console', 'debugger']
    },
    build: {
      target: 'es2016',
      outDir: 'dist',
      minify: false,
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name].[hash].js',
          chunkFileNames: 'static/js/[name].[hash].js',
          assetFileNames: 'static/css/[name].[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: './',
    define: {
      VUE_I18N_DISABLE_AUTOFOCUS: true
    }
  })
}
