import "../stylesheets/PostView.css";

export default function About() {
  return (
    <>
      <div className="my-5 py-4">
        <h1 className="text-center">
          <b>About</b>
        </h1>

        <div id="body" className="body-text">
          <h4>Hi, I'm Aadi Anand!</h4>
          <br></br>
          <h6>
            I’m a passionate software developer and mathematics enthusiast,
            currently pursuing a double degree in Computer Science and
            Mathematics (B.S) at the University of Maryland – College Park. With
            a foundation in problem-solving and innovation, I thrive on creating
            impactful digital experiences, whether it’s through mobile apps, web
            platforms, or complex algorithms.
          </h6>
          <h6>
            Over the years, I’ve honed my skills through internships and
            personal projects. As a Full Stack Developer Intern at Sociable AI,
            I built a user analytics dashboard using Next.js and TypeScript.
            During my time as an iOS Software Engineer Intern at LumoImaging, I
            developed an app to assist medical professionals in tracking patient
            care. These opportunities have shaped my approach to
            development—balancing user-centric design with technical excellence.
          </h6>
          <br />
          <div>
            <h5>My Hobbies:</h5>
            <ul>
              <li>
                <h6>
                  Video Games: Exploring virtual worlds and innovative gameplay.
                </h6>
              </li>
              <li>
                <h6>Movies: Analyzing stories and cinematic art.</h6>
              </li>
              <li>
                <h6>
                  Cars: A lifelong fascination with engineering and speed.
                </h6>
              </li>
              <li>
                <h6>Fitness: Challenging myself to stay active and focused.</h6>
              </li>
              <li>
                <h6>
                  Programming: Experimenting with new frameworks and
                  technologies.
                </h6>
              </li>
            </ul>
          </div>
          <br />
          <div>
            <h5>My Skills:</h5>
            <ul>
              <li>
                <h6>
                  Programming Languages: Python, Java, C/C++, TypeScript, Swift,
                  React/React Native
                </h6>
              </li>
              <li>
                <h6>
                  Frameworks & Tools: Next.js, Django, Prisma, MongoDB, AWS
                  (This website was built with AWS services!)
                </h6>
              </li>
              <li>
                <h6>
                  Software Development Practices: Agile methodologies,
                  Test-Driven Development (TDD), and version control with Git
                </h6>
              </li>
            </ul>
          </div>
          <br />
          <div>
            <h5>A Global Perspective</h5>
            <h6>
              Having lived in Hong Kong and Washington, D.C., I’ve been shaped
              by diverse cultures and experiences that fuel my creativity and
              adaptability.
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
