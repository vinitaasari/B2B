
const StudentApply = (params1,params2,params3,student,credentials) => {

    return fetch(`/api/student/${params1}/${params2}/${params3}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }, 
      body: JSON.stringify(student)

    }).then(response => {
        return (response.json()) 
    }).catch((err) => console.log(err))
  }

  const getStudentData = (params, credentials) => {
    console.log("in api-student")
    return fetch('/api/student_detail/'+params, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }, 
      body: JSON.stringify()

    }).then(response => {
        return (response.json()) 
    }).catch((err) => console.log(err))
  }

export {
    StudentApply,
    getStudentData
}