const router = require("express").Router();
const db = require("../models");

// Get last workout - API.getLastWorkout()
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .sort({ day: -1 })
  .then(dbWorkouts => {
    console.log(dbWorkouts);
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Update a workout - API.addExercise()
router.put("/api/workouts/:id", ({ body }, res) => {
  db.Workout.findOneAndUpdate({ _id:req.params.id }, body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Create a new workout - API.createWorkout()
router.post("/api/workout", ({ body }, res) => {
  db.Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })  
  .catch(err => {
    res.status(400).json(err);
  });  
});  

// Get workouts within a range - API.getWorkoutsInRange()
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })    
  .catch(err => {
    res.status(400).json(err);
  });    
});    

module.exports = router;