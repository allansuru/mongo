const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
.then(() => console.log('mongo conectado'))
.catch(err => console.error('erro ao conectar o mongo:', err));


const courseSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      minlength: 3,
      maxlength: 50,
      // match: /pattern/
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network'],
      lowercase: true,
      trim: true
    },
    author: String, 
    tags: {
      type: Array,
      validate: {
        validator: function(v) {
          return v && v.length > 0
        },
        message: 'um curso deve ter ao menos uma tag.'
      }
    },
    date: { type: Date, default: Date.now}, 
    isPublished: Boolean,
    price: {
      type: Number,
      min: 0.1,
      max: 1100,
      required: function() { return this.isPublished; },
      get: v => Math.random(v),
      set: v => Math.random(v),
    }
  });

  const Course = mongoose.model('Course', courseSchema); // classe

  
async function allCourses() {

  return await Course.find();
}

async function createCourse() {
  const course = new Course({
    name: 'Curso set/get',
    author:'Suru',
    category: 'WEB',
    tags: ['c#'],
    isPublished: true,
    price: 99.95
  });

  try {
   
      const result = await course.save();
      console.log(result);
  
  }
  catch(err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
  }

 
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
    const result =  await Course
    .find({ author:  /.*Suru.*/})
    .select('name author price');

    console.log(result)
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

  getAllanCourse();

  // createCourse();
 // removeCourse('5b8c6909bc09dc3244f64792');
 //  updateCourse2('5b8c66fcbc09dc3244f64790');
  
 // run();
  