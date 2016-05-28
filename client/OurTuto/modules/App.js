import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
    <div>
{/*
  <div className="navbar-wrapper">
    <div className="container">

      <div className="navbar navbar-default navbar-fixed-top" role="navigation" id="top-nav">
        <div className="container">
          <div className="navbar-header">
         <ul>
          <li><Link to="/Signup">회원가입</Link></li>
          <li><Link to="/Login">로그인</Link></li>
          <li><Link to="/Course">코스</Link></li>
          <li><Link to="/">튜토리얼</Link></li>
          <li id ="ourlogo"><Link to="/"><img src="images/logo.png"/></Link></li>
        </ul>
        {this.props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
*/}
{/*figure 요소는 사진 도표 삽화 오디오 비디오 등을 담는 컨테이너 역할을 하는 태그*/}
        <div id="works"  className=" clearfix grid">

          <figure className="effect-oscar  wowload fadeInUp">{/*mouseover effect*/}
              <img src="images/portfolio/1.png" alt="img01"/>
              <figcaption>
                <h3>python</h3>
                <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/2.png" alt="img01"/>
              <figcaption>
                <h3>Javascrip</h3>
                <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/3.png" alt="img01"/>
              <figcaption>
                  <h3>swift</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/4.png" alt="img01"/>
              <figcaption>
                  <h3>html</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/5.png" alt="img01"/>
              <figcaption>
                  <h3>java</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/6.png" alt="img01"/>
              <figcaption>
                  <h3>go</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/5.png" alt="img01"/>
              <figcaption>
                  <h3>html</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/4.png" alt="img01"/>
              <figcaption>
                  <h3>java</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/5.png" alt="img01"/>
              <figcaption>
                  <h3>go</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/4.png" alt="img01"/>
              <figcaption>
                  <h3>html</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/5.png" alt="img01"/>
              <figcaption>
                  <h3>java</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>

          <figure className="effect-oscar  wowload fadeInUp">
              <img src="images/portfolio/6.png" alt="img01"/>
              <figcaption>
                  <h3>go</h3>
                  <Link to="/Choose"></Link>
              </figcaption>
          </figure>


        </div>
      </div>
    )
  }
})
