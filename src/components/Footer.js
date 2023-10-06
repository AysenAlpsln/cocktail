import React from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';

function Footer() {
  return (
    <div className="context__wrapper">
      <footer className='footer'>
        <a className='github' href="https://github.com/AysenAlpsln"><AiFillGithub /></a>
        <a className='linkedin' href="https://www.linkedin.com/in/aysenalpaslan/"><AiFillLinkedin /></a>
      </footer>
    </div>
  )
}

export default Footer