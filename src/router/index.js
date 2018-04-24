import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/pages/Main');
const About = () => import('@/pages/About');
const GetStarted = () => import('@/pages/GetStarted');
const Themes = () => import('@/pages/Themes');
const ComponentTest = () => import('@/pages/ComponentTest');
const NotFoundComponent = () => import('@/components/NotFoundComponent');

const BlotterTestsMain = () => import('@/pages/BlotterTestsMain');
const UIDemosMain = () => import('@/pages/UIDemosMain');

const TestingGround = () => import('@/pages/TestingGround');
const BlotterMenu = () => import('@/pages/BlotterMenu');
const BlotterTest = () => import('@/pages/BlotterTest');
const EnterpriseBlotterTest = () => import('@/pages/EnterpriseBlotterTest');
const ViewportBlotterTest = () => import('@/pages/ViewportBlotterTest.vue');
const ServerSideBlotterTest = () => import('@/pages/ServerSideBlotterTest');

const LiveDashboard = () => import('@/pages/LiveDashboard');
const PlotlyTest = () => import('@/pages/PlotlyTest');
const VueSocketio = () => import('vue-socket.io');
const WindowManagerTest = () => import('@/pages/WindowManagerTest');
const ChartjsTest = () => import('@/pages/ChartjsTest');
const ChartistTest = () => import('@/pages/ChartistTest');
const ChartkickTest = () => import('@/pages/ChartkickTest');
//const InterAppDemo = () => import('@/pages/InterAppDemo');
const ReceiverTest = () => import('@/pages/ReceiverTest');
const UIBuilderComponent = () => import('@/components/UIBuilderComponent');
const ExampleComplete = () => import('@/pages/ExampleComplete');
const Example = () => import('@/pages/Example');

const SendStockTest = () => import('@/pages/SendStockTest');
const LoginPage = () => import('@/pages/LoginPage');
const SignupPage = () => import('@/pages/SignupPage');


var wsServer = "http://localhost:8000"

// to communicate across devices, this must be non-localhost



const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/windowmanager',
      name: 'WindowManagerTest',
      component: WindowManagerTest,
      beforeEnter(to, from, next) {
        Vue.use(VueSocketio, wsServer)
        next()
      }
    },
    {
      path: '/testing',
      name: 'TestingGround',
      component: TestingGround
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/d3test',
      name: 'ComponentTest',
      component: ComponentTest
    },
    {
      path: '/blotters',
      name: 'Blotters',
      component: BlotterMenu,
    },
    {
      path: '/blotters/memory',
      component: BlotterTest,
      name: 'BlotterTest'
    },
    {
      path: '/blotters/enterprise',
      name: 'EnterpriseBlotterTest',
      component: EnterpriseBlotterTest
    },
    {
      path: '/blotters/viewport',
      name: 'ViewportBlotterTest',
      component: ViewportBlotterTest
    },
    {
      path: '/blotters/serverside',
      name: 'ServerSideBlotterTest',
      component: ServerSideBlotterTest
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
    },
    {
      path: '/example-complete',
      name: 'ExampleComplete',
      component: ExampleComplete
    },
    {
      path: '/livedashboard',
      name: 'LiveDashboard',
      component: LiveDashboard,
      beforeEnter(to, from, next) {
        // Comment in for demo to use our saved websocket stock data
        // node demoServer.js must be running on localhost:8000
        Vue.use(VueSocketio, wsServer)

        // Use this to get live data
        // Vue.use(VueSocketio, 'https://ws-api.iextrading.com/1.0/tops')
        next()
      }
    },
    {
      path: '/plotlytest',
      name: 'PlotlyTest',
      component: PlotlyTest
    },
    {
      path: '/themes',
      name: 'Themes',
      component: Themes
    },
    {
      path: '/chartjstest',
      name: 'ChartjsTest',
      component: ChartjsTest
    },
    {
      path: '/chartisttest',
      name: 'ChartistTest',
      component: ChartistTest
    },
    {
      path: '/chartkicktest',
      name: 'ChartkickTest',
      component: ChartkickTest
    },
    {
      path:'/sendstocktest',
      name: 'SendStockTest',
      component: SendStockTest
    },
    {
      path:'/receivertest',
      name: 'ReceiverTest',
      component: ReceiverTest
    },
    {
      path: '/uibuilder',
      name: "UIBuilder",
      component: UIBuilderComponent
    },
    {
      path:'/auth/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path:'/auth/signup',
      name: 'Signup',
      component: SignupPage
    },
    { path: '*',
      name: '404',
      component: NotFoundComponent
    },
    {
      path: '/get-started',
      name: 'GetStarted',
      component: GetStarted
    },
    // { path: '/blotter-tests',
    //   name: 'BlotterTestsMain',
    //   component: BlotterTestsMain
    // },
    { path: '/ui-demos',
      name: 'UIDemosMain',
      component: UIDemosMain
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
