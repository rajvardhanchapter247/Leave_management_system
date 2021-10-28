import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import * as swaggerUi from 'swagger-ui-express';
import router from './routes';
import { AdminSeeder, SettingSeeder } from './seeder';

import * as swaggerDocument from '../swagger.json';
dotenv.config();
const app = express();

try {
  connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('connected');
      AdminSeeder.addAdmin();
      SettingSeeder.addSetting();
    }
  );
} catch (error) {
  console.log('could not connect', error);
}
app.use(require('cors')());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('body-parser').json());
app.use('/api', router);

// listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log('app is listening on port ' + listener.address().port);
});
