import { db } from '../config/constants'
import { User } from './User'

export class Job {
  constructor() {
    this.user = new User()
  }

async saveJob(title, description, category, location, numHours, timeInterval, price) {
    //fetch the logged user
    const user = await this.user.getCurrentUser();

    //get his id
    const uid = user.info.uid;

    //structure job data
    const jobData = {
      uid: uid,
      title: title,
      description: description,
      category: category,
      location: location,
      numHours: numHours,
      timeInterval: timeInterval,
      price: price
    };

    //get from firebase the id for the job you want to add
    const newJobKey = db.ref().child('jobs').push().key;

    var updates = {};
    //add the job to the new id
    updates['/jobs/' + newJobKey] = jobData;
    //add the same job to the logged in user id
    updates['/user-jobs/' + uid + '/' + newJobKey] = jobData;
    //post data to firebase
    return db.ref().update(updates);
  }

  async getAllJobs() {
    //fetch all data from jobs "table"
    let jobs = await db.ref(`jobs`).once('value').then((jobs) => {
      return jobs.val() || []
    });
    return jobs
  }
}
