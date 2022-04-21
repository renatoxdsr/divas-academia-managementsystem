//creating the timestamp
//creating a function

//exporting the module
module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        //2019 - 1984 = 35
        // as i know the age changes every year because of the birthdata
        // instead of using const, you have to use let because it is changeable

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()


        //create a condition for the days
        //use getDate because it means days of the month
        //today.getDate()
        //birthDate.getDate()

        //create a condition for month
        //verify the getdate if today is less than my birthdate by days
        if(month < 0 || month == 0 
            && today.getDate() < birthDate.getDate()){
            //example with 35
            //for the logic part upabove it has already 35 years old
            // but if it has not arrived in his birthmonth it shouldn't be 35
            age = age -1
        }

        //you have to return outside of the condition
        return age
    },
    date: function(timestamp){
        const date = new Date(timestamp)
        
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        //return yyyy-mm-dd
        /* return`${year}-${month}-${day}` //type: ISO */
        //return an object ISO to show just day & month
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }


    }
}


// 2019 - 1984
// 11 - 12 = -1
// 11 - 11 = 0
// 11 - 10 = 1
// 01 - 12 = -11
// 13 - 12 = 1 
