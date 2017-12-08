// https://github.com/locoslab/vue-typescript-import-dts
declare module '*.vue' {
  import Vue, { ComponentOptions } from 'vue'
  const component: ComponentOptions<Vue>
  export default component
}
