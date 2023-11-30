import connection from '../../../mysql';
import { NextResponse } from 'next/server';

export default async function POST(req, res) {
  var { type, name, value } = req.query;
  const cur_date = new Date();
  try {
    if (value != 0){
      value = cur_date.getSeconds() * value;
    }
    console.log("type: "+type);
    console.log("name: " + name);
    console.log("value: " + value);
    console.log("Date: " + cur_date) ;
    if (type === "light") {
      await connection.promise().query('INSERT INTO light_data (SensorName, LightValue,Date) VALUES (?, ?, ?)', [name, value, cur_date]);
    }
    else if (type === "motion") {
      await connection.promise().query('INSERT INTO motion_data (SensorName, MotionValue, Date) VALUES (?, ?, ?)', [name, value, cur_date]);
    }
    else {
      await connection.promise().query('INSERT INTO button_data (SensorName, Count, Date) VALUES (?, ?, ?)', [name, value, cur_date]);
    }
      res.status(200).json({ message: 'Item updated successfully' });

      // return NextResponse.json({message: "Item updated successfully"});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });

    // return NextResponse.json({message: "An error occurred"});
  }
};