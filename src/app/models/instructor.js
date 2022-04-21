const {age, date} = require('../../lib/date')
const db = require('../../config/db')

module.exports  = {
    all(callback) {

        db.query('SELECT * FROM instructors', function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows)
        })
    },
    create(data, callback) {
    //Instructions to sql 
    const query = `
        INSERT INTO instructors (
            name,
            avatar_url,
            birth,
            gender,
            services,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    const values = [
        data.name,
        data.avatar_url,
        date(data.birth).iso,
        data.gender,
        data.services,
        date(Date.now()).iso
    ]    

    db.query(query, values, function(err, results){
        if(err) return res.send("Database Error!")
        
        callback(results.rows[0])
    })
    }
}