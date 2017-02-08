import Vue from 'vue'
import About from 'src/views/about.vue'

describe('views/about.vue', () => {
  it('should render correct contents', async () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(About),
    })
    expect(vm.$el.querySelector('h1').textContent).
      to.equal('about vue')
  })
})
