import React from "react"
import { Link } from "react-router-dom"
import "./courses.css"
import { coursesCard } from "../../dummydata"
import { FaQuran, FaFlask, FaBookOpen, FaLanguage, FaCalculator, FaBook, FaUserTie } from "react-icons/fa"

const iconMap = {
  quran: <FaQuran />,
  flask: <FaFlask />,
  "book-open": <FaBookOpen />,
  language: <FaLanguage />,
  calculator: <FaCalculator />,
  book: <FaBook />,
}

const teacherIconMap = {
  "user-tie": <FaUserTie />,
}

const CoursesCard = () => {
  return (
    <>
      <section className='coursesCard islamic-courses'>
        <div className='container grid2'> 
          {coursesCard.map((val) => (
            <div className='items' key={val.id}>
              <div className='content flex'>
                <div className='left'>
                  <div className='img course-icon'>
                    {iconMap[val.icon] || <FaBook />}
                  </div>
                </div>
                <div className='text'>
                  <h1>{val.coursesName}</h1>
                  
                  <div className='details'>
                    {val.courTeacher.map((details) => (
                      <div className='box' key={details.name}>
                        <div className='dimg teacher-icon'>
                          {teacherIconMap[details.teacherIcon] || <FaUserTie />}
                        </div>
                        <div className='para'>
                          <h4>{details.name}</h4>
                          <span>{details.totalTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='price'>
                <h3>
                  {val.priceAll} <span>/ {val.pricePer}</span>
                </h3>
              </div>
              
              <Link to="/contact" className='outline-btn'>
                {val.pricePer.includes("Free") ? "ENROLL NOW (FREE)" : "ENROLL NOW"} 
                <i className='fa fa-arrow-right'></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CoursesCard