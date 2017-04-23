import { createApp } from '@/app'

describe('app.ts', () => {
  it('should mount correctly', async () => {
    const vm = createApp()
    vm.$mount(document.createElement('div'))
    expect(vm.$el.id).to.equal('app')
  })
})
