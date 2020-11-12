/* eslint-disable no-console */
import express from 'express';
import { json } from 'body-parser';
import webPush, { PushSubscription } from 'web-push';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import cron from 'node-cron';

import City from '../src/model/city.model';
import WeatherForecastService from '../src/service/weather-forecast.service';

const DB_PATH = `${__dirname}/db.json`;

const commit = (data: any) => {
  writeFileSync(DB_PATH, JSON.stringify(data), {
    encoding: 'utf-8',
  });
};

const initDb = () => {
  const dbExist = existsSync(DB_PATH);
  if (dbExist) {
    const data = readFileSync(DB_PATH, {
      encoding: 'utf-8',
    });
    const jsonData = JSON.parse(data);
    return {
      ...jsonData,
      cities: jsonData.cities.map(
        (city: any) => new City(city),
      ),
    };
  }
  const data: any = {
    subscription: null,
    cities: [],
  };
  commit(data);
  return data;
};

const db: any = initDb();

const saveSubscription = (subscription: any) => {
  db.subscription = subscription;
  commit(db);
};

const addCity = (city: City) => {
  db.cities.push(city);
  commit(db);
};

const deleteCity = (city: City) => {
  db.cities = db.cities.filter(
    (value: City) => !value.isEqualTo(city),
  );
  commit(db);
};

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});
app.use(json());

// Endpoints
app.post('/subscription', (req, res) => {
  const subscription = req.body;
  saveSubscription(subscription);
  res.sendStatus(200);
});

app.post('/city', async (req, res) => {
  const city = req.body;
  addCity(new City(city));
  res.sendStatus(200);
});

app.post('/city/delete', async (req, res) => {
  const city = req.body;
  deleteCity(new City(city));
  res.sendStatus(200);
});

const publicKey = 'BPtqwqv4ekh_AUb3z6oI2_z7zNzQPVzcCGwPhb1jX9QK7qa4lDWSGZWq_uIJRGVWobs-zbV9EedeXBXiqNmFTWc';
const privateKey = 'oDEtw5pQXNkn7QGzbboNwpvmw7Vs9kpg3yGSFj8kLi8';
webPush.setVapidDetails(
  'mailto:shunshine@sunshine.com',
  publicKey,
  privateKey,
);
const sendNotification = (subscription: PushSubscription, data: string) => {
  if (subscription) {
    webPush.sendNotification(subscription, data);
  }
};

const dateString = (date: Date): string => `${date.getDate()}/${date.getMonth() + 1}`;

const sendPrecipitationProbabilitiy = async (city: City) => {
  try {
    const cityWeather = await WeatherForecastService.getWeekWeatherForecast(city);
    const weatherForecast = cityWeather.weatherForecasts.filter(
      (value) => value.rain.probability > 70,
    );
    let message: string = `${cityWeather.city.name} - ${cityWeather.city.uf}\n`;
    message += 'Chuvas\n';
    message += weatherForecast.map(
      (value) => `${dateString(value.day)}: ${value.rain.probability}% - ${value.rain.volume}mm\n`,
    ).join('');
    sendNotification(db.subscription, message);
  } catch (error) {
    console.log(error);
  }
};

const cronExpression: string = '* * * * *'; // A cada minuto
cron.schedule(cronExpression, () => {
  db.cities.forEach((city: City) => {
    sendPrecipitationProbabilitiy(city);
  });
});

const port: number = 9090;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
