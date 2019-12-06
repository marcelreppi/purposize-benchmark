const faker = require("faker")

const { User, Heartrate, HeartrateLog } = require("./models")

const nUsers = parseFloat(process.env.N_USERS)
const nHeartratrLogs = parseFloat(process.env.N_HEARTRATELOGS)
const heartrateLogLength = parseFloat(process.env.HEARTRATELOG_LENGTH)

async function createData() {
  // Create fake user data
  for (let i = 0; i < nUsers; i++) {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const user = await User.create({
      name,
      email: `${name.replace(" ", ".").toLowerCase()}@test.com`,
      dateOfBirth: faker.date.past().toISOString(),
      gender: getGender(),
      phoneNumber: faker.phone.phoneNumber(),
    })

    const userLogs = []

    // Create fake heartrate logs
    const today = new Date()
    for (let j = 0; j < nHeartratrLogs; j++) {
      let heartrateLog = []
      const startDate = new Date(today.getTime() - j * 1000 * 60 * 60 * 24)
      const baseHeartrate = 60 + Math.floor(Math.random() * 141) // Value between 60-200

      // Add heartrates to the log
      for (let k = 0; k < heartrateLogLength; k++) {
        const randomDeviation = Math.floor(Math.random() * 4)
        const value =
          Math.random() < 0.5 ? baseHeartrate + randomDeviation : baseHeartrate - randomDeviation
        heartrateLog.push({
          value, // Base heartrate + random deviation
          timestamp: new Date(startDate.getTime() - k * 10000),
        })
      }

      heartrateLog = await Heartrate.bulkCreate(heartrateLog)

      userLogs.push({
        log: JSON.stringify(
          heartrateLog.map(hr => {
            const { value, timestamp } = hr.dataValues
            return { value, timestamp }
          })
        ),
        timestamp: startDate,
        userId: user.id,
      })
    }

    await HeartrateLog.bulkCreate(userLogs)
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
