const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playgroud')
.then(() => console.log('mongo conectado'))
.catch(err => console.error('erro ao conectar o mongo:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean, 
    price: Number
});

const Course = mongoose.model('Course', courseSchema); // classe

async function createCourse(params) {
    
    const course = new Course({
        name: 'SQL Course',
        author: 'Allan Passos',
        tags: ['SQL', 'DB'],
        isPublished: true,
        price : 130
    }); // object
    
    const result = await course.save();
    console.log(result);

}

async function getCourses() {
  // const courses = await Course.find(); // todos os cursos
  //const courses = await Course.findById('5b7f4485b29c070974d5111c'); 
//   const courses = await Course
//   .find({ author: 'Allan Passos', name: 'Firebase Course' });  // filtrando

 // melhorando mais o filtro

 const courses = await Course
 .find({ author: 'Allan Passos'})
 .limit(2)
 .sort({ name: 1 })
 .select({ name: 1, author: 1 })


   console.log('All courses: ', courses);
}

async function comparationQueryOperations() {
 // eq (equal)
 // ne (not equal)
 // gt (greater than)
 // gte (greater than or equal to)
 // lt (less than)
 // lte (less than or equal to)
 // in
 // nin (not in)


    const courses = await Course
//.find({ price: { $gt: 100, $lt: 150 }  })
 .find({ price: { $in: [55,  110, 130] } })
 .sort({price: 1});

   console.log('All courses: ', courses);
}

async function logicalOperation() {
    // or
    // and

    const courses = await Course
    .find()
   // .or([{ price: 10 }, { price: 55}]);
    .or([{ price: 55 }, { author: 'Allan Passos'}]);

    console.log('All courses: ', courses)
}


async function regularExpressionOperation() {
    // or
    // and

    const courses = await Course
   // .find({ author: /^All/ }) //Começa com
   // .find({ name: /^Fire/ })
   // .find({ author: /Passos$/i })  // i pra nao ficar case sensitive e $ pra pegar o q termina
    .find({ author: /.*Allan.*/ })  // contain
    .count() // soh mostro o totall dos itens retornados
   


    console.log('All courses: ', courses)
}

 // getCourses();
 // createCourse();
 // logicalOperation();
// comparationQueryOperations();

regularExpressionOperation();


