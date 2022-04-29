const {age, date} = require('../../lib/date')
const db = require('../../config/db')
const instructor = require('./instructor')

module.exports  = {
    all(callback) {

        db.query('SELECT * FROM members', function(err, results){
            if(err) throw ("Database Error!")

            callback(results.rows)
        })
    },
    create(data, callback) {
    //Instructions to sql 
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                email,
                birth,
                gender,
                blood,
                height,
                weight,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.height,
            data.weight,
            data.instructor
        ]    

        db.query(query, values, function(err, results){
            if(err) throw ("Database Error!")
            
            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`
            SELECT members.*, instructors.name AS instructor_name 
            FROM members 
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id=$1`, 
            [id], function(err, results){
                if(err) throw `Database Error! ${err}`
            
                callback(results.rows[0])
            })
    },
    update(data, callback){
        const query = `
        UPDATE members SET
            name=($1),
            avatar_url=($2),
            email=($4),
            birth=($4),
            gender=($5),
            blood=($6),
            height=($7),
            weight=($8)
            instructor_is=($9)
        WHERE id=$10
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error!${err}`
            
            return callback()
        })
    },
    delete(id, callback){
        db.query(`
        DELETE 
        FROM members 
        Where id=$1`, [id], 
        function(err, results){
            if(err) throw `Database Error!${err}`
            return callback()
        })
    },
    instructorsSelectOption(callback){
        db.query(
            `SELECT name,
            id FROM instructors` ,
            function(err, results) {
                if (err) throw 'Database ERROR!'

                callback(results.rows)
            }
        )
    }
}
    
