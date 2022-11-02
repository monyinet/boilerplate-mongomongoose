require('dotenv').config();
const MONGO_URI = process.env['MONGO_URI'];
const mongoose = require('mongoose');
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const PersonModel = (done) => {  
  if (error) return done(error);
  done(null, result);
};

let personSchema = new mongoose.Schema({
name: {
  type: String,
  required: true
},
age: Number,
favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let jose = new Person({name: "Jose", age: 45, favoriteFoods: ["Paella", "Chuletón", "Puchero"]});
  jose.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  {name: "Jose Juan", age: 45, favoriteFoods: ["Paella", "Chuletón", "Puchero"]},
  {name: "Loly", age: 48, favoriteFoods: ["Salmón", "Fideos", "Chocolate"]},
  {name: "Alma", age: 11, favoriteFoods: ["Sushi", "Pipas", "Oreo"]},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if (err) return done(err);
    done(null, foodFound);
  }); 
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, idFound) => {
    if (err) return done(err);
    done(null, idFound);
  }); 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);      
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });   
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
  if (err) return done(err);
  done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) return done(err);
    done(null, deletedPerson);    
  }); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, deletedPersons) => {
    if (err) return done(err);
    done(null, deletedPersons);    
  }); 
};

const queryChain = (done) => {
  const foodToSearch = "burrito";  
  Person.find({ favoriteFoods: foodToSearch })
    .sort({name: 1})
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });   
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
