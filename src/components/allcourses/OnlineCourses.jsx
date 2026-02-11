import { supabase } from "../../supabaseClient"
import React, { useState, useEffect } from "react"
import "./courses.css"
import Heading from "../common/heading/Heading"

const OnlineCourses = () => {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order', { ascending: true })
      
      if (data && data.length > 0) {
        setPrograms(data)
      } else {
        // Fallback or empty state if needed
        setPrograms([]) 
      }
    }
    fetchPrograms()
  }, [])
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
              <div className='box' key={val.id}>
                <div className='img'>
                  <img src={val.cover_image} alt={val.name} />
                  <img src={val.hover_image} alt="" className='show' />
                </div>
                <h1>{val.name}</h1>
                <span>{val.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses