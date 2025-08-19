const Record = require("../models/records");

exports.getRecords = async (req,res)=>{
    const  {patient_id} = req.params;

    if(req.user.role === "Patient" && req.userId != patient_id){
        return res.status(401).json({message: "Unauthorized access"});
    }

    const records = await Record.findOne({patient_id});
    res.json({patient_id,records});
} 

exports.updateStatus = async (req,res) =>{
    const {patient_id} = req.params;
    const {status} = req.body;

    await Record.updateMany ({patient_id}, {status});
    res.sendStatus(204);
}

exports.addPrescription = async (req,res) =>{
    const {patient_id} = req.params;
    const {medication, dosage} = req.body;

    await Record.updateMany({patient_id},
        {$push :{prescriptions:{medication,dosage}}}
    );

    res.status(201).send( {message :"Priscription added"});
}

