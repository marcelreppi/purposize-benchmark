const faker = require("faker")

const { User, Heartrate, HeartrateLog, Step, StepLog } = require("./models")

const nUsers = parseFloat(process.env.N_USERS)
const nLogs = parseFloat(process.env.N_LOGS)
const logLength = parseFloat(process.env.LOG_LENGTH)

faker.locale = "de"
async function createData() {
  // Create fake user data
  for (let i = 0; i < nUsers; i++) {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const user = await User.create(
      {
        name,
        email: `${name.replace(" ", ".").toLowerCase()}@test.com`,
        dateOfBirth: faker.date.past().toISOString(),
        gender: getGender(),
        phoneNumber: faker.phone.phoneNumber(),
      },
      {
        purpose: "PROFILE",
      }
    )

    // Create fake logs
    const today = new Date()
    for (let i = 0; i < nLogs; i++) {
      const heartrateLog = []
      const stepLog = []

      const startDate = new Date(today.getTime() - i * 1000 * 60 * 60 * 24)

      const baseHeartrate = 60 + Math.floor(Math.random() * 141) // Value between 60-200
      const baseStep = 12000
      for (let j = 0; j < logLength; j++) {
        // Heartrate values
        const heartrateDeviation = Math.floor(Math.random() * 4)
        const heartrateValue =
          Math.random() < 0.5
            ? baseHeartrate + heartrateDeviation
            : baseHeartrate - heartrateDeviation
        const heartrate = await Heartrate.create(
          {
            value: heartrateValue, // Base heartrate + random deviation
            timestamp: new Date(startDate.getTime() - j * 10000),
          },
          {
            purpose: "HEALTH",
          }
        )
        heartrateLog.push(heartrate)

        // Step values
        const stepDeviation = Math.floor(Math.random() * 6000)
        const stepValue = Math.random() < 0.5 ? baseStep + stepDeviation : baseStep - stepDeviation

        const step = await Step.create(
          {
            value: stepValue,
            date: new Date(startDate.getTime() - j * 1000 * 60 * 60 * 24),
          },
          {
            purpose: "HEALTH",
          }
        )
        stepLog.push(step)
      }

      await HeartrateLog.create(
        {
          log: JSON.stringify(
            heartrateLog.map(hr => {
              const { value, timestamp } = hr.dataValues
              return { value, timestamp }
            })
          ),
          timestamp: startDate,
          userId: user.id,
        },
        {
          purpose: "HEALTH",
        }
      )

      await StepLog.create(
        {
          log: JSON.stringify(
            stepLog.map(s => {
              const { value, date } = s.dataValues
              return { value, date }
            })
          ),
          timestamp: startDate,
          userId: user.id,
        },
        {
          purpose: "HEALTH",
        }
      )
    }
  }
}

async function bulkCreateData() {
  // Create fake user data
  for (let i = 0; i < nUsers; i++) {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const user = await User.create(
      {
        name,
        email: `${name.replace(" ", ".").toLowerCase()}@test.com`,
        dateOfBirth: faker.date.past().toISOString(),
        gender: getGender(),
        phoneNumber: faker.phone.phoneNumber(),
      },
      {
        purpose: "PROFILE",
      }
    )

    const userLogs = []

    // Create fake heartrate logs
    const today = new Date()
    for (let j = 0; j < nLogs; j++) {
      let heartrateLog = []
      const startDate = new Date(today.getTime() - j * 1000 * 60 * 60 * 24)
      const baseHeartrate = 60 + Math.floor(Math.random() * 141) // Value between 60-200

      // Add heartrates to the log
      for (let k = 0; k < logLength; k++) {
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

// module.exports = bulkCreateData
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
    "Female",
    "Female to Male",
    "FTM",
    "Gender Fluid",
    "Gender Nonconforming",
    "Gender Questioning",
    "Gender Variant",
    "Genderqueer",
    "Intersex",
    "Male",
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
