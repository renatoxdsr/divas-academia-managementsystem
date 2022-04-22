const {age, date} = require('../../lib/date')
const db = require('../../config/db')

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
                weight
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
            data.weight
        ]    

        db.query(query, values, function(err, results){
            if(err) throw ("Database Error!")
            
            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`
            SELECT * 
            FROM members 
            where id=$1`, 
            [id], function(err, results){
                if(err) throw `Database Error!${err}`
            
                return callback(results.rows[0])
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
        WHERE id=$4
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.services,
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
    }
}
    
