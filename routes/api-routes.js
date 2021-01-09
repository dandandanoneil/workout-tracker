const router = require("express").Router();
const db = require("../models");

// Get last workout - API.getLastWorkout()
router.get("/api/workouts", (req, res) => {
  // First, add totalDuration field to all the workouts in the db
  // then, sort the response (an array of the updated workouts) ascending by day so getLastWorkout() can use the last entry
  // Send back the workouts as JSON
  db.Workout.aggregate([{
    $addFields: {
      totalDuration: { $sum: "$exercises.duration" }
    }
  }])
  .sort({ day: 1 })
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Update the current workout - API.addExercise()
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id:req.params.id }, 
    { $push: { exercises:req.body } }
  )
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Create a new workout - API.createWorkout()
router.post("/api/workouts", ({ body }, res) => {
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