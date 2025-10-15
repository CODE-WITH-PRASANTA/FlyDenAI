import React, { useState } from "react";
import "./Embassy.css";

// === Import Images ===
import m1 from "../../assets/m1.webp";
import m2 from "../../assets/m2.webp";
import m3 from "../../assets/m3.webp";
import m4 from "../../assets/m4.webp";
import m5 from "../../assets/m5.webp";
import m6 from "../../assets/m6.webp";
import m7 from "../../assets/m7.webp";
import m8 from "../../assets/m8.webp";
import m9 from "../../assets/m9.webp";
import m10 from "../../assets/m10.webp";
import m11 from "../../assets/m11.webp";
import m12 from "../../assets/m12.webp";

const Embassy = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  const attractions = [
    { name: "Petronas Twin Towers", description: "An unmissable exemplary example of Malaysia’s marvellous architecture, the Petronas Twin Towers in Kuala Lumpur are the world’s tallest twin towers.", price: "₹ 1604/- Per Person", image: m1 },
    { name: "Batu Caves", description: "Especially popular among Hindu tourists, these limestone caves are home to the 140 ft. tall statue of Lord Murugan.", price: "₹ 2476/- Per Person", image: m2 },
    { name: "KLCC Park", description: "A 50-acre urban sanctuary providing natural respite in Kuala Lumpur city, the Kuala Lumpur City Centre Park is located around the Petronas Towers.", price: "₹ 7144/- Per Person", image: m3 },
    { name: "Legoland Malaysia", description: "A theme park, water park and aquarium, all in one, the LEGOLAND Malaysia in Iskander Puteri boasts of several themed attractions, thrilling rides, and marine adventures.", price: "₹ 16617/- Per Person", image: m4 },
    { name: "Langkawi Sky Bridge", description: "Hop on a cable car ride, overlooking the famous Telaga Tujuh Waterfalls and rainforests, as it takes you to the world’s longest curved suspension bridge.", price: "₹ 3650/- Per Person", image: m5 },
    { name: "Georgetown", description: "Located on Penang Island, Georgetown is its multicultural capital known for its confluence of cultures and historic landmarks.", price: "₹ 999/- Per Person", image: m6 },
    { name: "Cameron Highlands", description: "A picturesque hill station escape boasting expansive tea plantations, gardens, waterfalls, and British-era charm.", price: "₹ 999/- Per Person", image: m7 },
    { name: "Taman Negara National Park", description: "The 130-million-year-old tropical rainforest of Taman Negara sprawls over more than 4000 sq. kms and is a biodiversity hotspot.", price: "₹ 10414/- Per Person", image: m8 },
    { name: "Langkawi Island", description: "Sprawling over the Malacca Strait, Langkawi is an archipelago of 99 islands — Malaysia’s own tropical paradise.", price: "₹ 999/- Per Person", image: m9 },
    { name: "Mount Kinabalu", description: "Located on Sabah’s west coast, the 4,101 m tall Mount Kinabalu is Malaysia’s highest mountain and a trekker’s favourite.", price: "₹ 10019/- Per Person", image: m10 },
    { name: "Kota Kinabalu Park", description: "Malaysia’s first UNESCO World Heritage Site — a breathtaking escape for nature lovers.", price: "₹ 999/- Per Person", image: m11 },
    { name: "Perhentian Islands", description: "A group of stunning islands known for turquoise water, coral reefs, and fun water activities.", price: "₹ 999/- Per Person", image: m12 },
  ];

  const malaysiaInfo = [
    "Malaysia Visa Guide for Indian Citizens",
    "Tips to get Malaysia Visa for Indians",
    "How To Apply For Malaysia Visa For Indians",
    "Reasons for Malaysia Visa Rejection",
    "Malaysia Visa for Indians: Everything You Need To Know",
    "Do I need a Confirmed Airline Ticket to get my Visa?",
    "10 Best Places for Shopping in Malaysia",
    "Explore Malaysia On A Budget",
    "14 Best Places to Visit in Malaysia – The Land of Beautiful Islands",
    "The 5 Most Beautiful Beaches in Malaysia",
    "Top 8 Attractions You Can't Miss in Malaysia",
    "HOW TO TRAVEL TO MALAYSIA ON A BUDGET!",
    "7 Amazing Beach Resorts in Malaysia",
  ];

  return (
    <div className="embassy-wrapper">

      {/* === Malaysia Visa Steps Section (replaces Akbar Travels) === */}
      <div className="visa-steps-container">
        <h2>Simple steps to get a Malaysia Visa:</h2>
        <p>
          Akbar Travels has been a part of more than one million travel dreams. We offer a superior, quick and hassle-free Malaysia Visa for Indians Facilitation service. With a highly professional and dedicated team of Travel visa Experts, we are here to cater to all your Malaysia visa application requirements.
        </p>
        {expanded && (
          <>
            <p>Throughout your Malaysia tourist visa process, you will have a dedicated visa expert handling your application.</p>
            <h3>Here are the steps to apply for a Malaysia Visa online through Akbar Travels:</h3>
            <ul>
              <li><strong>Step 1:</strong> Provide your travel details to our Malaysia Visa Expert and get all your queries answered.</li>
              <li><strong>Step 2:</strong> Pay your Malaysia visa price online and upload all your documents online through our secured online document locker to ensure its confidentiality.</li>
              <li><strong>Step 3:</strong> Our Malaysia Visit Visa Experts will thoroughly verify and scrutinize your documents and further submit it online.</li>
              <li><strong>Step 4:</strong> Receive your Malaysia Visa online straight in your inbox.</li>
            </ul>
          </>
        )}
        <button className="toggle-btn" onClick={toggleContent}>{expanded ? "Show less" : "Show more"}</button>
      </div>

      {/* === Basic Requirements === */}
      <div className="embassy-req">
        <h2>Basic Requirements to visit Malaysia</h2>
        <ul>
          <li>Have a valid Passport and valid Malaysia Tourist Visa;</li>
          <li>Be in good health; <span className="read-more">Read more</span></li>
        </ul>
        <h2>Travel Checklist</h2>
        <ul>
          <li>Passport;</li>
          <li>Valid Malaysia Visa for Indians; <span className="read-more">Read more</span></li>
        </ul>
      </div>

      {/* === Tourist Attractions Vertical Cards === */}
      <div className="embassy-attractions">
        <h2>Top Tourist Attractions in Malaysia</h2>
        <div className="embassy-grid-vertical">
          {attractions.map((item, index) => (
            <div key={index} className="embassy-card-vertical">
              <div className="embassy-card-text">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="price">{item.price}</span>
                <button className="enquire-btn">Enquire Now</button>
              </div>
              <div className="embassy-card-image">
                <img src={item.image} alt={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Arrival & Travel Info === */}
      <div className="embassy-info">
        <h2>What to do when you arrive in Malaysia</h2>
        <ul>
          <li>Keep your Declaration form in hand (provided to you on the flight); <span className="read-more">Read more</span></li>
        </ul>
        <h2>Malaysia Travel Guide</h2>
        <p>To know Malaysia is to love Malaysia — a bubbling, bustling melting pot of races and religions where Malays, Indians, Chinese and many other ethnic groups live together in peace and harmony. <span className="read-more">Read more</span></p>
        <h2>Malaysia Facts and Figures</h2>
        <table>
          <tbody>
            <tr><td>Name</td><td>Federation of Malaysia</td></tr>
            <tr><td>Location</td><td>South East Asia</td></tr>
            <tr><td>Time</td><td>IST (+) 2 ½ hours <span className="read-more">Read more</span></td></tr>
          </tbody>
        </table>
      </div>

      {/* === Malaysia Info Links === */}
      <div className="embassy-links">
        <h2>Malaysia Visa Information & More</h2>
        <ul>
          {malaysiaInfo.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </div>

    </div>
  );
};

export default Embassy;
