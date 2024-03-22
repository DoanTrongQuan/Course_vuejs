const PublicRouter = [
    {
        path: '/',
        name: 'home',
        component: () => import( '@/pages/Home.vue')
        }, 

        {
          path: '/signup',
          name: 'signup',
          component: () => import( '@/pages/Signup.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import( '@/pages/Login.vue'),
          meta: {
            keepAlive: true, // Thêm thuộc tính keepAlive
          },
        },
        {
          path: '/course',
          name: 'course',
          component: () => import( '@/pages/Course.vue')
        },
]

export default PublicRouter