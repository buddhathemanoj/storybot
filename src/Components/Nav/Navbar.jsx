// // import { useState, useRef } from 'react';
// // import { FaBars } from 'react-icons/fa';
// // import { links, social } from './data';
// // import logo from './logo.svg';

// // const Navbar = () => {
// //   const [showLinks, setShowLinks] = useState(false);
// //   const linksContainerRef = useRef(null);
// //   const linksRef = useRef(null);

// //   const toggleLinks = () => {
// //     setShowLinks(!showLinks);
// //   };
// //   const linkStyles = {
// //     height: showLinks
// //       ? `${linksRef.current.getBoundingClientRect().height}px`
// //       : '0px',
// //   };
// //   return (
// //     <nav>
// //       <div style={{display:'flex'}}  className='nav-center'>
// //         <div className='nav-header'>
// //           <img style={{maxWidth:'40px'}} src={logo} className='logo' alt='logo' />
// //           <button className='nav-toggle' onClick={toggleLinks}>
// //             <FaBars />
// //           </button>
// //         </div>

// //         <div
// //           className='links-container'
// //           ref={linksContainerRef}
// //           style={linkStyles}
          
// //         >
// //           <ul className='links' ref={linksRef}>
// //             {links.map((link) => {
// //               const { id, url, text } = link;
// //               return (
// //                 <li key={id}>
// //                   <a href={url}>{text}</a>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </div>
// //         {/* social icons */}
// //         <ul className='social-icons'>
// //           {social.map((socialIcon) => {
// //             const { id, url, icon } = socialIcon;
// //             return (
// //               <li key={id}>
// //                 <a href={url}>{icon}</a>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { useState, useRef } from 'react';
// import { FaBars } from 'react-icons/fa';
// import { links, social } from './data';
// import logo from './logo.svg';
// import './Navbar.css'
// const Navbar = () => {
//   const [showLinks, setShowLinks] = useState(false);
//   const linksContainerRef = useRef(null);
//   const linksRef = useRef(null);

//   const toggleLinks = () => {
//     setShowLinks(!showLinks);
//   };
//   const linkStyles = {
//     height: showLinks
//       ? `${linksRef.current.getBoundingClientRect().height}px`
//       : '0px',
//   };
//   return (
//     <nav>
//       <div style={{ display: 'flex', backgroundColor: '#242424', color: 'white' }} className='nav-center'>
//       <div className='nav-header'>
//     <img style={{ maxWidth: '40px',marginRight:'30px', filter: 'brightness(0) invert(1)' }} src={logo} className='logo' alt='logo' />
//     <button style={{marginTop:'10px'}} className='nav-toggle' onClick={toggleLinks}>
//       <FaBars />
//     </button>
//   </div>

//         <div
//           className='links-container'
//           ref={linksContainerRef}
//           style={{ ...linkStyles, transition: 'height 0.3s ease-out' }}
//         >
//           <ul className='links' ref={linksRef} style={{ margin: '0', padding: '0', listStyle: 'none' }}>
//             {links.map((link) => {
//               const { id, url, text } = link;
//               return (
//                 <li key={id}>
//                   <a href={url} style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '1rem' }}>{text}</a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         {/* social icons */}
//         {/* <ul className='social-icons' style={{ display: 'flex', listStyle: 'none', margin: '0', padding: '0' }}>
//           {social.map((socialIcon) => {
//             const { id, url, icon } = socialIcon;
//             return (
//               <li key={id} style={{ padding: '1rem' }}>
//                 <a href={url} style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>{icon}</a>
//               </li>
//             );
//           })}
//         </ul> */}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';
import logo from './logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
    // Calculate and set the height of the links container on toggle
    if (!showLinks) {
      linksContainerRef.current.style.height = `${linksRef.current.scrollHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  };

  const linkStyles = {
    height: showLinks ? `${linksRef.current.getBoundingClientRect().height}px` : '0px',
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="logo" alt="logo" />
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>

        <div className="links-container" ref={linksContainerRef} style={{ overflow: 'hidden', height: showLinks ? `${linksRef.current.scrollHeight}px` : '0px', transition: 'height 0.3s ease-out' }}>
          <ul className="links" ref={linksRef} style={{ margin: '0', padding: '0', listStyle: 'none' }}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url} style={{ marginTop:'0px', color: 'black', textDecoration: 'none', display: 'block', padding: '1rem' }}>
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social icons */}
        {/* <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
