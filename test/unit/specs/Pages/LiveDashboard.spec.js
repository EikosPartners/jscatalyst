import { SocketIO, Server, WebSocket } from 'mock-socket';
import VueSocketio from 'vue-socket.io'
import Component from '@/pages/LiveDashboard.vue'
import { mount, shallow, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(VueSocketio, 'http://localhost:8080')

describe('A test', () => {
  let wrapper
  beforeEach(() => {
      wrapper = shallow(Component, {
        localVue
      })
  })

  it('creates a ws and server', (done) => {

    const mockServer = new Server('http://localhost:8080');
    mockServer.on('connect', server => {
     server.emit('message', {"symbol":"FB","marketPercent":0.01588,"bidSize":200,"bidPrice":182.17,"askSize":100,"askPrice":182.85,"volume":19361,"lastSalePrice":182.22,"lastSaleSize":200,"lastSaleTime":1519829100955,"lastUpdated":1519829105349,"sector":"softwareservices","securityType":"commonstock"});
    });
    // expect()
    window.io = SocketIO;
    // console.log(window.location);
    console.log(mockServer);
    // console.log(wrapper.vm.$socket);
    // console.log(wrapper.vm.$data.liveLinePlotData);

   setTimeout(() => {
     expect(wrapper.vm.$socket.connected).toBeTruthy()

      mockServer.stop(done);
    }, 100);
  })
})
