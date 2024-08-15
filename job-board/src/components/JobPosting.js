import React from 'react'

const JobPosting = ({title,url,by,time}) => {
    const formattedTime = new Date(time * 1000).toLocaleString()
  return (
    <div className='post' role='listItem'>
        <h2 className='post__title'>
           <a
           className={url ? "" : "inactiveLink"}
           href={url}
           target='_blank'
           rel='noopener'
           />
           {title}
            </h2>
            <span className='post_metadata'>
                By {by} - {formattedTime}
            </span>
    </div>
  )
}

export default JobPosting