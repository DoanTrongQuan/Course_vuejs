<script setup>
import {ref, onMounted, computed} from 'vue';
import eventBus from '../eventBus.js'
import HeaderHome from '../components/user/HeaderHome.vue'
import PublicService from "../service/public.service.js";
import { useStore } from 'vuex';
const store = useStore();
const components  = {
  HeaderHome
}


const slides =  ref(['First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',])
const colors = ref([ 'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',])

const isLoading = ref(true);
const isShowheaderHome = ref(true);
const isShowHome = ref(true)
const isShowPost = ref(false)
const isShowMyCourse = ref(false)
const isShowAdminPage = ref(false)
const currentUser =  computed(() =>{
  store.state.auth.user;
})

const courseTypes = ref([])
const coursesTopFirst = ref([])
const coursesTopSecond = ref([])
const coursesTopThird = ref([])
const dataLoaded = ref(false)

onMounted(async () => {
     try {
        const response = await PublicService.getTop3CourseType();

        const uniqueCourseTypes = new Set();
        let count = 0;

        response.data.forEach(courseArray => {
          const course = {
            ImageCourse: courseArray[0],
            CourseSubTitle: courseArray[1],
            LessonCount: courseArray[3],
            TimeLessonTotal: courseArray[4]
      };
      if (count < 15) {
        coursesTopFirst.value.push(course);
      } else if (count < 30) {
        coursesTopSecond.value.push(course);
      } else {
        coursesTopThird.value.push(course);
      }
      count++;
      uniqueCourseTypes.add(courseArray[2]);
    });

    courseTypes.value = Array.from(uniqueCourseTypes);
  } catch (error) {
    // Xử lý lỗi
  } finally {
    dataLoaded.value = true;

  }

    eventBus.on('isShowheaderHome', (mes) => {
      isShowheaderHome.value = mes;
      isShowHome.value = mes;
    });

    eventBus.on('isShowPost', (mes) => {
      isShowPost.value = mes;
      isShowHome.value = !mes;
      isShowheaderHome.value = !mes;
    });
    eventBus.on('showMyCourse', (mes) => {
      isShowMyCourse.value = mes;
      isShowHome.value = !mes;
      isShowheaderHome.value = !mes;
    })
    eventBus.on('showAdminPage', (mes) => {
      isShowAdminPage.value = mes;
      isShowHome.value = !mes;
      isShowheaderHome.value = !mes;
    });
});

const items = ref([
    {
        label: 'THPT',
        icon: 'pi pi-box',
        items: [
            [
                {
                    label: 'Living Room',
                    items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
                }
            ],
            [
                {
                    label: 'Kitchen',
                    items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
                },
                {
                    label: 'Bathroom',
                    items: [{ label: 'Accessories' }]
                }
            ],
            [
                {
                    label: 'Bedroom',
                    items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
                }
            ],
            [
                {
                    label: 'Office',
                    items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                }
            ]
        ]
    },
    {
        label: 'thcs',
        icon: 'pi pi-mobile',
        items: [
            [
                {
                    label: 'Computer',
                    items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                }
            ],
            [
                {
                    label: 'Home Theather',
                    items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                }
            ],
            [
                {
                    label: 'Gaming',
                    items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                }
            ],
            [
                {
                    label: 'Appliances',
                    items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                }
            ]
        ]
    },
    {
        label: 'TIỂU HỌC',
        icon: 'pi pi-clock',
        items: [
            [
                {
                    label: 'Football',
                    items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                }
            ],
            [
                {
                    label: 'Running',
                    items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                }
            ],
            [
                {
                    label: 'Swimming',
                    items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                }
            ],
            [
                {
                    label: 'Tennis',
                    items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                }
            ]
        ]
    }
]);

</script>

