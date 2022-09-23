const express = require('express');
const router = express.Router();


const courses = [
    {id:1,name:'courses1'},
    {id:2,name:'courses2'},
    {id:3,name:'courses3'}
];
 

router.get('/',(req,res)=>{
    res.send(courses);
});

router.post('/',(req,res)=>{
    const{error}=validateCourse(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const course={
        id:courses.lenght+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id',(req,res)=>{
    const course =  courses.find(c => c.id === pareseInt(req.params.id));
      if(!course) res.status(404).send('give id not found');

      const{error} = validateCourse(req.body);
      if(error)return res.status(400).send(error.details[0].message);

      course.name=req.body.name;
      res.send(course);
  });
  
  router.delete('/:id',(req,res)=>{
    const course =  courses.find(c => c.id === pareseInt(req.params.id));
      if(!course) res.status(404).send('give id not found');

    const index = courses.indexOf(course);
    course.splice(index,1);

      res.send(course); 
  });
  
router.get('/:id',(req,res)=>{
  const course =  courses.find(c => c.id === pareseInt(req.params.id));
    if(!course) res.status(404).send('give id not found');
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    };

    return Joi.valiate(course,schema);
}

module.export = router;