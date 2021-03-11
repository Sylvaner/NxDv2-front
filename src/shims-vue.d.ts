import mitt from "mitt"
import { Emitter } from 'mitt';
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
      eventBus: Emitter
  }
}