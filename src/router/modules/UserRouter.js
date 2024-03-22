const UserRouter = [
    {
        path: '/my-course',
        name: 'Mycourse',
        component: () => import( '@/views/user/MyCourse.vue')
      },
      {
        path: '/post',
        name: 'post',
        component: () => import( '@/pages/Post.vue'),
        meta: {
          keepAlive: true, // Thêm thuộc tính keepAlive
        },
      },
]

export default UserRouter