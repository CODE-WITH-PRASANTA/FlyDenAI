import React, { useState } from "react";
import "./StudyAbroadInfoSection.css";

function StudyAbroadInfoSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="study-info-section">
      <div className="study-info-container">
        <h2>
          Study Abroad with <span>Leverage Edu</span>
        </h2>

        <p>
          As per government estimates, a little over 9,00,000 Indians were
          studying abroad in 2022. This grew to 1.31 million in 2023 and 1.33
          million in 2024. As per some estimates, around 1.5 to 2 million
          Indians will be studying abroad in 2025.
        </p>

        <p>
          India has the second-largest number of students studying overseas,
          surpassed only by China. In 2019, Indians spent USD 37 billion on
          higher education overseas and in 2025, the spending is expected to
          cross USD 70 billion.
        </p>

        {!expanded && (
          <button
            className="read-more-btn"
            onClick={() => setExpanded(true)}
          >
            Read more ...
          </button>
        )}

        {expanded && (
          <>
            <p>
              For an aspirant spending INR 30-40 lakhs on a degree abroad, the
              amount of return they get and how quickly is vital. Hence, there
              is an increasing demand for courses that make you career-ready.
            </p>

            <p>
              However, in this onslaught of universities attracting you with the
              latest courses and curricula, it becomes difficult to choose the
              course that will help you build the career you desire. It involves
              a lot of research, know-how and willingness to stay updated with
              the latest trends to make this choice.
            </p>

            <p>
              Or you can choose the right study abroad consultant with the right
              plan for your dreams!
            </p>

            <h3>Why Study Abroad with Leverage Edu</h3>
            <p>
              Leverage Edu is the most trusted study abroad consultant in India.
              Our team of experts conducts over 2,00,000 counselling sessions
              every month and our student-first approach sets us apart from the
              competition.
            </p>

            <p>Here are some reasons why you should partner with Leverage Edu:</p>

            <ul>
              <li>
                <strong>Vast Experience:</strong> We have a proven record of
                sending 45,000+ students to their dream universities abroad. Our
                success speaks through their achievements.
              </li>
              <li>
                <strong>Wide Network of Reputed Universities:</strong> We have a
                network of over 850 university partners in top destinations like
                the UK, USA, Canada, Germany, UAE, Ireland, New Zealand, and
                Australia. 95% of our students get an admit in less than 4
                weeks.
              </li>
              <li>
                <strong>End-to-End Support:</strong> From shortlisting the best
                university to getting you a SIM card once you reach there, we
                handle it all to help you succeed.
              </li>
              <li>
                <strong>Student-first Approach:</strong> Every decision at
                Leverage Edu is guided by our commitment to ensure your success.
              </li>
              <li>
                <strong>Tech-based Solutions:</strong> Our AI University Course
                Finder and Leverage App help you track and manage your study
                abroad journey easily.
              </li>
            </ul>

            <h3>Top Countries to Study Abroad</h3>
            <ul>
              <li>
                <strong>UK:</strong> Shorter degrees help you save on tuition
                and living costs while getting job-ready earlier.
              </li>
              <li>
                <strong>USA:</strong> A global leader in education standards,
                home to 4 of the world’s top 10 universities.
              </li>
              <li>
                <strong>Germany:</strong> Known for innovation, affordability,
                and practical learning—ideal for engineering and technology.
              </li>
              <li>
                <strong>Canada:</strong> Affordable education, top universities,
                and great post-study work opportunities.
              </li>
              <li>
                <strong>UAE:</strong> Emerging hub for global campuses from top
                universities.
              </li>
              <li>
                <strong>Ireland:</strong> Home to 7,000+ Indian students and
                rapidly growing as a study destination.
              </li>
            </ul>

            <h3>How to Apply to Study Abroad with Leverage Edu</h3>
            <ol>
              <li>Visit www.leverageedu.com</li>
              <li>Click on “Talk to an Expert”</li>
              <li>Fill in your details.</li>
              <li>Our experts will reach out to you in no time.</li>
            </ol>

            <h3>Leverage Edu Scholarships</h3>
            <p>
              Leverage Edu supports global citizens with scholarships up to 50%
              for eligible students — worth up to INR 10 lakhs* for universities
              in the UK, Canada, and the USA.
            </p>

            <p>
              Every student who applies through Leverage Edu is automatically
              eligible for the scholarship. Enter your details, and our team
              will get in touch.
            </p>

            <button
              className="read-more-btn"
              onClick={() => setExpanded(false)}
            >
              Read less ...
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default StudyAbroadInfoSection;
