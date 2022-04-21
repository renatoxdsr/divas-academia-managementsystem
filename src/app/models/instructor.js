const {age, date} = require('../../lib/date')
const db = require('../../config/db')

module.exports  = {
    all(callback) {

        db.query('SELECT * FROM instructors', function(err, results){
            if(err) throw ("Database Error!")

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
            if(err) throw ("Database Error!")
            
            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`
            SELECT * 
            FROM instructors 
            where id=$4`, 
            [id], function(err, results){
                if(err) throw `Database Error!${err}`
            
                return callback(results.rows[0])
            })
    },
    update(data, callback){
        const query = `
        UPDATE instructors SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            gender=($4),
            services=($5)
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
        FROM instructors 
        Where id=$1`, [id], 
        function(err, results){
            if(err) throw `Database Error!${err}`
            return callback()
        })
    }
}
    
