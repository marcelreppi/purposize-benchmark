const faker = require("faker")

const { Users, Heartrates, HeartrateLogs } = require("./models")

const nUsers = parseFloat(process.env.N_USERS)
const nHeartratrLogs = parseFloat(process.env.N_HEARTRATELOGS)
const heartrateLogLength = parseFloat(process.env.HEARTRATELOG_LENGTH)

async function createData() {
  // Create fake user data
  for (let i = 0; i < nUsers; i++) {
    await Users.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: `${faker.name
        .firstName()
        .toLowerCase()}.${faker.name.lastName().toLowerCase()}@test.com`,
      dateOfBirth: faker.date.past().toISOString(),
      gender: getGender(),
      phoneNumber: faker.phone.phoneNumber(),
    })
  }

  // Create fake heartrate logs
  const today = new Date()
  for (let i = 0; i < nHeartratrLogs; i++) {
    let currentLog = []
    const startDate = new Date(today.getTime() - i * 1000 * 60 * 60 * 24)
    const baseHeartrate = 60 + Math.floor(Math.random() * 141) // Value between 60-200
    for (let j = 0; j < heartrateLogLength; j++) {
      const randomDeviation = Math.floor(Math.random() * 4)
      const value =
        Math.random() < 0.5 ? baseHeartrate + randomDeviation : baseHeartrate - randomDeviation
      const heartrate = await Heartrates.create({
        value, // Base heartrate + random deviation
        timestamp: new Date(startDate.getTime() - j * 10000),
      })
      currentLog.push(heartrate)
    }

    await HeartrateLogs.create({
      log: JSON.stringify(
        currentLog.map(hr => {
          const { value, timestamp } = hr.dataValues
          return { value, timestamp }
        })
      ),
      timestamp: startDate,
    })
  }
}

module.exports = createData

function getGender() {
  const genders = [
    "Agender",
    "Androgyne",
    "Androgynous",
    "Bigender",
    "Cis",
    "Cisgender",
    "Cis Female",
    "Cis Male",
    "Cis Man",
    "Cis Woman",
    "Cisgender Female",
    "Cisgender Male",
    "Cisgender Man",
    "Cisgender Woman",
    "Female to Male",
    "FTM",
    "Gender Fluid",
    "Gender Nonconforming",
    "Gender Questioning",
    "Gender Variant",
    "Genderqueer",
    "Intersex",
    "Male to Female",
    "MTF",
    "Neither",
    "Neutrois",
    "Non-binary",
    "Other",
    "Pangender",
    "Trans",
    "Trans*",
    "Trans Female",
    "Trans* Female",
    "Trans Male",
    "Trans* Male",
    "Trans Man",
    "Trans* Man",
    "Trans Person",
    "Trans* Person",
    "Trans Woman",
    "Trans* Woman",
    "Transfeminine",
    "Transgender",
    "Transgender Female",
    "Transgender Male",
    "Transgender Man",
    "Transgender Person",
    "Transgender Woman",
    "Transmasculine",
    "Transsexual",
    "Transsexual Female",
    "Transsexual Male",
    "Transsexual Man",
    "Transsexual Person",
    "Transsexual Woman",
    "Two-Spirit",
  ]
  return genders[Math.floor(Math.random() * genders.length)]
}
