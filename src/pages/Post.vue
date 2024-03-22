<template>
  <v-app id="inspire">
   <v-navigation-drawer v-model="drawer">
     <!--  -->
   </v-navigation-drawer>

   <v-app-bar>
     <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

     <v-app-bar-title>Post</v-app-bar-title>
   </v-app-bar>
   

   <v-main v-for="(post, index) in posts " :key="index">
     <v-card
           border
           class="post"
           density="compact"
           :prepend-avatar="post.imageAvt"
           :subtitle="post.createAt"
           :title="post.nameUser"
           variant="text"
         >
           <v-card-text>
             {{ post.decription }}
           </v-card-text>

           <div class="image-container">
              <v-img v-for="(image, index) in post.imagesPost" :key="index" :src="image" width="40%" height="100%" cover></v-img>
          </div>


             <div class="interact">
               <button @click="changgeLike" >
                <i :class="isLike ? 'pi pi-heart-fill' : 'pi pi-heart'" style="color: slateblue; font-size: 2rem"></i>

               </button>
               <button @click="clickButton">
                <i class="pi pi-comment" style="color: slateblue; font-size: 2rem;"></i>
               </button>
             </div>
<!-- comment UI -->
              <div class="ui comments" v-if="isClickComment">
                <a-comment>
    <template #actions>
      <span key="comment-nested-reply-to">Reply to</span>
    </template>
    <template #author>
      <a>Han Solo</a>
    </template>
    <template #avatar>
      <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
    </template>
    <template #content>
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure).
      </p>
    </template>
    <a-comment>
      <template #actions>
        <span>Reply to</span>
      </template>
      <template #author>
        <a>Han Solo</a>
      </template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
      </template>
      <a-comment>
        <template #actions>
          <span>Reply to</span>
        </template>
        <template #author>
          <a>Han Solo</a>
        </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </template>
      </a-comment>
      <a-comment>
        <template #actions>
          <span>Reply to</span>
        </template>
        <template #author>
          <a>Han Solo</a>
        </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </template>
      </a-comment>
    </a-comment>
  </a-comment>
            </div>
<!-- comment UI -->
         </v-card>
                       
   </v-main>
 </v-app>
</template>

<script setup>
import {ref, watch} from 'vue'


const drawer = ref (false)
const group = ref (null)

watch (()=> {
  const group =() => {
    drawer.value = false
  }
}) 

const isLike = ref(false)
const changgeLike = () => {
  isLike.value = !isLike.value
}

const isClickComment = ref(false)
const clickButton = () => {
  isClickComment.value = !isClickComment.value
}

const posts = ref ([
  {
    imageAvt : 'https://randomuser.me/api/portraits/women/10.jpg',
    nameUser : 'Abahi',
    decription : 'We are the world',
    createAt : '2020-27-03',
    likeCount : 5,
    commentCount : 7,
    imagesPost : ['https://zenmarket.blob.core.windows.net/images/blog/xvfd40km.yd1',
    'https://zenmarket.blob.core.windows.net/images/blog/gzowboj2.cf1',
    'https://zenmarket.blob.core.windows.net/images/blog/on5qlv2a.fui',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt',
    'https://zenmarket.blob.core.windows.net/images/blog/xvfd40km.yd1',
    'https://zenmarket.blob.core.windows.net/images/blog/gzowboj2.cf1',
    'https://zenmarket.blob.core.windows.net/images/blog/on5qlv2a.fui',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt',
    'https://zenmarket.blob.core.windows.net/images/blog/xvfd40km.yd1',
    'https://zenmarket.blob.core.windows.net/images/blog/gzowboj2.cf1',
    'https://zenmarket.blob.core.windows.net/images/blog/on5qlv2a.fui',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt',
    'https://zenmarket.blob.core.windows.net/images/blog/xvfd40km.yd1',
    'https://zenmarket.blob.core.windows.net/images/blog/gzowboj2.cf1',
    'https://zenmarket.blob.core.windows.net/images/blog/on5qlv2a.fui',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt',
    ]
  },
  {
    imageAvt : 'https://randomuser.me/api/portraits/women/10.jpg',
    nameUser : 'Abahi',
    decription : 'We are the world',
    createAt : '2020-27-03',
    likeCount : 5,
    commentCount : 7,
    imagesPost : ['https://zenmarket.blob.core.windows.net/images/blog/y23zwqf2.tcv',
    'https://zenmarket.blob.core.windows.net/images/blog/iq0nadsv.3wl']
  },
  {
    imageAvt : 'https://randomuser.me/api/portraits/women/10.jpg',
    nameUser : 'Abahi',
    decription : 'We are the world',
    createAt : '2020-27-03',
    likeCount : 5,
    commentCount : 7,
    imagesPost : ['https://zenmarket.blob.core.windows.net/images/blog/bmzj3eqb.1yu',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt',
    'https://zenmarket.blob.core.windows.net/images/blog/on5qlv2a.fui',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt']
  },
  {
    imageAvt : 'https://randomuser.me/api/portraits/women/10.jpg',
    nameUser : 'Abahi',
    decription : 'We are the world',
    createAt : '2020-27-03',
    likeCount : 5,
    commentCount : 7,
    imagesPost : ['https://zenmarket.blob.core.windows.net/images/blog/mmgjc5gk.keu',
    'https://zenmarket.blob.core.windows.net/images/blog/on5qlv2a.fui']
  },
  {
    imageAvt : 'https://randomuser.me/api/portraits/women/10.jpg',
    nameUser : 'Abahi',
    decription : 'We are the world',
    createAt : '2020-27-03',
    likeCount : 5,
    commentCount : 7,
    imagesPost : ['https://zenmarket.blob.core.windows.net/images/blog/bmzj3eqb.1yu',
    'https://zenmarket.blob.core.windows.net/images/blog/gbhs1tyq.ntt',]
  }
])

 
</script>

<style>


.post{
 width: 60%;
 margin-left: 15%;
}
.interact {
 height: 60px;
 display: flex;
 align-items: center;
 justify-content: space-around;
}

.image-container {
   width: 100%; /* Đặt chiều rộng tùy ý */ /* Đặt chiều cao tùy ý */
   overflow-x: auto; /* Cho phép thanh cuộn ngang khi nội dung vượt quá chiều rộng */
   white-space: nowrap; /* Ngăn chặn việc trống dòng và làm cho các hình ảnh xuất hiện trên một hàng */
   margin-top: 2px;
   display: flex; /* Sử dụng Flexbox */
    flex-wrap: wrap; /* Cho phép các phần tử con được xếp theo hàng mới khi không đủ không gian */
    gap: 3px;
 }

  .image-container v-img {
    width: 40%; /* Đặt chiều rộng của mỗi ảnh là 50% để chúng hiển thị cạnh nhau trên cùng một dòng */
    height: auto; /* Đảm bảo tỷ lệ khung hình tự động được duy trì */
    box-sizing: border-box; /* Đảm bảo padding và border được tính vào kích thước của phần tử */
    padding: 5px; /* Khoảng cách giữa các ảnh */
  }






</style>