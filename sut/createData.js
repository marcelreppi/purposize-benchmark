require("dotenv").config()

process.env.USE_PURPOSIZE = "true" // Make sure to always use purposize

const faker = require("faker")
const purposize = require("purposize")

const sequelize = require("./sequelize")

const nUsers = parseFloat(process.env.N_USERS)
const nLogs = parseFloat(process.env.N_LOGS)
const logLength = parseFloat(process.env.LOG_LENGTH)

faker.locale = "de"
async function createData() {
  // Clear the DB
  console.log("Clearing the DB...")
  await sequelize.getQueryInterface().dropAllTables()
  await sequelize.sync()

  const { User, Heartrate, HeartrateLog, Step, StepLog } = require("./models")

  await sequelize.sync()

  await purposize.loadPurposes("./purposes.yml")

  // Create fake user data
  console.log("Creating fake data...")

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
        // const heartrateDeviation = Math.floor(Math.random() * 4)
        // const heartrateValue =
        //   Math.random() < 0.5
        //     ? baseHeartrate + heartrateDeviation
        //     : baseHeartrate - heartrateDeviation
        // const heartrate = await Heartrate.create(
        //   {
        //     value: heartrateValue, // Base heartrate + random deviation
        //     timestamp: new Date(startDate.getTime() - j * 10000),
        //   },
        //   {
        //     purpose: "HEALTH",
        //   }
        // )
        // heartrateLog.push(heartrate)

        // await HeartrateLog.create(
        //   {
        //     log: JSON.stringify(
        //       heartrateLog.map(hr => {
        //         const { value, timestamp } = hr.dataValues
        //         return { value, timestamp }
        //       })
        //     ),
        //     timestamp: startDate,
        //     userId: user.id,
        //   },
        //   {
        //     purpose: "HEALTH",
        //   }
        // )

        // Step values
        const stepDeviation = Math.floor(Math.random() * 6000)
        const stepValue = Math.random() < 0.5 ? baseStep + stepDeviation : baseStep - stepDeviation

        stepLog.push({
          value: stepValue,
          date: new Date(startDate.getTime() - j * 1000 * 60 * 60 * 24),
        })
      }

      await StepLog.create(
        {
          log: JSON.stringify(stepLog),
          timestamp: startDate,
          userId: user.id,
        },
        {
          purpose: "HEALTH",
        }
      )
    }
  }
  console.log("Done")
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

createData()

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
