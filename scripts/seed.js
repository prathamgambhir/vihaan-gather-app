const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

// We load the data from mock-data directly or we can just redefine it to seed.
const mockData = {
  societies: [
    {
      _id: "soc1",
      name: "GDSC NSUT",
      acronym: "GDSC",
      category: "Technical",
      collegeId: "col1",
      description: "Google Developer Student Club. We build cool technical projects and host hackathons.",
      logo: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)",
      banner: "linear-gradient(90deg, #fdfbfb 0%, #ebedee 100%)",
      isVerified: true
    },
    {
      _id: "soc2",
      name: "Oorja - The Dance Society",
      acronym: "Oorja",
      category: "Cultural",
      collegeId: "col2",
      description: "The official Western Dance society of Hansraj College.",
      logo: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
      banner: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
      isVerified: true
    }
  ],
  events: [
    {
      _id: "evt1",
      societyId: "soc1",
      collegeId: "col1",
      title: "Hackverse 3.0",
      description: "A 36-hour hackathon to build solutions for a better tomorrow.",
      image: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      category: "Hackathon",
      mode: "Offline",
      price: 0,
      startDate: new Date('2026-04-15T10:00:00'),
      endDate: new Date('2026-04-16T22:00:00'),
      isVirtual: false
    }
  ]
};

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined.");
    process.exit(1);
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to DB.");

    const db = client.db();

    const societiesCollection = db.collection('societies');
    const eventsCollection = db.collection('events');

    await societiesCollection.deleteMany({});
    await eventsCollection.deleteMany({});

    // We keep the old string ID so our pages work until everything is properly migrated
    await societiesCollection.insertMany(mockData.societies);
    await eventsCollection.insertMany(mockData.events);
    
    console.log("Seeding complete!");

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

seed();
