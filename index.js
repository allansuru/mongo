const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playgroud')
.then(() => console.log('mongo conectado'))
.catch(err => console.error('erro ao conectar o mongo:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); // classe

async function createCourse(params) {
    
    const course = new Course({
        name: 'Firebase Course',
        author: 'Allan Passos',
        tags: ['firebase', 'backend', 'RealTime Db'],
        isPublished: true
    }); // object
    
    const result = await course.save();
    console.log(result);

}

async function getCourses() {
  // const courses = await Course.find(); // todos os cursos
  //const courses = await Course.findById('5b7f4485b29c070974d5111c'); 
  const courses = await Course.find({ author: 'Allan Passos', name: 'Firebase Course' });  // filtrando
   console.log('All courses: ', courses);
}


getCourses();
// createCourse();


