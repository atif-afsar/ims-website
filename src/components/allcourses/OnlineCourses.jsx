import React from "react"
import "./courses.css"
import Heading from "../common/heading/Heading"

const OnlineCourses = () => {
  const programs = [
    { cover: "/images/programs/dua.jpg", hoverCover: "/images/programs/dua-hover.jpg", courseName: "Daily Duas & Adhkar", course: "Spiritual Development" },
    { cover: "/images/programs/seerah.jpg", hoverCover: "/images/programs/seerah-hover.jpg", courseName: "Seerah of Prophet ﷺ", course: "Weekend Classes" },
    { cover: "/images/programs/robotics.jpg", hoverCover: "/images/programs/robotics-hover.jpg", courseName: "Robotics & Coding", course: "Modern STEM" },
    { cover: "/images/programs/english.jpg", hoverCover: "/images/programs/english-hover.jpg", courseName: "English Communication", course: "Spoken & Writing Skills" },
    { cover: "/images/programs/sports.jpg", hoverCover: "/images/programs/sports-hover.jpg", courseName: "Sports & Physical Education", course: "Cricket, Football, Badminton" },
    { cover: "/images/programs/art.jpg", hoverCover: "/images/programs/art-hover.jpg", courseName: "Islamic Calligraphy & Art", course: "Creative Expression" },
  ]

  return (
    <>
      <section className='online islamic-programs'>
        <div className='container'>
          <Heading 
            subtitle='BEYOND ACADEMICS' 
            title='Holistic Development Programs at IMS' 
          />
          <div className='content grid3'>
            {programs.map((val, i) => (
              <div className='box' key={i}>
                <div className='img'>
                  <img src={val.cover} alt={val.courseName} />
                  <img src={val.hoverCover} alt="" className='show' />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses