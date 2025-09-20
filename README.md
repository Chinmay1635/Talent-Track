<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Chinmay1635/Talent-Track">
    <!-- <img src="https://afnan-001.github.io/deployed_images/minilogo.png" alt="Logo" width="80" height="80" align="center"> -->
  </a>

  <h1 align="center">Talent Track</h1>

  <p align="center">
    <i>Empowering athletes, coaches, and sponsors through technology.</i>
    <br />

</div>

## Demo
Here is a working live demo: [Talent Track Demo](https://talent-track-five.vercel.app/)

<!-- ## Site
### Landing Page
"Where athletes and opportunities meet."
# ![WebApp](https://afnan-001.github.io/deployed_images/landing_page.png)

### Dashboard
# ![WebApp](https://afnan-001.github.io/deployed_images/dashboard.png)

### Athlete Profile
# ![WebApp](https://afnan-001.github.io/deployed_images/athlete_profile.png)

### Coach Dashboard
# ![WebApp](https://afnan-001.github.io/deployed_images/coach_dashboard.png)

### Sponsor Insights
# ![WebApp](https://afnan-001.github.io/deployed_images/sponsor_insights.png) -->

<!-- ABOUT THE PROJECT -->
## About The Project

**Talent Track** is a platform designed to connect athletes, coaches, and sponsors, providing tools to manage training, track performance, and discover opportunities. Built with a focus on user experience and scalability, Talent Track aims to revolutionize the sports ecosystem.

Key Features:
* 🏋️ **Athlete dashboards** for tracking training and tournaments
* 🧑‍🏫 **Coach tools** for managing athletes and creating training plans
* 🤝 **Sponsor insights** for discovering top-performing athletes
* 📊 **Data-driven analytics for performance tracking**
* 🔒 Secure authentication and role-based access
* 🏅 **Gamification & Badges**: Earn achievement-based digital badges to track progress and boost motivation.
* 🤖 **AI-Powered Assistant**: Personalized virtual assistant for training guidance, diet tips, and performance insights.

Talent Track bridges the gap between talent and opportunity, empowering users to achieve their goals.


## Role-Based Features

| **Role**          | **Core Features**                                                                                                                                                                                                                         | **Technical Aspects**                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Athlete**       | - Gamification with digital badges <br> - Personalized AI-powered assistant <br> - Accessibility for disabled athletes <br> - Injury recovery & prevention with coach input <br> - Nearby doctor locator <br> - Sponsorship notifications | - ML-based performance tracking <br> - Adaptive UI/UX for accessibility <br> - Geo-location & map integration <br> - Automated email & push notification system |
| **Coach**         | - AI analytics of athlete performance <br> - Structured training plan generator <br> - Multi-athlete management dashboard                                                                                                                 | - Real-time dashboards with data visualization <br> - Predictive analytics via ML models <br> - Scalable database for multi-athlete data                        |
| **Academy Admin** | - Tournament hosting & scheduling <br> - Coach & athlete onboarding/management                                                                                                                                                            | - Tournament management system with live updates <br> - Role-based access control (RBAC) <br> - Cloud-hosted admin panel                                        |
| **Sponsor**       | - Athlete discovery & filtering <br> - Sponsorship offer management <br> - Direct communication via mail & app                                                                                              | - Advanced search & filtering with performance metrics <br> - Automated email triggers <br> - Analytics dashboard for sponsorship ROI                           |

### Built With

This section lists the major frameworks/libraries used to bootstrap the project. Here are a few examples:

* [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
* [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
* [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* [![Framer Motion](https://img.shields.io/badge/Framer%20motion-black?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## 🚀Getting Started

Follow these steps to set up and run the Talent Track project locally.

## 🔧Prerequisites
Make sure you have the following installed:
* **Node.js** (v16 or later)
* **Next.js** (v15 or later)
* **MongoDB** for database management
* **Google Cloud** Project with:
  * OAuth 2.0 credentials set up

### 📦Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Chinmay1635/Talent-Track.git
   cd Talent-Track
   ```
2. Install NPM packages
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables 
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=
   JWT_SECRET=

   NEXT_PUBLIC_GEMINI_API_KEY=

   GMAIL_CLIENT_ID=
   GMAIL_CLIENT_SECRET=
   GMAIL_REDIRECT_URI=
   GMAIL_REFRESH_TOKEN=
   EMAIL_USER=
   ```

4. Run the app locally
   ```sh
   npm run dev
   # or
   yarn run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Chinmay1635"><img src="https://avatars.githubusercontent.com/u/159155703?v=4" width="100px;" alt="Chinmay Kulkarni"/><br /><sub><b>Chinmay Kulkarni</b></sub></a><br/> </td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Afnan2op"><img src="https://avatars.githubusercontent.com/u/208136186?v=4" width="100px;" alt="Afnan Sayyad"/><br /><sub><b>Afnan Sayyad</b></sub></a><br/> </td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dumbsumit"><img src="https://avatars.githubusercontent.com/u/167517728?v=4" width="100px;" alt="Sumit Phalke"/><br /><sub><b>Sumit Phalke</b></sub></a><br/> </td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PIYUS1507"><img src="https://avatars.githubusercontent.com/u/164095652?v=4" width="100px;" alt="Piyush Rajurkar"/><br /><sub><b>Piyush Rajurkar</b></sub></a><br/> </td>
    </tr>
</tbody>
</table>

## Made by Sixth Sense ❤️

<p align="right">(<a href="#readme-top">back to top</a>)</p>
