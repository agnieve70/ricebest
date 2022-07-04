import React from 'react'

function About() {
  return (
      <div className="container-fluid">
          <div
              style={{
                  backgroundImage:
                      'url("https://wallpapercave.com/wp/wp2024254.jpg")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
              }}
              className="row justify-content-center vh-100"
          >
              <div className="col-md-8 mt-5">
                  <h1 className="text-center text-light">About Us</h1>
                  <div className="card p-5 shadow">
                      <p>
                          The primary purpose of this project is to allow
                          farmers, loyal customers, and potential customers or
                          wholesalers no one will try to take advantages in the
                          prices and to buy and sell online as they can connect
                          easily with each other, to promote the goods of
                          farmers to expand their customer base, and to create
                          faster transactions and more accessible communications
                          between the two parties. Likewise, this project can
                          help trade crops in the community over the Internet
                          for more immediate reservations and selling of crops.
                      </p>
                      <p>
                          The site is accessible to anyone who are interested in
                          dealing business agriculture, but only the (ICIFA)
                          members can sign up for the system as farmers or
                          sellers, while buyers can sign up and use the features
                          to reserve rice online along with the agreed terms and
                          conditions. The project also benefits customers as
                          they do not need to spend time and energy to see the
                          farmers individually to reserve the rice.
                          Additionally, with the proposed system, reservation of
                          desired rice is a lot faster whenever and wherever
                          customers maybe for as long as they are connected to
                          the Internet.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default About