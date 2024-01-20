import React from 'react'
import IMG1 from "../../public/asstes/images/home-01/team-01.jpg"
import IMG3 from "../../public/asstes/images/home-01/team-03.jpg"
import IMG2 from "../../public/asstes/images/home-01/team-02.jpg"
import IMG4 from "../../public/asstes/images/home-01/team-04.jpg"

function aboutus() {



  
  return (
    <div>
          <section class="space-pb">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <div class="section-title text-center">
              <h2 class="mb-0 text-white">New Players</h2> 
              <p class="text-white mt-2">For those of you who are serious about having more, doing more, giving more and being more, success is achievable with some understanding of what to do, some discipline around planning and execution of those plans and belief that you can achieve your desires.</p>                
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mt-4 mt-md-5">
            <div class="owl-carousel arrow-top-right" data-nav-dots="false" data-nav-arrow="false" data-items="3" data-xl-items="3" data-lg-items="2" data-md-items="1" data-sm-items="1" data-xs-items="1" data-xx-items="1"  data-autoheight="true">
             <a href='/PlayerInfo'> <div class="item">
                <div class="team">
                  <div class="player">
                    <img class="img-fluid" src={IMG1} alt=""/>                    
                  </div>
                  <div class="player-info">
                    <span class="player-number">10</span>
                    <div class="player-name">
                      <h3 class="text-uppercase title"><a href="#">Ahmed Sami</a></h3>
                      <span class="text-uppercase text-primary">Center</span>
                    </div>
                  </div>
                </div>
              </div></a>
              <div class="item">
                <div class="team">
                  <div class="player">
                    <img class="img-fluid" src={IMG2} alt=""/>                    
                  </div>
                  <div class="player-info">
                    <span class="player-number">88</span>
                    <div class="player-name">
                      <h3 class="text-uppercase title"><a href="#">Ramzi Ramzi</a></h3>
                      <span class="text-uppercase text-primary">Defenders</span>
                    </div>
                  </div>
                </div>
              </div>    
              <div class="item">
                <div class="team">
                  <div class="player">
                    <img class="img-fluid" src={IMG3} alt=""/>                    
                  </div>
                  <div class="player-info">
                    <span class="player-number">07</span>
                    <div class="player-name">
                      <h3 class="text-uppercase title"><a href="#">Jamel Zyad</a></h3>
                      <span class="text-uppercase text-primary">Midfielders</span>
                    </div>
                  </div>
                </div>
              </div>  
              <div class="item">
                <div class="team">
                  <div class="player">
                    <img class="img-fluid" src={IMG4} alt=""/>                    
                  </div>
                  <div class="player-info">
                    <span class="player-number">09</span>
                    <div class="player-name">
                      <h3 class="text-uppercase title"><a href="#">Sami Sahraoui</a></h3>
                      <span class="text-uppercase text-primary">Forwards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default aboutus
