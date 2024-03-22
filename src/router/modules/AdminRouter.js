import AppLayout from '@/layout/AppLayout.vue';

const AdminRouter =[
    {
        path: '/post',
        name: 'post',
        component: () => import( '@/pages/Post.vue'),
        meta: {
          keepAlive: true, // Thêm thuộc tính keepAlive
        },
      },
    {
        path: '/admin',
        component: AppLayout,
        children: [
          {
            path: '', 
            redirect: 'dashboard', 
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/admin/Dashboard.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/user',
            name: 'ManagementUser',
            component: () => import('@/views/admin/UserManagement.vue'),
            children: [
              {
                path:'/management/user/EditUser/:userID',
                name:'AddUser',
                component: () => import('@/views/admin/EditUser.vue'),
                props:true
              }
            ]
          },
          {
            path: '/management/course',
            name: 'ManagementCourse',
            component: () => import('@/views/admin/CourseManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/post',
            name: 'ManagementPost',
            component: () => import('@/views/admin/PostManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },    
          },
          {
            path: '/management/notification',
            name: 'ManagementNotification',
            component: () => import('@/views/admin/NotificationManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/task',
            name: 'ManagementTask',
            component: () => import('@/views/admin/TaskManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/contact-evaluation',
            name: 'ManagementContactEvaluation',
            component: () => import('@/views/admin/ContactEvaluation.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/map',
            name: 'ManagementMap',
            component: () => import('@/views/admin/MapManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
        ],
        meta: {
          keepAlive: true, // Thêm thuộc tính keepAlive
        },
      },  
]

export default AdminRouter