<template>
  <div >
    <div v-if="isShowheaderHome" class="header-home">
      <HeaderHome/>
    </div>
    <div v-if="!isShowheaderHome || isShowPost || isShowMyCourse" >
        <router-view/> 
    </div>

    <div v-if="isShowHome"  class="main">
      <div class="wrap-header">
        <!-- <div style="width:25%;height:100%;padding-bottom:24px">
          <img style="width:100%;height:100%" src="https://hocmai.vn/php_javascript/images/popup-qc2-87/popupT12-TopClass.png" alt="">
        </div> -->
        <div >
            <MegaMenu :model="items" orientation="vertical" style="width: 10%;"/>
        </div> 
        <v-carousel
        cycle
        height="450"
        hide-delimiter-background
        show-arrows="hover"
        style="width:73%;"
        >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            :color="colors[i]"
            height="100%"
          >
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">
                {{ slide }} Slide
              </div>
            </div>
          </v-sheet>
    </v-carousel-item>
  </v-carousel>       
  </div>
  <div class="row" style="margin-top:20px; margin-left:1px">
    <h1 style="border-left:5px solid red ">TOP THỊNH HÀNH</h1>
  </div>
    <div  class="container-fluid category" style="padding-left:0 !important;padding-right: 0 !important; padding-top:10px">
      <div class="row " style="width:100%; height:56px; padding-left:12px; ">
        <div  class="tittle-popular-courses" style="width:30%;height:36px">
          <h2 style="padding-left:10px">{{ courseTypes[0] }}</h2>
        </div>
      </div>
      <div class="row" style="width:100%; height:323px;margin-left:0.2px">
        <div class="col-sm-5 popular-courses" style="padding-left:0 !important">
          <a href="" style="width:100%;height:100%"><img src="https://hocmai.vn/media/images/home/desktop/pat-hsa522x324.png" alt=""></a>

        </div>
        <div class="col-sm-7" style="height: 100%; overflow-x: auto; padding-right:0 !important">
          <v-carousel
          v-if="dataLoaded"
            cycle
            style="height: 100%"
            hide-delimiter-background
            show-arrows="hover"
            :interval="6000000"
            hide-delimiters
          >
            <v-carousel-item v-for="(course, i) in coursesTopFirst.slice(0, 3)" :key="i">
              <v-sheet>
                <v-row>
                  <v-col class="course-card" v-for="(course, j) in coursesTopFirst.slice(i, i + 3)" :key="j">
                    <div class="d-flex fill-height justify-center align-center ">   
                      <div class="card">             
                        <img :src="course.ImageCourse" class="card-img-top image-course" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">{{ course.CourseSubTitle }}</h5>
                          <p class="card-text">{{ course.LessonCount }}</p>
                          <p class="card-text">{{ course.TimeLessonTotal }}</p>                 
                          <router-link to="/course">
                            <button class="btn btn-primary" @click="showCourse">Tìm hiểu thêm</button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
      <div class="row" style="margin-top:20px; width:100%; margin-left:1px">
            <v-carousel
            v-if="dataLoaded"
            cycle
            style="height: 100%; padding-left:0 !important; padding-right:0 !important"
            hide-delimiter-background
            show-arrows="hover"
            hide-delimiters
            >
            <v-carousel-item v-for="(course, i) in coursesTopFirst.slice(4, 10)" :key="i">
              <v-sheet>
                <v-row>
                  <v-col v-for="(course, j) in coursesTopFirst.slice(i + 5, i + 10)" :key="j">
                      <div
                        class="card"
                      >
                        <img :src="course.ImageCourse" class="card-img-top image-course" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">{{ course.CourseSubTitle }}</h5>
                          <p class="card-text">{{ course.LessonCount }}</p>
                          <p class="card-text">{{ course.TimeLessonTotal }}</p>
                          <router-link to="/course">
                            <button class="btn btn-primary">Tìm hiểu thêm</button>
                          </router-link>
                        </div>
                      </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
      </div>
    </div>
        <div  class="container-fluid category" style="padding-left:0 !important;padding-right: 0 !important; padding-top:10px">
      <div class="row " style="width:100%; height:56px; padding-left:12px; ">
        <div  class="tittle-popular-courses" style="width:30%;height:36px">
          <h2 style="padding-left:10px">{{ courseTypes[1] }}</h2>
        </div>
      </div>
      <div class="row" style="width:100%; height:323px;margin-left:0.2px">
        <div class="col-sm-5 popular-courses" style="padding-left:0 !important">
          <a href="" style="width:100%;height:100%"><img src="https://hocmai.vn/media/images/home/desktop/giup-con-cong-pha-522-x-324-px.png" alt=""></a>

        </div>
        <div class="col-sm-7" style="height: 100%; overflow-x: auto; padding-right:0 !important">
          <v-carousel
          v-if="dataLoaded"
            cycle
            style="height: 100%"
            hide-delimiter-background
            show-arrows="hover"
            hide-delimiters
          >
            <v-carousel-item v-for="(course, i) in coursesTopSecond.slice(0, 3)" :key="i">
              <v-sheet>
                <v-row>
                  <v-col v-for="(course, j) in coursesTopSecond.slice(i, i + 3)" :key="j">
                    <div class="d-flex fill-height justify-center align-center">   
                      <div class="card">            
                        <img :src="course.ImageCourse" class="card-img-top image-course" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">{{ course.CourseSubTitle }}</h5>
                          <p class="card-text">{{ course.LessonCount }}</p>
                          <p class="card-text">{{ course.TimeLessonTotal }}</p>                 
                          <router-link to="/course">
                            <button class="btn btn-primary">Tìm hiểu thêm</button>
                          </router-link>
                        </div>

                      </div>

                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
      <div class="row" style="margin-top:20px; width:100%; margin-left:1px">
            <v-carousel
            v-if="dataLoaded"
            cycle
            style="height: 100%; padding-left:0 !important; padding-right:0 !important"
            hide-delimiter-background
            show-arrows="hover"
            hide-delimiters
            >
            <v-carousel-item v-for="(course, i) in coursesTopSecond.slice(4, 10)" :key="i">
              <v-sheet>
                <v-row>
                  <v-col v-for="(course, j) in coursesTopSecond.slice(i + 5, i + 10)" :key="j">

                      <div
                        class="card"
                      >
                        <img :src="course.ImageCourse" class="card-img-top image-course" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">{{ course.CourseSubTitle }}</h5>
                          <p class="card-text">{{ course.LessonCount }}</p>
                          <p class="card-text">{{ course.TimeLessonTotal }}</p>
                          <router-link to="/course">
                            <button class="btn btn-primary">Tìm hiểu thêm</button>
                          </router-link>
                        </div>
                      </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
      </div>
    </div>
        <div  class="container-fluid category" style="padding-left:0 !important;padding-right: 0 !important; padding-top:10px">
      <div class="row " style="width:100%; height:56px; padding-left:12px; ">
        <div  class="tittle-popular-courses" style="width:30%;height:36px">
          <h2 style="padding-left:10px">{{ courseTypes[2] }}</h2>
        </div>
      </div>
      <div class="row" style="width:100%; height:323px;margin-left:0.2px">
        <div class="col-sm-5 popular-courses" style="padding-left:0 !important">
          <a href="" style="width:100%;height:100%"><img src="https://hocmai.vn/media/images/home/desktop/tet-giap-thin-1.png" alt=""></a>

        </div>
        <div class="col-sm-7" style="height: 100%; overflow-x: auto; padding-right:0 !important">
          <v-carousel
          v-if="dataLoaded"
            cycle
            style="height: 100%"
            hide-delimiter-background
            show-arrows="hover"
            hide-delimiters
          >
            <v-carousel-item v-for="(course, i) in coursesTopThird.slice(0, 3)" :key="i">
              <v-sheet>
                <v-row>
                  <v-col v-for="(course, j) in coursesTopThird.slice(i, i + 3)" :key="j">
                    <div class="d-flex fill-height justify-center align-center">   
                      <div class="card" >             
                        <img :src="course.ImageCourse" class="card-img-top image-course" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">{{ course.CourseSubTitle }}</h5>
                          <p class="card-text">{{ course.LessonCount }}</p>
                          <p class="card-text">{{ course.TimeLessonTotal }}</p>                 
                          <router-link to="/course">
                            <button class="btn btn-primary">Tìm hiểu thêm</button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
      <div class="row" style="margin-top:20px; width:100%; margin-left:1px">
            <v-carousel
            v-if="dataLoaded"
            cycle
            style="height: 100%; padding-left:0 !important; padding-right:0 !important"
            hide-delimiter-background
            show-arrows="hover"
            hide-delimiters
            >
            <v-carousel-item v-for="(course, i) in coursesTopThird.slice(4, 10)" :key="i">
              <v-sheet>
                <v-row>
                  <v-col v-for="(course, j) in coursesTopThird.slice(i + 5, i + 10)" :key="j">

                      <div
                        class="card"

                      >
                        <img :src="course.ImageCourse" class="card-img-top image-course" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">{{ course.CourseSubTitle }}</h5>
                          <p class="card-text">{{ course.LessonCount }}</p>
                          <p class="card-text">{{ course.TimeLessonTotal }}</p>
                          <router-link to="/course">
                            <button class="btn btn-primary">Tìm hiểu thêm</button>
                          </router-link>
                        </div>
                      </div>

                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
      </div>
    </div>

    </div>
  </div>
</template>

<style  scoped>
.header-home {
  position: sticky;
  top: 0;
  z-index: 1000; 
}

.main {
  width: 100%;
  height: auto;
  padding: 0 100px;

}
.wrap-header{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 557px;
  /* background: rgba(152, 145, 145, 0.43) ; */
  z-index: 0;
  padding-top:70px
}

MegaMenu .p-menuitem-link {
  /* Add your custom styles here */
  color: #333; /* Example: Change text color */
  font-size: 16px; /* Example: Change font size */
  /* Add more styles as needed */
  background: red;
  margin-top: 10px;
}
.category {
  margin-top: 30px;
  height: auto;
  width:100%;
  
}
.tittle-popular-courses{
  width: 20%;
  margin-bottom: 20px;
  border-left: 5px solid #28b1ff;
}
.image-course{
  object-fit: cover;
}
/* .v-carousel{
  z-index: 0 !important;
} */
.v-carousel-item {
  transition: transform 0.9s ease; 
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
  transform: translateY(-2px) scale(1.05);
}

.card {
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  border: none;
  border-radius: 15px;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(199, 17, 17);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
} 
</style>