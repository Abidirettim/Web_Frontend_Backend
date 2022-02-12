import db from "./index.js"


const dbControllerWithRequirements = async (sql, requirements) => {

  return new Promise((resolve, reject) => {

    db.query(sql, requirements, (err, results, fields) => {
      if (!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })

  })

}

const dbControllerWithoutRequirements = async (sql) => {

  db.query(sql, (err, results, fields) => {
    if (!err) {
      resolve(results)
    } else {
      reject(err)
    }
  })

}

export default { dbControllerWithRequirements, dbControllerWithoutRequirements }