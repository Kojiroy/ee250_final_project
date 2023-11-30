import {useRouter} from 'next/router';
import connection from './api/mysql';
import styles from "../styles/index.module.css";
import superjson from 'superjson';
import Layout from '../app/components/layout';


const HomePage = ({ lightData, buttonData, motionData }) => {

  // var date;
  // const date = new Date((lightData.Date.toJSON()));
  // const lightDate = (date.toLocaleString());
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Dynamic Data from MySQL</h1>
        <div className = {styles.datas}>
          {lightData.map((item) => (
            <button className={styles.button} key={item.Date}>
              <h4 className={styles.data}>
                {item.SensorName}
              </h4>
              <h4 className={styles.data}>
              {item.LightValue}
              </h4>
            </button>
          ))}
          {buttonData.map((item) => (
            <button className={styles.button} key={item.Date}>{item.SensorName}: {item.Count}</button>
          ))}
          {motionData.map((item) => (
            <button className={styles.button} key={item.Date}>{item.SensorName}: {item.MotionValue}</button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const [light_rows] = await connection.promise().query('SELECT SensorName, LightValue, Date FROM light_data ORDER BY Date DESC LIMIT 10');
  const [button_rows] = await connection.promise().query('SELECT SensorName, Count, Date FROM button_data ORDER BY Date DESC LIMIT 10');
  const [motion_rows] = await connection.promise().query('SELECT SensorName, MotionValue, Date FROM motion_data ORDER BY Date DESC LIMIT 10');
  return {
    props: {
      lightData: light_rows,
      buttonData: button_rows,
      motionData: motion_rows,
    },
  };
}

export default HomePage;