const emailWorker = async(job, done) => {
    let data = job.data
    console.log(`${data} email sent to user`)
    done(null,{success:true})
}

module.exports = emailWorker