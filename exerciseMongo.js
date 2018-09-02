const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
.then(() => console.log('mongo conectado'))
.catch(err => console.error('erro ao conectar o mongo:', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
  });

  const Course = mongoose.model('Course', courseSchema); // classe

  
async function allCourses() {

  return await Course.find();
}

  async function getCourses() {
    console.log('entrou');
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  }

  async function getCoursesExercico2() {
    return await Course
    .find({ isPublished: true })
    .or([  
      { price: { $gte: 15 } },
      { name: /.*by.*/i }
    ])
    .sort('-price')
    .select('name author price isPublished');
  }

  async function getCourses3() {
    return await Course
    .find({ isPublished: true })
    .or([ { tags: 'frontend' }, { tags: 'backend' } ])
    .sort('-price')
    .select('name author price');
  }

  async function getAllanCourse() {
    return await Course
    .find({ author:  /.*Allan.*/})
    .select('name author price');
  }
  
 
  async function updateCourse(id) {
    console.log('ID: ', id)
    // Aproach: Query first
    // findById()
    // Modify its properties
    // save()

    // Aproach: Update First
    // Update directly 
    // Optionally: get the updated document

   const course = await Course.findById(id);
  console.log('Achou: ', course);
   if (!course) return;

   course.set({  
   isPublished: true,
   author: 'Allan SuRu'
   });

   const result = await course.save();
   console.log('Update:', result);
  }

  async function updateCourse2(id) {
   const result = await Course.findByIdAndUpdate({ _id: id}, {
     $set: {
       author: 'Allan SuRu 2',
       isPublished: false
     }
   }, { new: true });

   console.log('Update:', result);
  }
  

  
  async function removeCourse(id) {
  //  const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);
    console.log(course);
   }
   
  
  
  async function run() {
    const courses = await allCourses();
    console.log(courses);
  }
  removeCourse('5b8c6909bc09dc3244f64792');
 //  updateCourse2('5b8c66fcbc09dc3244f64790');
  
 // run();
  