import React from 'react'
import UserFetchData from '../../hooks/UserFetchData.jsx'
import { BASE_URL } from '../../config.js'
import DoctorCard from '../../components/Doctors/DoctorCard.jsx'
import Loading from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'

const MyBookings = () => {

  const {data:appoinments, loading , error} = UserFetchData(`${BASE_URL}/users/appointments/my-appointments`)
  return (
    <div>
       {loading && !error && <Loading />}

       {error && !loading && <Error errMessage={error}/>}

      {!loading && !error && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            {appoinments.map(doctor=>(
              <DoctorCard doctor={doctor} key={doctor._id}/>
            ))}
          </div>
      )}

      {!loading && !error && appoinments.length==0 && (
        <h2 className='mt-5 text-center text-primaryColor leading-7 text-[20px] font-semibold'>No Booking Appointment</h2>
      )}

    </div>
  )
}

export default MyBookings