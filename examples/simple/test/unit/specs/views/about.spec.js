import Vue from 'vue'
import About from 'src/views/about.vue'

describe('views/about.vue', () => {
  it('should render correct contents', async () => {
    const Constructor = Vue.extend(About)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent).
      to.equal('about vue')
  })
})
