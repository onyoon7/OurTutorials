// import React from 'react'
// import { Link } from 'react-router'
//
//
// export default React.createClass({
//   render() {
//     return (
//       <div>
//       <ul>
//           <li><Link to="/Choose-child">언어선택
//
//           asdasdasdasd</Link></li>
//
//
//
//       </ul>
//       {this.props.children}
//       </div>
//     )
//   }
// })

import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
    <div>

        <div id="works"  className=" clearfix grid">
          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/1.png" alt="img01"/>
              <figcaption>
                <h3>python123</h3>
                <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/2.png" alt="img01"/>
              <figcaption>
                <h3>Javascrip123</h3>
                <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/3.png" alt="img01"/>
              <figcaption>
                  <h3>swift123</h3>
                  <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/4.png" alt="img01"/>
              <figcaption>
                  <h3>html</h3>
                  <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/5.png" alt="img01"/>
              <figcaption>
                  <h3>java</h3>
                  <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/6.png" alt="img01"/>
              <figcaption>
                  <h3>go</h3>
                  <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/1.png" alt="img01"/>
              <figcaption>
                <h3>python</h3>
                <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/2.png" alt="img01"/>
              <figcaption>
                <h3>Javascrip</h3>
                <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/3.png" alt="img01"/>
              <figcaption>
                  <h3>swift</h3>
                  <Link to="/ChooseChild"></Link>
              </figcaption>
          </figure>
        </div>
      </div>
    )
  }
})
