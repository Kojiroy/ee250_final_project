import connection from '../mysql';
import { NextResponse } from 'next/server';

export default async function GET(req, res) {
  const { type} = req.query;
  const data_type = `${type}_data`;
  const query = `SELECT * FROM ${data_type} ORDER BY Date DESC LIMIT 1`;
  var result;
  try {
    console.log("type: "+data_type);
    await connection.promise().query(query)
    .then((_result) =>{
    result = _result[0][0];
    if (type === "light"){
      console.log(_result[0][0]["LightValue"]);
    }
    else if (type === "motion"){
      console.log(_result[0][0]["MotionValue"]);
    }
    else if (type === "button"){
      console.log(_result[0][0]["Count"]);
    }
    })
    .catch((err) => {
        console.log(err);
    });
    res.status(200).json({ message: 'Item updated successfully', body: result});
      // return NextResponse.json({message: "Item updated successfully"});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
    // return NextResponse.json({message: "An error occurred"});
  }
};
