import React from "react";
import IMG from "../../public/asstes/images/home-01/bg-03.jpg";
import IMGbanner from "../../public/asstes/images/home-01/banner-img.png";
import IMG1 from "../../public/asstes/images/home-01/pattern-01.png";
import IMG3 from "../../public/asstes/images/home-01/pattern-03.png";
import IMG2 from "../../public/asstes/images/home-01/pattern-02.png";
import IMG4 from "../../public/asstes/images/home-01/star-icon02.png";
import Aboutus from "./aboutus";
import { TopBar } from "../components";
import IMGPost1 from "../../public/asstes/images/blog/08.jpg";
import IMGPost2 from "../../public/asstes/images/avatar/06.jpg";
import IMGPost3 from "../../public/asstes/images/svg/quote.svg";
import IMGPost4 from "../../public/asstes/images/svg/quote-yellow.svg";
import IMGPost5 from "../../public/asstes/images/svg/quote-blue.svg";
import IMGPost6 from "../../public/asstes/images/blog/10.jpg";
import IMGPost7 from "../../public/asstes/images/blog/08.jpg";
import IMGPost8 from "../../public/asstes/images/avatar/01.jpg";
import IMGPost9 from "../../public/asstes/images/avatar/02.jpg";
import IMGPost10 from "../../public/asstes/images/avatar/03.jpg";
import IMGPost11 from "../../public/asstes/images/avatar/04.jpg";
import IMGPost12 from "../../public/asstes/images/avatar/05.jpg";
import HomeG from "./Home"
// import Header from "../../components/Header";
function home() {


  const storedUserData = JSON.parse(localStorage.getItem('user'));



  return (
    <>
      {" "}
      <div>
        {/* <Header /> */}
    


<TopBar/>















        <section className="banner banner-01">
          <div id="main-slider" className="swiper-container">
            <div className="swiper-wrapper">
              <div
                className="swiper-slide align-items-center d-flex slide-01 header-position"
                style={{
                  backgroundImage: `url(${IMG})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="pattern-01"
                  data-swiper-animation="fadeIn"
                  data-duration="1.5s"
                  data-delay="1.0s"
                >
                  <img className="img-fluid vert-move" src="/public/asstes/images/home-01/bg-03.jpg" alt="" />
                </div>
                <div
                  className="pattern-03"
                  data-swiper-animation="fadeIn"
                  data-duration="1.5s"
                  data-delay="1.0s"
                >
                  <img className="img-fluid vert-move" src={IMG3} alt="" />
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-lg-6 position-relative">
                      <h1
                        className="text-white text-start"
                        data-swiper-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay="1.0s"
                      >
                        hello Is Just Dream
                      </h1>
                      <p
                        className="text-white"
                        data-swiper-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay="2.0s"
                      >
                        From Novice to Champion! Elevate your game, showcase your skills, and seize the opportunity to play with the pros. Every beginner has the potential to become a star – it's time to turn your passion into excellence and join the ranks of the greats. Your journey starts now, and greatness awaits those who dare to dream, work hard, and play harder. Embrace the challenge, embrace the game!
                      </p>
                      <a
                        href="/About"
                        className="btn btn-white mt-3 mt-md-4"
                        data-swiper-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay="3.0s"
                      >
                        Read More
                      </a>
                      <div
                        className="pattern-02"
                        data-swiper-animation="fadeIn"
                        data-duration="5.5s"
                        data-delay="1.0s"
                      >
                        <img
                          className="custom-animation img-fluid"
                          src={IMG2}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 d-none d-lg-flex">
                      <div className="banner-img">
                        <img
                          className="img-fluid hori-move"
                          src={IMGbanner}
                          data-swiper-animation="fadeIn"
                          data-duration="5.0s"
                          data-delay="1.0s"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="swiper-slide align-items-center d-flex slide-02 header-position"
                style={{
                  backgroundImage: `url(${IMG})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="pattern-01"
                  data-swiper-animation="fadeIn"
                  data-duration="1.5s"
                  data-delay="1.0s"
                >
                  <img className="img-fluid vert-move" src={IMG1} alt="" />
                </div>
                <div
                  className="pattern-03"
                  data-swiper-animation="fadeIn"
                  data-duration="1.5s"
                  data-delay="1.0s"
                >
                  <img className="img-fluid vert-move" src={IMG3} alt="" />
                </div>
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-lg-4 col-xl-4 col-xxl-6 d-none position-relative d-lg-flex justify-content-center">
                      <div className="banner-img">
                        <img
                          className="img-fluid vert-move"
                          src={IMG2}
                          data-swiper-animation="fadeIn"
                          data-duration="5.0s"
                          data-delay="1.0s"
                          alt=""
                        />
                      </div>
                      <div
                        className="pattern-04"
                        data-swiper-animation="fadeIn"
                        data-duration="5.5s"
                        data-delay="1.0s"
                      >
                        <img className="custom-animation" src={IMG4} alt="" />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 position-relative">
                      <h1
                        className="text-white text-start"
                        data-swiper-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay="1.0s"
                      >
                        Football for the kicks
                      </h1>
                      <p
                        className="text-white"
                        data-swiper-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay="2.0s"
                      >
                        Lorem ipsum dolor sit amet, con secte tur adip si cin
                        elit, do eius mod tempor in cidi dut ut la bore magna
                        aliquat enim ad.
                      </p>
                      <a
                        href="/About"
                        className="btn btn-white mt-3 mt-md-4"
                        data-swiper-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay="3.0s"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 position-relative text-center">
                  <div className="pagination-button">
                    <div
                      className="swiper-button-prev"
                      tabIndex="0"
                      role="button"
                      aria-label="Previous slide"
                    >
                      Prev
                    </div>
                    <div
                      className="swiper-button-next"
                      tabIndex="0"
                      role="button"
                      aria-label="Next slide"
                    >
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomeG />
        <Aboutus />

        <section class="space-ptb">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mb-4 mb-lg-0">
                <div class="blog-detail">
                  <div class="blog-post post-style-02 mb-4 mb-md-5">
                    <div class="blog-image">
                      <img class="img-fluid" src={IMGPost1} alt="#" />
                      <div class="blog-post-date">
                        <span class="date">30</span>
                        <span class="month">Oct</span>
                      </div>
                    </div>
                    <div class="blog-post-details">
                      <div class="blog-post-meta">
                        <div class="blog-post-author">
                          <span>
                            <a href="#">
                              <img src={IMGPost2} alt="" />
                              Harry Russell
                            </a>
                          </span>
                        </div>
                        <div class="blog-post-comments text-white">
                          <span class="text-primary">(0)</span> Comments
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <h3 class="mb-4 fw-bold">3 Comments</h3>
                      <div class="comments-01">
                        <div class="comment-author">
                          <img class="img-fluid" src={IMGPost11} alt="" />
                          <strong>Paul Flavius</strong>
                        </div>
                        <div class="comment-content">
                          <div class="reviews">
                            <p class="meta">
                              <span class="d-block pt-1">
                                April 5, 2022 at 8:41 am
                              </span>
                            </p>
                            <a class="port-social" href="#">
                              <i class="fas fa-reply pe-2"></i>Reply
                            </a>
                          </div>
                          <p class="mb-0">
                            Absorb yourself in the sensations, the feelings, the
                            sights, the sounds and of course continue to engage
                            in your future the way I have discussed in previous
                            articles on this blog.
                          </p>
                        </div>
                      </div>
                      <div class="comments-02">
                        <div class="comment-author">
                          <img class="img-fluid" src={IMGPost8} alt="" />
                          <strong>Frank Smith</strong>
                        </div>

                        <div class="comment-content">
                          <div class="reviews">
                            <p class="meta">
                              <span class="d-block pt-1">
                                April 6, 2022 at 7:30 am
                              </span>
                            </p>
                            <a class="port-social" href="#">
                              <i class="fas fa-reply pe-2"></i>Reply
                            </a>
                          </div>
                          <p class="mb-0">
                            Open your eyes and begin to plan your future and
                            take action to achieve that outcome. Your
                            unconscious mind now knows what it is working
                            towards.
                          </p>
                        </div>
                      </div>
                      <div class="comments-01">
                        <div class="comment-author">
                          <img class="img-fluid" src={IMGPost9} alt="" />{" "}
                          <strong>Joanna williams</strong>
                        </div>
                        <div class="comment-content">
                          <div class="reviews">
                            <p class="meta">
                              <span class="d-block pt-1">
                                April 6, 2022 at 8:41 am
                              </span>
                            </p>
                            <a class="port-social" href="#">
                              <i class="fas fa-reply pe-2"></i>Reply
                            </a>
                          </div>
                          <p class="mb-0">
                            Making a decision to do something – this is the
                            first step. We all know that nothing moves until
                            someone makes a decision. The first action is always
                            in making the decision to proceed.
                          </p>
                        </div>
                      </div>
                      <div class="leave-reply-form mt-0 mt-md-4">
                        <div class="mb-4 mb-md-4">
                          <h3 class="fw-bold">Leave A Comment</h3>
                        </div>
                        <form class="row mt-4 align-items-center">
                          <div class="mb-4 col-sm-12">
                            <div class="mb-4">
                              <input
                                class="form-control"
                                rows="5"
                                id="comment"
                                placeholder="Comment"
                              ></input>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <a class="btn btn-primary w-auto" href="#">
                              {" "}
                              Post Comment{" "}
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="sidebar">
                  <div class="widget  ">
                    <div class="widget-title">
                      <h5 class="title">Search</h5>
                    </div>
                    <div class="search">
                      <form class="search-form">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search"
                        />
                        <a href="#" class="btn btn-primary text-uppercase">
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                      </form>
                    </div>
                  </div>
                  <div class="widget">
                    <div class="widget-title">
                      <h5 class="title">Recent Post</h5>
                    </div>
                    <div class="recent-post">
                      <div class="rounded-full">
                        <img class="rounded-full" src={IMGPost10} alt="" />
                      </div>
                      <div class="post-info">
                        <span class="post-date">
                          <i class="fa-solid fa-calendar-days"></i>Jan 7, 2023
                        </span>
                        <h6 class="post-title">
                          <a href="blog-single.html">
                            Get ready to live each second
                          </a>
                        </h6>
                      </div>
                    </div>
                    <div class="recent-post">
                      <div class="rounded-full">
                        <img class="rounded-full" src={IMGPost11} alt="" />
                      </div>
                      <div class="post-info">
                        <span class="post-date">
                          <i class="fa-solid fa-calendar-days"></i>Jan 25, 2023
                        </span>
                        <h6 class="post-title">
                          <a href="blog-single.html">
                            Pride and passion meets success.
                          </a>
                        </h6>
                      </div>
                    </div>
                    <div class="recent-post mb-0">
                      <div class="rounded-full">
                        <img class="rounded-full" src={IMGPost12} alt="" />
                      </div>
                      <div class="post-info">
                        <span class="post-date">
                          <i class="fa-solid fa-calendar-days"></i>Feb 5, 2023
                        </span>
                        <h6 class="post-title">
                          <a href="blog-single.html">
                            We have only one dream, win it!
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div class="widget mb-0">
                    <div class="widget-title">
                      <h5 class="title"> Subscribe & Follow</h5>
                    </div>
                    <div class="widget-content">
                      <div class="social">
                        <ul class="list-unstyled mb-0">
                          <li class="facebook">
                            <a href="#">
                              {" "}
                              <i class="fab fa-facebook-f me-3"></i>Facebook
                            </a>
                            <a class="follow ms-auto" href="#">
                              Like{" "}
                            </a>
                          </li>
                          <li class="twitter">
                            <a href="#">
                              {" "}
                              <i class="fab fa-twitter me-3"></i>Twitter
                            </a>
                            <a class="follow ms-auto" href="#">
                              followers{" "}
                            </a>
                          </li>
                          <li class="youtube">
                            <a href="#">
                              {" "}
                              <i class="fab fa-youtube me-3"></i>Youtube
                            </a>
                            <a class="follow ms-auto" href="#">
                              Subscribers{" "}
                            </a>
                          </li>
                          <li class="instagram">
                            <a href="#">
                              {" "}
                              <i class="fab fa-instagram me-3"></i>Instagram
                            </a>
                            <a class="follow ms-auto" href="#">
                              followers{" "}
                            </a>
                          </li>
                          <li class="linkedIn mb-0">
                            <a href="#">
                              {" "}
                              <i class="fab fa-linkedin-in me-3"></i>LinkedIn
                            </a>
                            <a class="follow ms-auto" href="#">
                              followers{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="back-to-top" className="back-to-top">
          <a href="#">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default home;
