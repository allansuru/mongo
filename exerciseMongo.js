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

  async function getCourses() {
    console.log('entrou');
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  }
  
  async function run() {
    const courses = await getCourses();
    console.log(courses);
  }
  
  run();
  