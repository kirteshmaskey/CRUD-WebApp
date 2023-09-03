const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");



//to add details of new student
router.post("/addData",async(req, res)=>{
    // console.log(req.body);
    const {firstName, middleName, lastName, college, collegeId, phone, email} = req.body;
    if(!firstName || !lastName || !college || !collegeId || !phone || !email) {
        res.status(422).json("Please fill the data");
    }

    try {
        const preuser = await users.findOne({email:email});
        // console.log(preuser);
        if(preuser) {
            res.status(422).json("Details already exist");
        }else {
            const addUser = new users({
                firstName, middleName, lastName, college, collegeId, phone, email
            });
            await addUser.save();
            res.status(201).json(addUser);
            // console.log(addUser);
        }
    }catch(error) {
        res.status(422).json(error);
    }
})  


//to get students details from database
router.get("/getData",async(req, res)=>{
    try {
        const userData = await users.find();
        res.status(201).json(userData);
        // console.log(userData);
    } catch(error) {
        res.status(422).json(error);
    }
})


// to view full details of student
router.get("/viewData/:id", async(req,res)=> {
    try {
        // console.log(req.params);
        const {id} = req.params;

        const userIndividual = await users.findById({_id: id});
        res.status(201).json(userIndividual);
    }catch(error) {
        res.status(422).json(error);
    }
})


//to update student details
router.patch("/updateUser/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        const updatedUser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        // console.log(updatedUser);
        res.status(201).json("Students details updated");
    }catch(error) {
        res.status(422).json("Unable to update students details\n" + error);
    }
})


//to delete student data
router.delete("/deleteData/:id",async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id: id});

        // console.log(deleteUser);
        res.status(201).json("Students details deleted");
    }catch(error) {
        // res.status(422).json("Unable to delete students details\n" + error);
        res.status(422).json(error);
    }
})

module.exports = router;