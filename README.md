# Threads - A Twitter Clone

**Brief Description:** A React-based web application that provides a platform for users to share short text posts (Haunts), interact via likes, reposts, and replies, and build social connections. Powered by a GraphQL API and a CockroachDB database.

**Technologies**

* **Frontend:**
    * React.js
    * Chakra UI 
    * Apollo Client 
    * Firebase (Authentication)
    * React Router 

* **Backend:**
    * Node.js
    * Express
    * Apollo Server (GraphQL)
    * Sequelize-CockroachDB (ORM)
    * CockroachDB (Database)
    * Firebase (Authentication)

**Core Features**

* **User Profiles:**  
    * Customizable display name, avatar, and optional short bio/organization info.
    * Secure authentication powered by Firebase Authentication.
    * Optional verification badges ("verified" and "threadsVerified") 

* **Haunting (Tweeting):**   
    * Compose and post text-based Haunts with character limits based on verification status.
    * Reply to existing Haunts, forming threads of conversation.

* **Social Engagement:**
    * Like Haunts to express appreciation.
    * Repost Haunts to share them within your profile.

* **Real-time Updates:**
    * Seamless updates to the feed using GraphQL subscriptions for new Haunts, likes, reposts, etc.

**Database Structure (Simplified)**

* **Users**
    * `id`
    * `username` (unique)
    * `displayName`
    * `email` (unique)
    * `avatar` 
    * `verified` (Boolean)
    * `threadsVerified` (Boolean)
    * `organization` 

* **Haunts**
    * `id`
    * `content` 
    * `userId` (Foreign Key -> Users)
    * `parentHauntId` (Foreign Key -> Haunts, for replies)

* **Likes**
    * `userId` (Foreign Key -> Users)
    * `hauntId` (Foreign Key -> Haunts)

* **Reposts**
    * `userId` (Foreign Key -> Users)
    * `hauntId` (Foreign Key -> Haunts)

* **Follows** (For future implementation)
    * `followerId` (Foreign Key -> Users)
    * `followeeId` (Foreign Key -> Users) 

**Getting Started**

1. **Prerequisites**
    * Node.js vXX.XX and npm (or yarn)
    * A Firebase project with Authentication enabled
    * A CockroachDB instance (either local or cloud-hosted)

2. **Clone repository:**
   ```bash
   git clone [https://github.com/your-username/threads.git](https://github.com/your-username/threads.git)

3. **Install Dependencies:**
   ```bash
   cd threads
   cd frontend 
   npm install (or yarn install)

   cd ../backend
   npm install (or yarn install)

4. **Configure Environment Variables:**
   * Create a `.env` file
   * Obtain API keys and credentials for Firebase, CockroachDB, and any other relevant third-party services. Refer to the backend documentation for specifics.

5. **Start Development Servers:**
   * **Frontend:**
     ```bash
     cd frontend
     npm start (or yarn start)
     ```
   * **Backend:**
     ```bash
     cd backend
     npm start (or yarn start)
     ```
## Deployment

### Frontend

* Refer to instructions for platforms like Netlify or Vercel, specifically tailored for React applications.

### Backend 

* Deployment strategies depend on choices such as self-hosting, containerization, or cloud providers. Provide detailed guidelines when available.

## Future Development Considerations

* **Enhanced Search:** Search users, Haunts, and content by keywords and hashtags.
* **Follow System:** Implement the ability for users to follow each other.
* **Direct Messaging:** Add private messaging functionality.
