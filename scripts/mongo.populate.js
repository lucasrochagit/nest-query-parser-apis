const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
require("dotenv").config();

const { MONGODB_DATABASE_URL, MONGODB_DATABASE_NAME } = process.env;
const client = new MongoClient(MONGODB_DATABASE_URL);

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(MONGODB_DATABASE_NAME);
  const usersCollection = db.collection("users");
  const jobsCollection = db.collection("jobs");

  const usersJson = fs.readFileSync("mongo.users.json");
  const jobsJson = fs.readFileSync("mongo.jobs.json");

  const users = JSON.parse(usersJson);
  const jobs = JSON.parse(jobsJson);

  const countJobs = await jobsCollection.countDocuments();

  if (countJobs === 0) {
    await jobsCollection.insertMany(
      jobs.map((job) => {
        const now = new Date();
        job.created_at = now;
        job.updated_at = now;
        return job;
      })
    );
  }

  const countUsers = await usersCollection.countDocuments();

  if (countUsers === 0) {
    const allJobs = await jobsCollection.find({}, { _id: 1 }).toArray();
    const allJobsIndexes = allJobs.map((job) => job._id);

    await usersCollection.insertMany(
      users.map((user) => {
        const randomJob = new ObjectId(
          allJobsIndexes[getRandomIndex(jobs.length)]
        );

        const prevJobsQtty = getRandomIndex(6, 2);

        const randomJobs = Array.from(
          { length: prevJobsQtty },
          () => new ObjectId(allJobsIndexes[getRandomIndex(jobs.length)])
        );
        randomJobs.push(randomJob);

        const now = new Date();
        user.created_at = now;
        user.updated_at = now;
        user.current_job = randomJob;
        user.jobs = randomJobs.filter(
          (item, pos) => randomJobs.indexOf(item) == pos
        );
        return user;
      })
    );
  }
  return "Users collection populated successfully.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

function getRandomIndex(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
