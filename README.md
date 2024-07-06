# [ImageBook](https://imagebookio.netlify.app/)
## _The image store with chatbot_


[ImageBook](https://imagebookio.netlify.app/) is a platform where you can interact with several images from PEXELS API.
It also has a inetractive ChatBot in which you can ask questions after you log-in in the app.
Also you can share any image if you like from the homepage by clicking the share button.

```sh
 Check live at : https://imagebookio.netlify.app/
 ```


- Search image of your choice
- Share image on any platform
- ✨Interact with  ChatBot ✨

## Features

- Dynamic and interactive photo-sharing application.
- Homepage grid displaying curated photos from the Pexels API.
- Search functionality for users to find specific topics.
- User authentication with login and signup pages.
- Guest access for users without an account.
- Global state management using React Context API and useReducer.
- Personalized greetings based on user login status.
- Chatbot component for interactive user engagement.
- Social media sharing options for each photo.
- Smooth animations using CSS transitions.



## Tech

Imagebook  is made using following stack:

- [React JS] - HTML enhanced for web apps!
- [Taiwind CSS] - A CSS utility calss
- [React share] - To create share links methods of different social media app.
- [React router dom] - To create navigation between Pages.

And of course Imagebook itself is [public repository](https://github.com/godspeed-03/Chatbot_v2.git)  on GitHub.

## Installation

Imagebook requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/godspeed-03/Chatbot_v2.git
cd Chatbot_v2
npm i
```

For environments...
Go to [Pexels](https://api.pexels.com/v1/) and singup for access tokens
```sh
VITE_APIKEY = " your access token"
```

To run the application :
```sh
npm run dev
```

To create Build file of the application :
```sh
npm run build
```

## Overall

1. Technologies and Libraries:
- React for building the user interface.
- React Router for client-side routing.
- Tailwind CSS for styling with utility classes.
- React Icons for UI icon components.
- React Share for social media sharing functionality.
- Pexels API for fetching curated and search-specific photos.
- Context API and useReducer for global state management.
- Session storage for user information persistence.
- Local storage for storing user data and registered users.
- Fetch API for asynchronous data fetching.
- Clipboard API for copying text to the user's clipboard.

 2. Methods and Functionalities:
- `FetchDatabyQuery` method for fetching photos from Pexels API.
- `useEffect` hook for triggering photo updates based on search queries.
- `useReducer` hook for managing global state and actions.
- `searchpost` method for updating the search query in the state.
- `userName` method for updating the username in the state.
- `handleSubmit` method (Login Component) for user login validation.
- `handleUserInput` method (ChatBotMessage Component) for chatbot interactions.
- `copyToClipboard` method (Sharepost Component) for copying text to the clipboard.
- `closeModal method` (Sharepost Component) for closing the sharing options modal.
- `handleSubmit` method (SignUp Component) for user signup validation.
- `gotologin` and `logout` methods (Header Component) for navigation and user logout.




## License

MIT

**A Public Repo....**

