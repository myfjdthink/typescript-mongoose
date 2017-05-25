import * as mongoose from 'mongoose'
// mongoose.Promise = global.Promise;
import {User} from './model/User'
mongoose.connect('mongodb://joda:57017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log('we\'re connected!');
  try {
    await User.remove({})
    const user = new User({firstName: 'feng', lastName: 'nick', email: 'jfeng@kalengo.com'})
    await user.save()
    const fuser = await User.findOne({})
    console.log('email', user.email);
    console.log('email err', user.email2);
    console.log('email', fuser.email);
    console.log('fullName', fuser.fullName());
    console.log('lastName', fuser.lastName);
    console.log('createdAt', fuser.createdAt);
    const time: number = fuser.createdAt
  } catch (err) {
    console.log('err ', err.stack);
  }
});